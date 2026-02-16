
import { getSupabase, isSupabaseConfigured } from './supabaseClient';
import { Service, Review } from '../types';
import { SERVICES as STATIC_SERVICES } from '../constants';

export const db = {
  // SERVICES
  async getServices(): Promise<Service[]> {
    if (!isSupabaseConfigured()) {
      console.info('Using static services (Supabase not configured)');
      return STATIC_SERVICES;
    }

    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('category', { ascending: true });
      
      if (error) {
        // If table doesn't exist, this might trigger the error
        console.error('Error fetching services from Supabase:', error);
        if (error.code === '42P01') {
          console.warn('Table "services" does not exist. Attempting to create/seed might be needed via Supabase Dashboard.');
        }
        return STATIC_SERVICES;
      }
      
      if (!data || data.length === 0) {
        await this.seedServices();
        return STATIC_SERVICES;
      }

      return data as Service[];
    } catch (e) {
      console.error('Supabase request failed:', e);
      return STATIC_SERVICES;
    }
  },

  async seedServices() {
    if (!isSupabaseConfigured()) return;

    console.log('Migrating services to Supabase...');
    try {
      const supabase = getSupabase();
      const { error } = await supabase
        .from('services')
        .insert(STATIC_SERVICES);
      
      if (error) console.error('Migration failed:', error);
      else console.log('Migration successful!');
    } catch (e) {
      console.error('Seed attempt failed:', e);
    }
  },

  // REVIEWS
  async getReviews(): Promise<Review[]> {
    if (!isSupabaseConfigured()) return [];

    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        console.error('Error fetching reviews:', error);
        return [];
      }
      return data as Review[];
    } catch (e) {
      return [];
    }
  },

  async saveReview(review: Omit<Review, 'id'>): Promise<Review | null> {
    if (!isSupabaseConfigured()) {
      // Local mock behavior for demo if not configured
      return { ...review, id: Math.random().toString(36).substr(2, 9) } as Review;
    }

    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('reviews')
        .insert([review])
        .select()
        .single();
      
      if (error) {
        console.error('Error saving review:', error);
        return null;
      }
      return data as Review;
    } catch (e) {
      return null;
    }
  }
};
