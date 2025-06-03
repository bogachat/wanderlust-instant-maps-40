
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Shield, CheckCircle, Terminal, Zap } from "lucide-react";
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
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const sendVerificationCode = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      toast({
        title: "INVALID PHONE MATRIX",
        description: "Enter a valid communication frequency.",
        variant: "destructive"
      });
      return;
    }

    setIsSendingCode(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsCodeSent(true);
      toast({
        title: "VERIFICATION CODE TRANSMITTED",
        description: `Cipher sent to communication node: ${phoneNumber}`,
      });
    } catch (error) {
      toast({
        title: "TRANSMISSION ERROR",
        description: "Failed to send verification cipher. Retry transmission.",
        variant: "destructive"
      });
    } finally {
      setIsSendingCode(false);
    }
  };

  const verifyCode = async () => {
    if (verificationCode.length !== 6) {
      toast({
        title: "INVALID CIPHER LENGTH",
        description: "Enter the 6-digit verification cipher.",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (verificationCode.length === 6) {
        toast({
          title: "COMMUNICATION NODE VERIFIED!",
          description: "Access granted. Proceeding to location matrix initialization.",
        });
        onVerificationComplete();
      } else {
        throw new Error("Invalid cipher");
      }
    } catch (error) {
      toast({
        title: "VERIFICATION FAILED",
        description: "Invalid cipher sequence. Re-enter authentication code.",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="hologram hacker-border bg-card/90 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative hacker-glow rounded-full p-3">
            <Terminal className="h-12 w-12 text-neon-green" />
            {isCodeSent && (
              <div className="absolute -top-2 -right-2 h-6 w-6 bg-neon-green rounded-full flex items-center justify-center animate-pulse-neon">
                <CheckCircle className="h-4 w-4 text-black" />
              </div>
            )}
          </div>
        </div>
        <CardTitle className="text-2xl text-neon-green font-orbitron">
          COMMUNICATION VERIFICATION REQUIRED
        </CardTitle>
        <p className="text-neon-blue font-fira">
          {!isCodeSent 
            ? ">> ESTABLISH SECURE COMMUNICATION CHANNEL TO ACCESS ROUTE MATRIX <<"
            : ">> ENTER 6-DIGIT AUTHENTICATION CIPHER TRANSMITTED TO YOUR DEVICE <<"
          }
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isCodeSent ? (
          <>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-orbitron font-medium text-neon-green">
                COMMUNICATION FREQUENCY
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-center text-lg hacker-border bg-black/50 text-neon-green font-fira placeholder-neon-green/50"
              />
            </div>
            
            <Button 
              onClick={sendVerificationCode}
              disabled={isSendingCode || !phoneNumber}
              size="lg"
              className="w-full cyber-button font-orbitron font-bold tracking-wider"
            >
              {isSendingCode ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-neon-green border-t-transparent mr-2" />
                  TRANSMITTING CIPHER...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 mr-2" />
                  SEND VERIFICATION CIPHER
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <label htmlFor="code" className="text-sm font-orbitron font-medium text-neon-green">
                AUTHENTICATION CIPHER
              </label>
              <Input
                id="code"
                type="text"
                placeholder="000000"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="text-center text-lg tracking-widest hacker-border bg-black/50 text-neon-green font-fira placeholder-neon-green/50"
                maxLength={6}
              />
            </div>
            
            <Button 
              onClick={verifyCode}
              disabled={isVerifying || verificationCode.length !== 6}
              size="lg"
              className="w-full cyber-button font-orbitron font-bold tracking-wider"
            >
              {isVerifying ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-neon-green border-t-transparent mr-2" />
                  VERIFYING CIPHER...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  AUTHENTICATE CIPHER
                </>
              )}
            </Button>
            
            <Button 
              onClick={() => {
                setIsCodeSent(false);
                setVerificationCode('');
              }}
              variant="outline"
              className="w-full hacker-border bg-transparent text-neon-blue hover:bg-neon-blue/10 font-orbitron"
            >
              CHANGE COMMUNICATION NODE
            </Button>
          </>
        )}
        
        <div className="text-xs text-neon-blue/70 text-center font-fira">
          <p>>> COMMUNICATION FREQUENCY USED FOR VERIFICATION ONLY - NOT STORED IN SYSTEM DATABASE &lt;&lt;</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhoneVerification;
