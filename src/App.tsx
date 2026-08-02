/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppWalletProvider, useAppWallet } from './context/AptosWalletContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DashboardPage } from './components/DashboardPage';
import { UploadPage } from './components/UploadPage';
import { PublicResumeModal } from './components/PublicResumeModal';
import { Footer } from './components/Footer';
import { INITIAL_DEMO_RESUMES } from './lib/shelby';
import { ResumeItem, ViewTab } from './types';

function MainAppContent() {
  const { isConnected, connectWallet, setDemoMode } = useAppWallet();
  const [currentTab, setCurrentTab] = useState<ViewTab>('landing');
  const [resumes, setResumes] = useState<ResumeItem[]>(INITIAL_DEMO_RESUMES);
  const [selectedResumeForModal, setSelectedResumeForModal] = useState<ResumeItem | null>(null);

  // Parse URL query parameter for public link sharing (e.g. ?res=res-1)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resId = params.get('res');
    if (resId) {
      const found = resumes.find(r => r.id === resId || r.shelbyBlobId === resId);
      if (found) {
        setSelectedResumeForModal(found);
      }
    }
  }, []);

  // When wallet connects, automatically transition from landing to dashboard
  useEffect(() => {
    if (isConnected && currentTab === 'landing') {
      setCurrentTab('dashboard');
    }
  }, [isConnected]);

  // Handle wallet connect trigger from landing page
  const handleConnectWalletClick = async () => {
    if (isConnected) {
      setCurrentTab('dashboard');
    } else {
      await connectWallet();
      setCurrentTab('dashboard');
    }
  };

  // Handle View Demo trigger from landing page
  const handleViewDemoClick = () => {
    setDemoMode(true);
    setCurrentTab('dashboard');
  };

  // Toggle active public resume
  const handleToggleActive = (id: string) => {
    setResumes(prev =>
      prev.map(r => {
        if (r.id === id) {
          return { ...r, isPublic: !r.isPublic };
        }
        // Keep single public resume or allow multiple
        return r;
      })
    );
  };

  // Handle successful publishing of new resume
  const handlePublishSuccess = (newResume: ResumeItem) => {
    // Set new resume as public, deactivate others if active
    setResumes(prev => [newResume, ...prev]);
    setCurrentTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#001620] text-[#cae7f9] flex flex-col font-sans antialiased selection:bg-[#66C4FF] selection:text-[#00344d]">
      
      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab: ViewTab) => setCurrentTab(tab)}
        onOpenUpload={() => setCurrentTab('upload')}
      />

      {/* Main Body Router */}
      <div className="flex-1 flex flex-col">
        {!isConnected && currentTab === 'landing' && (
          <LandingPage
            onConnectWallet={handleConnectWalletClick}
            onViewDemo={handleViewDemoClick}
          />
        )}

        {(isConnected || currentTab === 'dashboard') && currentTab === 'dashboard' && (
          <DashboardPage
            resumes={resumes}
            onToggleActive={handleToggleActive}
            onOpenUpload={() => setCurrentTab('upload')}
            onViewResume={(r) => setSelectedResumeForModal(r)}
          />
        )}

        {currentTab === 'upload' && (
          <UploadPage
            onPublishSuccess={handlePublishSuccess}
            onCancel={() => setCurrentTab('dashboard')}
          />
        )}
      </div>

      {/* Public Resume Share Modal */}
      {selectedResumeForModal && (
        <PublicResumeModal
          resume={selectedResumeForModal}
          onClose={() => setSelectedResumeForModal(null)}
        />
      )}

      {/* Footer matching STITCH 5 */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppWalletProvider>
      <MainAppContent />
    </AppWalletProvider>
  );
}
