
export interface Service {
  id: string;
  name: string;
  price: number;
  unit: 'kg' | 'pc' | 'm2' | 'psg';
  icon: string;
  description: string;
  category: 'Kiloan' | 'Satuan' | 'Rumah Tangga' | 'Spesial';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface CalculationResult {
  serviceId: string;
  quantity: number;
  total: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  serviceId: string;
  date: string;
}
