import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { MainLayout } from '../layouts/MainLayout';
import { Home } from '../pages/Home';
import { Search } from '../pages/Search';
import { MyTickets } from '../pages/MyTickets';
import { Profile } from '../pages/Profile';
import { EventDetails } from '../pages/EventDetails';
import { Checkout } from '../pages/Checkout';
import { Login } from '../pages/Login';
import { CreateEvent } from '../pages/CreateEvent';
import { ProtectedRoute } from '../components/common/ProtectedRoute';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/search" element={<MainLayout><Search /></MainLayout>} />
        <Route path="/tickets" element={<ProtectedRoute><MainLayout><MyTickets /></MainLayout></ProtectedRoute>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />

        <Route path="/event/create" element={<ProtectedRoute><MainLayout><CreateEvent /></MainLayout></ProtectedRoute>} />
        <Route path="/event/:id" element={<MainLayout><EventDetails /></MainLayout>} />
        <Route path="/checkout" element={<ProtectedRoute><MainLayout><Checkout /></MainLayout></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};