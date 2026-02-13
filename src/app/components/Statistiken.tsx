import { BarChart3, TrendingUp, TrendingDown, Euro, ShoppingBag, Users, Clock, Sparkles, Menu, X, ChevronDown, Store, MapPin } from 'lucide-react';
import logoDark from 'figma:asset/cfe4df707f23ad07e49fe048869fba9dc21f7eaa.png';
import { useState } from 'react';

interface StatistikenProps {
  selectedStore?: string;
  stores?: Array<{
    id: string;
    name: string;
    address: string;
    status: string;
  }>;
  onBack?: () => void;
  onStoreChange?: (storeId: string) => void;
  onAIClick?: () => void;
}

export function Statistiken({ selectedStore: propSelectedStore, stores: propStores, onBack, onStoreChange, onAIClick }: StatistikenProps) {
  const [internalSelectedStore, setInternalSelectedStore] = useState('all');
  const [internalStores] = useState([
    { id: 'store1', name: 'Berlin Mitte', address: 'Friedrichstraße 123', status: 'online' },
    { id: 'store2', name: 'München Schwabing', address: 'Leopoldstraße 45', status: 'online' },
    { id: 'store3', name: 'Hamburg Altona', address: 'Ottenser Hauptstraße 78', status: 'online' },
    { id: 'store4', name: 'Köln Ehrenfeld', address: 'Venloer Straße 234', status: 'online' }
  ]);

  const selectedStore = propSelectedStore ?? internalSelectedStore;
  const stores = propStores ?? internalStores;
  
  const handleStoreChange = (storeId: string) => {
    if (onStoreChange) {
      onStoreChange(storeId);
    } else {
      setInternalSelectedStore(storeId);
    }
  };
  
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');
  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);

  const currentStore = selectedStore === 'all' ? null : stores.find(s => s.id === selectedStore);

  // Mock statistics data
  const stats = {
    today: {
      revenue: 12458,
      revenueChange: +12.5,
      orders: 187,
      ordersChange: +8.3,
      avgOrderValue: 66.62,
      avgOrderValueChange: +3.8,
      customers: 142,
      customersChange: +15.2,
      peakHour: '18:00-19:00',
      avgDeliveryTime: 28,
      deliveryTimeChange: -5.2
    },
    week: {
      revenue: 78945,
      revenueChange: +15.8,
      orders: 1247,
      ordersChange: +12.4,
      avgOrderValue: 63.31,
      avgOrderValueChange: +2.1,
      customers: 892,
      customersChange: +18.5,
      peakHour: 'Fr 19:00-20:00',
      avgDeliveryTime: 26,
      deliveryTimeChange: -8.4
    },
    month: {
      revenue: 324567,
      revenueChange: +21.3,
      orders: 5123,
      ordersChange: +16.7,
      avgOrderValue: 63.35,
      avgOrderValueChange: +4.2,
      customers: 3456,
      customersChange: +23.8,
      peakHour: 'Sa 19:00-20:00',
      avgDeliveryTime: 27,
      deliveryTimeChange: -6.1
    }
  };

  const currentStats = stats[timeRange];

  // Top products
  const topProducts = [
    { name: 'Pizza Margherita', sales: 234, revenue: 2574 },
    { name: 'Burger Classic', sales: 189, revenue: 2079 },
    { name: 'Pasta Carbonara', sales: 156, revenue: 1872 },
    { name: 'Pizza Salami', sales: 145, revenue: 1595 },
    { name: 'Caesar Salat', sales: 98, revenue: 882 }
  ];

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 bg-transparent">
        <div className="bg-white border border-border shadow-lg px-4 py-3 flex items-center justify-between" style={{ borderRadius: 'var(--radius-card)' }}>
          <img src={logoDark} alt="SIDES" className="h-7" />
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-muted transition-colors text-foreground"
              style={{ borderRadius: 'var(--radius)' }}
            >
              
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 pt-2 pb-24">
        {/* Store Dropdown - Only show when a specific store is selected */}
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
                    handleStoreChange('all');
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
                      handleStoreChange(store.id);
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

        {/* Page Title - Only show when all stores selected */}
        {selectedStore === 'all' && (
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
                  <div style={{ fontWeight: 'var(--font-weight-medium)' }}>Alle Stores</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Übersicht aller Standorte</div>
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
                    handleStoreChange('all');
                    setIsStoreDropdownOpen(false);
                  }}
                  className="w-full p-3 text-left hover:bg-muted transition-colors border-b border-border bg-primary/5"
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
                      handleStoreChange(store.id);
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

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setTimeRange('today')}
            className={`flex-1 px-4 py-2 border transition-colors ${
              timeRange === 'today' 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'bg-card text-foreground border-border hover:bg-muted'
            }`}
            style={{ borderRadius: 'var(--radius-button)', fontWeight: 'var(--font-weight-medium)' }}
          >
            Heute
          </button>
          <button
            onClick={() => setTimeRange('week')}
            className={`flex-1 px-4 py-2 border transition-colors ${
              timeRange === 'week' 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'bg-card text-foreground border-border hover:bg-muted'
            }`}
            style={{ borderRadius: 'var(--radius-button)', fontWeight: 'var(--font-weight-medium)' }}
          >
            Woche
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`flex-1 px-4 py-2 border transition-colors ${
              timeRange === 'month' 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'bg-card text-foreground border-border hover:bg-muted'
            }`}
            style={{ borderRadius: 'var(--radius-button)', fontWeight: 'var(--font-weight-medium)' }}
          >
            Monat
          </button>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Revenue */}
          <div className="bg-card p-4 border border-border shadow-sm" style={{ borderRadius: 'var(--radius-card)' }}>
            <div className="flex items-center justify-between mb-2">
              <Euro size={20} className="text-primary" />
              <span className={`text-xs px-2 py-1 ${
                currentStats.revenueChange >= 0 ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
              }`} style={{ borderRadius: 'var(--radius-badge)' }}>
                {currentStats.revenueChange >= 0 ? '+' : ''}{currentStats.revenueChange}%
              </span>
            </div>
            <div className="text-2xl mb-1" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              {currentStats.revenue.toLocaleString('de-DE')}€
            </div>
            <div className="text-xs text-muted-foreground">Umsatz</div>
          </div>

          {/* Orders */}
          <div className="bg-card p-4 border border-border shadow-sm" style={{ borderRadius: 'var(--radius-card)' }}>
            <div className="flex items-center justify-between mb-2">
              <ShoppingBag size={20} className="text-chart-1" />
              <span className={`text-xs px-2 py-1 ${
                currentStats.ordersChange >= 0 ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
              }`} style={{ borderRadius: 'var(--radius-badge)' }}>
                {currentStats.ordersChange >= 0 ? '+' : ''}{currentStats.ordersChange}%
              </span>
            </div>
            <div className="text-2xl mb-1" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              {currentStats.orders}
            </div>
            <div className="text-xs text-muted-foreground">Bestellungen</div>
          </div>

          {/* Avg Order Value */}
          <div className="bg-card p-4 border border-border shadow-sm" style={{ borderRadius: 'var(--radius-card)' }}>
            <div className="flex items-center justify-between mb-2">
              <TrendingUp size={20} className="text-chart-2" />
              <span className={`text-xs px-2 py-1 ${
                currentStats.avgOrderValueChange >= 0 ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
              }`} style={{ borderRadius: 'var(--radius-badge)' }}>
                {currentStats.avgOrderValueChange >= 0 ? '+' : ''}{currentStats.avgOrderValueChange}%
              </span>
            </div>
            <div className="text-2xl mb-1" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              {currentStats.avgOrderValue.toFixed(2)}€
            </div>
            <div className="text-xs text-muted-foreground">Ø Bestellwert</div>
          </div>

          {/* Customers */}
          <div className="bg-card p-4 border border-border shadow-sm" style={{ borderRadius: 'var(--radius-card)' }}>
            <div className="flex items-center justify-between mb-2">
              <Users size={20} className="text-chart-3" />
              <span className={`text-xs px-2 py-1 ${
                currentStats.customersChange >= 0 ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
              }`} style={{ borderRadius: 'var(--radius-badge)' }}>
                {currentStats.customersChange >= 0 ? '+' : ''}{currentStats.customersChange}%
              </span>
            </div>
            <div className="text-2xl mb-1" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              {currentStats.customers}
            </div>
            <div className="text-xs text-muted-foreground">Kunden</div>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-card p-4 border border-border shadow-sm" style={{ borderRadius: 'var(--radius-card)' }}>
            <div className="text-xs text-muted-foreground mb-2">Peak-Zeit</div>
            <div className="text-lg" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              {currentStats.peakHour}
            </div>
          </div>

          <div className="bg-card p-4 border border-border shadow-sm" style={{ borderRadius: 'var(--radius-card)' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-muted-foreground">Ø Lieferzeit</div>
              <span className={`text-xs px-2 py-1 ${
                currentStats.deliveryTimeChange <= 0 ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
              }`} style={{ borderRadius: 'var(--radius-badge)' }}>
                {currentStats.deliveryTimeChange >= 0 ? '+' : ''}{currentStats.deliveryTimeChange}%
              </span>
            </div>
            <div className="text-lg" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              {currentStats.avgDeliveryTime} Min
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-card border border-border shadow-sm mb-4" style={{ borderRadius: 'var(--radius-card)' }}>
          <div className="bg-muted/50 px-4 py-3 border-b border-border">
            <h3 style={{ fontWeight: 'var(--font-weight-medium)' }}>Top Produkte</h3>
          </div>
          
          <div className="p-4 space-y-3">
            {topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 text-primary flex items-center justify-center" style={{ borderRadius: 'var(--radius)', fontWeight: 'var(--font-weight-medium)' }}>
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>{product.name}</div>
                    <div className="text-xs text-muted-foreground">{product.sales} Verkäufe</div>
                  </div>
                </div>
                <div className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                  {product.revenue.toLocaleString('de-DE')}€
                </div>
              </div>
            ))}
          </div>
        </div>

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
                Erhalte detaillierte Analysen und Prognosen für dein Geschäft.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-card px-2 py-1 text-xs border border-border" style={{ borderRadius: 'var(--radius)' }}>Trends analysieren</span>
                <span className="bg-card px-2 py-1 text-xs border border-border" style={{ borderRadius: 'var(--radius)' }}>Prognose erstellen</span>
                <span className="bg-card px-2 py-1 text-xs border border-border" style={{ borderRadius: 'var(--radius)' }}>Vergleiche ziehen</span>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}