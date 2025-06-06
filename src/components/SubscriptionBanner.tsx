
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, Crown, Zap, Users, Shield, X } from "lucide-react";

interface SubscriptionBannerProps {
  currentTier: 'Free' | 'Pro' | 'Enterprise';
  showUpgrade?: boolean;
}

const SubscriptionBanner = ({ currentTier, showUpgrade = true }: SubscriptionBannerProps) => {
  const [showPricing, setShowPricing] = useState(false);

  const tiers = [
    {
      name: 'Free',
      price: 0,
      icon: Shield,
      features: [
        '5 projects',
        '10 analyses per month',
        'Basic issue detection',
        'Community support'
      ],
      limits: {
        projects: 5,
        teamMembers: 1,
        analysesPerMonth: 10,
        storageGB: 1
      }
    },
    {
      name: 'Pro',
      price: 29,
      icon: Zap,
      popular: true,
      features: [
        'Unlimited projects',
        '500 analyses per month',
        'Advanced platform detection',
        'Team collaboration',
        'Expert consultations',
        'Priority support',
        'API access'
      ],
      limits: {
        projects: -1,
        teamMembers: 10,
        analysesPerMonth: 500,
        storageGB: 50
      }
    },
    {
      name: 'Enterprise',
      price: 99,
      icon: Crown,
      features: [
        'Everything in Pro',
        'Unlimited analyses',
        'White-label branding',
        'SAML/SSO',
        'Custom integrations',
        'Dedicated support',
        'Audit logging',
        'Custom rules'
      ],
      limits: {
        projects: -1,
        teamMembers: -1,
        analysesPerMonth: -1,
        storageGB: 500
      }
    }
  ];

  const currentTierData = tiers.find(tier => tier.name === currentTier);

  if (!showUpgrade || currentTier === 'Enterprise') {
    return null;
  }

  return (
    <>
      {currentTier === 'Free' && (
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900">You're on the Free plan</h3>
                  <p className="text-sm text-blue-700">
                    Upgrade to Pro for unlimited projects and advanced features
                  </p>
                </div>
              </div>
              <Dialog open={showPricing} onOpenChange={setShowPricing}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Upgrade Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Choose Your Plan</DialogTitle>
                  </DialogHeader>
                  <div className="grid md:grid-cols-3 gap-6">
                    {tiers.map((tier) => {
                      const Icon = tier.icon;
                      return (
                        <Card 
                          key={tier.name} 
                          className={`relative ${tier.popular ? 'border-blue-500 shadow-lg' : ''}`}
                        >
                          {tier.popular && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                              <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                            </div>
                          )}
                          <CardHeader className="text-center">
                            <div className="flex justify-center mb-4">
                              <Icon className={`h-12 w-12 ${
                                tier.name === 'Free' ? 'text-gray-600' :
                                tier.name === 'Pro' ? 'text-blue-600' : 'text-purple-600'
                              }`} />
                            </div>
                            <CardTitle className="text-2xl">{tier.name}</CardTitle>
                            <div className="text-3xl font-bold">
                              ${tier.price}
                              <span className="text-lg font-normal text-gray-600">/month</span>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <ul className="space-y-2">
                              {tier.features.map((feature, index) => (
                                <li key={index} className="flex items-center text-sm">
                                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <Button 
                              className="w-full" 
                              variant={currentTier === tier.name ? "outline" : "default"}
                              disabled={currentTier === tier.name}
                            >
                              {currentTier === tier.name ? 'Current Plan' : 'Choose Plan'}
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SubscriptionBanner;
