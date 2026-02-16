
import React from 'react';
import { MapPin, Phone, Instagram, Globe } from 'lucide-react';
import { Service } from './types';

export const WHATSAPP_PHONE = '6285695014434';

export const getWhatsAppUrl = (message: string) => {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
};

export const SERVICES: Service[] = [
  // Kiloan
  {
    id: 'cuci-setrika',
    name: 'Cuci Setrika Regular',
    price: 6000,
    unit: 'kg',
    icon: '🧺',
    description: 'Cuci, kering, setrika rapi. Wangi premium.',
    category: 'Kiloan'
  },
  {
    id: 'cuci-setrika-express',
    name: 'Cuci Setrika Express (24 Jam)',
    price: 10000,
    unit: 'kg',
    icon: '⚡',
    description: 'Layanan cepat 1 hari jadi.',
    category: 'Kiloan'
  },
  {
    id: 'cuci-lipat',
    name: 'Cuci Lipat Regular',
    price: 5000,
    unit: 'kg',
    icon: '👕',
    description: 'Cuci bersih, kering, lipat rapi.',
    category: 'Kiloan'
  },
  {
    id: 'setrika',
    name: 'Setrika Saja',
    price: 5000,
    unit: 'kg',
    icon: '✨',
    description: 'Hanya jasa setrika uap profesional.',
    category: 'Kiloan'
  },
  // Satuan
  {
    id: 'jas',
    name: 'Jas / Blazer',
    price: 35000,
    unit: 'pc',
    icon: '🤵',
    description: 'Perawatan khusus pakaian formal.',
    category: 'Satuan'
  },
  {
    id: 'kebaya',
    name: 'Kebaya / Dress Premium',
    price: 45000,
    unit: 'pc',
    icon: '👗',
    description: 'Pencucian manual dengan kehati-hatian tinggi.',
    category: 'Satuan'
  },
  {
    id: 'sepatu',
    name: 'Deep Cleaning Sepatu',
    price: 30000,
    unit: 'psg',
    icon: '👟',
    description: 'Pembersihan menyeluruh hingga ke insole.',
    category: 'Spesial'
  },
  // Rumah Tangga
  {
    id: 'bed-cover',
    name: 'Bed Cover Large',
    price: 25000,
    unit: 'pc',
    icon: '🛏️',
    description: 'Pencucian khusus selimut besar.',
    category: 'Rumah Tangga'
  },
  {
    id: 'hordeng',
    name: 'Hordeng / Gorden',
    price: 15000,
    unit: 'kg',
    icon: '🖼️',
    description: 'Layanan pencucian hordeng rumah.',
    category: 'Rumah Tangga'
  },
  {
    id: 'karpet',
    name: 'Karpet Bulu / Kantor',
    price: 15000,
    unit: 'm2',
    icon: '🧶',
    description: 'Deep cleaning untuk karpet higienis.',
    category: 'Rumah Tangga'
  }
];

export const SOCIAL_LINKS = [
  { name: 'Website', url: 'https://laundry-ibutini.netlify.app/', icon: <Globe className="w-5 h-5" /> },
  { name: 'WhatsApp', url: getWhatsAppUrl('Halo Laundry Ibu Tini, saya ingin bertanya tentang layanan Anda.'), icon: <Phone className="w-5 h-5" /> },
  { name: 'Instagram', url: 'https://instagram.com/', icon: <Instagram className="w-5 h-5" /> },
  { name: 'Lokasi', url: 'https://maps.google.com/', icon: <MapPin className="w-5 h-5" /> }
];
