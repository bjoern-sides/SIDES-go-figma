import { AlertTriangle, Package, Users, TrendingDown, Clock, Sparkles, Menu, X, ChevronDown, Store, MapPin } from 'lucide-react';
import logoDark from 'figma:asset/cfe4df707f23ad07e49fe048869fba9dc21f7eaa.png';
import { useState } from 'react';

interface HinweiseProps {
  selectedStore?: string;
  stores?: Array<{
    id: string;
    name: string;
    address: string;
    status: string;
    channels?: {
      store: boolean;
      webshop: boolean;
      lieferando: boolean;
      uberEats: boolean;
      wolt: boolean;
    };
    webshopSettings?: {
      delivery: boolean;
      pickup: boolean;
    };
  }>;
  onBack?: () => void;
  onStoreChange?: (storeId: string) => void;
  onAIClick?: () => void;
}

export function Hinweise({ selectedStore: propSelectedStore, stores: propStores, onBack, onStoreChange, onAIClick }: HinweiseProps) {
  // DEBUG: Log props immediately
  console.log('=== HINWEISE PROPS ===');
  console.log('propStores:', propStores);
  console.log('propSelectedStore:', propSelectedStore);
  
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
  
  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);

  const currentStore = selectedStore === 'all' ? null : stores.find(s => s.id === selectedStore);

  // Generate channel alerts for closed channels
  const generateChannelAlerts = () => {
    const channelAlerts: Array<{
      id: string;
      type: 'critical';
      category: 'channel';
      icon: any;
      title: string;
      description: string;
      store: string;
      time: string;
      actionable: boolean;
    }> = [];

    const storesToCheck = selectedStore === 'all' ? stores : stores.filter(s => s.id === selectedStore);

    console.log('=== HINWEISE DEBUG ===');
    console.log('Selected Store:', selectedStore);
    console.log('Stores to check:', storesToCheck);

    storesToCheck.forEach((store) => {
      const storeName = store.name;
      
      console.log(`Checking store: ${storeName}`, store);
      console.log('webshopSettings:', store.webshopSettings);

      // Check Store Channel
      if (store.channels && !store.channels.store) {
        console.log(`Adding Store geschlossen alert for ${storeName}`);
        channelAlerts.push({
          id: `${store.id}-store`,
          type: 'critical',
          category: 'channel',
          icon: AlertTriangle,
          title: 'Store geschlossen',
          description: 'Der Store akzeptiert keine Bestellungen vor Ort',
          store: storeName,
          time: 'Aktiv',
          actionable: true
        });
      }

      // Check Webshop Channels - independent of channels.webshop status
      if (store.webshopSettings) {
        if (!store.webshopSettings.delivery) {
          console.log(`Adding Webshop-Lieferung geschlossen alert for ${storeName}`);
          channelAlerts.push({
            id: `${store.id}-webshop-delivery`,
            type: 'critical',
            category: 'channel',
            icon: AlertTriangle,
            title: 'Webshop-Lieferung geschlossen',
            description: 'Der Webshop akzeptiert keine Lieferbestellungen',
            store: storeName,
            time: 'Aktiv',
            actionable: true
          });
        }

        if (!store.webshopSettings.pickup) {
          console.log(`Adding Webshop-Abholung geschlossen alert for ${storeName}`);
          channelAlerts.push({
            id: `${store.id}-webshop-pickup`,
            type: 'critical',
            category: 'channel',
            icon: AlertTriangle,
            title: 'Webshop-Abholung geschlossen',
            description: 'Der Webshop akzeptiert keine Abholbestellungen',
            store: storeName,
            time: 'Aktiv',
            actionable: true
          });
        }
      } else {
        console.log(`No webshopSettings for ${storeName}`);
      }

      // Check Portal Channels
      if (store.channels) {
        if (!store.channels.lieferando) {
          console.log(`Adding Lieferando geschlossen alert for ${storeName}`);
          channelAlerts.push({
            id: `${store.id}-lieferando`,
            type: 'critical',
            category: 'channel',
            icon: AlertTriangle,
            title: 'Lieferando geschlossen',
            description: 'Lieferando-Portal akzeptiert keine Bestellungen',
            store: storeName,
            time: 'Aktiv',
            actionable: true
          });
        }

        if (!store.channels.uberEats) {
          console.log(`Adding Uber Eats geschlossen alert for ${storeName}`);
          channelAlerts.push({
            id: `${store.id}-ubereats`,
            type: 'critical',
            category: 'channel',
            icon: AlertTriangle,
            title: 'Uber Eats geschlossen',
            description: 'Uber Eats-Portal akzeptiert keine Bestellungen',
            store: storeName,
            time: 'Aktiv',
            actionable: true
          });
        }

        if (!store.channels.wolt) {
          console.log(`Adding Wolt geschlossen alert for ${storeName}`);
          channelAlerts.push({
            id: `${store.id}-wolt`,
            type: 'critical',
            category: 'channel',
            icon: AlertTriangle,
            title: 'Wolt geschlossen',
            description: 'Wolt-Portal akzeptiert keine Bestellungen',
            store: storeName,
            time: 'Aktiv',
            actionable: true
          });
        }
      }
    });

    console.log('Generated channel alerts:', channelAlerts);
    console.log('=== END DEBUG ===');

    return channelAlerts;
  };

  const channelAlerts = generateChannelAlerts();
  
  // Mock data for warnings/alerts
  const alerts = [
    {
      id: 1,
      type: 'critical',
      category: 'inventory',
      icon: Package,
      title: 'Niedriger Lagerbestand',
      description: 'Getränke unter Mindestbestand (23% verbleibend)',
      store: 'Berlin Mitte',
      time: 'vor 15 Min',
      actionable: true
    },
    {
      id: 2,
      type: 'warning',
      category: 'staff',
      icon: Users,
      title: 'Personalengpass',
      description: '3 Krankmeldungen für Samstag erwartet',
      store: 'München Schwabing',
      time: 'vor 1 Std',
      actionable: true
    },
    {
      id: 3,
      type: 'warning',
      category: 'revenue',
      icon: TrendingDown,
      title: 'Umsatzrückgang',
      description: 'Mittagsgeschäft 18% unter Vorwoche',
      store: 'Hamburg Altona',
      time: 'vor 2 Std',
      actionable: false
    },
    {
      id: 4,
      type: 'info',
      category: 'operations',
      icon: Clock,
      title: 'Erhöhte Lieferzeit',
      description: 'Durchschnitt aktuell bei 35 Minuten',
      store: 'Berlin Mitte',
      time: 'vor 3 Std',
      actionable: false
    },
    {
      id: 5,
      type: 'critical',
      category: 'inventory',
      icon: Package,
      title: 'Kritischer Warenbestand',
      description: 'Pizza-Teig endet in ca. 4 Stunden',
      store: 'Köln Ehrenfeld',
      time: 'vor 30 Min',
      actionable: true
    }
  ];

  // Filter alerts by selected store
  const filteredAlerts = selectedStore === 'all' 
    ? alerts 
    : alerts.filter(alert => {
        const store = stores.find(s => s.name === alert.store);
        return store?.id === selectedStore;
      });

  // Combine channel alerts with regular alerts
  const allAlerts = [...channelAlerts, ...filteredAlerts];

  const criticalCount = allAlerts.filter(a => a.type === 'critical').length;
  const warningCount = allAlerts.filter(a => a.type === 'warning').length;
  const infoCount = allAlerts.filter(a => a.type === 'info').length;

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
              <span className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>← Zurück</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 pt-2 pb-24">
        {/* Store Selection Dropdown (when store is selected) */}
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
        
    

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-card p-4 border border-destructive/50 shadow-sm" style={{ borderRadius: 'var(--radius-card)' }}>
            <div className="text-center">
              <div className="text-2xl mb-1 text-destructive" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                {criticalCount}
              </div>
              <div className="text-xs text-muted-foreground">Kritisch</div>
            </div>
          </div>
          
          <div className="bg-card p-4 border border-chart-2/50 shadow-sm" style={{ borderRadius: 'var(--radius-card)' }}>
            <div className="text-center">
              <div className="text-2xl mb-1 text-chart-2" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                {warningCount}
              </div>
              <div className="text-xs text-muted-foreground">Warnung</div>
            </div>
          </div>
          
          <div className="bg-card p-4 border border-border shadow-sm" style={{ borderRadius: 'var(--radius-card)' }}>
            <div className="text-center">
              <div className="text-2xl mb-1" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                {infoCount}
              </div>
              <div className="text-xs text-muted-foreground">Info</div>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="bg-card border border-border shadow-sm mb-4" style={{ borderRadius: 'var(--radius-card)' }}>
          <div className="bg-muted/50 px-4 py-3 border-b border-border">
            <h3 style={{ fontWeight: 'var(--font-weight-medium)' }}>Aktuelle Hinweise</h3>
          </div>
          
          <div className="p-4 space-y-3">
            {allAlerts.length > 0 ? (
              allAlerts.map((alert) => {
                const Icon = alert.icon;
                const bgColor = alert.type === 'critical' 
                  ? 'bg-destructive/10' 
                  : alert.type === 'warning' 
                  ? 'bg-chart-2/10' 
                  : 'bg-muted/30';
                const iconColor = alert.type === 'critical' 
                  ? 'text-destructive' 
                  : alert.type === 'warning' 
                  ? 'text-chart-2' 
                  : 'text-foreground';
                const borderColor = alert.type === 'critical' 
                  ? 'border-destructive/20' 
                  : alert.type === 'warning' 
                  ? 'border-chart-2/20' 
                  : 'border-border';

                return (
                  <div
                    key={alert.id}
                    className={`p-4 border ${borderColor}`}
                    style={{ borderRadius: 'var(--radius)' }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`${bgColor} ${iconColor} w-10 h-10 flex items-center justify-center flex-shrink-0`} style={{ borderRadius: 'var(--radius)' }}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4 style={{ fontWeight: 'var(--font-weight-medium)' }}>{alert.title}</h4>
                          {alert.actionable && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1" style={{ borderRadius: 'var(--radius-badge)' }}>
                              Handlung möglich
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{alert.store}</span>
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <AlertTriangle size={48} className="mx-auto mb-3 opacity-20" />
                <p>Keine Hinweise für diesen Store</p>
              </div>
            )}
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
                Lass dir Lösungen für Probleme vorschlagen oder analysiere Muster.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-card px-2 py-1 text-xs border border-border" style={{ borderRadius: 'var(--radius)' }}>Problem lösen</span>
                <span className="bg-card px-2 py-1 text-xs border border-border" style={{ borderRadius: 'var(--radius)' }}>Muster erkennen</span>
                <span className="bg-card px-2 py-1 text-xs border border-border" style={{ borderRadius: 'var(--radius)' }}>Prognose erstellen</span>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}