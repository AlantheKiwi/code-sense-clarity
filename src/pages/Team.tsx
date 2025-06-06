
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  UserPlus, 
  Code, 
  Mail, 
  Crown, 
  Shield, 
  Eye,
  MoreHorizontal,
  Settings,
  Share,
  Activity
} from "lucide-react";
import { UserMenu } from "@/components/UserMenu";
import { useNavigate } from "react-router-dom";
import type { TeamMember, DebugSession } from "@/types/collaboration";

const Team = () => {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex@company.com',
      avatar: '',
      role: 'owner',
      joinedAt: '2024-01-15',
      permissions: ['admin', 'analyze', 'invite', 'billing']
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@company.com',
      avatar: '',
      role: 'admin',
      joinedAt: '2024-02-01',
      permissions: ['analyze', 'invite', 'moderate']
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      email: 'mike@company.com',
      avatar: '',
      role: 'member',
      joinedAt: '2024-02-15',
      permissions: ['analyze', 'comment']
    }
  ]);

  const [sharedSessions] = useState<DebugSession[]>([
    {
      id: '1',
      projectId: 'proj-1',
      shareUrl: 'https://codesense.dev/shared/abc123',
      isPublic: false,
      createdBy: '1',
      createdAt: '2024-03-01',
      collaborators: teamMembers.slice(0, 2)
    },
    {
      id: '2',
      projectId: 'proj-2',
      shareUrl: 'https://codesense.dev/shared/def456',
      isPublic: true,
      createdBy: '2',
      createdAt: '2024-03-05',
      collaborators: teamMembers
    }
  ]);

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'member' | 'viewer'>('member');

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'admin': return <Shield className="h-4 w-4 text-blue-500" />;
      case 'member': return <Users className="h-4 w-4 text-green-500" />;
      case 'viewer': return <Eye className="h-4 w-4 text-gray-500" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-yellow-100 text-yellow-800';
      case 'admin': return 'bg-blue-100 text-blue-800';
      case 'member': return 'bg-green-100 text-green-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleInvite = () => {
    console.log('Inviting:', inviteEmail, 'as', inviteRole);
    setInviteEmail('');
    setInviteRole('member');
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
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                <Users className="mr-2 h-4 w-4" />
                Team
              </Button>
              <Button variant="ghost" onClick={() => navigate('/learning')}>
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Team Collaboration
            </h1>
            <p className="text-xl text-gray-600">
              Manage your team and share debug sessions
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    placeholder="colleague@company.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <Select value={inviteRole} onValueChange={(value: any) => setInviteRole(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleInvite} className="w-full">
                  Send Invitation
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Team Members */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Members ({teamMembers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{member.name}</h3>
                            {getRoleIcon(member.role)}
                          </div>
                          <p className="text-sm text-gray-600">{member.email}</p>
                          <p className="text-xs text-gray-500">
                            Joined {new Date(member.joinedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getRoleBadgeColor(member.role)}>
                          {member.role}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Stats & Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Team Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">156</div>
                  <p className="text-sm text-gray-600">Total Analyses</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">89%</div>
                  <p className="text-sm text-gray-600">Issues Resolved</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <p className="text-sm text-gray-600">Active Projects</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  Bulk Invite
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Team Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="mr-2 h-4 w-4" />
                  Activity Log
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Shared Debug Sessions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share className="h-5 w-5" />
              Shared Debug Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sharedSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Project Analysis #{session.id}</h3>
                      <Badge variant={session.isPublic ? "default" : "secondary"}>
                        {session.isPublic ? "Public" : "Private"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{session.shareUrl}</p>
                    <p className="text-xs text-gray-500">
                      Created {new Date(session.createdAt).toLocaleDateString()} • 
                      {session.collaborators.length} collaborators
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {session.collaborators.slice(0, 3).map((collaborator) => (
                        <Avatar key={collaborator.id} className="h-8 w-8 border-2 border-white">
                          <AvatarImage src={collaborator.avatar} />
                          <AvatarFallback className="text-xs">
                            {collaborator.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {session.collaborators.length > 3 && (
                        <div className="h-8 w-8 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center text-xs font-medium">
                          +{session.collaborators.length - 3}
                        </div>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Team;
