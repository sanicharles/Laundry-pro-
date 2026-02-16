
import React from 'react';
import { Heart, Send } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-2 rounded-xl text-white">
                <span className="text-2xl font-bold">🧺</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight">LAUNDRY IBU TINI</h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Memberikan kualitas cuci terbaik untuk warga di sekitar kami. Kebersihan pakaian Anda adalah prioritas kami.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-all transform hover:-translate-y-1"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Navigasi</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-green-400 transition-colors">Beranda</a></li>
              <li><a href="#services" className="hover:text-green-400 transition-colors">Layanan & Harga</a></li>
              <li><a href="#calculator" className="hover:text-green-400 transition-colors">Kalkulator Biaya</a></li>
              <li><a href="#ai-assistant" className="hover:text-green-400 transition-colors">Tanya AI Assistant</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Jam Operasional</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex justify-between">
                <span>Senin - Sabtu:</span>
                <span className="text-white">08:00 - 20:00</span>
              </li>
              <li className="flex justify-between">
                <span>Minggu:</span>
                <span className="text-white">09:00 - 17:00</span>
              </li>
              <li className="pt-2 text-green-500 italic text-xs">
                *Tutup pada Hari Libur Nasional
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Berlangganan Promo</h4>
            <p className="text-gray-400 text-sm mb-4">Dapatkan info promo spesial via email.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Alamat email Anda" 
                className="w-full bg-gray-800 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-green-600 outline-none"
              />
              <button className="absolute right-1 top-1 bottom-1 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-10 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
            Dibuat dengan <Heart className="w-4 h-4 text-red-500 fill-red-500" /> oleh Laundry Ibu Tini &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};
