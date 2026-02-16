
import React from 'react';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../constants';

export const Hero: React.FC = () => {
  const waOrderUrl = getWhatsAppUrl('Halo Laundry Ibu Tini, saya mau pesan antar-jemput laundry.');

  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-24 lg:pb-32">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-50 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-green-50 rounded-full blur-3xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-3/5 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-bold border border-blue-100 mx-auto lg:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Layanan Antar Jemput Tersedia
            </div>
            
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Pakaian Bersih <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-green-600">Sempurna</span> Tanpa Ribet
            </h2>
            
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Nikmati waktu luang Anda. Biarkan Laundry Ibu Tini menangani semua urusan cuci dengan standar bintang lima dan kesegaran tahan lama.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a 
                href={waOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-br from-orange-500 to-amber-600 text-white font-black rounded-2xl hover:shadow-3xl hover:shadow-orange-300 transition-all group active:scale-95 shadow-2xl shadow-orange-200/50 hover:scale-[1.03] hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5" />
                Pesan Laundry Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#services" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-5 bg-white text-blue-700 font-bold rounded-2xl border-2 border-blue-100 hover:border-blue-600 hover:text-blue-800 transition-all active:scale-95 shadow-sm">
                Lihat Layanan
              </a>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 pt-8">
              {['Pasti Wangi', 'Anti Luntur', 'Terpercaya'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-gray-500 text-sm font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-2/5 relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=800" 
                alt="Professional Laundry Service" 
                className="w-full h-full object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white">
                <p className="font-bold text-sm">Rating Pelanggan</p>
                <div className="flex gap-1 text-orange-400 mt-1">
                  {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
