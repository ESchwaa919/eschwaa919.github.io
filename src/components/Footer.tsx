import { Link } from "react-router-dom";
import { Linkedin, Mail, MapPin, Phone, Zap, Facebook, Instagram } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigation = [
    {
      title: "Company",
      links: [
        { name: "About", path: "/about" },
        { name: "The Process", path: "/process" },
        { name: "Services", path: "/services" },
        { name: "Pricing", path: "/pricing" },
      ],
    },
    {
      title: "AI Solutions",
      links: [
        { name: "Fractional CAIO", path: "/fractional-caio" },
        { name: "AI Literacy", path: "/ai-literacy" },
        { name: "AI Strategy", path: "/ai-strategy" },
        { name: "AI Governance", path: "/ai-governance" },
        { name: "AI Implementation", path: "/ai-implementation" },
        { name: "Use Cases", path: "/use-cases" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Insights", path: "/resources" },
        { name: "Media & Speaking", path: "/resources#media" },
        { name: "Free Tools", path: "/resources#tools" },
        { name: "Contact", path: "/contact" },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "erik@theaiexpert.ai",
      href: "mailto:erik@theaiexpert.ai",
    },
    {
      icon: Phone,
      text: "+44-7946-235391",
      href: "tel:+447946235391",
    },
    {
      icon: MapPin,
      text: "Kent, UK",
      href: null,
    },
  ];

  return (
    <footer className="bg-card/50 border-t border-border mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 group mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border-2 border-primary group-hover:bg-primary/20 transition-all">
                <Zap className="w-6 h-6 text-primary group-hover:glow-green" />
              </div>
              <div>
                <div className="text-xl font-heading text-primary glow-green">
                  AIEXPERT.AI
                </div>
                <div className="text-xs text-muted-foreground -mt-1">
                  Getting AI Done Right
                </div>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Your first stop for getting AI done right. Fractional CAIO
              services, AI strategy development, and implementation for
              forward-looking SMBs.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Icon className="w-4 h-4" />
                    <span>{item.text}</span>
                  </div>
                );

                return item.href ? (
                  <a key={index} href={item.href}>
                    {content}
                  </a>
                ) : (
                  <div key={index}>{content}</div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.linkedin.com/in/eschwaa/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center border border-border hover:border-primary transition-all group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:glow-green" />
              </a>
              <a
                href="https://x.com/ESchwaa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center border border-border hover:border-primary transition-all group"
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:glow-green" />
              </a>
              <a
                href="https://www.instagram.com/eschwaa/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center border border-border hover:border-primary transition-all group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:glow-green" />
              </a>
              <a
                href="https://www.facebook.com/ESchwaa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center border border-border hover:border-primary transition-all group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:glow-green" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          {navigation.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-heading text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} aiexpert.ai. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <span className="text-sm text-neon-green">
                Made in England. Built for the future.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
