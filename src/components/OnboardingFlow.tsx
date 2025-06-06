
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Github, 
  Code, 
  Users, 
  BookOpen,
  Zap,
  Play
} from "lucide-react";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  completed: boolean;
  action?: string;
}

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const OnboardingFlow = ({ isOpen, onClose, onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 'welcome',
      title: 'Welcome to CodeSense',
      description: 'Your AI-powered no-code debugging companion',
      icon: Code,
      completed: false
    },
    {
      id: 'connect-github',
      title: 'Connect Your GitHub',
      description: 'Link your GitHub account to analyze repositories',
      icon: Github,
      completed: false,
      action: 'Connect GitHub'
    },
    {
      id: 'first-analysis',
      title: 'Run Your First Analysis',
      description: 'Select a repository and discover potential issues',
      icon: Play,
      completed: false,
      action: 'Analyze Repository'
    },
    {
      id: 'explore-features',
      title: 'Explore Platform Features',
      description: 'Learn about team collaboration and expert consultations',
      icon: Users,
      completed: false,
      action: 'View Features'
    },
    {
      id: 'learn-basics',
      title: 'Complete a Tutorial',
      description: 'Master the basics with our interactive learning center',
      icon: BookOpen,
      completed: false,
      action: 'Start Learning'
    }
  ]);

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepAction = () => {
    // Mark current step as completed
    setSteps(prev => prev.map((step, index) => 
      index === currentStep ? { ...step, completed: true } : step
    ));
    
    // Move to next step
    handleNext();
  };

  const handleSkip = () => {
    onComplete();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Getting Started</DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Skip Tour
            </Button>
          </div>
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Step */}
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <currentStepData.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl">{currentStepData.title}</CardTitle>
              <p className="text-gray-600">{currentStepData.description}</p>
            </CardHeader>
            {currentStepData.action && (
              <CardContent className="text-center">
                <Button 
                  onClick={handleStepAction}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  {currentStepData.action}
                </Button>
              </CardContent>
            )}
          </Card>

          {/* Step Progress */}
          <div className="grid grid-cols-5 gap-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.id}
                  className={`text-center p-2 rounded-lg transition-colors ${
                    index === currentStep ? 'bg-blue-100 border border-blue-300' :
                    step.completed ? 'bg-green-100' :
                    'bg-gray-100'
                  }`}
                >
                  <div className="flex justify-center mb-1">
                    {step.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <Icon className={`h-6 w-6 ${
                        index === currentStep ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                    )}
                  </div>
                  <p className={`text-xs ${
                    index === currentStep ? 'text-blue-900 font-medium' :
                    step.completed ? 'text-green-700' :
                    'text-gray-500'
                  }`}>
                    {step.title.split(' ')[0]}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex space-x-2">
              <Button variant="ghost" onClick={handleSkip}>
                Skip
              </Button>
              <Button onClick={handleNext}>
                {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingFlow;
