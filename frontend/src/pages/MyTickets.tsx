import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { MapPin, Smartphone, QrCode, Download, History, Trophy, Theater } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

// Mock dos Ingressos Ativos
const activeTickets = [
  {
    id: '1',
    eventTitle: 'Spring Campus Fest 2026',
    location: 'Main Quad, University Campus',
    date: 'Sex, 15 Mai',
    time: '16:00 - 23:00',
    ticketType: 'VIP Admission',
    orderNumber: 'UT-8924-X',
    tags: [{ label: 'Festival', color: 'blue' as const }, { label: 'Alta Demanda', color: 'red' as const }],
    qrAvailable: true,
  },
  {
    id: '2',
    eventTitle: 'Tech Talk: IA na Saúde',
    location: 'Science Building, Room 301',
    date: 'Qua, 20 Mai',
    time: '18:00',
    ticketType: 'Entrada Geral',
    orderNumber: 'UT-5112-A',
    tags: [{ label: 'Palestra', color: 'gray' as const }],
    qrAvailable: false,
  }
];

// Mock do Histórico Recente
const recentHistory = [
  { id: '1', title: 'Finais do Basquete Universitário', date: '2 Mai, 2026', icon: <Trophy size={16} className="text-gray-600" /> },
  { id: '2', title: 'Clube de Teatro: O Crisol', date: '18 Abr, 2026', icon: <Theater size={16} className="text-gray-600" /> },
];

export const MyTickets: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-12">
      
      {/* Cabeçalho */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Meus Ingressos</h1>
        <p className="text-gray-500 mt-1">Gerencie seus próximos eventos e experiências passadas.</p>
      </div>

      {/* Abas de Navegação */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <TabView className="custom-tabview">
          
          {/* Aba: Ativos */}
          <TabPanel header="Ativos (2)">
            <div className="p-4 md:p-6 space-y-8">
              {activeTickets.map((ticket) => (
                <div key={ticket.id} className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                  {/* Faixa lateral azul (detalhe visual da referência) */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0b3296]"></div>
                  
                  <div className="p-5 md:p-6 pl-6 md:pl-8">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {ticket.tags.map((tag, idx) => (
                        <Badge key={idx} label={tag.label} color={tag.color} />
                      ))}
                    </div>

                    {/* Título e Local */}
                    <h2 className="text-xl font-bold text-gray-900">{ticket.eventTitle}</h2>
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1 mb-6">
                      <MapPin size={16} />
                      <span>{ticket.location}</span>
                    </div>

                    {/* Grid de Informações */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm border-t border-gray-100 pt-5">
                      <div>
                        <p className="text-xs text-gray-400 font-semibold tracking-wider uppercase mb-0.5">Data</p>
                        <p className="font-bold text-gray-900">{ticket.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-semibold tracking-wider uppercase mb-0.5">Horário</p>
                        <p className="font-bold text-gray-900">{ticket.time}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-semibold tracking-wider uppercase mb-0.5">Tipo de Ingresso</p>
                        <p className="font-bold text-gray-900">{ticket.ticketType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-semibold tracking-wider uppercase mb-0.5">Pedido #</p>
                        <p className="font-bold text-gray-900">{ticket.orderNumber}</p>
                      </div>
                    </div>
                  </div>

                  {/* Seção do QR Code e Ações */}
                  <div className="bg-gray-50 border-t border-gray-200 p-5 md:p-6 flex flex-col items-center border-dashed">
                    {ticket.qrAvailable ? (
                      <>
                        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-4">
                          {/* Substituir por um componente de QRCode real em produção */}
                          <QrCode size={96} className="text-gray-800" />
                        </div>
                        <Button variant="primary" className="w-full flex items-center justify-center gap-2">
                          <Smartphone size={18} />
                          Adicionar à Carteira
                        </Button>
                        <button className="text-sm text-[#0b3296] font-semibold mt-4 hover:underline">
                          Ver Detalhes
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="bg-gray-200/50 p-4 rounded-xl mb-3">
                          <QrCode size={64} className="text-gray-400 opacity-50" />
                        </div>
                        <p className="text-xs text-gray-500 mb-4">QR code disponível 24h antes do evento</p>
                        <Button variant="light" className="w-full" label="Gerenciar Ingresso" />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>

          {/* Aba: Eventos Passados */}
          <TabPanel header="Eventos Passados">
            <div className="p-8 text-center text-gray-500">
              <History size={48} className="mx-auto mb-3 opacity-20" />
              <p>Você ainda não possui eventos passados.</p>
            </div>
          </TabPanel>
          
        </TabView>
      </div>

      {/* Resumo e Histórico */}
      <div className="space-y-6">
        {/* Resumo da Conta */}
        <section className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Resumo de Ingressos</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-600">
                <Download size={18} />
                <span>Próximos</span>
              </div>
              <span className="text-xl font-bold text-[#0b3296]">2</span>
            </div>
            <hr className="border-gray-100" />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-600">
                <History size={18} />
                <span>Comparecidos</span>
              </div>
              <span className="text-xl font-bold text-gray-900">14</span>
            </div>
          </div>
        </section>

        {/* Histórico Recente */}
        <section className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-gray-900 tracking-wider uppercase">Histórico Recente</h2>
            <button className="text-sm text-[#0b3296] font-semibold hover:underline">Ver Todos</button>
          </div>
          
          <div className="space-y-4">
            {recentHistory.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

    </div>
  );
};