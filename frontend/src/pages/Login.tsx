import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Ticket,
  Mail,
  Lock,
  LogIn,
  Globe,
  Code,
  ArrowLeft,
} from "lucide-react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { authService } from "../services/authService";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (isRegistering) {
        console.log("Modo de cadastro ainda não implementado na API");
      } else {
        await authService.login({ email, password });

        navigate("/");
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message ||
          "Erro ao conectar com o servidor. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans text-gray-800 animate-fade-in relative">
      {/* Botão de Voltar para a Home */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-gray-500 hover:text-[#0b3296] transition-colors font-medium text-sm p-2 -ml-2 rounded-lg hover:bg-gray-100"
      >
        <ArrowLeft size={20} />
        <span className="hidden sm:inline">Voltar para o início</span>
      </button>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 text-3xl font-extrabold text-[#0b3296] tracking-tight mb-8">
          <Ticket size={32} />
          <span>UniTick</span>
        </div>

        {/* Cabeçalho do Formulário */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {isRegistering ? "Crie sua conta" : "Bem-vindo de volta!"}
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {isRegistering
              ? "Cadastre-se para garantir os melhores ingressos."
              : "Faça login para acessar seus ingressos e eventos."}
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegistering && (
            <Input
              label="Nome Completo"
              placeholder="Digite seu nome"
              required
            />
          )}

          <div className="relative">
            <div className="absolute top-[34px] left-3 text-gray-400 z-10">
              <Mail size={18} />
            </div>
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute top-[34px] left-3 text-gray-400 z-10">
              <Lock size={18} />
            </div>
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              required
            />
          </div>

          {!isRegistering && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm font-semibold text-[#0b3296] hover:underline"
              >
                Esqueceu a senha?
              </button>
            </div>
          )}

          {/* Exibição de erro */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
              {errorMessage}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="!w-full flex items-center justify-center gap-2 py-3 text-base mt-2 disabled:opacity-70"
          >
            {isLoading
              ? "Aguarde..."
              : isRegistering
              ? "Criar Conta"
              : "Entrar"}
            {!isLoading && <LogIn size={18} />}
          </Button>
        </form>

        {/* Divisor */}
        <div className="relative flex items-center py-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">
            ou continue com
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Logins Sociais */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="light"
            className="flex items-center justify-center gap-2 !py-2.5"
          >
            <Globe size={18} className="text-gray-700" />
            <span className="text-sm text-gray-700">Google</span>
          </Button>
          <Button
            type="button"
            variant="light"
            className="flex items-center justify-center gap-2 !py-2.5"
          >
            <Code size={18} className="text-gray-700" />
            <span className="text-sm text-gray-700">GitHub</span>
          </Button>
        </div>

        {/* Alternar entre Login e Cadastro */}
        <p className="text-center text-sm text-gray-500 mt-8">
          {isRegistering ? "Já tem uma conta? " : "Ainda não tem conta? "}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="font-bold text-[#0b3296] hover:underline"
          >
            {isRegistering ? "Faça login" : "Cadastre-se"}
          </button>
        </p>
      </div>
    </div>
  );
};
