import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import AudioConverter from './pages/AudioConverter';

export default function App() {
  // State navigasi: 'dashboard' (halaman utama saat masuk) atau 'convert'
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="h-screen w-screen bg-[#07070a] text-neutral-100 flex flex-col justify-between selection:bg-red-600 selection:text-white font-sans overflow-hidden relative">
      
      {/* Ambient Lighting Accents */}
      <div className="absolute -top-32 left-1/4 w-80 h-80 bg-red-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-32 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Modular Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Dynamic View Router */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'dashboard' ? (
          <Dashboard setActiveTab={setActiveTab} />
        ) : (
          <AudioConverter />
        )}
      </main>

      {/* Modular Footer */}
      <Footer />

    </div>
  );
}