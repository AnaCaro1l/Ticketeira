import { api } from './api';

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string; 
  time: string;
  location: string;
  imageUrl?: string;
  tag?: string;
  ageRating?: string;
  price?: number | string;
  ticketTypes?: {
    id: number;
    name: string;
    description?: string;
    price: number | string;
    availableQuantity: number;
  }[];
}

export const eventService = {
  createEvent: async (formData: FormData) => {
    const response = await api.post('/events', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  async getAllEvents(): Promise<Event[]> {
    const response = await api.get<Event[]>('/events');
    return response.data;
  },

  async getEventById(id: string): Promise<Event> {
    const response = await api.get<Event>(`/events/${id}`);
    return response.data;
  }
};