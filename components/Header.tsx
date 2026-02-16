
import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Camera, Share2, MessageSquare, Info, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../constants';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleShare = async () => {
    const shareData = {
      title: 'Laundry Ibu Tini',
      text: 'Layanan laundry profesional, bersih, wangi, dan rapi! Cek harga dan pesan antar-jemput di sini.',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link aplikasi telah disalin ke clipboard!');
      }
    } catch (err) {
      console.log('Sharing failed', err);
    }
  };

  const navLinks = [
    { name: 'Layanan', href: '#services', icon: <Info className="w-5 h-5" />, color: 'blue' },
    { name: 'Scan Noda', href: '#stain-scanner', highlight: true, icon: <Camera className="w-5 h-5" />, color: 'orange' },
    { name: 'Tanya Tini', href: '#ai-assistant', icon: <MessageSquare className="w-5 h-5" />, color: 'green' },
  ];

  const waOrderUrl = getWhatsAppUrl('Halo Laundry Ibu Tini, saya ingin pesan layanan laundry.');

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-gray-200/20 py-2' : 'bg-transparent py-4 sm:py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="bg-green-600 p-2 sm:p-2.5 rounded-xl text-white shadow-lg shadow-green-200 transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl font-black text-gray-900 leading-none tracking-tight">LAUNDRY IBU TINI</h1>
              <p className="text-[10px] sm:text-[11px] text-blue-600 font-extrabold uppercase tracking-[0.2em] mt-0.5 sm:mt-1">Laundry Pro</p>
            </div>
          </div>

          {/* Desktop Navigation - Icon Only */}
          <nav className="hidden lg:flex space-x-2 items-center bg-gray-50/50 p-1 rounded-2xl border border-gray-100/50">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                title={link.name}
                className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                  link.highlight 
                  ? 'text-orange-700 bg-orange-50 hover:bg-orange-100 shadow-sm' 
                  : link.color === 'blue' 
                    ? 'text-blue-600 hover:text-blue-700 hover:bg-blue-50/50'
                    : 'text-gray-600 hover:text-green-600 hover:bg-white'
                }`}
              >
                {link.icon}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={handleShare}
              className="hidden sm:flex p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90"
              title="Bagikan Aplikasi"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <a 
              href={waOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex bg-gradient-to-br from-orange-500 to-amber-600 text-white px-8 py-3.5 rounded-2xl font-black text-sm hover:shadow-2xl hover:shadow-orange-300 transition-all hover:scale-105 hover:-translate-y-0.5 active:scale-95 items-center gap-2 shadow-xl shadow-orange-200/50"
            >
              <MessageSquare className="w-4 h-4" />
              Order Sekarang
            </a>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button 
                onClick={() => setIsOpen(true)} 
                className="p-2.5 text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all active:scale-90"
                aria-label="Buka Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[150] bg-gray-900/40 backdrop-blur-sm lg:hidden transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div 
          className={`absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out-expo ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 sm:p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <div className="bg-green-600 p-2 rounded-xl text-white">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl tracking-tight text-gray-900 leading-none">LAUNDRY IBU TINI</span>
                  <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-0.5">Mobile Menu</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2.5 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-500 rounded-xl transition-all active:scale-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-2">Menu Navigasi</p>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    title={link.name}
                    className={`flex flex-col items-center justify-center p-6 rounded-3xl transition-all duration-300 ${
                      link.highlight 
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-100' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {link.icon}
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="h-px bg-gray-100 my-4 mx-2"></div>
              
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-2">Layanan Cepat</p>

              <a 
                href={waOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-100/50 transition-all hover:scale-[1.02] active:scale-95"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="font-black text-lg">Pesan via WA</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">→</div>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
