
import React, { useState, useMemo } from 'react';
import { 
  Calculator as CalcIcon, 
  Plus, 
  Minus, 
  Receipt, 
  MessageCircle, 
  ShoppingBag, 
  Trash2, 
  CheckCircle2,
  Search,
  Filter
} from 'lucide-react';
import { SERVICES, getWhatsAppUrl, WHATSAPP_PHONE } from '../constants';

export const Calculator: React.FC = () => {
  const [items, setItems] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => ['Semua', ...Array.from(new Set(SERVICES.map(s => s.category)))], []);

  const filteredServices = useMemo(() => {
    return SERVICES.filter(service => {
      const matchesCategory = activeCategory === 'Semua' || service.category === activeCategory;
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const updateItem = (id: string, delta: number) => {
    setItems(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const resetCalculator = () => setItems({});

  const totals = useMemo(() => {
    return (Object.entries(items) as [string, number][]).reduce((acc, [id, qty]) => {
      const service = SERVICES.find(s => s.id === id);
      if (service && qty > 0) {
        acc.total += service.price * qty;
        acc.itemsCount += 1;
        acc.totalQty += qty;
      }
      return acc;
    }, { total: 0, itemsCount: 0, totalQty: 0 });
  }, [items]);

  const hasItems = totals.itemsCount > 0;

  const handleOrder = () => {
    const serviceList = (Object.entries(items) as [string, number][])
      .filter(([_, q]) => q > 0)
      .map(([id, q]) => {
        const s = SERVICES.find(service => service.id === id);
        return `• *${s?.name}*: ${q} ${s?.unit} (Rp ${(s!.price * q).toLocaleString()})`;
      })
      .join('\n');

    const rawMessage = `*ESTIMASI ORDER LAUNDRY IBU TINI*\n\n${serviceList}\n\n--------------------------------\n*TOTAL ESTIMASI: Rp ${totals.total.toLocaleString()}*\n--------------------------------\n\nMohon konfirmasi pengambilan kurir.`;
    window.open(getWhatsAppUrl(rawMessage), '_blank');
  };

  return (
    <section id="calculator" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-green-100 rounded-2xl text-green-700 mb-4 shadow-inner">
            <CalcIcon className="w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Kalkulator Biaya Pintar</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
            Pilih layanan sesuai kebutuhan Anda. Harga transparan dan otomatis terhitung.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Service Selection Panel */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Cari layanan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-hide">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        activeCategory === cat 
                        ? 'bg-green-600 text-white shadow-lg shadow-green-100' 
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center px-2 mb-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-green-600" />
                  {activeCategory} ({filteredServices.length})
                </h3>
                {hasItems && (
                  <button onClick={resetCalculator} className="text-xs font-bold text-red-500 flex items-center gap-1 hover:underline">
                    <Trash2 className="w-3 h-3" /> Bersihkan Pilihan
                  </button>
                )}
              </div>
              
              <div className="space-y-3">
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => {
                    const qty = items[service.id] || 0;
                    const isSelected = qty > 0;
                    
                    return (
                      <div 
                        key={service.id} 
                        className={`flex items-center gap-3 sm:gap-4 p-4 rounded-2xl border-2 transition-all duration-300 ${
                          isSelected ? 'bg-green-50/50 border-green-500 shadow-sm' : 'bg-white border-gray-50 hover:border-green-200'
                        }`}
                      >
                        <div className={`text-2xl w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? 'bg-white text-green-600 shadow-sm' : 'bg-gray-50 text-gray-400'
                        }`}>
                          {service.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">{service.name}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-black text-green-700">Rp {service.price.toLocaleString()}</span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-tight">/ {service.unit}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-inner border border-gray-100">
                          <button 
                            onClick={() => updateItem(service.id, -1)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
                              qty > 0 ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'text-gray-200'
                            }`}
                            disabled={qty === 0}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-black text-sm w-6 text-center">{qty}</span>
                          <button 
                            onClick={() => updateItem(service.id, 1)}
                            className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-sm"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-12 text-center text-gray-400">
                    <p className="text-sm italic">Tidak ada layanan yang sesuai pencarian.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Receipt Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col transform lg:translate-y-2">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="flex justify-between items-center mb-1 relative z-10">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-green-400" />
                    Rincian Order
                  </h3>
                  <span className="text-[10px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full uppercase font-bold">ESTIMASI</span>
                </div>
                <p className="text-gray-400 text-xs relative z-10">Laundry Ibu Tini - Profesional & Bersih</p>
              </div>

              <div className="p-8">
                <div className="space-y-4 min-h-[180px] max-h-[400px] overflow-y-auto custom-scrollbar">
                  {hasItems ? (
                    (Object.entries(items) as [string, number][]).map(([id, qty]) => {
                      if (qty === 0) return null;
                      const service = SERVICES.find(s => s.id === id);
                      return (
                        <div key={id} className="flex justify-between items-center text-sm group animate-fade-in py-1">
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span className="text-gray-700 truncate font-medium">{service?.name}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-gray-400 text-xs">x{qty}</span>
                            <span className="font-mono font-bold text-gray-900 min-w-[80px] text-right">Rp {(service!.price * qty).toLocaleString()}</span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center py-10 opacity-40">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <ShoppingBag className="w-8 h-8 text-gray-300" />
                      </div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                        Silakan pilih item<br/>untuk melihat rincian
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
                  <div className="flex justify-between items-baseline mb-8">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Bayar</p>
                      <p className="text-xs font-bold text-green-600">{totals.totalQty} {totals.totalQty > 1 ? 'Satuan' : 'Satuan'}</p>
                    </div>
                    <p className="text-3xl font-black text-gray-900 font-mono tracking-tighter">
                      Rp {totals.total.toLocaleString()}
                    </p>
                  </div>

                  <button 
                    disabled={!hasItems}
                    onClick={handleOrder}
                    className="w-full py-5 bg-gradient-to-br from-green-600 to-emerald-500 text-white font-black text-lg rounded-[1.5rem] hover:shadow-2xl hover:shadow-green-300 disabled:opacity-30 disabled:grayscale transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-green-200/50 hover:scale-[1.02] hover:-translate-y-1"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Lanjut Order ke WhatsApp
                  </button>
                  
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 opacity-50 text-[9px] font-bold uppercase tracking-tight text-gray-400">
                    <div className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> Harga Final di Outlet</div>
                    <div className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> Transparan</div>
                    <div className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> Amanah</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 10px; }
      `}</style>
    </section>
  );
};