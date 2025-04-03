
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star, Info } from 'lucide-react';

// Sample crop data
const crops = [
  {
    id: 1,
    name: "Premium Wheat",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6fa576?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: 342.50,
    rating: 4.8,
    region: "Punjab",
    type: "Grain",
    aiGraded: "A+",
  },
  {
    id: 2,
    name: "Organic Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: 567.75,
    rating: 4.7,
    region: "Kerala",
    type: "Grain",
    aiGraded: "A",
  },
  {
    id: 3,
    name: "Fresh Corn",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: 245.30,
    rating: 4.5,
    region: "Karnataka",
    type: "Vegetable",
    aiGraded: "A-",
  },
  {
    id: 4,
    name: "Soybean",
    image: "https://images.unsplash.com/photo-1568720644848-5e2c3bdb8a89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: 1245.80,
    rating: 4.6,
    region: "Maharashtra",
    type: "Legume",
    aiGraded: "B+",
  },
];

const FeaturedCrops = () => {
  const [tiltedCards, setTiltedCards] = useState<Record<number, { x: number, y: number }>>({});
  
  // Handle card tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / 10;
    const tiltY = (centerX - x) / 10;
    
    setTiltedCards({
      ...tiltedCards,
      [id]: { x: tiltX, y: tiltY }
    });
  };
  
  const handleMouseLeave = (id: number) => {
    setTiltedCards({
      ...tiltedCards,
      [id]: { x: 0, y: 0 }
    });
  };

  return (
    <div className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-cropgreen-500">Crops</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover premium quality crops from verified farmers, all graded by our advanced AI system for quality assurance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {crops.map((crop) => (
            <div 
              key={crop.id}
              className="tilt-card cursor-hover-grow"
              onMouseMove={(e) => handleMouseMove(e, crop.id)}
              onMouseLeave={() => handleMouseLeave(crop.id)}
              style={{
                transform: `perspective(1000px) rotateX(${tiltedCards[crop.id]?.x || 0}deg) rotateY(${tiltedCards[crop.id]?.y || 0}deg)`
              }}
            >
              <Card className="overflow-hidden border-border h-full flex flex-col">
                <div className="relative liquid-card">
                  <img 
                    src={crop.image} 
                    alt={crop.name} 
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <Button variant="ghost" size="icon" className="bg-background/50 backdrop-blur-sm rounded-full h-8 w-8">
                      <Heart size={16} className="text-foreground hover:text-red-500 transition-colors" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                    <Badge variant="secondary" className="bg-background/50 backdrop-blur-sm">
                      {crop.type}
                    </Badge>
                    <Badge variant="secondary" className="bg-background/50 backdrop-blur-sm">
                      {crop.region}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4 flex-grow flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{crop.name}</h3>
                    <div className="flex items-center text-amber-500">
                      <Star size={16} className="fill-amber-500 mr-1" />
                      <span className="text-sm">{crop.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <Badge variant="outline" className="bg-cropgreen-50 text-cropgreen-700 border-cropgreen-200 flex items-center">
                      <span className="text-xs font-medium">AI Grade: {crop.aiGraded}</span>
                      <Info size={12} className="ml-1" />
                    </Badge>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold text-lg">${crop.price.toFixed(2)}/ton</span>
                    <Button size="sm" className="magnetic-button">
                      <ShoppingCart size={16} className="mr-1" /> Add
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCrops;
