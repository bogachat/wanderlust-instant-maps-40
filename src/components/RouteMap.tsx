
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Navigation } from "lucide-react";

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

  const generateEmbedUrl = () => {
    const { origin, destination } = routeInfo;
    const center = {
      lat: (origin.lat + destination.lat) / 2,
      lng: (origin.lng + destination.lng) / 2
    };
    
    return `https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&center=${center.lat},${center.lng}&zoom=12`;
  };

  const openInGoogleMaps = () => {
    const url = generateGoogleMapsUrl();
    window.open(url, '_blank');
  };

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
          <Navigation className="h-5 w-5 text-blue-600" />
          Your Route Map
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Static Map Placeholder */}
        <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <Navigation className="h-16 w-16 mx-auto mb-4 text-blue-600" />
              <p className="font-semibold">Interactive Route Map</p>
              <p className="text-sm">From: {routeInfo.origin.lat.toFixed(4)}, {routeInfo.origin.lng.toFixed(4)}</p>
              <p className="text-sm">To: {routeInfo.destination.lat.toFixed(4)}, {routeInfo.destination.lng.toFixed(4)}</p>
            </div>
          </div>
          
          {/* Route visualization overlay */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 300 200">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              
              {/* Start point */}
              <circle cx="50" cy="100" r="8" fill="#10B981" />
              <text x="50" y="125" textAnchor="middle" fontSize="12" fill="#10B981" fontWeight="bold">START</text>
              
              {/* End point */}
              <circle cx="250" cy="80" r="8" fill="#EF4444" />
              <text x="250" y="105" textAnchor="middle" fontSize="12" fill="#EF4444" fontWeight="bold">END</text>
              
              {/* Route path */}
              <path
                d="M 50 100 Q 100 60 150 90 Q 200 120 250 80"
                stroke="url(#routeGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="300"
                strokeDashoffset="300"
                className="animate-[dash_2s_ease-in-out_forwards]"
              />
            </svg>
          </div>
        </div>
        
        {/* Route Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{routeInfo.distance}</p>
              <p className="text-sm text-gray-600">Distance</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{routeInfo.duration}</p>
              <p className="text-sm text-gray-600">Est. Duration</p>
            </div>
          </div>
        </div>
        
        {/* Open in Maps Button */}
        <Button 
          onClick={openInGoogleMaps}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          size="lg"
        >
          <ExternalLink className="h-5 w-5 mr-2" />
          Open Route in Google Maps
        </Button>
        
        <p className="text-xs text-gray-500 text-center">
          Click the button above to open the full interactive route in Google Maps
        </p>
      </CardContent>
      
      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </Card>
  );
};

export default RouteMap;
