import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  CreditCard, 
  FileText, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Bell, 
  ShieldCheck,
  HelpCircle,
  UserCircle2
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

// Função auxiliar para gerar as iniciais do nome (Ex: "João Silva" -> "JS")
const getInitials = (name: string) => {
  if (!name) return 'UN'; // Retorna 'UN' (Unknown) se não tiver nome
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  
  // Resgatando os dados reais do localStorage
  const token = localStorage.getItem('@UniTick:token');
  const savedUser = localStorage.getItem('@UniTick:user');
  
  const isAuthenticated = !!token;
  const user = savedUser ? JSON.parse(savedUser) : null;

  // --- TELA DE VISITANTE (NÃO LOGADO) ---
  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-md mx-auto animate-fade-in flex flex-col items-center justify-center pt-16 pb-12 px-4 text-center">
        <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-sm ring-4 ring-white">
          <UserCircle2 size={48} className="text-[#0b3296]" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
          Acesse sua conta
        </h1>
        
        <p className="text-gray-500 text-base mb-8 px-4">
          Faça login ou cadastre-se para comprar ingressos, validar sua carteirinha de estudante e acessar seus eventos salvos.
        </p>
        
        <div className="w-full flex flex-col gap-3 px-2">
          <Button 
            variant="primary" 
            className="!w-full justify-center py-3.5 text-base shadow-sm"
            onClick={() => navigate('/login')}
          >
            Fazer Login
          </Button>
          <Button 
            variant="light" 
            className="!w-full justify-center py-3.5 text-base border-gray-200"
            onClick={() => navigate('/login')}
          >
            Criar Nova Conta
          </Button>
        </div>
      </div>
    );
  }

  // --- TELA DO PERFIL LOGADO ---
  
  // Mapeando os dados reais do banco. 
  // Nota: Como 'university' e 'isStudentVerified' ainda não existem na sua tabela User, deixamos estáticos por enquanto.
  const userProfile = {
    name: user.name,
    email: user.email,
    initials: getInitials(user.name),
    university: 'Instituição a definir', 
    isStudentVerified: false, 
  };

  const menuSections = [
    {
      title: 'Minha Conta',
      items: [
        { icon: <User size={20} className="text-gray-500" />, label: 'Dados Pessoais', path: '#' },
        { icon: <FileText size={20} className="text-[#0b3296]" />, label: 'Carteirinha de Estudante', path: '#', badge: userProfile.isStudentVerified ? 'Validada' : 'Pendente' },
        { icon: <CreditCard size={20} className="text-gray-500" />, label: 'Métodos de Pagamento', path: '#' },
      ]
    },
    {
      title: 'Configurações',
      items: [
        { icon: <Bell size={20} className="text-gray-500" />, label: 'Notificações', path: '#' },
        { icon: <ShieldCheck size={20} className="text-gray-500" />, label: 'Privacidade e Segurança', path: '#' },
        { icon: <Settings size={20} className="text-gray-500" />, label: 'Preferências do App', path: '#' },
      ]
    },
    {
      title: 'Suporte',
      items: [
        { icon: <HelpCircle size={20} className="text-gray-500" />, label: 'Central de Ajuda', path: '#' },
      ]
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('@UniTick:token');
    localStorage.removeItem('@UniTick:user');
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in pb-12">
      
      <div className="mb-6 pt-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Perfil</h1>
      </div>

      <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-blue-50 border-2 border-white shadow-sm flex items-center justify-center text-2xl font-bold text-[#0b3296] shrink-0 uppercase">
          {userProfile.initials}
        </div>
        
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-gray-900 truncate">{userProfile.name}</h2>
          <p className="text-sm text-gray-500 truncate">{userProfile.email}</p>
          <p className="text-sm text-gray-500 mb-2 truncate">{userProfile.university}</p>
          
          {userProfile.isStudentVerified ? (
            <Badge label="Estudante Verificado" color="blue" icon={<ShieldCheck size={12} />} />
          ) : (
            <Badge label="Verificação Pendente" color="gray" />
          )}
        </div>
      </section>

      <div className="space-y-6">
        {menuSections.map((section, index) => (
          <section key={index}>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
              {section.title}
            </h3>
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <React.Fragment key={itemIndex}>
                  <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left">
                    <div className="flex items-center gap-3 text-gray-700">
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.badge && (
                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                          item.badge === 'Validada' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  </button>
                  {itemIndex < section.items.length - 1 && (
                    <hr className="border-gray-100 mx-4" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="pt-4">
        <Button 
          variant="light" 
          className="w-full flex items-center justify-center gap-2 py-3.5 text-red-600 border-red-100 bg-red-50 hover:bg-red-100 hover:text-red-700 transition-colors"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span className="font-bold">Sair da Conta</span>
        </Button>
        <p className="text-center text-xs text-gray-400 mt-4">
          UniTick App Versão 1.0.0
        </p>
      </section>

    </div>
  );
};