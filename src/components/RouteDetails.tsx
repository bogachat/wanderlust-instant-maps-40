
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Route, Navigation2 } from "lucide-react";

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

interface RouteDetailsProps {
  routeInfo: RouteInfo;
}

const RouteDetails: React.FC<RouteDetailsProps> = ({ routeInfo }) => {
  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
          <Route className="h-5 w-5 text-green-600" />
          Route Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
          <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
            <Navigation2 className="h-4 w-4" />
            Discover a New Path Near You!
          </h3>
          <p className="text-green-700 text-sm">
            Your spontaneous adventure route has been generated. Time to explore!
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 rounded-full p-2 mt-1">
              <MapPin className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">From:</p>
              <p className="text-sm text-gray-600">Your Current Location</p>
              <p className="text-xs text-gray-500 font-mono">
                {routeInfo.origin.lat.toFixed(6)}, {routeInfo.origin.lng.toFixed(6)}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-red-100 rounded-full p-2 mt-1">
              <MapPin className="h-4 w-4 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">To:</p>
              <p className="text-sm text-gray-600">{routeInfo.destinationName}</p>
              <p className="text-xs text-gray-500 font-mono">
                {routeInfo.destination.lat.toFixed(6)}, {routeInfo.destination.lng.toFixed(6)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-3 w-fit mx-auto mb-2">
              <Route className="h-5 w-5 text-blue-600" />
            </div>
            <p className="font-semibold text-gray-800">{routeInfo.distance}</p>
            <p className="text-xs text-gray-600">Total Distance</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-3 w-fit mx-auto mb-2">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <p className="font-semibold text-gray-800">{routeInfo.duration}</p>
            <p className="text-xs text-gray-600">Estimated Drive Time</p>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <p className="text-blue-800 text-sm font-medium">💡 Adventure Tip:</p>
          <p className="text-blue-700 text-xs mt-1">
            Take your time and enjoy the journey! Stop at interesting places along the way and make it a true exploration experience.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteDetails;
