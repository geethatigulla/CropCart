
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin,
  Mail, 
  MapPin, 
  Phone,
  Leaf
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 relative overflow-hidden rounded-full bg-cropgreen-500 flex items-center justify-center mr-2">
                <span className="font-bold text-white text-lg">CC</span>
              </div>
              <span className="font-bold text-xl text-foreground">
                <span className="text-cropgreen-500">Crop</span>Cart
              </span>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Revolutionizing agricultural commerce with AI-powered technologies that connect farmers directly with merchants.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-cropgreen-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cropgreen-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cropgreen-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cropgreen-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Market', 'Auctions', 'Logistics', 'Financing', 'For Farmers', 'For Merchants'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-cropgreen-500 transition-colors nav-link"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-medium text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin size={18} className="text-cropgreen-500 mr-3 shrink-0" />
                <span className="text-muted-foreground">123 Agriculture Boulevard, Tech Valley, India</span>
              </li>
              <li className="flex">
                <Phone size={18} className="text-cropgreen-500 mr-3 shrink-0" />
                <span className="text-muted-foreground">+91 1234 567 890</span>
              </li>
              <li className="flex">
                <Mail size={18} className="text-cropgreen-500 mr-3 shrink-0" />
                <span className="text-muted-foreground">support@cropcart.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-medium text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to receive updates on market trends, prices and new features.
            </p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Email Address" 
                className="rounded-r-none"
              />
              <Button 
                className="rounded-l-none magnetic-button"
              >
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} CropCart. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center space-x-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'FAQ'].map((item) => (
              <a 
                key={item}
                href="#" 
                className="text-sm text-muted-foreground hover:text-cropgreen-500 transition-colors nav-link"
              >
                {item}
              </a>
            ))}
          </div>
          
          <div className="hidden md:flex items-center mt-4 md:mt-0">
            <Leaf size={14} className="text-cropgreen-500 mr-1" />
            <span className="text-xs text-muted-foreground">
              Sustainable Digital Agriculture
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
