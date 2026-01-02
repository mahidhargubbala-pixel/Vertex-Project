
import React, { useState } from 'react';
import { AppView } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import CareerDiscovery from './components/CareerDiscovery';
import Roadmap from './components/Roadmap';
import LearningLibrary from './components/LearningLibrary';
import ResumeAI from './components/ResumeAI';
import CommunicationLab from './components/CommunicationLab';
import MockInterview from './components/MockInterview';
import AIChatbot from './components/AIChatbot';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard onStartInterview={() => setCurrentView(AppView.MOCK_INTERVIEW)} />;
      case AppView.PROFILE:
        return <Profile />;
      case AppView.DISCOVERY:
        return <CareerDiscovery onGenerateRoadmap={() => setCurrentView(AppView.ROADMAPS)} />;
      case AppView.ROADMAPS:
        return <Roadmap />;
      case AppView.RESOURCES:
        return <LearningLibrary />;
      case AppView.RESUME_AI:
        return <ResumeAI />;
      case AppView.COMM_LAB:
        return <CommunicationLab />;
      case AppView.MOCK_INTERVIEW:
        return <MockInterview />;
      default:
        return <Dashboard onStartInterview={() => setCurrentView(AppView.MOCK_INTERVIEW)} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>

      <AIChatbot />
    </div>
  );
};

export default App;
