
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import PriceTicker from '@/components/home/PriceTicker';
import FeaturedCrops from '@/components/home/FeaturedCrops';
import LiveAuctions from '@/components/home/LiveAuctions';
import AIPredictions from '@/components/home/AIPredictions';
import CallToAction from '@/components/home/CallToAction';

// Initialize mouse cursor effects
const initializeCursorEffects = () => {
  // Add custom cursor effects
  const cursor = document.createElement('div');
  cursor.className = 'fixed w-6 h-6 rounded-full border-2 border-cropgreen-500 pointer-events-none z-50 transition-transform duration-200 ease-out';
  cursor.style.transform = 'translate(-50%, -50%)';
  document.body.appendChild(cursor);

  const cursorDot = document.createElement('div');
  cursorDot.className = 'fixed w-2 h-2 bg-cropgreen-500 rounded-full pointer-events-none z-50 transition-transform duration-150 ease-out';
  cursorDot.style.transform = 'translate(-50%, -50%)';
  document.body.appendChild(cursorDot);

  document.addEventListener('mousemove', (e: MouseEvent) => {
    requestAnimationFrame(() => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
    });
  });

  // Add effect for magnetic buttons and other interactive elements
  document.querySelectorAll('.magnetic-button').forEach((button) => {
    button.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = (button as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      (button as HTMLElement).style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      cursor.style.transform = `translate(-50%, -50%) scale(1.5)`;
      cursorDot.style.transform = `translate(-50%, -50%) scale(1.5)`;
    });
    
    button.addEventListener('mouseleave', () => {
      (button as HTMLElement).style.transform = '';
      cursor.style.transform = `translate(-50%, -50%) scale(1)`;
      cursorDot.style.transform = `translate(-50%, -50%) scale(1)`;
    });
  });

  document.querySelectorAll('.cursor-hover-grow').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = `translate(-50%, -50%) scale(1.5)`;
      cursor.style.backgroundColor = 'rgba(39, 174, 96, 0.1)';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = `translate(-50%, -50%) scale(1)`;
      cursor.style.backgroundColor = 'transparent';
    });
  });
};

const Index = () => {
  // Only run cursor effects on desktop/large screens
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
      initializeCursorEffects();
    }
    
    // Clean up
    return () => {
      const cursor = document.querySelector('div.fixed.border-cropgreen-500');
      const cursorDot = document.querySelector('div.fixed.bg-cropgreen-500');
      
      if (cursor) cursor.remove();
      if (cursorDot) cursorDot.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <PriceTicker />
      <FeaturedCrops />
      <LiveAuctions />
      <AIPredictions />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
