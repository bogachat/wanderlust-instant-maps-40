import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Clock, Route, Shield, Terminal, Zap } from "lucide-react";
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
    const earthRadius = 6371;
    const maxDistance = 20;
    
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
        title: "GPS MATRIX ACCESS DENIED",
        description: "Initialize location protocol to access route generation.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const destination = generateRandomDestination(currentLocation);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const distance = Math.sqrt(
        Math.pow(destination.lat - currentLocation.lat, 2) + 
        Math.pow(destination.lng - currentLocation.lng, 2)
      ) * 111;
      
      const estimatedDuration = Math.round(distance * 2.5);
      
      const newRouteInfo: RouteInfo = {
        origin: currentLocation,
        destination,
        distance: `${distance.toFixed(1)} km`,
        duration: `${estimatedDuration} min`,
        destinationName: `TARGET_NODE_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`
      };
      
      setRouteInfo(newRouteInfo);
      
      toast({
        title: "ROUTE MATRIX GENERATED",
        description: "Cyber pathway successfully compiled. Initialize navigation protocol.",
      });
    } catch (error) {
      toast({
        title: "SYSTEM ERROR",
        description: "Route generation protocol failed. Attempting reconnection...",
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
      title: "GPS MATRIX SYNCHRONIZED",
      description: "Location coordinates acquired. System ready for route generation.",
    });
  };

  return (
    <div className="min-h-screen relative">
      {/* Matrix Rain Background */}
      <div className="matrix-rain"></div>
      
      {/* Scan Lines Effect */}
      <div className="scan-lines"></div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-green/5 via-neon-blue/5 to-neon-purple/5" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative hacker-glow rounded-full p-4">
                <Terminal className="h-16 w-16 text-neon-green animate-pulse" />
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-neon-red rounded-full animate-ping" />
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-neon-red rounded-full" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-orbitron font-black matrix-text mb-6 glitch-text" data-text="CYBER ROUTE MATRIX">
              CYBER ROUTE MATRIX
            </h1>
            <p className="text-xl text-neon-blue max-w-3xl mx-auto mb-8 font-fira">
              >> ACCESSING GLOBAL NAVIGATION GRID... <span className="terminal-cursor"></span><br/>
              >> NEURAL PATHWAY GENERATOR ONLINE<br/>
              >> INFILTRATE. EXPLORE. NAVIGATE.
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
              <Card className="hologram hacker-border bg-card/90 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-neon-green font-orbitron flex items-center justify-center gap-2">
                    <Shield className="h-6 w-6 text-neon-green animate-pulse-neon" />
                    GPS MATRIX SYNCHRONIZED
                  </CardTitle>
                  <p className="text-neon-blue font-fira">
                    COORDINATES: [{currentLocation?.lat.toFixed(6)}, {currentLocation?.lng.toFixed(6)}]
                  </p>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    onClick={generateRoute}
                    disabled={isGenerating}
                    size="lg"
                    className="w-full cyber-button font-orbitron font-bold tracking-wider"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-neon-green border-t-transparent mr-2" />
                        COMPILING NEURAL PATHWAY...
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5 mr-2" />
                        GENERATE CYBER ROUTE
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
              <Card className="h-96 hologram hacker-border bg-card/90 backdrop-blur-sm">
                <CardContent className="h-full flex items-center justify-center">
                  <div className="text-center text-neon-green">
                    <Navigation className="h-16 w-16 mx-auto mb-4 opacity-50 animate-pulse" />
                    <p className="text-lg font-orbitron">
                      {!permissionGranted 
                        ? ">> AWAITING GPS MATRIX ACCESS <<" 
                        : ">> INITIALIZE ROUTE GENERATION <<"
                      }
                    </p>
                    <div className="mt-2 text-sm text-neon-blue font-fira">
                      SYSTEM STATUS: STANDBY<span className="terminal-cursor"></span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-black/30 backdrop-blur-sm border-t border-neon-green/30">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-orbitron font-bold text-center text-neon-green mb-12 glitch-text" data-text="SYSTEM PROTOCOLS">
            SYSTEM PROTOCOLS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center hacker-border p-6 hologram">
              <div className="bg-neon-green/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 hacker-glow">
                <MapPin className="h-8 w-8 text-neon-green" />
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-2 text-neon-green">GPS INFILTRATION</h3>
              <p className="text-neon-blue font-fira">Access satellite network to triangulate current coordinates</p>
            </div>
            <div className="text-center hacker-border p-6 hologram">
              <div className="bg-neon-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 hacker-glow">
                <Route className="h-8 w-8 text-neon-blue" />
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-2 text-neon-blue">NEURAL PATHFINDING</h3>
              <p className="text-neon-blue font-fira">Generate quantum routes within 20km operational radius</p>
            </div>
            <div className="text-center hacker-border p-6 hologram">
              <div className="bg-neon-red/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 hacker-glow">
                <Navigation className="h-8 w-8 text-neon-red" />
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-2 text-neon-red">EXECUTE MISSION</h3>
              <p className="text-neon-blue font-fira">Deploy interactive navigation protocols to target destination</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
