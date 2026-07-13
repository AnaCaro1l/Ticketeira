import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importando o Layout Base
import { MainLayout } from '../layouts/MainLayout';

// Importando as Páginas
import { Home } from '../pages/Home';
import { Search } from '../pages/Search';
import { MyTickets } from '../pages/MyTickets';
import { Profile } from '../pages/Profile';
import { EventDetails } from '../pages/EventDetails';
import { Checkout } from '../pages/Checkout';
import { Login } from '../pages/Login';
import { CreateEvent } from '../pages/CreateEvent';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Pública (Tela limpa, sem o menu) */}
        <Route path="/login" element={<Login />} />

        {/* Rotas Privadas / Principais (Com o menu MainLayout) */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/search" element={<MainLayout><Search /></MainLayout>} />
        <Route path="/tickets" element={<MainLayout><MyTickets /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />

        <Route path="/event/create" element={<MainLayout><CreateEvent /></MainLayout>} />
        <Route path="/event/:id" element={<MainLayout><EventDetails /></MainLayout>} />
        <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />

        {/* Fallback de Segurança: Se não achar a URL, manda pro início */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};