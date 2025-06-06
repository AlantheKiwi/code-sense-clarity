
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";
import UsefulPrompts from "./pages/UsefulPrompts";
import LovablePrompts from "./pages/prompts/LovablePrompts";
import BubblePrompts from "./pages/prompts/BubblePrompts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/useful-prompts" element={<UsefulPrompts />} />
            <Route path="/prompts/lovable" element={<LovablePrompts />} />
            <Route path="/prompts/bubble" element={<BubblePrompts />} />
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
            <Route path="/how-it-works" element={<Index />} />
            <Route path="/contact" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
