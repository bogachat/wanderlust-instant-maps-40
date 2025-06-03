
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Shield, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PhoneVerificationProps {
  onVerificationComplete: () => void;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({ onVerificationComplete }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  const validatePhoneNumber = (phone: string) => {
    // Basic phone number validation (international format)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const sendVerificationCode = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive"
      });
      return;
    }

    setIsSendingCode(true);
    
    try {
      // Simulate API call to send verification code
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsCodeSent(true);
      toast({
        title: "Verification Code Sent",
        description: `Code sent to ${phoneNumber}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSendingCode(false);
    }
  };

  const verifyCode = async () => {
    if (verificationCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the 6-digit verification code.",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    
    try {
      // Simulate API call to verify code
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any 6-digit code
      if (verificationCode.length === 6) {
        toast({
          title: "Phone Verified Successfully!",
          description: "You can now proceed to location access.",
        });
        onVerificationComplete();
      } else {
        throw new Error("Invalid code");
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Invalid verification code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Phone className="h-12 w-12 text-blue-600" />
            {isCodeSent && (
              <div className="absolute -top-2 -right-2 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        </div>
        <CardTitle className="text-2xl text-gray-800">
          Phone Verification Required
        </CardTitle>
        <p className="text-gray-600">
          {!isCodeSent 
            ? "Please verify your phone number to access route generation features."
            : "Enter the 6-digit verification code sent to your phone."
          }
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isCodeSent ? (
          <>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-center text-lg"
              />
            </div>
            
            <Button 
              onClick={sendVerificationCode}
              disabled={isSendingCode || !phoneNumber}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {isSendingCode ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                  Sending Code...
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5 mr-2" />
                  Send Verification Code
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <label htmlFor="code" className="text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <Input
                id="code"
                type="text"
                placeholder="000000"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="text-center text-lg tracking-widest"
                maxLength={6}
              />
            </div>
            
            <Button 
              onClick={verifyCode}
              disabled={isVerifying || verificationCode.length !== 6}
              size="lg"
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {isVerifying ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Verify Code
                </>
              )}
            </Button>
            
            <Button 
              onClick={() => {
                setIsCodeSent(false);
                setVerificationCode('');
              }}
              variant="outline"
              className="w-full"
            >
              Change Phone Number
            </Button>
          </>
        )}
        
        <div className="text-xs text-gray-500 text-center">
          <p>Your phone number is used for verification purposes only and is not stored or shared.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhoneVerification;
