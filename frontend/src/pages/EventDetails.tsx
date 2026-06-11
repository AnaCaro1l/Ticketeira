import React, { useState } from "react";
import { Calendar, Clock, MapPin, Minus, Plus, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useNavigate } from "react-router-dom";

// Mock dos dados do evento e ingressos
const eventData = {
  title: "Spring Fling: Midnight Gala",
  image:
    "https://images.unsplash.com/photo-1540039155732-d68a1d120fb5?auto=format&fit=crop&q=80&w=1200",
  tag: "Live Music",
  date: "Sexta, 12 de Abril, 2024",
  time: "22:00 - 03:00",
  location: "University Main Quad, West Campus Pavilion",
  description:
    "Junte-se a nós para o evento mais esperado do semestre. O Midnight Gala reúne estudantes, ex-alunos e professores para uma noite inesquecível de música ao vivo, buffet premium e muita dança sob as estrelas. Traje esporte fino obrigatório. A apresentação da carteirinha de estudante é indispensável na portaria para ingressos meia-entrada.",
};

const initialTicketLots = [
  {
    id: "1",
    name: "1º Lote Estudante",
    description: "Requer carteirinha de estudante válida",
    price: 25.0,
    quantity: 0,
    available: true,
  },
  {
    id: "2",
    name: "Ingresso Solidário",
    description: "Inclui doação de 1kg de alimento não perecível",
    price: 35.0,
    quantity: 2,
    available: true,
  }, // Iniciando com 2 para simular o total da sua imagem
  {
    id: "3",
    name: "Inteira Geral",
    description: "Entrada Padrão",
    price: 50.0,
    quantity: 0,
    available: false,
  }, // Sold out
];

export const EventDetails: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(initialTicketLots);

  // Função para alterar a quantidade de ingressos
  const updateQuantity = (id: string, delta: number) => {
    setTickets(
      tickets.map((ticket) => {
        if (ticket.id === id && ticket.available) {
          const newQuantity = Math.max(0, ticket.quantity + delta);
          return { ...ticket, quantity: newQuantity };
        }
        return ticket;
      })
    );
  };

  // Cálculo do total e quantidade
  const totalAmount = tickets.reduce(
    (acc, ticket) => acc + ticket.price * ticket.quantity,
    0
  );
  const totalTickets = tickets.reduce(
    (acc, ticket) => acc + ticket.quantity,
    0
  );

  return (
    <div className="animate-fade-in pb-24 md:pb-32">
      {/* Imagem de Capa do Evento */}
      <div className="relative w-full h-64 md:h-96 rounded-b-3xl md:rounded-3xl overflow-hidden shadow-sm -mt-4 md:mt-0">
        <img
          src={eventData.image}
          alt={eventData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
          <Badge label={eventData.tag} color="blue" className="shadow-lg" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-2 mt-6 space-y-8">
        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          {eventData.title}
        </h1>

        {/* Card de Informações (Data, Hora, Local) */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-blue-50 p-2.5 rounded-xl text-[#0b3296]">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Data</p>
              <p className="text-gray-900 font-semibold">{eventData.date}</p>
            </div>
          </div>
          <hr className="border-gray-100" />
          <div className="flex items-start gap-4">
            <div className="bg-blue-50 p-2.5 rounded-xl text-[#0b3296]">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Horário</p>
              <p className="text-gray-900 font-semibold">{eventData.time}</p>
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
                {eventData.location}
              </p>
            </div>
          </div>
        </div>

        {/* Sobre o Evento */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Sobre o Evento
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base text-justify">
            {eventData.description}
          </p>
        </section>

        <hr className="border-gray-200" />

        {/* Seleção de Ingressos */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            Selecionar Ingressos
          </h2>

          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`flex items-center justify-between p-4 rounded-2xl border ${
                  ticket.quantity > 0
                    ? "border-[#0b3296] bg-blue-50/30"
                    : "border-gray-200 bg-white"
                } transition-all`}
              >
                <div className="flex-1 pr-4">
                  <h3
                    className={`font-bold ${
                      !ticket.available ? "text-gray-400" : "text-gray-900"
                    }`}
                  >
                    {ticket.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {ticket.description}
                  </p>
                  <p
                    className={`font-bold mt-2 ${
                      !ticket.available ? "text-gray-400" : "text-[#0b3296]"
                    }`}
                  >
                    R$ {ticket.price.toFixed(2).replace(".", ",")}
                  </p>
                </div>

                {ticket.available ? (
                  <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-1">
                    <button
                      onClick={() => updateQuantity(ticket.id, -1)}
                      disabled={ticket.quantity === 0}
                      className="p-1.5 text-gray-500 hover:text-[#0b3296] disabled:opacity-30 transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-6 text-center font-bold text-gray-900">
                      {ticket.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(ticket.id, 1)}
                      className="p-1.5 text-gray-500 hover:text-[#0b3296] transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-100 px-3 py-1.5 rounded-lg">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Esgotado
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Barra Inferior Fixa (Sticky Bottom Bar) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-40 pb-safe md:bottom-auto md:top-full md:sticky md:mt-8 md:rounded-2xl md:border md:shadow-lg md:max-w-3xl md:mx-auto">
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
            className="flex-1 md:flex-none flex items-center justify-center gap-2 py-3 px-6 text-base"
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
