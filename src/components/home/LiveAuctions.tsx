
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, ArrowUp, ArrowDown, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Sample auctions data
const auctionsData = [
  {
    id: 1,
    title: "Premium Quality Wheat Lot",
    currentBid: 375.50,
    startingBid: 350.00,
    bidders: 8,
    timeRemaining: 45, // minutes
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6fa576?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    quantity: "500 tons",
    location: "Punjab",
  },
  {
    id: 2,
    title: "Organic Rice Harvest",
    currentBid: 598.25,
    startingBid: 560.00,
    bidders: 12,
    timeRemaining: 120, // minutes
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    quantity: "300 tons",
    location: "Kerala",
  },
  {
    id: 3,
    title: "Fresh Corn Batch",
    currentBid: 253.80,
    startingBid: 240.00,
    bidders: 5,
    timeRemaining: 65, // minutes
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    quantity: "200 tons",
    location: "Karnataka",
  },
];

const LiveAuctions = () => {
  const [auctions, setAuctions] = useState(auctionsData);
  const [timeLeft, setTimeLeft] = useState<Record<number, number>>({});
  
  // Initialize time remaining
  useEffect(() => {
    const initialTimeLeft = auctionsData.reduce((acc, auction) => {
      acc[auction.id] = auction.timeRemaining;
      return acc;
    }, {} as Record<number, number>);
    
    setTimeLeft(initialTimeLeft);
  }, []);
  
  // Update time and create random bid changes
  useEffect(() => {
    const timer = setInterval(() => {
      // Update time remaining
      setTimeLeft((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => {
          const id = Number(key);
          updated[id] = Math.max(0, updated[id] - 1/60); // Decrease by 1 minute
        });
        return updated;
      });
      
      // Random bid changes
      setAuctions((prevAuctions) => {
        return prevAuctions.map((auction) => {
          // 10% chance of bid change
          if (Math.random() < 0.1) {
            const increase = Math.random() < 0.8; // 80% chance to increase
            const changeAmount = (Math.random() * 5) + 0.5; // Random amount between 0.5 and 5.5
            const newBid = increase 
              ? auction.currentBid + changeAmount 
              : Math.max(auction.startingBid, auction.currentBid - changeAmount);
            
            return {
              ...auction,
              currentBid: parseFloat(newBid.toFixed(2)),
              bidders: increase ? auction.bidders + 1 : auction.bidders,
            };
          }
          return auction;
        });
      });
    }, 1000); // Update every second
    
    return () => clearInterval(timer);
  }, []);

  // Format remaining time
  const formatTimeRemaining = (minutes: number) => {
    if (minutes <= 0) return "Auction ended";
    
    const hrs = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins}m`;
  };

  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-4 px-4 py-2 bg-cropgreen-100 text-cropgreen-700 rounded-full">
            <Clock size={16} className="mr-2 animate-pulse" />
            <span className="text-sm font-medium">Live Auctions</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bid on <span className="text-cropgreen-500">Premium Harvests</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Participate in real-time auctions for high-quality crops from verified farmers across the country.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {auctions.map((auction) => (
            <Card 
              key={auction.id}
              className="overflow-hidden border-border h-full liquid-card"
            >
              <div className="relative">
                <img 
                  src={auction.image} 
                  alt={auction.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="bg-cropgreen-500 text-white border-none">
                      Live Auction
                    </Badge>
                    <div className="flex items-center text-white">
                      <Clock size={14} className="mr-1" />
                      <span className="text-xs">{formatTimeRemaining(timeLeft[auction.id] || 0)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="font-medium text-lg mb-1">{auction.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{auction.quantity}</span>
                    <span>Location: {auction.location}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Current Bid</span>
                    <div className="flex items-center">
                      <Users size={14} className="mr-1" />
                      <span className="text-xs">{auction.bidders} bidders</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-bold">${auction.currentBid.toFixed(2)}</span>
                    <Badge 
                      variant="outline" 
                      className={`ml-2 flex items-center ${
                        auction.currentBid > auction.startingBid 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}
                    >
                      {auction.currentBid > auction.startingBid ? (
                        <ArrowUp size={12} className="mr-1" />
                      ) : (
                        <ArrowDown size={12} className="mr-1" />
                      )}
                      <span className="text-xs font-medium">
                        ${Math.abs(auction.currentBid - auction.startingBid).toFixed(2)}
                      </span>
                    </Badge>
                  </div>
                  
                  <Progress 
                    value={(timeLeft[auction.id] / auction.timeRemaining) * 100} 
                    className="h-1 bg-muted"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button className="w-full magnetic-button">Place Bid</Button>
                  <Button variant="outline" className="w-full magnetic-button">View Details</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveAuctions;
