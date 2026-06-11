import React, { useState } from 'react';
import { User, FileText, CreditCard, UploadCloud, CheckCircle2, Lock } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const Checkout: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit'>('pix');
  const [fileUploaded, setFileUploaded] = useState<string | null>(null);

  // Simulação de upload de arquivo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileUploaded(e.target.files[0].name);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in pb-12">
      
      {/* Cabeçalho */}
      <div className="text-center md:text-left mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Finalizar Compra</h1>
        <p className="text-gray-500 mt-1">Preencha os dados abaixo para garantir seus ingressos.</p>
      </div>

      {/* Seção 1: Detalhes do Comprador */}
      <section className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <User className="text-[#0b3296]" size={20} />
          <h2 className="text-lg font-bold text-gray-900">Dados do Comprador</h2>
        </div>
        
        <div className="space-y-4">
          <Input 
            label="Nome Completo" 
            placeholder="Ex: João da Silva" 
            defaultValue="Jane Doe" // Baseado na sua imagem de ref
          />
          <Input 
            label="E-mail" 
            type="email" 
            placeholder="joao@universidade.edu.br" 
            defaultValue="jane.doe@university.edu"
          />
          <Input 
            label="Telefone" 
            placeholder="(00) 00000-0000" 
            defaultValue="+1 (555) 000-0000"
          />
        </div>
      </section>

      {/* Seção 2: Verificação de Estudante */}
      <section className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="text-[#0b3296]" size={20} />
          <h2 className="text-lg font-bold text-gray-900">Verificação de Estudante</h2>
        </div>
        <p className="text-sm text-gray-500">
          Obrigatório para ingressos com desconto. Envie uma foto da sua carteirinha válida.
        </p>

        <div className="mt-4">
          <input 
            type="file" 
            id="student-id-upload" 
            className="hidden" 
            accept=".png, .jpg, .jpeg, .pdf"
            onChange={handleFileUpload}
          />
          <label 
            htmlFor="student-id-upload" 
            className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
              fileUploaded ? 'border-green-500 bg-green-50' : 'border-blue-200 bg-blue-50/50 hover:bg-blue-50'
            }`}
          >
            {fileUploaded ? (
              <>
                <CheckCircle2 className="text-green-500 mb-2" size={32} />
                <span className="text-sm font-medium text-green-700">{fileUploaded}</span>
                <span className="text-xs text-green-600 mt-1">Clique para alterar o arquivo</span>
              </>
            ) : (
              <>
                <UploadCloud className="text-[#0b3296] mb-2" size={32} />
                <span className="text-sm font-medium text-[#0b3296]">Clique ou arraste o arquivo</span>
                <span className="text-xs text-gray-400 mt-1">PNG, JPG ou PDF (máx. 5MB)</span>
              </>
            )}
          </label>
        </div>
      </section>

      {/* Seção 3: Método de Pagamento */}
      <section className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <CreditCard className="text-[#0b3296]" size={20} />
          <h2 className="text-lg font-bold text-gray-900">Método de Pagamento</h2>
        </div>

        <div className="space-y-3">
          {/* Opção PIX */}
          <label 
            className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
              paymentMethod === 'pix' ? 'border-[#0b3296] bg-blue-50/30 ring-1 ring-[#0b3296]' : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <input 
                type="radio" 
                name="payment" 
                value="pix" 
                checked={paymentMethod === 'pix'} 
                onChange={() => setPaymentMethod('pix')}
                className="w-4 h-4 text-[#0b3296] focus:ring-[#0b3296]"
              />
              <div>
                <span className="font-bold text-gray-900 block">PIX</span>
                <span className="text-xs text-gray-500">Aprovação instantânea</span>
              </div>
            </div>
            <span className="bg-[#0b3296] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              Recomendado
            </span>
          </label>

          {/* Opção Cartão de Crédito */}
          <label 
            className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
              paymentMethod === 'credit' ? 'border-[#0b3296] bg-blue-50/30 ring-1 ring-[#0b3296]' : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <input 
                type="radio" 
                name="payment" 
                value="credit" 
                checked={paymentMethod === 'credit'} 
                onChange={() => setPaymentMethod('credit')}
                className="w-4 h-4 text-[#0b3296] focus:ring-[#0b3296]"
              />
              <span className="font-bold text-gray-900">Cartão de Crédito</span>
            </div>
          </label>
        </div>
      </section>

      {/* Seção 4: Resumo do Pedido */}
      <section className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Resumo do Pedido</h2>
        
        <div className="flex items-center gap-4 mb-6">
          <img 
            src="https://images.unsplash.com/photo-1540039155732-d68a1d120fb5?auto=format&fit=crop&q=80&w=200" 
            alt="Evento" 
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div>
            <h3 className="font-bold text-gray-900">Spring Fling: Midnight Gala</h3>
            <p className="text-sm text-gray-500">12 de Abril de 2024</p>
          </div>
        </div>

        <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
          <div className="flex justify-between text-gray-600">
            <span>1x 1º Lote Estudante</span>
            <span className="font-medium text-gray-900">R$ 25,00</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>2x Ingresso Solidário</span>
            <span className="font-medium text-gray-900">R$ 70,00</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Taxa de Processamento (10%)</span>
            <span className="font-medium text-gray-900">R$ 9,50</span>
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-gray-100 mt-4 pt-4 mb-6">
          <span className="font-bold text-gray-900 text-lg">Total</span>
          <div className="text-right">
            <span className="font-extrabold text-[#0b3296] text-2xl">R$ 104,50</span>
            <p className="text-xs text-gray-400 mt-0.5">Impostos inclusos</p>
          </div>
        </div>

        <Button variant="primary" className="w-full flex items-center justify-center gap-2 py-3 text-base">
          <Lock size={18} />
          Confirmar e Pagar
        </Button>
        
        <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
          <Lock size={12} /> Checkout 100% Seguro e Criptografado
        </p>
      </section>

    </div>
  );
};