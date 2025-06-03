
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Location {
  lat: number;
  lng: number;
}

interface LocationPermissionProps {
  onLocationReceived: (location: Location) => void;
}

const LocationPermission: React.FC<LocationPermissionProps> = ({ onLocationReceived }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support geolocation services.",
        variant: "destructive"
      });
      return;
    }

    setIsRequesting(true);
    setHasError(false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        onLocationReceived(location);
        setIsRequesting(false);
        
        console.log('Location received:', location);
      },
      (error) => {
        let errorMessage = "Failed to get your location.";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access was denied. Please enable location permissions and try again.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        
        toast({
          title: "Location Error",
          description: errorMessage,
          variant: "destructive"
        });
        
        setHasError(true);
        setIsRequesting(false);
        console.error('Geolocation error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <MapPin className="h-12 w-12 text-blue-600" />
            {isRequesting && (
              <div className="absolute -inset-2 border-2 border-blue-600 rounded-full animate-ping" />
            )}
          </div>
        </div>
        <CardTitle className="text-2xl text-gray-800">
          Enable Location Access
        </CardTitle>
        <p className="text-gray-600">
          We need your current location to generate personalized exploration routes nearby.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={requestLocation}
          disabled={isRequesting}
          size="lg"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {isRequesting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
              Getting Location...
            </>
          ) : (
            <>
              <MapPin className="h-5 w-5 mr-2" />
              Allow Location Access
            </>
          )}
        </Button>
        
        {hasError && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">
              Location access is required to generate routes. Please check your browser settings and try again.
            </span>
          </div>
        )}
        
        <div className="text-xs text-gray-500 text-center">
          <p>Your location data is only used to generate routes and is not stored or shared.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationPermission;
