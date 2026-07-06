import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The swarm, reborn ethereal: a slow, murmuration-like field of soft emerald
 * and bone motes drifting in depth behind the whole site. GPU-driven (all
 * motion lives in the vertex shader), additive-blended, capped DPR.
 *
 * Loaded lazily (and only after idle) from AmbientBackground so three.js
 * stays out of the main bundle; reduced-motion users never load it at all.
 * Renders at 30fps — indistinguishable for a slow drift, half the GPU work.
 */

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSeed;
  attribute float aSize;
  varying float vSeed;
  varying float vDepth;

  void main() {
    vSeed = aSeed;
    vec3 p = position;

    // Layered sine drift — slow, organic, flock-like coherence with
    // per-particle phase. Amplitudes tuned for "breathing" not "buzzing".
    float t = uTime * 0.06;
    p.x += sin(t + aSeed * 6.2831 + position.y * 0.045) * 5.0;
    p.y += cos(t * 0.8 + aSeed * 12.566 + position.x * 0.03) * 4.0;
    p.z += sin(t * 0.6 + aSeed * 3.1415 + position.x * 0.02) * 5.0;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = clamp((-mv.z - 20.0) / 90.0, 0.0, 1.0);
    gl_PointSize = aSize * uPixelRatio * (140.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  varying float vSeed;
  varying float vDepth;

  void main() {
    // Soft round sprite with radial falloff
    float d = length(gl_PointCoord - vec2(0.5));
    float alpha = smoothstep(0.5, 0.05, d);

    // Emerald signal to bone, keyed per particle; distant motes fade out
    vec3 emerald = vec3(0.0, 0.9, 0.47);
    vec3 bone = vec3(0.85, 0.9, 0.87);
    vec3 color = mix(emerald, bone, step(0.82, vSeed) * 0.9);

    alpha *= mix(0.5, 0.06, vDepth);
    gl_FragColor = vec4(color, alpha * 0.35);
  }
`;

const EtherealSwarm = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || typeof window === "undefined") return;

    // Reduced motion never reaches here — AmbientBackground gates the import.
    const isSmall = window.innerWidth < 768;
    const COUNT = isSmall ? 700 : 1600;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    } catch {
      return; // no WebGL (e.g. prerender) — the static gradients still carry the scene
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 200);
    camera.position.z = 60;

    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const sizes = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 190;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 110;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 90;
      seeds[i] = Math.random();
      sizes[i] = 1.0 + Math.random() * 2.4;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Gentle mouse parallax
    const target = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 4;
      target.y = -(e.clientY / window.innerHeight - 0.5) * 2.5;
    };

    const onResize = () => {
      const ratio = Math.min(window.devicePixelRatio, 1.5);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(ratio);
      material.uniforms.uPixelRatio.value = ratio;
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const clock = new THREE.Clock();
    let rafId = 0;
    let lastFrame = 0;
    const FRAME_MS = 1000 / 30; // 30fps is indistinguishable for this drift

    const renderFrame = () => {
      material.uniforms.uTime.value = clock.getElapsedTime();
      points.rotation.y += 0.0007;
      camera.position.x += (target.x - camera.position.x) * 0.04;
      camera.position.y += (target.y - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    const loop = (now: number) => {
      if (now - lastFrame >= FRAME_MS) {
        lastFrame = now;
        renderFrame();
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
};

export default EtherealSwarm;
