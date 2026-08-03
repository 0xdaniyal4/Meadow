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
import { NetworkPage } from './components/NetworkPage';
import { VerificationPage } from './components/VerificationPage';
import { WalletPage } from './components/WalletPage';
import { CertificationsPage } from './components/CertificationsPage';
import { JobsPage } from './components/JobsPage';
import { SettingsPage } from './components/SettingsPage';
import { PublicResumeModal } from './components/PublicResumeModal';
import { Footer } from './components/Footer';
import { getStoredResumes, saveStoredResumes } from './lib/shelby';
import { ResumeItem, ViewTab } from './types';

function MainAppContent() {
  const { isConnected, connectWallet, setDemoMode } = useAppWallet();
  const [currentTab, setCurrentTab] = useState<ViewTab>('landing');
  const [resumes, setResumes] = useState<ResumeItem[]>(() => getStoredResumes());
  const [selectedResumeForModal, setSelectedResumeForModal] = useState<ResumeItem | null>(null);

  // Sync to local storage on resume updates
  useEffect(() => {
    saveStoredResumes(resumes);
  }, [resumes]);

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
  }, [resumes]);

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
        return r;
      })
    );
  };

  // Handle successful publishing of new resume
  const handlePublishSuccess = (newResume: ResumeItem) => {
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

        {currentTab === 'dashboard' && (
          <DashboardPage
            resumes={resumes}
            currentTab={currentTab}
            onNavigate={(tab: ViewTab) => setCurrentTab(tab)}
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

        {currentTab === 'network' && (
          <NetworkPage />
        )}

        {currentTab === 'verification' && (
          <VerificationPage />
        )}

        {currentTab === 'wallet' && (
          <WalletPage />
        )}

        {currentTab === 'certifications' && (
          <CertificationsPage />
        )}

        {currentTab === 'jobs' && (
          <JobsPage
            resumes={resumes}
            onOpenUpload={() => setCurrentTab('upload')}
          />
        )}

        {currentTab === 'settings' && (
          <SettingsPage />
        )}
      </div>

      {/* Public Resume Share Modal */}
      {selectedResumeForModal && (
        <PublicResumeModal
          resume={selectedResumeForModal}
          onClose={() => setSelectedResumeForModal(null)}
        />
      )}

      {/* Footer */}
      <Footer onNavigate={(tab: ViewTab) => setCurrentTab(tab)} />
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
