
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Leaf, 
  TrendingUp, 
  ShoppingCart, 
  Truck
} from 'lucide-react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) - 0.5;
      const y = ((e.clientY - top) / height) - 0.5;
      
      setMousePosition({ x, y });
    };
    
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      heroRef.current.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="hero-gradient min-h-screen w-full flex flex-col justify-center items-center px-4 pt-16 relative overflow-hidden"
    >
      {/* Background animated elements */}
      <div 
        className="absolute top-1/3 left-1/4 w-64 h-64 bg-cropgreen-200/20 rounded-full blur-3xl animate-pulse-gentle"
        style={{ 
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)` 
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cropgreen-300/10 rounded-full blur-3xl animate-float"
        style={{ 
          transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
          animationDelay: '1s'
        }}
      />
      
      {/* Hero content */}
      <div className="container mx-auto relative z-10 text-center max-w-4xl">
        <div className="inline-flex items-center px-4 py-2 bg-cropgreen-100 text-cropgreen-700 rounded-full mb-8 animate-fade-in">
          <Leaf size={16} className="mr-2" />
          <span className="text-sm font-medium">Revolutionizing Agricultural Commerce</span>
        </div>
        
        <h1 
          className="text-4xl md:text-6xl font-bold mb-6 tracking-tight relative animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="text-cropgreen-500">AI-Powered</span> Marketplace for <span className="text-cropgreen-500">Modern Agriculture</span>
        </h1>
        
        <p 
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          Connect farmers directly with merchants through our intelligent platform featuring AI price predictions, quality grading, and seamless logistics.
        </p>
        
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          <Button 
            size="lg" 
            className="magnetic-button group px-6 py-6"
            onClick={() => console.log("Explore market")}
          >
            <span>Explore Market</span>
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="magnetic-button px-6 py-6"
            onClick={() => console.log("Learn more")}
          >
            Learn How It Works
          </Button>
        </div>
      </div>
      
      {/* Features bar */}
      <div 
        className="w-full max-w-6xl mx-auto mt-16 md:mt-24 bg-background/50 backdrop-blur-md rounded-xl border border-border p-4 md:p-6 animate-fade-in shadow-lg"
        style={{ animationDelay: '0.4s' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { 
              icon: <Leaf className="text-cropgreen-500" />, 
              title: "Quality Grading",
              desc: "AI-powered crop quality verification"
            },
            { 
              icon: <TrendingUp className="text-cropgreen-500" />, 
              title: "Price Predictions",
              desc: "Get real-time market insights"
            },
            { 
              icon: <ShoppingCart className="text-cropgreen-500" />, 
              title: "Live Auctions",
              desc: "Dynamic bidding marketplace"
            },
            { 
              icon: <Truck className="text-cropgreen-500" />, 
              title: "Smart Logistics",
              desc: "Optimized delivery solutions"
            },
          ].map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center cursor-hover-grow p-4 rounded-lg hover:bg-background/80 transition-all" 
            >
              <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-medium mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
