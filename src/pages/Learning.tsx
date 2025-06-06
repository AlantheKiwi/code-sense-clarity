
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Code, 
  Play, 
  CheckCircle, 
  Clock, 
  Trophy,
  Target,
  Users,
  PlayCircle,
  FileText,
  Award,
  TrendingUp
} from "lucide-react";
import { UserMenu } from "@/components/UserMenu";
import { useNavigate } from "react-router-dom";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  platform: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  completed: boolean;
  progress: number;
  category: string;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  totalCourses: number;
  completedCourses: number;
  estimatedTime: string;
  level: string;
}

const Learning = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tutorials');

  const [tutorials] = useState<Tutorial[]>([
    {
      id: '1',
      title: 'Fixing Common Lovable Component Issues',
      description: 'Learn to identify and fix overly complex AI-generated components',
      platform: 'Lovable',
      difficulty: 'beginner',
      duration: '15 min',
      completed: true,
      progress: 100,
      category: 'Component Optimization'
    },
    {
      id: '2',
      title: 'Optimizing Bubble Database Queries',
      description: 'Master efficient database design and query optimization in Bubble',
      platform: 'Bubble',
      difficulty: 'intermediate',
      duration: '25 min',
      completed: false,
      progress: 60,
      category: 'Performance'
    },
    {
      id: '3',
      title: 'Webflow SEO Best Practices',
      description: 'Implement proper SEO techniques in your Webflow projects',
      platform: 'Webflow',
      difficulty: 'beginner',
      duration: '20 min',
      completed: false,
      progress: 0,
      category: 'SEO & Accessibility'
    },
    {
      id: '4',
      title: 'Advanced TypeScript Patterns',
      description: 'Learn advanced TypeScript patterns for better code quality',
      platform: 'Universal',
      difficulty: 'advanced',
      duration: '45 min',
      completed: false,
      progress: 25,
      category: 'Code Quality'
    }
  ]);

  const [learningPaths] = useState<LearningPath[]>([
    {
      id: '1',
      title: 'No-Code Debugging Mastery',
      description: 'Complete guide to debugging across all major no-code platforms',
      totalCourses: 12,
      completedCourses: 4,
      estimatedTime: '6 hours',
      level: 'Beginner to Advanced'
    },
    {
      id: '2',
      title: 'Performance Optimization Expert',
      description: 'Advanced techniques for optimizing no-code application performance',
      totalCourses: 8,
      completedCourses: 1,
      estimatedTime: '4 hours',
      level: 'Intermediate'
    },
    {
      id: '3',
      title: 'Team Collaboration & Code Review',
      description: 'Best practices for collaborative no-code development',
      totalCourses: 6,
      completedCourses: 0,
      estimatedTime: '3 hours',
      level: 'Beginner'
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Lovable': return 'bg-blue-100 text-blue-800';
      case 'Bubble': return 'bg-purple-100 text-purple-800';
      case 'Webflow': return 'bg-green-100 text-green-800';
      case 'Universal': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CodeSense
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
              <Button variant="ghost" onClick={() => navigate('/team')}>
                Team
              </Button>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                <BookOpen className="mr-2 h-4 w-4" />
                Learning
              </Button>
              <Button variant="ghost" onClick={() => navigate('/experts')}>
                Experts
              </Button>
              <Button variant="ghost" onClick={() => navigate('/integrations')}>
                Integrations
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <UserMenu />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Learning Center
          </h1>
          <p className="text-xl text-gray-600">
            Master no-code debugging with interactive tutorials and learning paths
          </p>
        </div>

        {/* Learning Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-sm text-gray-600">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold">24h</div>
                  <p className="text-sm text-gray-600">Time Spent</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-purple-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-sm text-gray-600">Certificates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="playbooks">Issue Playbooks</TabsTrigger>
            <TabsTrigger value="quizzes">Knowledge Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="tutorials" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {tutorials.map((tutorial) => (
                <Card key={tutorial.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                        <p className="text-sm text-gray-600">{tutorial.description}</p>
                      </div>
                      {tutorial.completed && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getPlatformColor(tutorial.platform)}>
                        {tutorial.platform}
                      </Badge>
                      <Badge className={getDifficultyColor(tutorial.difficulty)}>
                        {tutorial.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        <Clock className="mr-1 h-3 w-3" />
                        {tutorial.duration}
                      </Badge>
                    </div>
                    
                    {tutorial.progress > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{tutorial.progress}%</span>
                        </div>
                        <Progress value={tutorial.progress} />
                      </div>
                    )}

                    <Button 
                      className="w-full" 
                      variant={tutorial.completed ? "outline" : "default"}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {tutorial.completed ? 'Review' : tutorial.progress > 0 ? 'Continue' : 'Start'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="paths" className="space-y-6">
            <div className="space-y-6">
              {learningPaths.map((path) => (
                <Card key={path.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{path.title}</CardTitle>
                        <p className="text-gray-600">{path.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <BookOpen className="mr-1 h-4 w-4" />
                            {path.totalCourses} courses
                          </span>
                          <span className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {path.estimatedTime}
                          </span>
                          <Badge variant="outline">{path.level}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {Math.round((path.completedCourses / path.totalCourses) * 100)}%
                        </div>
                        <p className="text-sm text-gray-500">Complete</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress: {path.completedCourses} of {path.totalCourses} completed</span>
                      </div>
                      <Progress value={(path.completedCourses / path.totalCourses) * 100} />
                    </div>
                    <Button className="w-full">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      {path.completedCourses > 0 ? 'Continue Path' : 'Start Learning Path'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="playbooks" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Component Splitting Strategy',
                  description: 'Step-by-step guide to breaking down large components',
                  category: 'Refactoring',
                  steps: 8
                },
                {
                  title: 'Database Query Optimization',
                  description: 'Systematic approach to optimizing database performance',
                  category: 'Performance',
                  steps: 12
                },
                {
                  title: 'API Security Hardening',
                  description: 'Comprehensive checklist for securing API endpoints',
                  category: 'Security',
                  steps: 15
                },
                {
                  title: 'Accessibility Audit Process',
                  description: 'Complete workflow for accessibility compliance',
                  category: 'Accessibility',
                  steps: 10
                }
              ].map((playbook, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{playbook.title}</CardTitle>
                    <p className="text-sm text-gray-600">{playbook.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{playbook.category}</Badge>
                      <span className="text-sm text-gray-500">{playbook.steps} steps</span>
                    </div>
                    <Button className="w-full" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      View Playbook
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Lovable Best Practices Quiz',
                  description: 'Test your knowledge of Lovable development patterns',
                  questions: 15,
                  timeLimit: '10 min',
                  difficulty: 'Intermediate',
                  completed: true,
                  score: 85
                },
                {
                  title: 'Bubble Performance Optimization',
                  description: 'Assess your understanding of Bubble performance concepts',
                  questions: 20,
                  timeLimit: '15 min',
                  difficulty: 'Advanced',
                  completed: false,
                  score: null
                },
                {
                  title: 'Security Fundamentals',
                  description: 'Evaluate your knowledge of security best practices',
                  questions: 12,
                  timeLimit: '8 min',
                  difficulty: 'Beginner',
                  completed: true,
                  score: 92
                }
              ].map((quiz, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    <p className="text-sm text-gray-600">{quiz.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{quiz.questions} questions</Badge>
                      <Badge variant="outline">
                        <Clock className="mr-1 h-3 w-3" />
                        {quiz.timeLimit}
                      </Badge>
                      <Badge className={getDifficultyColor(quiz.difficulty.toLowerCase())}>
                        {quiz.difficulty}
                      </Badge>
                    </div>
                    
                    {quiz.completed && quiz.score && (
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium text-green-800">
                          Completed
                        </span>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                          <span className="font-bold text-green-600">{quiz.score}%</span>
                        </div>
                      </div>
                    )}

                    <Button 
                      className="w-full" 
                      variant={quiz.completed ? "outline" : "default"}
                    >
                      <Target className="mr-2 h-4 w-4" />
                      {quiz.completed ? 'Retake Quiz' : 'Start Quiz'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Learning;
