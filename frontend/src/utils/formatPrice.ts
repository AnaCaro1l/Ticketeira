import type { Event } from '../services/eventsService';

export const getEventPriceDisplay = (event: Event | any): string => {
  const ticketsList = event?.ticketTypes || event?.tickets;

  if (ticketsList && Array.isArray(ticketsList) && ticketsList.length > 0) {
    const prices = ticketsList
      .map((t: any) => Number(t.price) || 0)
      .filter((p: number) => p > 0);

    if (prices.length > 0) {
      const minPrice = Math.min(...prices);
      return `a partir de R$ ${minPrice.toFixed(2).replace('.', ',')}`;
    }
    return 'Gratuito';
  }

  if (event?.price !== undefined && event?.price !== null && event?.price !== '') {
    const priceVal = typeof event.price === 'string' && event.price.includes('R$') 
      ? Number(event.price.replace(/[^0-9,.-]+/g, '').replace(',', '.')) 
      : Number(event.price);

    if (!isNaN(priceVal) && priceVal > 0) {
      return `a partir de R$ ${priceVal.toFixed(2).replace('.', ',')}`;
    }
  }

  return 'Gratuito';
};
