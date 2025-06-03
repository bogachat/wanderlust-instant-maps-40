
import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Clock, Route } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import PhoneVerification from "@/components/PhoneVerification";
import LocationPermission from "@/components/LocationPermission";
import RouteMap from "@/components/RouteMap";
import RouteDetails from "@/components/RouteDetails";

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

const Index = () => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const generateRandomDestination = (origin: Location): Location => {
    // Generate random destination within 20km radius
    const earthRadius = 6371; // km
    const maxDistance = 20; // km
    
    const randomDistance = Math.random() * maxDistance;
    const randomBearing = Math.random() * 2 * Math.PI;
    
    const lat1 = (origin.lat * Math.PI) / 180;
    const lng1 = (origin.lng * Math.PI) / 180;
    
    const lat2 = Math.asin(
      Math.sin(lat1) * Math.cos(randomDistance / earthRadius) +
      Math.cos(lat1) * Math.sin(randomDistance / earthRadius) * Math.cos(randomBearing)
    );
    
    const lng2 = lng1 + Math.atan2(
      Math.sin(randomBearing) * Math.sin(randomDistance / earthRadius) * Math.cos(lat1),
      Math.cos(randomDistance / earthRadius) - Math.sin(lat1) * Math.sin(lat2)
    );
    
    return {
      lat: (lat2 * 180) / Math.PI,
      lng: (lng2 * 180) / Math.PI
    };
  };

  const generateRoute = useCallback(async () => {
    if (!currentLocation) {
      toast({
        title: "Location Required",
        description: "Please allow location access to generate a route.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const destination = generateRandomDestination(currentLocation);
      
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Calculate approximate distance and duration
      const distance = Math.sqrt(
        Math.pow(destination.lat - currentLocation.lat, 2) + 
        Math.pow(destination.lng - currentLocation.lng, 2)
      ) * 111; // Rough conversion to km
      
      const estimatedDuration = Math.round(distance * 2.5); // Rough estimate in minutes
      
      const newRouteInfo: RouteInfo = {
        origin: currentLocation,
        destination,
        distance: `${distance.toFixed(1)} km`,
        duration: `${estimatedDuration} minutes`,
        destinationName: `Random Destination (${destination.lat.toFixed(4)}, ${destination.lng.toFixed(4)})`
      };
      
      setRouteInfo(newRouteInfo);
      
      toast({
        title: "New Route Generated!",
        description: "Your adventure route is ready to explore.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate route. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  }, [currentLocation]);

  const handleLocationReceived = (location: Location) => {
    setCurrentLocation(location);
    setPermissionGranted(true);
    toast({
      title: "Location Detected!",
      description: "Ready to generate your exploration route.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Navigation className="h-16 w-16 text-blue-600 animate-pulse" />
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-green-500 rounded-full animate-bounce" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Global Route Explorer
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover new paths around you! Generate instant random driving routes and embark on spontaneous adventures wherever you are in the world.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {!permissionGranted ? (
              <LocationPermission onLocationReceived={handleLocationReceived} />
            ) : (
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-gray-800 flex items-center justify-center gap-2">
                    <MapPin className="h-6 w-6 text-green-500" />
                    Location Confirmed
                  </CardTitle>
                  <p className="text-gray-600">
                    Current Location: {currentLocation?.lat.toFixed(4)}, {currentLocation?.lng.toFixed(4)}
                  </p>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    onClick={generateRoute}
                    disabled={isGenerating}
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                        Generating Route...
                      </>
                    ) : (
                      <>
                        <Route className="h-5 w-5 mr-2" />
                        Generate Random Route
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {routeInfo && <RouteDetails routeInfo={routeInfo} />}
          </div>

          {/* Right Column - Map */}
          <div className="lg:sticky lg:top-8">
            {routeInfo ? (
              <RouteMap routeInfo={routeInfo} />
            ) : (
              <Card className="h-96 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Navigation className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">
                      {!permissionGranted 
                        ? "Allow location access to see your route" 
                        : "Generate a route to see the map"
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/50 backdrop-blur-sm border-t">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Location</h3>
              <p className="text-gray-600">Allow GPS access to determine your current position</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Route className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Generate Route</h3>
              <p className="text-gray-600">Get a random destination within 20km of your location</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Navigation className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Adventure</h3>
              <p className="text-gray-600">Follow the interactive map to your new destination</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
