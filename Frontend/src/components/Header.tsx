import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-medium border-b border-border/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-padding">
        <div className="flex items-center justify-between h-20 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-xl shadow-red group-hover:scale-110 transition-transform duration-300">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">BCM Group</span>
              <span className="text-xs text-muted-foreground -mt-1">Real Estate & Construction</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:text-primary hover:bg-secondary/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="pt-4">
            <a href="tel:+911234567890">
              <Button className="btn-primary w-full">
                    Call Now
                </Button>
              </a>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center transition-colors duration-300 hover:bg-secondary"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-large">
            <nav className="container-padding py-6">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActive(item.path)
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground hover:text-primary hover:bg-secondary/50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4">
                  <a href="tel:+911234567890">
                    <Button className="btn-primary w-full">
                      Call Now
                    </Button>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;