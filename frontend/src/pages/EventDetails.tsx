import React, { useState, useEffect, useMemo } from "react";
import { Calendar, Clock, MapPin, Minus, Plus, ArrowRight, Pencil } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useNavigate, useParams } from "react-router-dom";
import { eventService, type Event } from "../services/eventsService";
import defaultEventImage from "../assets/images/DefaultImage.png";
import { formatarDataBR } from '../utils/date';
import { authService } from '../services/authService';

type TicketOption = {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  quantity: number;
  availableQuantity: number;
};

const normalizeTicketOptions = (ticketTypes: Event['ticketTypes'] = []): TicketOption[] =>
  ticketTypes.map((ticket) => {
    const availableQuantity = Number(ticket.availableQuantity) || 0;

    return {
      id: ticket.id,
      name: ticket.name,
      description: ticket.description || 'Ingresso para o evento.',
      price: Number(ticket.price) || 0,
      available: availableQuantity > 0,
      quantity: 0,
      availableQuantity,
    };
  });

export const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tickets, setTickets] = useState<TicketOption[]>([]);
  const currentUser = authService.getUser();
  const isOwner = Number(currentUser?.id) === Number(event?.userId);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!id) return;
      try {
        const data = await eventService.getEventById(id);
        setEvent(data);
        setTickets(normalizeTicketOptions(data.ticketTypes));
      } catch (error: any) {
        setErrorMessage(error.message || "Erro desconhecido ao carregar o evento.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [id, navigate]);

  const updateQuantity = (ticketId: number, delta: number) => {
    setTickets((currentTickets) =>
      currentTickets.map((ticket) => {
        if (ticket.id !== ticketId) {
          return ticket;
        }

        const nextQuantity = Math.min(
          ticket.availableQuantity,
          Math.max(0, ticket.quantity + delta)
        );

        return { ...ticket, quantity: nextQuantity };
      })
    );
  };

  const totalTickets = useMemo(
    () => tickets.reduce((acc, ticket) => acc + ticket.quantity, 0),
    [tickets]
  );

  const totalAmount = useMemo(
    () => tickets.reduce((acc, ticket) => acc + ticket.price * ticket.quantity, 0),
    [tickets]
  );

  if (errorMessage) {
    return <div className="p-8 text-center text-red-500">{errorMessage}</div>;
  }

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Carregando detalhes...</div>;
  }

  if (!event) return null;

  const imageUrl = event.imageUrl || defaultEventImage;
  const eventTime = (event as any).time || "22:00";
  const eventTag = (event as any).tag || "Universitário";

  return (
    <div className="animate-fade-in pb-40 md:pb-32">
      <div className="relative w-full h-64 md:h-96 rounded-b-3xl md:rounded-3xl overflow-hidden shadow-sm -mt-4 md:mt-0">
        <img
          src={imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
          <Badge label={eventTag} color="blue" className="shadow-lg" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-2 mt-6 space-y-8">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            {event.title}
          </h1>

          {isOwner && (
            <Button
              type="button"
              variant="light"
              onClick={() => navigate(`/event/${event.id}/edit`)}
              className="!px-4 !py-2.5 flex items-center gap-2 shrink-0"
            >
              <Pencil size={16} />
              Editar
            </Button>
          )}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-blue-50 p-2.5 rounded-xl text-[#0b3296]">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Data</p>
              <p className="text-gray-900 font-semibold">{formatarDataBR(event.date, event.time)}</p>
            </div>
          </div>
          <hr className="border-gray-100" />
          <div className="flex items-start gap-4">
            <div className="bg-blue-50 p-2.5 rounded-xl text-[#0b3296]">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Horário</p>
              <p className="text-gray-900 font-semibold">{eventTime}</p>
            </div>
          </div>
          <hr className="border-gray-100" />
          <div className="flex items-start gap-4">
            <div className="bg-blue-50 p-2.5 rounded-xl text-[#0b3296]">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Localização</p>
              <p className="text-gray-900 font-semibold">
                {event.location}
              </p>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Sobre o Evento
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base text-justify whitespace-pre-line">
            {event.description}
          </p>
        </section>

        <hr className="border-gray-200" />

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            Selecionar Ingressos
          </h2>

          <div className="space-y-3">
            {tickets.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-5 text-sm text-gray-500">
                Nenhum ingresso disponível para este evento no momento.
              </div>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`flex items-center justify-between gap-4 p-4 rounded-2xl border ${
                    ticket.quantity > 0
                      ? "border-[#0b3296] bg-blue-50/30"
                      : "border-gray-200 bg-white"
                  } transition-all overflow-hidden`}
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <h3
                      className={`font-bold break-words ${
                        !ticket.available ? "text-gray-400" : "text-gray-900"
                      }`}
                    >
                      {ticket.name}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2 break-words">
                      {ticket.description}
                    </p>
                    <p
                      className={`mt-2 font-bold ${
                        !ticket.available ? "text-gray-400" : "text-[#0b3296]"
                      }`}
                    >
                      R$ {ticket.price.toFixed(2).replace(".", ",")}
                    </p>
                  </div>

                  {ticket.available ? (
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-1 shrink-0">
                      <button
                        onClick={() => updateQuantity(ticket.id, -1)}
                        disabled={ticket.quantity === 0}
                        className="p-1.5 text-gray-500 hover:text-[#0b3296] disabled:opacity-30 transition-colors"
                        type="button"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="w-6 text-center font-bold text-gray-900">
                        {ticket.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(ticket.id, 1)}
                        className="p-1.5 text-gray-500 hover:text-[#0b3296] transition-colors"
                        type="button"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="bg-gray-100 px-3 py-1.5 rounded-lg shrink-0">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Esgotado
                      </span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <div className="fixed bottom-[72px] left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-40 md:bottom-auto md:top-full md:sticky md:mt-8 md:rounded-2xl md:border md:shadow-lg md:max-w-3xl md:mx-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Total ({totalTickets} ingressos)
            </p>
            <p className="text-2xl font-bold text-gray-900">
              R$ {totalAmount.toFixed(2).replace(".", ",")}
            </p>
          </div>

          <Button
            variant="primary"
            disabled={totalTickets === 0}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 py-3 px-6 text-base disabled:opacity-50"
            onClick={() => navigate('/checkout')}
          >
            <span>Ir para o Checkout</span>
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};