import React, { useEffect, useState } from "react";
import { Carousel, type CarouselResponsiveOption } from "primereact/carousel";
import { Search, Calendar, MapPin, Flame, Loader2 } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useNavigate } from "react-router-dom";
import { eventService, type Event } from "../services/eventsService";
import defaultEventImage from "../assets/images/DefaultImage.png";
import { formatarDataBR } from "../utils/date";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getAllEvents();
        setEvents(data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const responsiveOptions: CarouselResponsiveOption[] = [
    { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
    { breakpoint: "768px", numVisible: 2, numScroll: 1 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

  const eventTemplate = (event: Event) => {
    const imageUrl =
      event.imageUrl ||
      defaultEventImage;
    const priceDisplay = event.price
      ? `R$ ${Number(event.price).toFixed(2).replace(".", ",")}`
      : "Gratuito";

    const header = (
      <div
        className="relative cursor-pointer"
        onClick={() => navigate(`/event/${event.id}`)}
      >
        <img
          alt={event.title}
          src={imageUrl}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge label="Em Alta" color="blue" />
        </div>
      </div>
    );

    return (
      <div className="px-2 py-4 h-full">
        <Card
          header={header}
          className="h-full flex flex-col border-none ring-1 ring-gray-100 hover:shadow-lg transition-shadow"
          onClick={() => navigate(`/event/${event.id}`)}
        >
          {/* Adicionamos o cursor-pointer e o onClick no título também para facilitar o clique */}
          <h3
            className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 cursor-pointer hover:text-[#0b3296]"
          >
            {event.title}
          </h3>

          <div className="space-y-2 mb-4 flex-1">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} className="text-[#0b3296]" />
              {/* O campo data pode precisar ser formatado dependendo de como o MySQL retorna */}
              <span>{formatarDataBR(event.date, event.time)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} className="text-[#0b3296]" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            <span className="text-base font-bold text-gray-900">
              {priceDisplay}
            </span>
            <Button
              variant="primary"
              label="Comprar"
              className="py-1.5 px-4 text-sm"
              // Rota ajustada para o singular: /event/id
              onClick={() => navigate(`/event/${event.id}`)}
            />
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-12 animate-fade-in pb-12">
      {/* Banner Herói */}
      <section className="bg-white rounded-3xl p-6 md:p-14 text-center border border-gray-100 shadow-sm mt-4">
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

      {/* Exibição de Loading ou Conteúdo Dinâmico */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 size={40} className="animate-spin text-[#0b3296] mb-4" />
          <p className="text-gray-500 font-medium">
            Buscando os melhores eventos...
          </p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          Nenhum evento encontrado no momento.
        </div>
      ) : (
        <>
          {/* Carrossel de Eventos */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Flame className="text-orange-500" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">
                Eventos em Alta
              </h2>
            </div>

            <Carousel
              value={events}
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

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Descubra Mais</h2>

              <Button
                variant="light"
                label="+ Criar Evento"
                className="py-1.5 px-4 text-sm border-dashed border-gray-300 text-[#0b3296] hover:bg-blue-50 transition-colors"
                onClick={() => navigate('/event/create')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={`grid-${event.id}`}>
                  {eventTemplate(event)}
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
