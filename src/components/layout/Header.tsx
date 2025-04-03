
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ChevronDown, Search, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState("");
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  // Handle profile button click
  const handleProfileClick = () => {
    console.log('Profile button clicked, user:', user);
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const dropdownMenus = [
    {
      name: "Market",
      items: ["Browse Crops", "Live Auctions", "Price Analytics", "Quality Grading"]
    },
    {
      name: "Logistics",
      items: ["Transport Services", "Warehouse Storage", "Cold Chain", "Track Shipment"]
    },
    {
      name: "Financing",
      items: ["Loans", "BNPL Options", "Subsidies", "Insurance"]
    }
  ];

  const handleDropdown = (name: string) => {
    setShowDropdown(showDropdown === name ? "" : name);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 relative overflow-hidden rounded-full bg-cropgreen-500 flex items-center justify-center">
            <span className="font-bold text-white text-lg animate-pulse-gentle">CC</span>
          </div>
          <span className="font-bold text-xl text-foreground">
            <span className="text-cropgreen-500">Crop</span>Cart
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-10">
            {dropdownMenus.map((menu) => (
              <div key={menu.name} className="relative group">
                <button 
                  className="nav-link flex items-center space-x-1 font-medium text-foreground"
                  onMouseEnter={() => handleDropdown(menu.name)}
                  onMouseLeave={() => handleDropdown("")}
                >
                  <span>{menu.name}</span>
                  <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                </button>
                {showDropdown === menu.name && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-background border border-border animate-fade-in"
                    onMouseEnter={() => handleDropdown(menu.name)}
                    onMouseLeave={() => handleDropdown("")}
                  >
                    <div className="py-1 rounded-md">
                      {menu.items.map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="block px-4 py-2 text-sm hover:bg-muted transition-colors"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        )}
        
        {/* Search and Actions */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center rounded-full bg-muted px-3 py-1">
            <Search size={16} className="text-muted-foreground mr-2" />
            <Input 
              type="text" 
              placeholder="Search crops..." 
              className="border-none bg-transparent w-32 focus:w-48 transition-all focus:outline-none text-sm h-8" 
            />
          </div>
          
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="transition-transform hover:rotate-12">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          <Button variant="ghost" size="icon">
            <ShoppingCart size={20} />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={handleProfileClick}>
            <User size={20} />
          </Button>
          
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobile && isOpen && (
        <div className="bg-background border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-3">
            <div className="mb-4">
              <div className="flex items-center rounded-full bg-muted px-3 py-1 w-full">
                <Search size={16} className="text-muted-foreground mr-2" />
                <Input 
                  type="text" 
                  placeholder="Search crops..." 
                  className="border-none bg-transparent w-full focus:outline-none text-sm h-8" 
                />
              </div>
            </div>
            
            {dropdownMenus.map((menu) => (
              <div key={menu.name} className="mb-4">
                <button 
                  className="flex items-center justify-between w-full py-2 font-medium border-b border-border"
                  onClick={() => handleDropdown(menu.name)}
                >
                  <span>{menu.name}</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${showDropdown === menu.name ? 'rotate-180' : ''}`} 
                  />
                </button>
                {showDropdown === menu.name && (
                  <div className="pl-4 py-2 animate-fade-in">
                    {menu.items.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block py-2 text-sm hover:text-cropgreen-500 transition-colors"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="mt-6 flex space-x-4">
              <Button variant="default" className="flex-1 magnetic-button" onClick={() => navigate('/login')}>Login</Button>
              <Button variant="outline" className="flex-1 magnetic-button" onClick={() => navigate('/register')}>Register</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
