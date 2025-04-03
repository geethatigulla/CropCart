
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imagesRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) - 0.5;
      const y = ((e.clientY - top) / height) - 0.5;
      
      const images = imagesRef.current.querySelectorAll('.floating-image');
      images.forEach((image, i) => {
        const factor = (i + 1) * 10;
        (image as HTMLElement).style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="py-24 bg-cropgreen-500 relative overflow-hidden"
    >
      {/* Floating images */}
      <div ref={imagesRef} className="absolute inset-0 pointer-events-none">
        <div className="floating-image absolute top-[10%] left-[5%] w-24 h-24 rounded-full bg-white/20 blur-xl"></div>
        <div className="floating-image absolute bottom-[15%] right-[10%] w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
        <div className="floating-image absolute top-[50%] right-[20%] w-16 h-16 rounded-full bg-white/15 blur-xl"></div>
        <div className="floating-image absolute bottom-[30%] left-[15%] w-20 h-20 rounded-full bg-white/10 blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Agricultural Business?
          </h2>
          
          <p className="text-cropgreen-50 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of farmers and merchants already using Crop Cart to trade smarter with AI-powered insights, secure transactions, and streamlined logistics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="magnetic-button group px-6 py-6 bg-white text-cropgreen-700 hover:bg-opacity-90 hover:text-cropgreen-800"
            >
              <span>Join as a Farmer</span>
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline" 
              className="magnetic-button px-6 py-6 border-white text-white hover:bg-white/20"
            >
              Register as Merchant
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { label: "Farmers", value: "12,500+" },
              { label: "Merchants", value: "5,800+" },
              { label: "Daily Trades", value: "₹2.5Cr+" },
              { label: "AI Accuracy", value: "94%" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-cropgreen-100 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
