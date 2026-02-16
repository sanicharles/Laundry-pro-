
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Calculator } from './components/Calculator';
import { StainScanner } from './components/StainScanner';
import { ChatAssistant } from './components/ChatAssistant';
import { FeedbackSystem } from './components/FeedbackSystem';
import { Footer } from './components/Footer';
import { SupabaseSetup } from './components/SupabaseSetup';
import { getWhatsAppUrl } from './constants';
import { isSupabaseConfigured } from './services/supabaseClient';
import { MessageCircle, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [showConfig, setShowConfig] = useState(!isSupabaseConfigured());

  return (
    <div className="min-h-screen selection:bg-orange-100 selection:text-orange-900">
      {showConfig && <SupabaseSetup onClose={() => setShowConfig(false)} />}
      
      <Header />
      
      <main className="relative">
        <Hero />
        
        {/* Statistics Bar */}
        <div className="bg-white py-12 border-y border-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4">
              {[
                { label: 'Pelanggan Setia', value: '500+', color: 'blue' },
                { label: 'Kg Terproses', value: '10k+', color: 'green' },
                { label: 'Estimasi Jadi', value: '24h', color: 'orange' },
                { label: 'Google Rating', value: '4.9/5', color: 'blue' },
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <p className={`text-2xl sm:text-4xl font-black ${
                    stat.color === 'orange' ? 'text-orange-600' : 
                    stat.color === 'blue' ? 'text-blue-600' : 
                    'text-green-600'
                  } transition-colors duration-300`}>
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-0 lg:space-y-10">
          <Services />
          <div className="bg-gray-50/50">
            <StainScanner />
          </div>
          <Calculator />
          <FeedbackSystem />
          <div className="bg-blue-50/10">
            <ChatAssistant />
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Admin Quick Settings */}
      <button 
        onClick={() => setShowConfig(true)}
        className="fixed bottom-24 right-6 z-50 p-4 bg-white/80 backdrop-blur-md text-gray-400 rounded-2xl shadow-xl hover:text-blue-600 transition-all border border-gray-100 active:scale-90"
        title="Admin Database"
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Smart Mobile CTA - High Visibility Orange */}
      <a 
        href={getWhatsAppUrl('Halo Laundry Ibu Tini, saya mau konsultasi.')}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[90] flex items-center gap-3 bg-gradient-to-br from-orange-500 to-amber-600 text-white px-5 py-4 rounded-3xl shadow-2xl shadow-orange-200 hover:shadow-orange-300 transition-all hover:scale-105 active:scale-95 group border-4 border-white sm:border-0"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white/20" />
          <span className="absolute -top-2 -right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-300 border-2 border-orange-600"></span>
          </span>
        </div>
        <span className="font-black text-sm tracking-tight sm:block">Chat WA</span>
      </a>
    </div>
  );
};

export default App;