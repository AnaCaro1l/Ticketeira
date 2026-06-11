import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { MainLayout } from './layouts/MainLayout';

// Páginas
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { MyTickets } from './pages/MyTickets';
import { Profile } from './pages/Profile';
import { EventDetails } from './pages/EventDetails';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Pública (Sem Menu) */}
        <Route path="/login" element={<Login />} />

        {/* Rotas Privadas (Com Menu) */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/search" element={<MainLayout><Search /></MainLayout>} />
        <Route path="/tickets" element={<MainLayout><MyTickets /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
        
        {/* Rotas de Fluxo de Compra */}
        <Route path="/event" element={<MainLayout><EventDetails /></MainLayout>} />
        <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />

        {/* Fallback: se o usuário digitar uma URL que não existe, manda pra Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;