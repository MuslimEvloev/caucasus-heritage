import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage.jsx';
import HistoryPage from './components/HistoryPage/HistoryPage.jsx';
import RepublicHistoryPage from './components/HistoryPage/RepublicHistoryPage.jsx';
import KitchenPage from './components/KitchenPage/KitchenPage.jsx';
import RepublicKitchenPage from './components/KitchenPage/RepublicKitchenPage.jsx';
import RoutesPage from './components/RoutesPage/RoutesPage.jsx';
import RouteBuilderPage from './components/RoutesPage/RouteBuilderPage.jsx';
import AuthModal from './components/AuthForm/AuthModal.jsx';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/history/:republicId" element={<RepublicHistoryPage />} />
        <Route path="/kitchen" element={<KitchenPage />} />
        <Route path="/kitchen/:republicId" element={<RepublicKitchenPage />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/routes/:republicId" element={<RouteBuilderPage />} />
      </Routes>
      <AuthModal />
    </>
  );
}
