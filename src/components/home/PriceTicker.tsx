
import React, { useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Crop data for the ticker
const cropData = [
  { name: "Wheat", price: 342.50, change: 2.3, increasing: true },
  { name: "Rice", price: 567.75, change: -1.2, increasing: false },
  { name: "Corn", price: 245.30, change: 0.8, increasing: true },
  { name: "Soybeans", price: 1245.80, change: -0.5, increasing: false },
  { name: "Barley", price: 187.25, change: 3.1, increasing: true },
  { name: "Oats", price: 156.90, change: 1.7, increasing: true },
  { name: "Cotton", price: 432.10, change: -2.1, increasing: false },
  { name: "Coffee", price: 862.30, change: 4.2, increasing: true },
  { name: "Sugar", price: 124.50, change: -0.3, increasing: false },
  { name: "Cocoa", price: 734.20, change: 2.8, increasing: true },
];

const PriceTicker = () => {
  const tickerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Clone the ticker content for seamless looping
    const createDuplicateContent = () => {
      if (!tickerRef.current) return;
      
      const content = tickerRef.current;
      const clone = content.cloneNode(true);
      content.parentElement?.appendChild(clone);
    };
    
    createDuplicateContent();
  }, []);

  return (
    <div className="w-full bg-background border-y border-border py-3 overflow-hidden relative">
      <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-background to-transparent z-10"></div>
      <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background to-transparent z-10"></div>
      
      <div className="flex ticker-container relative">
        <div ref={tickerRef} className="flex animate-ticker-slide whitespace-nowrap">
          {cropData.map((crop, index) => (
            <div 
              key={index} 
              className="flex items-center px-6 cursor-hover-grow"
            >
              <span className="font-medium mr-2">{crop.name}</span>
              <span className="mr-2">${crop.price.toFixed(2)}</span>
              <div className={`flex items-center ${crop.increasing ? 'text-green-500' : 'text-red-500'}`}>
                {crop.increasing ? (
                  <TrendingUp size={14} className="mr-1" />
                ) : (
                  <TrendingDown size={14} className="mr-1" />
                )}
                <span>{crop.change.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceTicker;
