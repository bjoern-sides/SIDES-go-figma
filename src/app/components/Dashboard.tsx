import { TrendingUp, Users, Package, Euro, Sparkles, Lock, Unlock, Phone, AlertTriangle, Megaphone, Calendar, Bell, Star, Wallet, Clock, ShoppingBag, ChefHat, CreditCard, ChevronDown, Store, MapPin, Search, DoorClosed, Globe, ExternalLink, PackageX, Receipt, ShoppingCart, Menu, X, Home, BarChart3 } from 'lucide-react';
import logo from 'figma:asset/e5eb9a5e567a48219fa245e7d6c10af802f29421.png';
import logoDark from 'figma:asset/cfe4df707f23ad07e49fe048869fba9dc21f7eaa.png';
import { useState } from 'react';
import { StatusBar, ChannelStatus } from './StatusBar';
import { Checkbox } from './ui/checkbox';
import { Marketing } from './Marketing';
import { Hinweise } from './Hinweise';
import { Statistiken } from './Statistiken';

interface DashboardProps {
  onAIClick?: () => void;
  stores?: Array<any>;
  setStores?: (stores: Array<any>) => void;
  selectedStore?: string;
  setSelectedStore?: (store: string) => void;
}

export function Dashboard({ onAIClick, stores: propStores, setStores: propSetStores, selectedStore: propSelectedStore, setSelectedStore: propSetSelectedStore }: DashboardProps) {
  // Use internal state as fallback if props not provided
  const [internalSelectedStore, setInternalSelectedStore] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);
  const [isPortalPopupOpen, setIsPortalPopupOpen] = useState(false);
  const [isWebshopPopupOpen, setIsWebshopPopupOpen] = useState(false);
  const [isSoldOutPopupOpen, setIsSoldOutPopupOpen] = useState(false);
  const [soldOutDate, setSoldOutDate] = useState('');
  const [soldOutItem, setSoldOutItem] = useState('');
  const [soldOutReason, setSoldOutReason] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  
  // Navigation state
  const [currentView, setCurrentView] = useState<'dashboard' | 'marketing' | 'hinweise' | 'statistiken'>('dashboard');
  
  // Expense popup states
  const [isExpensePopupOpen, setIsExpensePopupOpen] = useState(false);
  const [expenseBuchungstext, setExpenseBuchungstext] = useState('');
  const [expenseKategorie, setExpenseKategorie] = useState('');
  const [expenseAktuellerBestand, setExpenseAktuellerBestand] = useState('5000');
  const [expenseBetrag, setExpenseBetrag] = useState('');
  const [expenseNeuerBestand, setExpenseNeuerBestand] = useState('5000');
  const [expenseSteuersatz, setExpenseSteuersatz] = useState('');
  const [expenseBelegNr, setExpenseBelegNr] = useState('');
  const [expenseKonto, setExpenseKonto] = useState('');
  
  // Calculate new balance when amount changes
  const handleExpenseBetragChange = (value: string) => {
    setExpenseBetrag(value);
    const currentBalance = parseFloat(expenseAktuellerBestand) || 0;
    const amount = parseFloat(value) || 0;
    const newBalance = currentBalance - amount;
    setExpenseNeuerBestand(newBalance.toFixed(2));
  };
  
  // Mock menu items for autocomplete
  const menuItems = [
    'Pizza Margherita',
    'Pizza Salami',
    'Pizza Funghi',
    'Pizza Quattro Formaggi',
    'Pizza Tonno',
    'Burger Classic',
    'Cheeseburger',
    'Veggie Burger',
    'Pasta Carbonara',
    'Pasta Bolognese',
    'Pasta Aglio e Olio',
    'Lasagne',
    'Salat Caesar',
    'Salat Caprese',
    'Tiramisu',
    'Panna Cotta',
    'Cola',
    'Sprite',
    'Wasser',
  ];
  
  // Filter menu items based on input
  const filteredMenuItems = soldOutItem 
    ? menuItems.filter(item => 
        item.toLowerCase().includes(soldOutItem.toLowerCase())
      )
    : [];
  
  // Sold out items per store
  const [soldOutItems, setSoldOutItems] = useState<Record<string, Array<{date: string, item: string, reason: string}>>>({
    store1: [],
    store2: [],
    store3: [],
    store4: []
  });

  // Mock data for multiple stores - now in state with channel status
  const [internalStores, setInternalStores] = useState([
    {
      id: 'store1',
      name: 'Berlin Mitte',
      address: 'Friedrichstraße 123',
      status: 'online',
      channels: {
        store: true,
        webshop: true,
        lieferando: false, // Lieferando geschlossen
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
        webshop: false, // Webshop geschlossen
        lieferando: true,
        uberEats: false, // Uber Eats geschlossen
        wolt: true,
      },
      webshopSettings: {
        delivery: false, // Lieferung geschlossen zum Testen
        pickup: false, // Abholung geschlossen zum Testen
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
        store: false, // Store geschlossen
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
        staffTotal: 10,
        staffSick: 0,
        inventory: 85,
        deliveryTime: 0,
        openOrders: 0,
        kitchenTime: 0,
        expenses: 0
      }
    }
  ]);
  
  // Use props if provided, otherwise use internal state
  const selectedStore = propSelectedStore ?? internalSelectedStore;
  const setSelectedStore = propSetSelectedStore ?? setInternalSelectedStore;
  const stores = propStores ?? internalStores;
  const setStores = propSetStores ?? setInternalStores;

  // Toggle channel status for specific store
  const toggleChannel = (storeId: string, channel: keyof ChannelStatus) => {
    setStores(prevStores => 
      prevStores.map(store => {
        if (store.id === storeId) {
          return {
            ...store,
            channels: {
              ...store.channels,
              [channel]: !store.channels[channel]
            }
          };
        }
        return store;
      })
    );
  };

  // Toggle webshop/app settings
  const toggleWebshopSetting = (storeId: string, setting: 'delivery' | 'pickup') => {
    console.log('=== TOGGLE WEBSHOP SETTING ===');
    console.log('Store ID:', storeId);
    console.log('Setting:', setting);
    console.log('Current stores:', stores);
    
    setStores(prevStores => {
      const updatedStores = prevStores.map(store => {
        if (store.id === storeId) {
          console.log(`Updating store ${store.name}, current ${setting}:`, store.webshopSettings[setting]);
          const newStore = {
            ...store,
            webshopSettings: {
              ...store.webshopSettings,
              [setting]: !store.webshopSettings[setting]
            }
          };
          console.log('New store webshopSettings:', newStore.webshopSettings);
          return newStore;
        }
        return store;
      });
      
      console.log('Updated stores:', updatedStores);
      return updatedStores;
    });
  };

  const toggleAppSetting = (storeId: string, setting: 'delivery' | 'pickup') => {
    setStores(prevStores => 
      prevStores.map(store => {
        if (store.id === storeId) {
          return {
            ...store,
            appSettings: {
              ...store.appSettings,
              [setting]: !store.appSettings[setting]
            }
          };
        }
        return store;
      })
    );
  };

  // Function to toggle store status
  const toggleStoreStatus = () => {
    if (selectedStore === 'all') return;
    
    setStores(prevStores => 
      prevStores.map(store => {
        if (store.id === selectedStore) {
          const newStatus = store.status === 'online' ? 'offline' : 'online';
          return {
            ...store,
            status: newStatus,
            // Reset stats when going offline
            stats: newStatus === 'offline' ? {
              ...store.stats,
              revenue: 0,
              orders: 0,
              staff: 0,
              deliveryTime: 0,
              openOrders: 0,
              kitchenTime: 0,
              expenses: 0
            } : store.stats
          };
        }
        return store;
      })
    );
  };

  // Calculate aggregated stats for all stores
  const aggregatedStats = {
    revenue: stores.reduce((sum, store) => sum + store.stats.revenue, 0),
    orders: stores.reduce((sum, store) => sum + store.stats.orders, 0),
    staff: stores.reduce((sum, store) => sum + store.stats.staff, 0),
    staffTotal: stores.reduce((sum, store) => sum + store.stats.staffTotal, 0),
    staffSick: stores.reduce((sum, store) => sum + store.stats.staffSick, 0),
    avgInventory: Math.round(stores.reduce((sum, store) => sum + store.stats.inventory, 0) / stores.length),
    avgDeliveryTime: Math.round(stores.filter(s => s.status === 'online').reduce((sum, store) => sum + store.stats.deliveryTime, 0) / stores.filter(s => s.status === 'online').length),
    openOrders: stores.reduce((sum, store) => sum + store.stats.openOrders, 0),
    avgKitchenTime: Math.round(stores.filter(s => s.status === 'online').reduce((sum, store) => sum + store.stats.kitchenTime, 0) / stores.filter(s => s.status === 'online').length),
    expenses: stores.reduce((sum, store) => sum + store.stats.expenses, 0),
    onlineStores: stores.filter(s => s.status === 'online').length,
    totalStores: stores.length
  };

  const currentStore = selectedStore === 'all' ? null : stores.find(s => s.id === selectedStore);



  const stats = selectedStore === 'all' ? [
    { 
      label: 'Gesamtumsatz', 
      value: `${aggregatedStats.revenue.toLocaleString('de-DE')}€`, 
      subtext: 'Heute',
      change: '+12%', 
      icon: Euro, 
      changeColor: 'text-primary'
    },
    { 
      label: 'Bestellungen', 
      value: aggregatedStats.orders.toString(), 
      subtext: 'Heute',
      change: '+8%', 
      icon: TrendingUp, 
      changeColor: 'text-chart-1'
    },
    { 
      label: 'Stores Online', 
      value: `${aggregatedStats.onlineStores}/${aggregatedStats.totalStores}`, 
      subtext: 'Aktiv',
      change: 'Gut', 
      icon: Store, 
      changeColor: 'text-chart-1'
    },
    { 
      label: 'Personal Gesamt', 
      value: `${aggregatedStats.staff}/${aggregatedStats.staffTotal}`, 
      subtext: `${aggregatedStats.staffSick} krank`,
      change: 'Im Dienst', 
      icon: Users, 
      changeColor: 'text-muted-foreground'
    },
    { 
      label: 'Ø Lagerbestand', 
      value: `${aggregatedStats.avgInventory}%`, 
      subtext: 'Durchschnitt',
      change: 'Ok', 
      icon: Package, 
      changeColor: 'text-chart-1'
    },
    { 
      label: 'Ø Lieferzeit', 
      value: `${aggregatedStats.avgDeliveryTime}`, 
      subtext: 'Minuten',
      change: 'Normal', 
      icon: Clock, 
      changeColor: 'text-chart-2'
    },
    { 
      label: 'Offene Bestellungen', 
      value: aggregatedStats.openOrders.toString(), 
      subtext: 'Gesamt',
      change: 'In Arbeit', 
      icon: ShoppingBag, 
      changeColor: 'text-chart-3'
    },
    { 
      label: 'Ø Küchenzeit', 
      value: `${aggregatedStats.avgKitchenTime}`, 
      subtext: 'Minuten',
      change: 'Schnell', 
      icon: ChefHat, 
      changeColor: 'text-chart-1'
    },
    { 
      label: 'Gesamtausgaben', 
      value: `${aggregatedStats.expenses.toLocaleString('de-DE')}`, 
      subtext: 'Heute',
      change: '+5%', 
      icon: CreditCard, 
      changeColor: 'text-destructive'
    },
  ] : [
    { 
      label: 'Umsatz', 
      value: `${currentStore?.stats.revenue.toLocaleString('de-DE')}€`, 
      subtext: 'Heute',
      change: '+12%', 
      icon: Euro, 
      changeColor: 'text-primary'
    },
    { 
      label: 'Bestellungen', 
      value: currentStore?.stats.orders.toString() || '0', 
      subtext: 'Heute',
      change: '+8%', 
      icon: TrendingUp, 
      changeColor: 'text-chart-1'
    },
    { 
      label: 'Personal', 
      value: currentStore?.stats.staff.toString() || '0', 
      subtext: `${currentStore?.stats.staffSick || 0} krank`,
      change: `von ${currentStore?.stats.staffTotal}`, 
      icon: Users, 
      changeColor: 'text-muted-foreground'
    },
    { 
      label: 'Lagerbestand', 
      value: `${currentStore?.stats.inventory}%`, 
      subtext: 'Gut',
      change: 'Ok', 
      icon: Package, 
      changeColor: 'text-chart-1'
    },
    { 
      label: 'Lieferzeit aktuell', 
      value: currentStore?.stats.deliveryTime.toString() || '0', 
      subtext: 'Durchschnitt',
      change: 'Normal', 
      icon: Clock, 
      changeColor: 'text-chart-2'
    },
    { 
      label: 'Offene Bestellungen', 
      value: currentStore?.stats.openOrders.toString() || '0', 
      subtext: 'In Bearbeitung',
      change: '3 neu', 
      icon: ShoppingBag, 
      changeColor: 'text-chart-3'
    },
    { 
      label: 'Küchenzeit', 
      value: currentStore?.stats.kitchenTime.toString() || '0', 
      subtext: 'Minuten',
      change: 'Schnell', 
      icon: ChefHat, 
      changeColor: 'text-chart-1'
    },
    { 
      label: 'Ausgaben', 
      value: `${currentStore?.stats.expenses.toLocaleString('de-DE')}€`, 
      subtext: 'Heute',
      change: '+5%', 
      icon: CreditCard, 
      changeColor: 'text-destructive'
    },
  ];

  const quickActions = [
    { id: 'close', icon: DoorClosed, label: 'Store schließen', color: 'bg-destructive/10 text-destructive' },
    { id: 'webshop', icon: Globe, label: 'Webshop schließen', color: 'bg-destructive/10 text-destructive' },
    { id: 'portals', icon: ExternalLink, label: 'Portale schließen', color: 'bg-destructive/10 text-destructive' },
    { id: 'soldOut', icon: PackageX, label: 'Artikel ausverkauft', color: 'bg-chart-3/10 text-chart-3' },
    { id: 'expense', icon: Receipt, label: 'Ausgabe anlegen', color: 'bg-chart-2/10 text-chart-2' },
    { id: 'marketing', icon: Megaphone, label: 'Marketing erstellen', color: 'bg-chart-1/10 text-chart-1' },
  ];

  const recentActivities = [
    { icon: Bell, text: 'Neue Krankmeldung: Maria Schmidt', time: 'vor 2 Std', color: 'text-destructive' },
    { icon: Star, text: '5 Sterne Bewertung erhalten', time: 'vor 3 Std', color: 'text-chart-3' },
    { icon: Wallet, text: 'Tagesumsatz 12% über Prognose', time: 'vor 4 Std', color: 'text-primary' },
    { icon: Package, text: 'Getränkelieferung angekommen', time: 'vor 5 Std', color: 'text-chart-2' },
  ];

  // Render different views based on currentView
  if (currentView === 'marketing') {
    return (
      <Marketing 
        selectedStore={selectedStore}
        stores={stores}
        onBack={() => setCurrentView('dashboard')}
        onStoreChange={setSelectedStore}
        onAIClick={onAIClick}
      />
    );
  }

  if (currentView === 'hinweise') {
    return (
      <Hinweise 
        selectedStore={selectedStore}
        stores={stores}
        onBack={() => setCurrentView('dashboard')}
        onStoreChange={setSelectedStore}
        onAIClick={onAIClick}
      />
    );
  }

  if (currentView === 'statistiken') {
    return (
      <Statistiken 
        selectedStore={selectedStore}
        stores={stores}
        onBack={() => setCurrentView('dashboard')}
        onStoreChange={setSelectedStore}
        onAIClick={onAIClick}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Status Bar for closed channels */}
      {selectedStore !== 'all' && currentStore && (
        <StatusBar 
          channels={currentStore.channels}
          webshopSettings={currentStore.webshopSettings}
          onChannelClick={(channel) => toggleChannel(selectedStore, channel)} 
        />
      )}
      
      {/* Floating Header */}
      <div className="px-4 pt-4 pb-2 bg-transparent">
        <div className="bg-white border border-border shadow-lg px-4 py-3 flex items-center justify-between" style={{ borderRadius: 'var(--radius-card)' }}>
          <img src={logoDark} alt="SIDES" className="h-7" />
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 pt-2 pb-4">
        {/* Current Store Indicator */}
        {selectedStore !== 'all' && currentStore && (
          <div className="relative mb-4">
            <button 
              onClick={() => setIsStoreDropdownOpen(!isStoreDropdownOpen)}
              className="bg-card border border-border p-3 shadow-sm w-full hover:border-primary/50 transition-colors text-left" 
              style={{ borderRadius: 'var(--radius-card)' }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ borderRadius: 'var(--radius)' }}>
                  <Store size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-0.5">Aktueller Store</div>
                  <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{currentStore.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin size={11} />
                    {currentStore.address}
                  </div>
                </div>
                <ChevronDown 
                  size={20} 
                  className={`text-muted-foreground transition-transform flex-shrink-0 ${isStoreDropdownOpen ? 'rotate-180' : ''}`} 
                />
              </div>
            </button>

            {/* Store Dropdown Menu */}
            {isStoreDropdownOpen && (
              <div 
                className="absolute top-full left-0 right-0 mt-2 bg-card border border-border shadow-lg z-50 max-h-96 overflow-y-auto"
                style={{ borderRadius: 'var(--radius-card)' }}
              >
                {/* All Stores Option */}
                <button
                  onClick={() => {
                    setSelectedStore('all');
                    setIsStoreDropdownOpen(false);
                  }}
                  className="w-full p-3 text-left hover:bg-muted transition-colors border-b border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ borderRadius: 'var(--radius)' }}>
                      <Store size={20} />
                    </div>
                    <div className="flex-1">
                      <div style={{ fontWeight: 'var(--font-weight-medium)' }}>Alle Stores</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Übersicht aller Standorte</div>
                    </div>
                  </div>
                </button>

                {/* Individual Stores */}
                {stores.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => {
                      setSelectedStore(store.id);
                      setIsStoreDropdownOpen(false);
                    }}
                    className={`w-full p-3 text-left hover:bg-muted transition-colors border-b border-border last:border-b-0 ${
                      selectedStore === store.id ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="bg-muted text-foreground w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ borderRadius: 'var(--radius)' }}>
                          <Store size={20} />
                        </div>
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${
                          store.status === 'online' ? 'bg-primary' : 'bg-destructive'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{store.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin size={11} />
                          {store.address}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Stats Slider */}
        <div className="overflow-x-auto mb-4 -mx-4 px-4">
          <div className="flex gap-3" style={{ width: 'max-content' }}>
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-card p-4 border border-border shadow-sm" style={{ borderRadius: 'var(--radius-card)', minWidth: '160px' }}>
                  <div className="flex flex-col items-center text-center">
                    <div className="text-xs text-muted-foreground mb-2" style={{ fontWeight: 'var(--font-weight-medium)' }}>{stat.label}</div>
                    <div className="text-2xl mb-0.5" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                      {stat.value}
                    </div>
                    <span className={`text-xs px-2 py-0.5 ${stat.changeColor} bg-muted`} style={{ borderRadius: 'var(--radius-badge)' }}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* All Stores View: Store Cards */}
        {selectedStore === 'all' && (
          <div className="mb-4">
            <h3 className="mb-3 px-1" style={{ fontFamily: 'Inter', fontWeight: 'var(--font-weight-medium)' }}>Store Übersicht</h3>
            <div className="space-y-3">
              {stores.map((store) => {
                // Get closed channels for this store
                const closedChannels = Object.entries(store.channels)
                  .filter(([_, isOpen]) => !isOpen)
                  .map(([channel, _]) => channel);
                
                const channelLabels: Record<string, string> = {
                  store: 'Store',
                  webshop: 'Webshop',
                  lieferando: 'Lieferando',
                  uberEats: 'Uber Eats',
                  wolt: 'Wolt'
                };

                return (
                  <button
                    key={store.id}
                    onClick={() => setSelectedStore(store.id)}
                    className="w-full bg-card border border-border p-4 hover:border-primary/50 transition-colors text-left"
                    style={{ borderRadius: 'var(--radius-card)' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-2 h-2 rounded-full ${store.status === 'online' ? 'bg-primary' : 'bg-destructive'}`}></div>
                          <h4 style={{ fontWeight: 'var(--font-weight-medium)' }}>{store.name}</h4>
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                          <MapPin size={12} />
                          {store.address}
                        </div>
                        
                        {/* Channel Status Badges */}
                        {closedChannels.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {closedChannels.map((channel) => (
                              <span 
                                key={channel}
                                className="bg-destructive/10 text-destructive px-2 py-0.5 text-xs border border-destructive/20" 
                                style={{ borderRadius: 'var(--radius-badge)', fontWeight: 'var(--font-weight-medium)' }}
                              >
                                {channelLabels[channel]}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 mt-3">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">Umsatz</div>
                        <div className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                          {store.stats.revenue > 0 ? `${store.stats.revenue.toLocaleString('de-DE')}€` : '-'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">Orders</div>
                        <div className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>{store.stats.orders}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">Lieferzeit</div>
                        <div className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                          {store.stats.deliveryTime > 0 ? `${store.stats.deliveryTime} min` : '-'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">Küche</div>
                        <div className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                          {store.stats.kitchenTime > 0 ? `${store.stats.kitchenTime} min` : '-'}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Single Store View: Quick Actions & Activities */}
        {selectedStore !== 'all' && (
          <>
            {/* Quick Actions */}
            <div className="bg-card p-4 border border-border shadow-sm mb-4" style={{ borderRadius: 'var(--radius-card)' }}>
              <h2 className="mb-3 flex items-center gap-2" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                <Sparkles size={18} className="text-foreground" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  const isChannelClosed = 
                    (action.id === 'close' && !currentStore?.channels.store) ||
                    (action.id === 'webshop' && !currentStore?.channels.webshop) ||
                    (action.id === 'portals' && (!currentStore?.channels.lieferando || !currentStore?.channels.uberEats || !currentStore?.channels.wolt));
                  
                  return (
                    <button
                      key={action.id}
                      onClick={() => {
                        if (action.id === 'close') toggleChannel(selectedStore, 'store');
                        else if (action.id === 'webshop') {
                          setIsWebshopPopupOpen(true);
                        }
                        else if (action.id === 'portals') {
                          setIsPortalPopupOpen(true);
                        }
                        else if (action.id === 'soldOut') {
                          setIsSoldOutPopupOpen(true);
                        }
                        else if (action.id === 'expense') {
                          setIsExpensePopupOpen(true);
                        }
                        else if (action.id === 'marketing') {
                          setCurrentView('marketing');
                        }
                      }}
                      className={`p-3 flex flex-col items-center gap-2 transition-all active:scale-95 ${
                        isChannelClosed || (action.id === 'webshop' && (!currentStore?.webshopSettings?.delivery || !currentStore?.webshopSettings?.pickup))
                          ? 'bg-destructive text-destructive-foreground border-destructive'
                          : 'bg-card border border-border text-foreground hover:bg-foreground hover:text-background hover:border-foreground'
                      }`}
                      style={{ borderRadius: 'var(--radius-button)' }}
                    >
                      <Icon size={22} />
                      <span className="text-xs text-center leading-tight">
                        {action.id === 'close' 
                          ? currentStore?.channels.store ? 'Store schließen' : 'Store öffnen'
                          : action.id === 'webshop'
                          ? currentStore?.channels.webshop ? 'Webshop schließen' : 'Webshop öffnen'
                          : action.id === 'portals'
                          ? (currentStore?.channels.lieferando && currentStore?.channels.uberEats && currentStore?.channels.wolt) ? 'Portale schließen' : 'Portale öffnen'
                          : action.label
                        }
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sold Out Items Card */}
            {soldOutItems[selectedStore] && soldOutItems[selectedStore].length > 0 && (
              <div className="bg-card border border-border shadow-sm overflow-hidden mb-4" style={{ borderRadius: 'var(--radius-card)' }}>
                <div className="bg-muted/50 px-4 py-3 border-b border-border">
                  <h3 className="flex items-center gap-2" style={{ fontFamily: 'Inter', fontWeight: 'var(--font-weight-medium)' }}>
                    <PackageX size={18} />
                    Ausverkaufte Artikel
                  </h3>
                </div>
                
                <div className="p-4 space-y-3">
                  {soldOutItems[selectedStore].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-muted/30 border border-border" style={{ borderRadius: 'var(--radius)' }}>
                      <div className="text-destructive w-9 h-9 bg-destructive/10 flex items-center justify-center flex-shrink-0" style={{ borderRadius: 'var(--radius)' }}>
                        <PackageX size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>{item.item}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.reason}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <Calendar size={12} className="inline mr-1" />
                          {new Date(item.date).toLocaleDateString('de-DE')}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSoldOutItems(prev => ({
                            ...prev,
                            [selectedStore]: prev[selectedStore].filter((_, i) => i !== idx)
                          }));
                        }}
                        className="p-2 hover:bg-destructive/10 transition-colors text-destructive flex-shrink-0"
                        style={{ borderRadius: 'var(--radius)' }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Activities */}
            <div className="bg-card border border-border shadow-sm overflow-hidden mb-4" style={{ borderRadius: 'var(--radius-card)' }}>
              <div className="bg-muted/50 px-4 py-3 border-b border-border">
                <h3 style={{ fontFamily: 'Inter', fontWeight: 'var(--font-weight-medium)' }}>Letzte Aktivitäten</h3>
              </div>
              
              <div className="p-4 space-y-3">
                {recentActivities.map((activity, idx) => {
                  const Icon = activity.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="text-foreground w-9 h-9 bg-muted flex items-center justify-center flex-shrink-0" style={{ borderRadius: 'var(--radius)' }}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{activity.text}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* AI Assistant Hint */}
        <button 
          onClick={onAIClick}
          className="w-full bg-card border border-primary/20 p-4 shadow-sm hover:border-primary/30 transition-all active:scale-98 text-left" 
          style={{ borderRadius: 'var(--radius-card)' }}
        >
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ borderRadius: 'var(--radius)' }}>
              <Sparkles size={20} />
            </div>
            <div className="flex-1">
              <h4 className="mb-1">SIDES KI Assistant</h4>
              <p className="text-sm text-muted-foreground mb-3">
                {selectedStore === 'all' 
                  ? 'Stelle Fragen zu allen Stores oder vergleiche Performance-Daten.'
                  : 'Klicke hier, um den Assistenten zu öffnen und Fragen zu stellen.'
                }
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedStore === 'all' ? (
                  <>
                    <span className="bg-card px-2 py-1 text-xs border border-border" style={{ borderRadius: 'var(--radius)' }}>Bester Store?</span>
                    <span className="bg-card px-2 py-1 text-xs border border-border" style={{ borderRadius: 'var(--radius)' }}>Vergleich zeigen</span>
                    <span className="bg-card px-2 py-1 text-xs border border-border" style={{ borderRadius: 'var(--radius)' }}>Probleme finden</span>
                  </>
                ) : (
                  <>
                    <span className="bg-card px-2 py-1 text-xs border border-border" style={{ borderRadius: 'var(--radius)' }}>Umsatz abfragen</span>
                    <span className="bg-card px-2 py-1 text-xs border border-border" style={{ borderRadius: 'var(--radius)' }}>Personal prüfen</span>
                    <span className="bg-card px-2 py-1 text-xs border border-border" style={{ borderRadius: 'var(--radius)' }}>Marketing starten</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Portal Selection Popup */}
      {isPortalPopupOpen && currentStore && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50" onClick={() => setIsPortalPopupOpen(false)}>
          <div 
            className="bg-card w-full max-w-md mb-0 p-6 border-t border-border" 
            style={{ borderRadius: 'var(--radius-card) var(--radius-card) 0 0' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontWeight: 'var(--font-weight-medium)' }}>Portale verwalten</h3>
              <button
                onClick={() => setIsPortalPopupOpen(false)}
                className="p-2 hover:bg-muted transition-colors text-foreground"
                style={{ borderRadius: 'var(--radius)' }}
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Wähle die Portale, die du öffnen oder schließen möchtest:
            </p>
            
            <div className="space-y-3">
              {/* Lieferando */}
              <button
                onClick={() => toggleChannel(selectedStore, 'lieferando')}
                className="w-full p-4 border border-border flex items-center justify-between hover:bg-muted transition-colors"
                style={{ borderRadius: 'var(--radius)' }}
              >
                <div className="flex items-center gap-3">
                  <Checkbox 
                    checked={currentStore.channels.lieferando}
                    onCheckedChange={() => toggleChannel(selectedStore, 'lieferando')}
                  />
                  <span className="text-sm" style={{ fontWeight: 'var(--font-weight-regular)' }}>Lieferando</span>
                </div>
                <span className={`text-xs px-2 py-1 ${
                  currentStore.channels.lieferando 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-destructive/10 text-destructive'
                }`} style={{ borderRadius: 'var(--radius-badge)' }}>
                  {currentStore.channels.lieferando ? 'Geöffnet' : 'Geschlossen'}
                </span>
              </button>
              
              {/* Uber Eats */}
              <button
                onClick={() => toggleChannel(selectedStore, 'uberEats')}
                className="w-full p-4 border border-border flex items-center justify-between hover:bg-muted transition-colors"
                style={{ borderRadius: 'var(--radius)' }}
              >
                <div className="flex items-center gap-3">
                  <Checkbox 
                    checked={currentStore.channels.uberEats}
                    onCheckedChange={() => toggleChannel(selectedStore, 'uberEats')}
                  />
                  <span className="text-sm" style={{ fontWeight: 'var(--font-weight-regular)' }}>Uber Eats</span>
                </div>
                <span className={`text-xs px-2 py-1 ${
                  currentStore.channels.uberEats 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-destructive/10 text-destructive'
                }`} style={{ borderRadius: 'var(--radius-badge)' }}>
                  {currentStore.channels.uberEats ? 'Geöffnet' : 'Geschlossen'}
                </span>
              </button>
              
              {/* Wolt */}
              <button
                onClick={() => toggleChannel(selectedStore, 'wolt')}
                className="w-full p-4 border border-border flex items-center justify-between hover:bg-muted transition-colors"
                style={{ borderRadius: 'var(--radius)' }}
              >
                <div className="flex items-center gap-3">
                  <Checkbox 
                    checked={currentStore.channels.wolt}
                    onCheckedChange={() => toggleChannel(selectedStore, 'wolt')}
                  />
                  <span className="text-sm" style={{ fontWeight: 'var(--font-weight-regular)' }}>Wolt</span>
                </div>
                <span className={`text-xs px-2 py-1 ${
                  currentStore.channels.wolt 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-destructive/10 text-destructive'
                }`} style={{ borderRadius: 'var(--radius-badge)' }}>
                  {currentStore.channels.wolt ? 'Geöffnet' : 'Geschlossen'}
                </span>
              </button>
            </div>
            
            <button
              onClick={() => setIsPortalPopupOpen(false)}
              className="w-full mt-4 bg-primary text-primary-foreground px-4 py-3 hover:opacity-90 transition-opacity"
              style={{ borderRadius: 'var(--radius-button)', fontWeight: 'var(--font-weight-medium)' }}
            >
              Fertig
            </button>
          </div>
        </div>
      )}

      {/* Webshop Settings Popup */}
      {isWebshopPopupOpen && currentStore && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50" onClick={() => setIsWebshopPopupOpen(false)}>
          <div 
            className="bg-card w-full max-w-md mb-0 p-6 border-t border-border" 
            style={{ borderRadius: 'var(--radius-card) var(--radius-card) 0 0' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontWeight: 'var(--font-weight-medium)' }}>Webshop-Einstellungen</h3>
              <button
                onClick={() => setIsWebshopPopupOpen(false)}
                className="p-2 hover:bg-muted transition-colors text-foreground"
                style={{ borderRadius: 'var(--radius)' }}
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Wähle die Optionen, die du im Webshop aktivieren oder deaktivieren möchtest:
            </p>
            
            <div className="space-y-3">
              {/* Lieferung */}
              <div
                className="w-full p-4 border border-border flex items-center justify-between"
                style={{ borderRadius: 'var(--radius)' }}
              >
                <div className="flex items-center gap-3">
                  <Checkbox 
                    checked={currentStore.webshopSettings.delivery}
                    onCheckedChange={() => toggleWebshopSetting(selectedStore, 'delivery')}
                  />
                  <span className="text-sm" style={{ fontWeight: 'var(--font-weight-regular)' }}>Lieferung</span>
                </div>
                <span className={`text-xs px-2 py-1 ${
                  currentStore.webshopSettings.delivery 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-destructive/10 text-destructive'
                }`} style={{ borderRadius: 'var(--radius-badge)' }}>
                  {currentStore.webshopSettings.delivery ? 'Geöffnet' : 'Geschlossen'}
                </span>
              </div>
              
              {/* Abholung */}
              <div
                className="w-full p-4 border border-border flex items-center justify-between"
                style={{ borderRadius: 'var(--radius)' }}
              >
                <div className="flex items-center gap-3">
                  <Checkbox 
                    checked={currentStore.webshopSettings.pickup}
                    onCheckedChange={() => toggleWebshopSetting(selectedStore, 'pickup')}
                  />
                  <span className="text-sm" style={{ fontWeight: 'var(--font-weight-regular)' }}>Abholung</span>
                </div>
                <span className={`text-xs px-2 py-1 ${
                  currentStore.webshopSettings.pickup 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-destructive/10 text-destructive'
                }`} style={{ borderRadius: 'var(--radius-badge)' }}>
                  {currentStore.webshopSettings.pickup ? 'Geöffnet' : 'Geschlossen'}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setIsWebshopPopupOpen(false)}
              className="w-full mt-4 bg-primary text-primary-foreground px-4 py-3 hover:opacity-90 transition-opacity"
              style={{ borderRadius: 'var(--radius-button)', fontWeight: 'var(--font-weight-medium)' }}
            >
              Fertig
            </button>
          </div>
        </div>
      )}

      {/* Sold Out Item Popup */}
      {isSoldOutPopupOpen && currentStore && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50" onClick={() => setIsSoldOutPopupOpen(false)}>
          <div 
            className="bg-card w-full max-w-md mb-0 p-6 border-t border-border" 
            style={{ borderRadius: 'var(--radius-card) var(--radius-card) 0 0' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontWeight: 'var(--font-weight-medium)' }}>Artikel ausverkauft</h3>
              <button
                onClick={() => setIsSoldOutPopupOpen(false)}
                className="p-2 hover:bg-muted transition-colors text-foreground"
                style={{ borderRadius: 'var(--radius)' }}
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Gib die Details des ausverkaufte Artikels ein:
            </p>
            
            <div className="space-y-3">
              {/* Item Name */}
              <div className="relative">
                <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-regular)' }}>
                  Artikelname
                </label>
                <input
                  type="text"
                  placeholder="z.B. Pizza Margherita"
                  value={soldOutItem}
                  onChange={(e) => {
                    setSoldOutItem(e.target.value);
                    setShowAutocomplete(true);
                  }}
                  onFocus={() => setShowAutocomplete(true)}
                  onBlur={() => {
                    // Delay to allow click on autocomplete item
                    setTimeout(() => setShowAutocomplete(false), 150);
                  }}
                  className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-all"
                  style={{ borderRadius: 'var(--radius-input)', fontSize: 'var(--text-sm)' }}
                />
                {showAutocomplete && filteredMenuItems.length > 0 && (
                  <div 
                    className="absolute w-full mt-1 bg-card border border-border shadow-lg max-h-40 overflow-y-auto z-[60]" 
                    style={{ borderRadius: 'var(--radius-card)', pointerEvents: 'auto' }}
                  >
                    {filteredMenuItems.map(item => (
                      <button
                        key={item}
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSoldOutItem(item);
                          setShowAutocomplete(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm hover:bg-muted transition-colors border-b border-border last:border-b-0"
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Date */}
              <div>
                <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-regular)' }}>
                  Ausverkauft bis
                </label>
                <input
                  type="date"
                  value={soldOutDate}
                  onChange={(e) => setSoldOutDate(e.target.value)}
                  className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-all"
                  style={{ borderRadius: 'var(--radius-input)', fontSize: 'var(--text-sm)' }}
                />
              </div>
              
              {/* Reason */}
              <div>
                <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-regular)' }}>
                  Grund
                </label>
                <input
                  type="text"
                  placeholder="z.B. Lieferung verspätet"
                  value={soldOutReason}
                  onChange={(e) => setSoldOutReason(e.target.value)}
                  className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-all"
                  style={{ borderRadius: 'var(--radius-input)', fontSize: 'var(--text-sm)' }}
                />
              </div>
            </div>
            
            <button
              onClick={() => {
                if (soldOutDate && soldOutItem && soldOutReason) {
                  setSoldOutItems(prev => ({
                    ...prev,
                    [selectedStore]: [...(prev[selectedStore] || []), { date: soldOutDate, item: soldOutItem, reason: soldOutReason }]
                  }));
                  setSoldOutDate('');
                  setSoldOutItem('');
                  setSoldOutReason('');
                  setIsSoldOutPopupOpen(false);
                }
              }}
              className="w-full mt-4 bg-primary text-primary-foreground px-4 py-3 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ borderRadius: 'var(--radius-button)', fontWeight: 'var(--font-weight-medium)' }}
              disabled={!soldOutDate || !soldOutItem || !soldOutReason}
            >
              Speichern
            </button>
          </div>
        </div>
      )}

      {/* Expense Popup */}
      {isExpensePopupOpen && currentStore && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50" onClick={() => setIsExpensePopupOpen(false)}>
          <div 
            className="bg-card w-full max-w-md mb-0 p-6 border-t border-border" 
            style={{ borderRadius: 'var(--radius-card) var(--radius-card) 0 0' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontWeight: 'var(--font-weight-medium)' }}>Ausgabe anlegen</h3>
              <button
                onClick={() => setIsExpensePopupOpen(false)}
                className="p-2 hover:bg-muted transition-colors text-foreground"
                style={{ borderRadius: 'var(--radius)' }}
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Gib die Details der Ausgabe ein:
            </p>
            
            <div className="space-y-3">
              {/* Buchungstext */}
              <div>
                <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-regular)' }}>
                  Buchungstext
                </label>
                <input
                  type="text"
                  placeholder="z.B. Getränkelieferung"
                  value={expenseBuchungstext}
                  onChange={(e) => setExpenseBuchungstext(e.target.value)}
                  className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-all"
                  style={{ borderRadius: 'var(--radius-input)', fontSize: 'var(--text-sm)' }}
                />
              </div>
              
              {/* Kategorie */}
              <div>
                <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-regular)' }}>
                  Kategorie
                </label>
                <input
                  type="text"
                  placeholder="z.B. Lieferkosten"
                  value={expenseKategorie}
                  onChange={(e) => setExpenseKategorie(e.target.value)}
                  className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-all"
                  style={{ borderRadius: 'var(--radius-input)', fontSize: 'var(--text-sm)' }}
                />
              </div>
              
              {/* Aktueller Bestand */}
              <div>
                <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-regular)' }}>
                  Aktueller Bestand
                </label>
                <input
                  type="text"
                  placeholder="z.B. 5000"
                  value={expenseAktuellerBestand}
                  onChange={(e) => setExpenseAktuellerBestand(e.target.value)}
                  className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-all"
                  style={{ borderRadius: 'var(--radius-input)', fontSize: 'var(--text-sm)' }}
                />
              </div>
              
              {/* Betrag */}
              <div>
                <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-regular)' }}>
                  Betrag
                </label>
                <input
                  type="text"
                  placeholder="z.B. 100"
                  value={expenseBetrag}
                  onChange={(e) => handleExpenseBetragChange(e.target.value)}
                  className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-all"
                  style={{ borderRadius: 'var(--radius-input)', fontSize: 'var(--text-sm)' }}
                />
              </div>
              
              {/* Neuer Bestand */}
              <div>
                <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-regular)' }}>
                  Neuer Bestand
                </label>
                <input
                  type="text"
                  placeholder="z.B. 4900"
                  value={expenseNeuerBestand}
                  onChange={(e) => setExpenseNeuerBestand(e.target.value)}
                  className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-all"
                  style={{ borderRadius: 'var(--radius-input)', fontSize: 'var(--text-sm)' }}
                />
              </div>
              
              {/* Steuersatz */}
              <div>
                <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-regular)' }}>
                  Steuersatz
                </label>
                <select
                  value={expenseSteuersatz}
                  onChange={(e) => setExpenseSteuersatz(e.target.value)}
                  className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-all"
                  style={{ borderRadius: 'var(--radius-input)', fontSize: 'var(--text-sm)' }}
                >
                  <option value="">Steuersatz wählen</option>
                  <option value="0">0%</option>
                  <option value="7">7%</option>
                  <option value="19">19%</option>
                </select>
              </div>
              
              {/* Belegnummer */}
              <div>
                <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-regular)' }}>
                  Belegnummer
                </label>
                <input
                  type="text"
                  placeholder="z.B. 12345"
                  value={expenseBelegNr}
                  onChange={(e) => setExpenseBelegNr(e.target.value)}
                  className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-all"
                  style={{ borderRadius: 'var(--radius-input)', fontSize: 'var(--text-sm)' }}
                />
              </div>
              
              {/* Konto */}
              <div>
                <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-regular)' }}>
                  Konto
                </label>
                <input
                  type="text"
                  placeholder="z.B. 5000"
                  value={expenseKonto}
                  onChange={(e) => setExpenseKonto(e.target.value)}
                  className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-all"
                  style={{ borderRadius: 'var(--radius-input)', fontSize: 'var(--text-sm)' }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-4">
              <button
                onClick={() => setIsExpensePopupOpen(false)}
                className="px-4 py-3 bg-muted text-foreground border border-border hover:bg-muted/80 transition-opacity"
                style={{ borderRadius: 'var(--radius-button)', fontWeight: 'var(--font-weight-medium)' }}
              >
                Zurück
              </button>
              <button
                onClick={() => {
                  if (expenseBuchungstext && expenseKategorie && expenseAktuellerBestand && expenseBetrag && expenseNeuerBestand && expenseSteuersatz && expenseBelegNr && expenseKonto) {
                    // Add expense logic here
                    setExpenseBuchungstext('');
                    setExpenseKategorie('');
                    setExpenseAktuellerBestand('5000');
                    setExpenseBetrag('');
                    setExpenseNeuerBestand('5000');
                    setExpenseSteuersatz('');
                    setExpenseBelegNr('');
                    setExpenseKonto('');
                    setIsExpensePopupOpen(false);
                  }
                }}
                className="px-4 py-3 bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ borderRadius: 'var(--radius-button)', fontWeight: 'var(--font-weight-medium)' }}
                disabled={!expenseBuchungstext || !expenseKategorie || !expenseAktuellerBestand || !expenseBetrag || !expenseNeuerBestand || !expenseSteuersatz || !expenseBelegNr || !expenseKonto}
              >
                Speichern
              </button>
              <button
                onClick={() => {
                  if (expenseBuchungstext && expenseKategorie && expenseAktuellerBestand && expenseBetrag && expenseNeuerBestand && expenseSteuersatz && expenseBelegNr && expenseKonto) {
                    // Add expense logic here
                    // Reset form for new entry
                    setExpenseBuchungstext('');
                    setExpenseKategorie('');
                    setExpenseAktuellerBestand('5000');
                    setExpenseBetrag('');
                    setExpenseNeuerBestand('5000');
                    setExpenseSteuersatz('');
                    setExpenseBelegNr('');
                    setExpenseKonto('');
                    // Keep popup open
                  }
                }}
                className="px-4 py-3 bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ borderRadius: 'var(--radius-button)', fontWeight: 'var(--font-weight-medium)' }}
                disabled={!expenseBuchungstext || !expenseKategorie || !expenseAktuellerBestand || !expenseBetrag || !expenseNeuerBestand || !expenseSteuersatz || !expenseBelegNr || !expenseKonto}
              >
                Speichern und Neu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
        <div className="grid grid-cols-4 h-16">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              currentView === 'dashboard' 
                ? 'text-primary bg-primary/5' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Home size={20} />
            <span className="text-xs" style={{ fontWeight: 'var(--font-weight-medium)' }}>Dashboard</span>
          </button>
          
          <button
            onClick={() => setCurrentView('statistiken')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              currentView === 'statistiken' 
                ? 'text-primary bg-primary/5' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <BarChart3 size={20} />
            <span className="text-xs" style={{ fontWeight: 'var(--font-weight-medium)' }}>Statistiken</span>
          </button>
          
          <button
            onClick={() => setCurrentView('hinweise')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              currentView === 'hinweise' 
                ? 'text-primary bg-primary/5' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <AlertTriangle size={20} />
            <span className="text-xs" style={{ fontWeight: 'var(--font-weight-medium)' }}>Hinweise</span>
          </button>
          
          <button
            onClick={() => setCurrentView('marketing')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              currentView === 'marketing' 
                ? 'text-primary bg-primary/5' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Megaphone size={20} />
            <span className="text-xs" style={{ fontWeight: 'var(--font-weight-medium)' }}>Marketing</span>
          </button>
        </div>
      </div>
    </div>
  );
}