import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, MapPin, Image as ImageIcon, Tag, ChevronLeft, ShieldAlert, Plus, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Calendar } from 'primereact/calendar';

import { eventService } from '../services/eventsService';

export const CreateEvent: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        tag: '',
        ageRating: '18+',
    });

    const [eventDate, setEventDate] = useState<Date | null>(null);
    const [eventTime, setEventTime] = useState<Date | null>(null);

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const [tickets, setTickets] = useState([
        { name: '', description: '', price: '', availableQuantity: '' }
    ]);

    const addTicket = () => {
        setTickets([...tickets, { name: '', description: '', price: '', availableQuantity: '' }]);
    };

    const removeTicket = (index: number) => {
        setTickets(tickets.filter((_, i) => i !== index));
    };

    const updateTicket = (index: number, field: string, value: string) => {
        const newTickets = [...tickets];
        newTickets[index] = { ...newTickets[index], [field]: value };
        setTickets(newTickets);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedImage) {
            alert("Por favor, selecione uma imagem de capa para o evento.");
            return;
        }

        if (!eventDate || !eventTime) {
            alert("Por favor, preencha a data e o horário do evento.");
            return;
        }

        setIsLoading(true);

        try {
            const payload = new FormData();
            payload.append('title', formData.title);
            payload.append('description', formData.description);
            payload.append('location', formData.location);
            payload.append('tag', formData.tag);
            payload.append('ageRating', formData.ageRating);

            const dateString = eventDate.toISOString().split('T')[0];
            payload.append('date', dateString);

            const hours = eventTime.getHours().toString().padStart(2, '0');
            const minutes = eventTime.getMinutes().toString().padStart(2, '0');
            const timeString = `${hours}:${minutes}`;
            payload.append('time', timeString);

            payload.append('image', selectedImage);

            const formattedTickets = tickets.map(t => ({
                ...t,
                price: parseFloat(t.price.replace(',', '.')) || 0,
                availableQuantity: parseInt(t.availableQuantity) || 0
            }));

            payload.append('tickets', JSON.stringify(formattedTickets));

            for (let [key, value] of (payload as any).entries()) {
                console.log(`${key}:`, value);
            }

            await eventService.createEvent(payload);

            navigate('/');
        } catch (error) {
            console.error('Erro ao criar evento:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto pb-12 animate-fade-in">
            <div className="flex items-center gap-2 pt-4 mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                    type="button"
                >
                    <ChevronLeft size={20} />
                </button>
                <h1 className="text-2xl font-extrabold text-gray-900">Criar Novo Evento</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Informações Básicas
                    </h2>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Título do Evento</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Ex: Intereng 2026, Baile da Medicina..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b3296] focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Descrição do Evento</label>
                        <div className="relative">
                            <textarea
                                name="description"
                                rows={4}
                                required
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Conte mais sobre as atrações, open bar, lotes e regras da festa..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b3296] focus:bg-white transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Data, Hora e Local
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                                <CalendarIcon size={16} className="text-gray-400" /> Data
                            </label>
                            <Calendar
                                value={eventDate}
                                onChange={(e) => setEventDate(e.value as Date)}
                                dateFormat="dd/mm/yy"
                                placeholder="Selecione a data"
                                className="w-full"
                                inputClassName="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b3296] focus:bg-white transition-all shadow-none"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                                <Clock size={16} className="text-gray-400" /> Horário de Início
                            </label>
                            <Calendar
                                value={eventTime}
                                onChange={(e) => setEventTime(e.value as Date)}
                                timeOnly
                                placeholder="00:00"
                                className="w-full"
                                inputClassName="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b3296] focus:bg-white transition-all shadow-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                            <MapPin size={16} className="text-gray-400" /> Localização
                        </label>
                        <input
                            type="text"
                            name="location"
                            required
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Ex: Área Verde, Pavilhão Principal..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b3296] focus:bg-white transition-all"
                        />
                    </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Visual & Classificação
                    </h2>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                            <ImageIcon size={16} className="text-gray-400" /> Imagem de Capa do Evento
                        </label>

                        <div className="flex flex-col gap-2">
                            {!selectedImage ? (
                                <label
                                    htmlFor="image-upload"
                                    className="flex flex-col items-center justify-center w-full h-40 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-[#0b3296] transition-all group"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                            <ImageIcon size={24} className="text-[#0b3296]" />
                                        </div>
                                        <p className="mb-1 text-sm text-gray-600 font-semibold group-hover:text-[#0b3296] transition-colors">
                                            <span className="text-[#0b3296]">Clique para escolher a imagem</span>
                                        </p>
                                        <p className="text-xs text-gray-400">PNG, JPG ou WEBP (Max. 5MB)</p>
                                    </div>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                setSelectedImage(e.target.files[0]);
                                            }
                                        }}
                                    />
                                </label>
                            ) : (
                                <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Preview da Capa"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedImage(null)}
                                            className="bg-white text-red-600 font-bold px-5 py-2.5 rounded-xl shadow-lg hover:bg-red-50 hover:scale-105 transition-all"
                                        >
                                            Remover / Trocar Capa
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                                <Tag size={16} className="text-gray-400" /> Tag de Destaque
                            </label>
                            <input
                                type="text"
                                name="tag"
                                value={formData.tag}
                                onChange={handleChange}
                                placeholder="Ex: Open Bar, Universitário..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b3296] focus:bg-white transition-all"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                                <ShieldAlert size={16} className="text-gray-400" /> Classificação Etária
                            </label>
                            <select
                                name="ageRating"
                                value={formData.ageRating}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b3296] focus:bg-white transition-all appearance-none"
                            >
                                <option value="18+">18+ (Apenas Maiores)</option>
                                <option value="16+">16+ (Permitido com responsável)</option>
                                <option value="Livre">Livre (Todos os públicos)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                            Tipos de Ingresso
                        </h2>
                        <button
                            type="button"
                            onClick={addTicket}
                            className="flex items-center gap-1 text-sm font-bold text-[#0b3296] hover:text-blue-800 transition-colors bg-blue-50 py-1.5 px-3 rounded-lg"
                        >
                            <Plus size={16} /> Novo Ingresso
                        </button>
                    </div>

                    <div className="space-y-4">
                        {tickets.map((ticket, index) => (
                            <div key={index} className="relative bg-gray-50 border border-gray-200 rounded-xl p-4">
                                {tickets.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeTicket(index)}
                                        className="absolute -top-3 -right-3 bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 hover:scale-110 transition-all shadow-sm"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-700">Nome do Setor/Lote</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Ex: Pista - Lote 1"
                                            value={ticket.name}
                                            onChange={(e) => updateTicket(index, 'name', e.target.value)}
                                            className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-[#0b3296] outline-none"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-700">Preço (R$)</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="40,00"
                                            value={ticket.price}
                                            onChange={(e) => updateTicket(index, 'price', e.target.value)}
                                            className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-[#0b3296] outline-none"
                                        />
                                    </div>

                                    <div className="space-y-1 sm:col-span-2">
                                        <label className="text-xs font-semibold text-gray-700">Descrição e Regras</label>
                                        <input
                                            type="text"
                                            placeholder="Ex: Obrigatório apresentar carteirinha..."
                                            value={ticket.description}
                                            onChange={(e) => updateTicket(index, 'description', e.target.value)}
                                            className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-[#0b3296] outline-none"
                                        />
                                    </div>

                                    <div className="space-y-1 sm:col-span-2">
                                        <label className="text-xs font-semibold text-gray-700">Quantidade Disponível</label>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            placeholder="Quantos ingressos desse tipo existem?"
                                            value={ticket.availableQuantity}
                                            onChange={(e) => updateTicket(index, 'availableQuantity', e.target.value)}
                                            className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-[#0b3296] outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Button
                    variant="primary"
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl text-base font-bold shadow-sm flex justify-center items-center"
                >
                    {isLoading ? 'Processando...' : 'Publicar Evento'}
                </Button>
            </form>
        </div>
    );
};