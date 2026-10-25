import { api } from './api';

export interface Event {
  id: number;
  userId?: number;
  creator?: {
    id: number;
    name: string;
    email: string;
  };
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
    totalQuantity?: number;
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

  updateEvent: async (id: string, formData: FormData) => {
    const response = await api.put(`/events/${id}`, formData, {
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