
import React, { useState, useEffect, useMemo } from 'react';
import { Star, MessageSquare, CheckCircle2, Loader2 } from 'lucide-react';
import { SERVICES } from '../constants';
import { db } from '../services/databaseService';
import { Review } from '../types';

export const FeedbackSystem: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    serviceId: SERVICES[0].id,
    rating: 5,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      const data = await db.getReviews();
      setReviews(data);
      setLoading(false);
    };
    loadReviews();
  }, []);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return "5.0";
    const total = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.comment || isSubmitting) return;

    setIsSubmitting(true);
    const newReview = await db.saveReview({
      name: formData.name,
      serviceId: formData.serviceId,
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toISOString()
    });

    if (newReview) {
      setReviews(prev => [newReview, ...prev]);
      setIsSubmitted(true);
      setFormData({
        name: '',
        serviceId: SERVICES[0].id,
        rating: 5,
        comment: ''
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
    setIsSubmitting(false);
  };

  const StarRating = ({ rating, interactive = false, onRate }: { rating: number, interactive?: boolean, onRate?: (r: number) => void }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-5 h-5 ${s <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onClick={() => interactive && onRate?.(s)}
        />
      ))}
    </div>
  );

  return (
    <section id="feedback" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Ulasan Pelanggan Terkini
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1 bg-green-50 px-4 py-2 rounded-full border border-green-100">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-green-800 text-lg">{averageRating}</span>
              <span className="text-green-600 text-sm">/ 5.0</span>
            </div>
            <div className="text-gray-500 text-sm font-medium">
              Dari {reviews.length} ulasan yang tersimpan di cloud
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Feedback Form */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-green-600" />
                Tulis Ulasan Anda
              </h3>
              
              {isSubmitted ? (
                <div className="bg-green-100 text-green-800 p-6 rounded-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 className="w-12 h-12 mb-3" />
                  <p className="font-bold">Terkirim!</p>
                  <p className="text-sm opacity-90">Ulasan Anda sudah online di database kami.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 outline-none transition-all disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Layanan</label>
                    <select
                      disabled={isSubmitting}
                      value={formData.serviceId}
                      onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 outline-none transition-all disabled:opacity-50"
                    >
                      {SERVICES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Penilaian</label>
                    <StarRating 
                      rating={formData.rating} 
                      interactive={!isSubmitting} 
                      onRate={(r) => setFormData({ ...formData, rating: r })} 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Pesan</label>
                    <textarea
                      required
                      disabled={isSubmitting}
                      rows={4}
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder="Apa yang membuat Anda puas?"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 outline-none transition-all resize-none disabled:opacity-50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 shadow-lg shadow-green-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Kirim Ulasan'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                <p>Mengambil data testimoni...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                  <div 
                    key={review.id} 
                    className="bg-white p-6 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all duration-300 group animate-fade-in"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 font-bold">
                          {review.name[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                            {new Date(review.date).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-full border border-green-100 mb-3">
                        {SERVICES.find(s => s.id === review.serviceId)?.name || 'Layanan Umum'}
                      </span>
                      <p className="text-gray-600 text-sm italic leading-relaxed line-clamp-4">
                        "{review.comment}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {!loading && reviews.length === 0 && (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
                <p className="text-gray-400">Jadilah pelanggan pertama yang memberikan ulasan di sistem cloud kami!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
