
import React, { useState, useEffect } from 'react';
import { db } from '../services/databaseService';
import { Service } from '../types';
import { Tag, List, LayoutGrid, Info, Loader2, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../constants';

export const Services: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await db.getServices();
      setServices(data);
      setLoading(false);
    };
    loadData();
  }, []);

  // Explicitly cast to string[] to prevent unknown type inference in map
  const categories = Array.from(new Set(services.map(s => s.category))) as string[];

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'Kiloan': return 'green';
      case 'Satuan': return 'blue';
      case 'Rumah Tangga': return 'indigo';
      case 'Spesial': return 'orange';
      default: return 'gray';
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-blue-600">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-bold">Menghubungkan ke Database Cloud...</p>
      </div>
    );
  }

  return (
    <section id="services" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100">
              <Tag className="w-3 h-3" />
              Price List 2024 (Live)
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Layanan & <span className="text-gradient-blue">Daftar Harga</span>
            </h2>
            <p className="text-lg text-gray-600">
              Pilih layanan laundry terbaik dengan harga kompetitif dan hasil maksimal.
            </p>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-2xl self-start">
            <button 
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === 'grid' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <LayoutGrid className="w-4 h-4" />
              Grid View
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === 'table' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <List className="w-4 h-4" />
              Table View
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Explicitly type service as Service to avoid unknown type issues */}
            {services.filter(s => ['Kiloan', 'Satuan', 'Spesial'].includes(s.category)).slice(0, 6).map((service: Service) => {
              const color = getCategoryColor(service.category);
              return (
                <div 
                  key={service.id} 
                  className={`group relative bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:border-${color}-200 hover:shadow-2xl hover:shadow-${color}-100 transition-all duration-500 overflow-hidden animate-fade-in flex flex-col h-full`}
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5">
                    <span className="text-8xl font-black">{service.icon}</span>
                  </div>
                  
                  <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 block">
                    {service.icon}
                  </div>
                  <div className="mb-4">
                    <span className={`text-[10px] font-bold text-${color === 'orange' ? 'orange' : color === 'blue' ? 'blue' : 'green'}-600 uppercase tracking-widest bg-${color === 'orange' ? 'orange' : color === 'blue' ? 'blue' : 'green'}-50 px-2 py-1 rounded-md`}>
                      {service.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                    <div>
                      <span className={`text-2xl font-black text-${color === 'orange' ? 'orange' : color === 'blue' ? 'blue' : 'green'}-700`}>Rp {service.price.toLocaleString()}</span>
                      <span className="text-gray-400 text-sm ml-1">/{service.unit}</span>
                    </div>
                    <a 
                      href={getWhatsAppUrl(`Halo Laundry Ibu Tini, saya tertarik dengan layanan ${service.name}. Mohon info lebih lanjut.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-${color === 'orange' ? 'orange-500 to-amber-600' : color === 'blue' ? 'blue-600 to-indigo-600' : 'green-600 to-emerald-500'} text-white rounded-xl text-xs font-black shadow-lg shadow-${color}-100 hover:shadow-${color}-200 transition-all hover:scale-105 active:scale-95`}
                    >
                      Pesan <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {categories.map((cat: string) => {
              const color = getCategoryColor(cat);
              const colorBase = color === 'orange' ? 'orange' : color === 'blue' ? 'blue' : color === 'indigo' ? 'indigo' : 'green';
              return (
                <div key={cat} className="space-y-6">
                  <div className={`flex items-center gap-3 border-b-2 border-${colorBase}-600 pb-2`}>
                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">{cat}</h3>
                    <span className={`bg-${colorBase}-100 text-${colorBase}-700 text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                      {services.filter(s => s.category === cat).length} Layanan
                    </span>
                  </div>
                  
                  <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-sm bg-white">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Nama Layanan</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Harga / Unit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {services.filter(s => s.category === cat).map((s: Service) => (
                          <tr key={s.id} className={`group hover:bg-${colorBase}-50/30 transition-colors`}>
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                <span className={`text-xl bg-gray-50 w-10 h-10 flex items-center justify-center rounded-xl group-hover:bg-white transition-colors`}>
                                  {s.icon}
                                </span>
                                <span className="font-bold text-gray-800">{s.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-right">
                              <span className={`font-black text-${colorBase}-700`}>Rp {s.price.toLocaleString()}</span>
                              <span className="text-gray-400 text-[10px] font-bold uppercase ml-1">/ {s.unit}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
