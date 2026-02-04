import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import FloatingActions from '../books/FloatingActions';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Sidebar />
      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
      <FloatingActions />
    </div>
  );
};

export default MainLayout;
