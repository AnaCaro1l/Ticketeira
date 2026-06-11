import React, { useState } from "react";
import { Carousel, type CarouselResponsiveOption } from "primereact/carousel";
import { Search, Calendar, MapPin, Flame } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useNavigate } from "react-router-dom";

// Mock de dados baseados nas referências
const trendingEvents = [
  {
    id: "1",
    title: "Spring Fling: Midnight Gala",
    date: "12 Abr, 22:00",
    location: "West Campus Pavilion",
    price: "A partir de R$ 25,00",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600",
    tag: "Live Music",
    tagColor: "blue" as const,
  },
  {
    id: "2",
    title: "Engenhariadas 2026: O Início",
    date: "20 Mai, 16:00",
    location: "Complexo Esportivo Universitário",
    price: "A partir de R$ 40,00",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600",
    tag: "High Demand",
    tagColor: "red" as const,
  },
  {
    id: "3",
    title: "Baile da Odonto",
    date: "05 Jun, 23:00",
    location: "Clube Principal",
    price: "A partir de R$ 35,00",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600",
    tag: "Open Bar",
    tagColor: "gray" as const, // Alterado de neon para gray
  },
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Configuração de responsividade para o Carrossel do PrimeReact
  const responsiveOptions: CarouselResponsiveOption[] = [
    { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
    { breakpoint: "768px", numVisible: 2, numScroll: 1 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

  // Template para renderizar cada item do Carrossel
  const eventTemplate = (event: (typeof trendingEvents)[0]) => {
    const header = (
      <div className="relative">
        <img
          alt={event.title}
          src={event.image}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge label={event.tag} color={event.tagColor} />
        </div>
      </div>
    );

    return (
      <div className="px-2 py-4">
        <Card
          header={header}
          hoverEffect
          className="h-full flex flex-col border-none ring-1 ring-gray-100"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
            {event.title}
          </h3>

          <div className="space-y-2 mb-4 flex-1">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} className="text-[#0b3296]" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} className="text-[#0b3296]" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            <span className="text-base font-bold text-gray-900">
              {event.price}
            </span>
            <Button
              variant="primary"
              label="Comprar"
              className="py-1.5 px-4 text-sm"
              onClick={() => navigate(`/events/${event.id}`)}
            />
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Banner Herói & Busca */}
      <section className="bg-white rounded-3xl p-8 md:p-14 text-center border border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto space-y-6">
          <Badge
            label="A Maior Ticketeira Universitária"
            color="blue"
            className="mb-2"
          />
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Encontre a sua próxima <br className="hidden md:block" />
            <span className="text-[#0b3296]">experiência inesquecível</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Festas de atléticas, festivais e os melhores eventos universitários
            em um só lugar.
          </p>
        </div>
      </section>

      {/* Carrossel de Eventos em Alta */}
      <section>
        <div className="flex items-center gap-2 mb-6 px-2">
          <Flame className="text-orange-500" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Eventos em Alta</h2>
        </div>

        <Carousel
          value={trendingEvents}
          numVisible={3}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          itemTemplate={eventTemplate}
          circular
          autoplayInterval={5000}
          className="custom-carousel"
          showIndicators={false}
        />
      </section>

      {/* Grid de Próximos Eventos */}
      <section className="px-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Descubra Mais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingEvents.map((event) => (
            <div key={`grid-${event.id}`}>{eventTemplate(event)}</div>
          ))}
        </div>
      </section>
    </div>
  );
};
