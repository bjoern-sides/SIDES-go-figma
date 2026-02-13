import { Dashboard } from './components/Dashboard';
import { Hinweise } from './components/Hinweise';
import { Marketing } from './components/Marketing';
import { Statistiken } from './components/Statistiken';
import { Bewertungen } from './components/Bewertungen';
import { Finanzen } from './components/Finanzen';
import { AIAssistant } from './components/AIAssistant';
import { Login } from './components/Login';
import { BottomNav } from './components/BottomNav';
import { useState } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAIOpen, setIsAIOpen] = useState(false);
  
  // Shared state for stores - moved from Dashboard
  const [selectedStore, setSelectedStore] = useState('all');
  const [stores, setStores] = useState([
    {
      id: 'store1',
      name: 'Berlin Mitte',
      address: 'Friedrichstraße 123',
      status: 'online',
      channels: {
        store: true,
        webshop: true,
        lieferando: false,
        uberEats: true,
        wolt: true,
      },
      webshopSettings: {
        delivery: false, // Lieferung geschlossen zum Testen
        pickup: true,
      },
      appSettings: {
        delivery: true,
        pickup: true,
      },
      stats: {
        revenue: 2847,
        orders: 47,
        staff: 8,
        staffTotal: 12,
        staffSick: 1,
        inventory: 89,
        deliveryTime: 28,
        openOrders: 12,
        kitchenTime: 18,
        expenses: 1243
      }
    },
    {
      id: 'store2',
      name: 'Hamburg Altona',
      address: 'Ottenser Hauptstraße 45',
      status: 'online',
      channels: {
        store: true,
        webshop: false,
        lieferando: true,
        uberEats: false,
        wolt: true,
      },
      webshopSettings: {
        delivery: false,
        pickup: false,
      },
      appSettings: {
        delivery: true,
        pickup: false,
      },
      stats: {
        revenue: 3254,
        orders: 52,
        staff: 10,
        staffTotal: 14,
        staffSick: 0,
        inventory: 92,
        deliveryTime: 25,
        openOrders: 8,
        kitchenTime: 16,
        expenses: 1456
      }
    },
    {
      id: 'store3',
      name: 'München Schwabing',
      address: 'Leopoldstraße 78',
      status: 'online',
      channels: {
        store: true,
        webshop: true,
        lieferando: true,
        uberEats: true,
        wolt: true,
      },
      webshopSettings: {
        delivery: true,
        pickup: true,
      },
      appSettings: {
        delivery: true,
        pickup: true,
      },
      stats: {
        revenue: 3812,
        orders: 61,
        staff: 11,
        staffTotal: 15,
        staffSick: 2,
        inventory: 76,
        deliveryTime: 32,
        openOrders: 15,
        kitchenTime: 22,
        expenses: 1678
      }
    },
    {
      id: 'store4',
      name: 'Köln Ehrenfeld',
      address: 'Venloer Straße 234',
      status: 'offline',
      channels: {
        store: false,
        webshop: false,
        lieferando: false,
        uberEats: false,
        wolt: false,
      },
      webshopSettings: {
        delivery: false,
        pickup: false,
      },
      appSettings: {
        delivery: false,
        pickup: false,
      },
      stats: {
        revenue: 0,
        orders: 0,
        staff: 0,
        staffTotal: 8,
        staffSick: 0,
        inventory: 0,
        deliveryTime: 0,
        openOrders: 0,
        kitchenTime: 0,
        expenses: 0
      }
    }
  ]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(tab);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            onAIClick={() => setIsAIOpen(true)}
            stores={stores}
            setStores={setStores}
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
          />
        );
      case 'hinweise':
        return (
          <Hinweise 
            stores={stores}
            selectedStore={selectedStore}
            onStoreChange={setSelectedStore}
            onAIClick={() => setIsAIOpen(true)}
          />
        );
      case 'marketing':
        return <Marketing />;
      case 'statistiken':
        return <Statistiken />;
      case 'bewertungen':
        return <Bewertungen />;
      case 'finanzen':
        return <Finanzen />;
      default:
        return (
          <Dashboard 
            onAIClick={() => setIsAIOpen(true)}
            stores={stores}
            setStores={setStores}
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
          />
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden pb-16">
            {renderContent()}
          </div>

          {/* Bottom Navigation */}
          <BottomNav 
            activeTab={activeTab} 
            onTabChange={handleTabChange}
            onAIClick={() => setIsAIOpen(true)}
          />

          {/* AI Assistant */}
          <AIAssistant 
            isOpen={isAIOpen} 
            onClose={() => setIsAIOpen(false)} 
          />
        </>
      )}
    </div>
  );
}