import React, { useState } from "react";
import { Search as SearchIcon, Filter, Calendar, MapPin } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

const allEvents = [
  {
    id: "1",
    title: "Spring Fling: Midnight Gala",
    category: "festa",
    date: "12 Abr",
    location: "West Pavilion",
    price: "R$ 25,00",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600",
    tag: "Live Music",
    tagColor: "blue" as const,
  },
  {
    id: "2",
    title: "Finais do Basquete",
    category: "esporte",
    date: "02 Mai",
    location: "Ginásio Principal",
    price: "R$ 15,00",
    image:
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=600",
    tag: "Esportes",
    tagColor: "red" as const,
  },
  {
    id: "3",
    title: "Baile da Odonto",
    category: "festa",
    date: "05 Jun",
    location: "Clube Principal",
    price: "R$ 35,00",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600",
    tag: "Open Bar",
    tagColor: "blue" as const,
  },
  {
    id: "4",
    title: "Tech Talk: IA",
    category: "academico",
    date: "20 Mai",
    location: "Prédio de TI",
    price: "Gratuito",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600",
    tag: "Palestra",
    tagColor: "gray" as const,
  },
  {
    id: "5",
    title: "O Crisol (Teatro)",
    category: "cultura",
    date: "18 Abr",
    location: "Teatro Central",
    price: "R$ 10,00",
    image:
      "https://images.unsplash.com/photo-1507676184212-d0330a15153b?auto=format&fit=crop&q=80&w=600",
    tag: "Teatro",
    tagColor: "gray" as const,
  },
];

const categories = [
  { id: "all", label: "Todos" },
  { id: "festa", label: "Festas & Shows" },
  { id: "esporte", label: "Esportes" },
  { id: "academico", label: "Acadêmico" },
  { id: "cultura", label: "Cultura" },
];

export const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-12">
      <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-[60px] md:static z-40">
        <div className="flex gap-3 mb-4 h-12">
          <div className="relative flex-1 h-full">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <SearchIcon size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-full pl-12 pr-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#0b3296]/20 focus:border-[#0b3296] outline-none transition-all"
            />
          </div>
          <Button 
            variant="light" 
            className="!w-auto shrink-0 !px-4 h-full flex items-center justify-center border-gray-200 shadow-sm"
          >
            <Filter size={20} className="text-gray-600" />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-[#0b3296] text-white shadow-sm"
                  : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-2 md:px-0">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          {filteredEvents.length}{" "}
          {filteredEvents.length === 1
            ? "resultado encontrado"
            : "resultados encontrados"}
        </h2>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                hoverEffect
                className="flex flex-col border-none ring-1 ring-gray-100 h-full"
              >
                <div className="relative h-40">
                  <img
                    alt={event.title}
                    src={event.image}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge label={event.tag} color={event.tagColor} />
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="space-y-1.5 mb-4 flex-1">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar size={14} className="text-[#0b3296]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <MapPin size={14} className="text-[#0b3296]" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                    <span className="text-sm font-bold text-gray-900">
                      {event.price}
                    </span>
                    <button className="text-sm font-semibold text-[#0b3296] hover:underline">
                      Ver detalhes
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <SearchIcon size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">
              Nenhum evento encontrado para "{searchTerm}".
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Tente usar outros termos ou remover os filtros.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
