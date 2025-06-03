
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Navigation, Terminal, Zap } from "lucide-react";

interface Location {
  lat: number;
  lng: number;
}

interface RouteInfo {
  origin: Location;
  destination: Location;
  distance: string;
  duration: string;
  destinationName: string;
}

interface RouteMapProps {
  routeInfo: RouteInfo;
}

const RouteMap: React.FC<RouteMapProps> = ({ routeInfo }) => {
  const generateGoogleMapsUrl = () => {
    const { origin, destination } = routeInfo;
    return `https://www.google.com/maps/dir/${origin.lat},${origin.lng}/${destination.lat},${destination.lng}`;
  };

  const openInGoogleMaps = () => {
    const url = generateGoogleMapsUrl();
    window.open(url, '_blank');
  };

  return (
    <Card className="hologram hacker-border bg-card/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl text-neon-green font-orbitron flex items-center gap-2">
          <Terminal className="h-5 w-5 text-neon-green animate-pulse" />
          CYBER NAVIGATION MATRIX
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cyber Map Visualization */}
        <div className="relative h-64 bg-black/80 rounded-lg overflow-hidden hacker-border">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-neon-green">
              <Terminal className="h-16 w-16 mx-auto mb-4 text-neon-green animate-pulse-neon" />
              <p className="font-orbitron font-semibold text-lg">NEURAL PATHWAY ACTIVE</p>
              <p className="text-sm font-fira text-neon-blue">
                ORIGIN: [{routeInfo.origin.lat.toFixed(6)}, {routeInfo.origin.lng.toFixed(6)}]
              </p>
              <p className="text-sm font-fira text-neon-blue">
                TARGET: [{routeInfo.destination.lat.toFixed(6)}, {routeInfo.destination.lng.toFixed(6)}]
              </p>
            </div>
          </div>
          
          {/* Cyber Route Visualization */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 300 200">
              <defs>
                <linearGradient id="cyberRouteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(0, 255, 65)" />
                  <stop offset="50%" stopColor="rgb(0, 200, 255)" />
                  <stop offset="100%" stopColor="rgb(150, 0, 255)" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Grid Pattern */}
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 255, 65, 0.2)" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Start Node */}
              <g>
                <circle cx="50" cy="100" r="12" fill="rgb(0, 255, 65)" filter="url(#glow)" />
                <circle cx="50" cy="100" r="8" fill="rgb(0, 100, 35)" />
                <text x="50" y="130" textAnchor="middle" fontSize="10" fill="rgb(0, 255, 65)" fontFamily="Fira Code" fontWeight="bold">
                  ORIGIN
                </text>
              </g>
              
              {/* End Node */}
              <g>
                <circle cx="250" cy="80" r="12" fill="rgb(255, 25, 25)" filter="url(#glow)" />
                <circle cx="250" cy="80" r="8" fill="rgb(100, 0, 0)" />
                <text x="250" y="110" textAnchor="middle" fontSize="10" fill="rgb(255, 25, 25)" fontFamily="Fira Code" fontWeight="bold">
                  TARGET
                </text>
              </g>
              
              {/* Cyber Route Path */}
              <path
                d="M 50 100 Q 100 60 150 90 Q 200 120 250 80"
                stroke="url(#cyberRouteGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                strokeDasharray="300"
                strokeDashoffset="300"
                style={{
                  animation: 'dash 2s ease-in-out forwards'
                }}
              />
              
              {/* Data Packets */}
              <circle r="3" fill="rgb(0, 255, 65)" filter="url(#glow)">
                <animateMotion dur="3s" repeatCount="indefinite">
                  <mpath href="#routePath"/>
                </animateMotion>
              </circle>
            </svg>
          </div>
        </div>
        
        {/* Route Data Panel */}
        <div className="bg-black/60 rounded-lg p-4 hacker-border">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="hacker-border p-3 bg-neon-green/5">
              <p className="text-2xl font-orbitron font-bold text-neon-green">{routeInfo.distance}</p>
              <p className="text-sm text-neon-blue font-fira">DISTANCE</p>
            </div>
            <div className="hacker-border p-3 bg-neon-blue/5">
              <p className="text-2xl font-orbitron font-bold text-neon-blue">{routeInfo.duration}</p>
              <p className="text-sm text-neon-blue font-fira">ETA</p>
            </div>
          </div>
        </div>
        
        {/* Deploy Navigation Protocol Button */}
        <Button 
          onClick={openInGoogleMaps}
          className="w-full cyber-button font-orbitron font-bold tracking-wider"
          size="lg"
        >
          <ExternalLink className="h-5 w-5 mr-2" />
          DEPLOY NAVIGATION PROTOCOL
        </Button>
        
        <p className="text-xs text-neon-blue text-center font-fira">
          >> EXECUTE COMMAND TO LAUNCH EXTERNAL NAVIGATION INTERFACE &lt;&lt;
        </p>
      </CardContent>
      
      <style>
        {`
          @keyframes dash {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </Card>
  );
};

export default RouteMap;
