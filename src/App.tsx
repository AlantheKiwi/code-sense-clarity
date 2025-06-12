
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminRoute } from "@/components/AdminRoute";
import TopNavigation from "@/components/TopNavigation";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Demo from "./pages/Demo";
import Connect from "./pages/Connect";
import Dashboard from "./pages/Dashboard";
import DashboardOverview from "./pages/DashboardOverview";
import PlatformHealth from "./pages/PlatformHealth";
import Team from "./pages/Team";
import Learning from "./pages/Learning";
import Experts from "./pages/Experts";
import Integrations from "./pages/Integrations";
import APIKeys from "./pages/APIKeys";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";
import UsefulPrompts from "./pages/UsefulPrompts";
import LovablePrompts from "./pages/prompts/LovablePrompts";
import BubblePrompts from "./pages/prompts/BubblePrompts";
import WebflowPrompts from "./pages/prompts/WebflowPrompts";
import FlutterFlowPrompts from "./pages/prompts/FlutterFlowPrompts";
import AdaloPrompts from "./pages/prompts/AdaloPrompts";
import SoftrPrompts from "./pages/prompts/SoftrPrompts";
import BoltPrompts from "./pages/prompts/BoltPrompts";
import AirtablePrompts from "./pages/prompts/AirtablePrompts";
import ZapierPrompts from "./pages/prompts/ZapierPrompts";
import Admin from "./pages/Admin";
import AdminAPIKeys from "./pages/AdminAPIKeys";
import AdminUsers from "./pages/AdminUsers";

const queryClient = new QueryClient();

const App = () => {
  console.log('🚀 App component rendered');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="relative min-h-screen">
              <TopNavigation />
              <div className="pt-16">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/demo" element={<Demo />} />
                  <Route path="/useful-prompts" element={<UsefulPrompts />} />
                  <Route path="/prompts/lovable" element={<LovablePrompts />} />
                  <Route path="/prompts/bubble" element={<BubblePrompts />} />
                  <Route path="/prompts/webflow" element={<WebflowPrompts />} />
                  <Route path="/prompts/flutterflow" element={<FlutterFlowPrompts />} />
                  <Route path="/prompts/adalo" element={<AdaloPrompts />} />
                  <Route path="/prompts/softr" element={<SoftrPrompts />} />
                  <Route path="/prompts/bolt" element={<BoltPrompts />} />
                  <Route path="/prompts/airtable" element={<AirtablePrompts />} />
                  <Route path="/prompts/zapier" element={<ZapierPrompts />} />
                  <Route path="/connect" element={
                    <ProtectedRoute>
                      <Connect />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard-overview" element={
                    <ProtectedRoute>
                      <DashboardOverview />
                    </ProtectedRoute>
                  } />
                  <Route path="/platform-health" element={
                    <ProtectedRoute>
                      <PlatformHealth />
                    </ProtectedRoute>
                  } />
                  <Route path="/team" element={
                    <ProtectedRoute>
                      <Team />
                    </ProtectedRoute>
                  } />
                  <Route path="/learning" element={
                    <ProtectedRoute>
                      <Learning />
                    </ProtectedRoute>
                  } />
                  <Route path="/experts" element={
                    <ProtectedRoute>
                      <Experts />
                    </ProtectedRoute>
                  } />
                  <Route path="/integrations" element={
                    <ProtectedRoute>
                      <Integrations />
                    </ProtectedRoute>
                  } />
                  <Route path="/api-keys" element={
                    <ProtectedRoute>
                      <APIKeys />
                    </ProtectedRoute>
                  } />
                  <Route path="/analysis/:repoName" element={
                    <ProtectedRoute>
                      <Analysis />
                    </ProtectedRoute>
                  } />
                  <Route path="/analyze" element={
                    <ProtectedRoute>
                      <Analysis />
                    </ProtectedRoute>
                  } />
                  {/* Admin Routes */}
                  <Route path="/admin" element={
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>
                  } />
                  <Route path="/admin/api-keys" element={
                    <AdminRoute>
                      <AdminAPIKeys />
                    </AdminRoute>
                  } />
                  <Route path="/admin/users" element={
                    <AdminRoute>
                      <AdminUsers />
                    </AdminRoute>
                  } />
                  <Route path="/how-it-works" element={<Index />} />
                  <Route path="/contact" element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
