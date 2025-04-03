
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart2,
  TrendingUp,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample data for the chart
const priceData = [
  { month: 'Jan', price: 345, prediction: 352 },
  { month: 'Feb', price: 356, prediction: 362 },
  { month: 'Mar', price: 342, prediction: 336 },
  { month: 'Apr', price: 348, prediction: 355 },
  { month: 'May', price: 360, prediction: 375 },
  { month: 'Jun', price: 375, prediction: 382 },
  { month: 'Jul', price: 380, prediction: 388 },
  { month: 'Aug', price: 378, prediction: 370 },
  { month: 'Sep', price: 365, prediction: 358 },
  { month: 'Oct', price: 352, prediction: 348 },
  { month: 'Nov', price: 340, prediction: 345 },
  { month: 'Dec', price: 348, prediction: 360 },
];

const crops = ["Wheat", "Rice", "Corn", "Soybeans"];

const AIPredictions = () => {
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const isMobile = useIsMobile();
  
  // Get max value for chart scaling
  const maxValue = Math.max(
    ...priceData.map(d => Math.max(d.price, d.prediction))
  ) * 1.2;

  return (
    <div className="py-24 bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-4 px-4 py-2 bg-cropgreen-100 text-cropgreen-700 rounded-full">
            <TrendingUp size={16} className="mr-2" />
            <span className="text-sm font-medium">AI-Powered Insights</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Smart <span className="text-cropgreen-500">Price Predictions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI analyzes market trends, climate data, and global demand to predict future crop prices with industry-leading accuracy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Crop Selection */}
          <Card className="p-4 lg:col-span-1">
            <h3 className="font-medium text-lg mb-4">Select Crop</h3>
            <div className="space-y-2">
              {crops.map(crop => (
                <button
                  key={crop}
                  className={`w-full py-3 px-4 rounded-md text-left transition-all magnetic-button ${
                    selectedCrop === crop 
                      ? 'bg-cropgreen-500 text-white shadow-md'
                      : 'bg-secondary hover:bg-cropgreen-100'
                  }`}
                  onClick={() => setSelectedCrop(crop)}
                >
                  {crop}
                </button>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Market Factors</h4>
                <span className="text-xs text-muted-foreground">Live Data</span>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: "Global Demand", value: "High", trend: "up" },
                  { name: "Local Supply", value: "Medium", trend: "stable" },
                  { name: "Weather Impact", value: "Low", trend: "down" }
                ].map(factor => (
                  <div key={factor.name} className="flex justify-between items-center">
                    <span className="text-sm">{factor.name}</span>
                    <span className={`text-sm font-medium ${
                      factor.trend === 'up' ? 'text-green-500' : 
                      factor.trend === 'down' ? 'text-red-500' : 
                      'text-amber-500'
                    }`}>{factor.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          
          {/* Chart Area */}
          <Card className="p-6 lg:col-span-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h3 className="font-bold text-2xl flex items-center">
                  {selectedCrop} Price Forecast
                  <span className="ml-2 text-xs bg-cropgreen-100 text-cropgreen-700 px-2 py-1 rounded-full">
                    94% Accuracy
                  </span>
                </h3>
                <p className="text-sm text-muted-foreground">
                  Historical prices and AI predictions for the next 12 months
                </p>
              </div>
              
              <div className="flex space-x-2 mt-4 md:mt-0">
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-cropgreen-500 mr-2"></span>
                  <span className="text-sm">Actual</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-cropgreen-300/70 border border-cropgreen-400 mr-2"></span>
                  <span className="text-sm">Predicted</span>
                </div>
              </div>
            </div>
            
            {/* Chart */}
            <div className="h-64 md:h-80 flex items-end space-x-1 md:space-x-2 mb-4">
              {priceData.map((data, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center justify-end h-full"
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* Predicted price bar */}
                  <div
                    className={`w-full md:w-3/4 bg-cropgreen-300/70 border border-cropgreen-400 mb-1 rounded-t-sm transition-all duration-300 relative ${
                      hoveredBar === index ? 'opacity-100' : 'opacity-80'
                    }`}
                    style={{ height: `${(data.prediction / maxValue) * 100}%` }}
                  >
                    {hoveredBar === index && (
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-xs whitespace-nowrap">
                        ${data.prediction}
                      </div>
                    )}
                  </div>
                  
                  {/* Actual price bar */}
                  <div
                    className={`w-full md:w-3/4 bg-cropgreen-500 rounded-t-sm transition-all duration-300 relative ${
                      hoveredBar === index ? 'opacity-100' : 'opacity-80'
                    }`}
                    style={{ height: `${(data.price / maxValue) * 100}%` }}
                  >
                    {hoveredBar === index && (
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-xs whitespace-nowrap">
                        ${data.price}
                      </div>
                    )}
                  </div>
                  
                  {/* Month label */}
                  <div className="mt-2 text-xs text-muted-foreground">
                    {!isMobile || index % 2 === 0 ? data.month : ''}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-8 pt-4 border-t border-border">
              <div className="flex items-start md:items-center flex-col md:flex-row mb-4 md:mb-0">
                <div className="flex items-center mr-0 md:mr-6 mb-3 md:mb-0">
                  <BarChart2 size={18} className="text-cropgreen-500 mr-2" />
                  <div>
                    <div className="text-sm text-muted-foreground">Average Price</div>
                    <div className="font-medium">${Math.round(priceData.reduce((acc, val) => acc + val.price, 0) / priceData.length)}/ton</div>
                  </div>
                </div>
                
                <div className="flex items-center mr-0 md:mr-6 mb-3 md:mb-0">
                  <TrendingUp size={18} className="text-cropgreen-500 mr-2" />
                  <div>
                    <div className="text-sm text-muted-foreground">Forecast Trend</div>
                    <div className="font-medium text-green-600">+4.5% Growth</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar size={18} className="text-cropgreen-500 mr-2" />
                  <div>
                    <div className="text-sm text-muted-foreground">Best Selling Time</div>
                    <div className="font-medium">Jul-Aug</div>
                  </div>
                </div>
              </div>
              
              <Button className="magnetic-button">
                <span>Detailed Analysis</span>
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIPredictions;
