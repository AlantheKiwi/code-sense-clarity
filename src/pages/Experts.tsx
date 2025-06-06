
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Code, 
  Star, 
  MessageCircle, 
  Calendar, 
  Clock,
  Search,
  Filter,
  Video,
  Phone,
  CheckCircle,
  Award,
  TrendingUp
} from "lucide-react";
import { UserMenu } from "@/components/UserMenu";
import { useNavigate } from "react-router-dom";
import type { Expert, Consultation } from "@/types/collaboration";

const Experts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);

  const [experts] = useState<Expert[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: '',
      specialty: ['Lovable', 'React', 'TypeScript'],
      rating: 4.9,
      hourlyRate: 120,
      availability: 'available',
      bio: 'Senior developer with 8+ years experience in React and no-code platforms. Specialized in Lovable optimization and performance tuning.',
      totalConsultations: 156
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      avatar: '',
      specialty: ['Bubble', 'Database Design', 'API Integration'],
      rating: 4.8,
      hourlyRate: 100,
      availability: 'busy',
      bio: 'Bubble expert with focus on complex workflow optimization and database architecture. Helped 200+ businesses scale their Bubble apps.',
      totalConsultations: 203
    },
    {
      id: '3',
      name: 'Elena Kowalski',
      avatar: '',
      specialty: ['Webflow', 'Design Systems', 'SEO'],
      rating: 4.9,
      hourlyRate: 90,
      availability: 'available',
      bio: 'Design-focused developer specializing in Webflow implementations and SEO optimization. Former agency owner with 50+ projects delivered.',
      totalConsultations: 89
    },
    {
      id: '4',
      name: 'David Park',
      avatar: '',
      specialty: ['FlutterFlow', 'Mobile Development', 'Firebase'],
      rating: 4.7,
      hourlyRate: 110,
      availability: 'offline',
      bio: 'Mobile development specialist with deep FlutterFlow expertise. Helps teams build scalable mobile applications with best practices.',
      totalConsultations: 67
    }
  ]);

  const [myConsultations] = useState<Consultation[]>([
    {
      id: '1',
      expertId: '1',
      userId: 'current-user',
      projectId: 'proj-1',
      status: 'scheduled',
      scheduledAt: '2024-03-15T14:00:00Z',
      duration: 60,
      price: 120,
      notes: 'Need help optimizing React component performance'
    },
    {
      id: '2',
      expertId: '2',
      userId: 'current-user',
      projectId: 'proj-2',
      status: 'completed',
      scheduledAt: '2024-03-10T16:00:00Z',
      duration: 90,
      price: 150,
      notes: 'Database optimization consultation - very helpful!'
    }
  ]);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.specialty.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpecialty = selectedSpecialty === 'all' || expert.specialty.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  const specialties = ['all', 'Lovable', 'Bubble', 'Webflow', 'FlutterFlow', 'React', 'TypeScript'];

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
              <Button variant="ghost" onClick={() => navigate('/learning')}>
                Learning
              </Button>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                <Users className="mr-2 h-4 w-4" />
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
            Expert Consultations
          </h1>
          <p className="text-xl text-gray-600">
            Get 1-on-1 help from verified no-code experts
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search experts by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by specialty" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty === 'all' ? 'All Specialties' : specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Experts List */}
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              {filteredExperts.map((expert) => (
                <Card key={expert.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={expert.avatar} />
                          <AvatarFallback className="text-lg">
                            {expert.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-xl flex items-center gap-2">
                            {expert.name}
                            <CheckCircle className="h-5 w-5 text-blue-500" />
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{expert.rating}</span>
                            <span className="text-gray-500">({expert.totalConsultations} sessions)</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {expert.specialty.map((spec) => (
                              <Badge key={spec} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getAvailabilityColor(expert.availability)}>
                          {expert.availability}
                        </Badge>
                        <div className="text-lg font-bold mt-2">${expert.hourlyRate}/hr</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{expert.bio}</p>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            onClick={() => setSelectedExpert(expert)}
                            disabled={expert.availability === 'offline'}
                            className="flex-1"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            Book Consultation
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Book Consultation with {expert.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Project Description</label>
                              <Textarea 
                                placeholder="Describe what you need help with..."
                                className="mt-1"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Session Type</label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="video">
                                      <div className="flex items-center">
                                        <Video className="mr-2 h-4 w-4" />
                                        Video Call
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="chat">
                                      <div className="flex items-center">
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        Chat Session
                                      </div>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Duration</label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Duration" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="30">30 minutes</SelectItem>
                                    <SelectItem value="60">1 hour</SelectItem>
                                    <SelectItem value="90">1.5 hours</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <Button className="w-full">
                              Send Booking Request
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* My Consultations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  My Consultations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {myConsultations.map((consultation) => {
                  const expert = experts.find(e => e.id === consultation.expertId);
                  return (
                    <div key={consultation.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{expert?.name}</div>
                        <Badge className={getStatusColor(consultation.status)}>
                          {consultation.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        {consultation.scheduledAt && (
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {new Date(consultation.scheduledAt).toLocaleDateString()}
                          </div>
                        )}
                        <div className="mt-1">{consultation.duration} min • ${consultation.price}</div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Expert Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Platform Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <p className="text-sm text-gray-600">Available Experts</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">4.8</div>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">1,247</div>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">97%</div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </CardContent>
            </Card>

            {/* Become an Expert */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Become an Expert
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Share your expertise and earn money helping other developers
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Set your own rates</li>
                  <li>• Flexible scheduling</li>
                  <li>• Global client base</li>
                  <li>• Expert verification</li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  Apply to be an Expert
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experts;
