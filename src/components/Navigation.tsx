import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Brandmark from "@/components/Brandmark";

interface NavLink {
  name: string;
  path: string;
  children?: { name: string; path: string }[];
}

const navLinks: NavLink[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "The Process", path: "/process" },
  {
    name: "Services",
    path: "/services",
    children: [
      { name: "All Services", path: "/services" },
      { name: "Fractional CAIO", path: "/fractional-caio" },
      { name: "AI Literacy", path: "/ai-literacy" },
      { name: "AI Strategy", path: "/ai-strategy" },
      { name: "AI Governance", path: "/ai-governance" },
      { name: "AI Implementation", path: "/ai-implementation" },
      { name: "Use Cases", path: "/use-cases" },
    ],
  },
  { name: "Pricing", path: "/pricing" },
  { name: "Resources", path: "/resources" },
  { name: "Contact", path: "/contact" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;
  const isChildActive = (link: NavLink) =>
    link.children?.some((child) => location.pathname === child.path) || false;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-cyber"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Brandmark hideTextOnMobile />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`font-mono text-xs uppercase tracking-[0.16em] transition-all hover:text-primary flex items-center gap-1 ${
                      isActive(link.path) || isChildActive(link)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.name}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${
                        openDropdown === link.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === link.name && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 animate-fade-in">
                      <div className="bg-background/98 backdrop-blur-md border border-border rounded-lg shadow-cyber py-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`block px-4 py-2.5 text-sm transition-all hover:bg-primary/10 hover:text-primary ${
                              isActive(child.path)
                                ? "text-primary bg-primary/5"
                                : "text-muted-foreground"
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-mono text-xs uppercase tracking-[0.16em] transition-all hover:text-primary ${
                    isActive(link.path)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}

            <Button size="sm" variant="cine" className="text-xs" asChild>
              <Link to="/contact">Book a Call</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border shadow-cyber py-6 px-4 z-50 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.path}>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === link.name ? null : link.name
                        )
                      }
                      className={`font-mono text-sm uppercase tracking-[0.14em] transition-all hover:text-primary py-2 w-full text-left flex items-center justify-between ${
                        isActive(link.path) || isChildActive(link)
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === link.name && (
                      <div className="ml-4 mt-2 space-y-2 border-l-2 border-primary/20 pl-4">
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block text-sm transition-all hover:text-primary py-1 ${
                              isActive(child.path)
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-mono text-sm uppercase tracking-[0.14em] transition-all hover:text-primary py-2 ${
                      isActive(link.path)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              )}

              <Button
                size="sm"
                variant="cine"
                className="text-xs w-full mt-2"
                asChild
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link to="/contact">Book a Call</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
