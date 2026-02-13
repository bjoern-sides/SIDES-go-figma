import { Megaphone, Sparkles, TrendingUp, Users, Target, Mail, MessageSquare, Bell, Calendar, Plus, BarChart3, Menu, X, Store, MapPin, ChevronDown } from 'lucide-react';
import logoDark from 'figma:asset/cfe4df707f23ad07e49fe048869fba9dc21f7eaa.png';
import { useState } from 'react';

interface MarketingProps {
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

export function Marketing({ selectedStore: propSelectedStore, stores: propStores, onBack, onStoreChange, onAIClick }: MarketingProps) {
  const [internalSelectedStore, setInternalSelectedStore] = useState('all');
  const [internalStores] = useState([
    { id: 'store1', name: 'Berlin Mitte', address: 'Friedrichstraße 123', status: 'online' },
    { id: 'store2', name: 'München Schwabing', address: 'Leopoldstraße 45', status: 'online' },
    { id: 'store3', name: 'Hamburg Altona', address: 'Ottenser Hauptstraße 78', status: 'online' },
    { id: 'store4', name: 'Köln Ehrenfeld', address: 'Venloer Straße 234', status: 'online' }
  ]);

  const handleStoreChange = (storeId: string) => {
    if (onStoreChange) {
      onStoreChange(storeId);
    } else {
      setInternalSelectedStore(storeId);
    }
  };

  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);
  const [isKampagnePopupOpen, setIsKampagnePopupOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<any>(null);
  
  // Campaign form states
  const [kampagneName, setKampagneName] = useState('');
  const [kampagneRabatt, setKampagneRabatt] = useState('');
  const [kampagneBonuspunkte, setKampagneBonuspunkte] = useState('');
  const [kampagneStartDate, setKampagneStartDate] = useState('');
  const [kampagneEndDate, setKampagneEndDate] = useState('');
  const [kampagneBudget, setKampagneBudget] = useState('');
  const [kampagneZielgruppe, setKampagneZielgruppe] = useState('alle');
  const [kampagneKanäle, setKampagneKanäle] = useState({
    email: false,
    sms: false,
    push: true,
    webshop: false
  });

  const selectedStore = propSelectedStore ?? internalSelectedStore;
  const stores = propStores ?? internalStores;
  
  const currentStore = selectedStore === 'all' ? null : stores.find(s => s.id === selectedStore);

  // Mock data for campaigns
  const campaigns = [
    {
      id: 1,
      name: 'Valentinstag Special',
      type: 'Email',
      status: 'active',
      reach: 2847,
      conversions: 312,
      revenue: 4567,
      startDate: '2026-02-01',
      endDate: '2026-02-14'
    },
    {
      id: 2,
      name: 'Happy Hour 15-17 Uhr',
      type: 'Push',
      status: 'active',
      reach: 5234,
      conversions: 678,
      revenue: 3421,
      startDate: '2026-02-01',
      endDate: '2026-02-28'
    },
    {
      id: 3,
      name: 'Neue Pizzakreationen',
      type: 'SMS',
      status: 'scheduled',
      reach: 0,
      conversions: 0,
      revenue: 0,
      startDate: '2026-02-15',
      endDate: '2026-02-28'
    }
  ];

  const aiSuggestions = [
    {
      title: 'Wochenend-Boost',
      description: 'Samstags-Rabatt-Kampagne für weniger ausgelastete Zeitfenster',
      potential: '+15% Umsatz',
      icon: TrendingUp
    },
    {
      title: 'Treue-Programm',
      description: 'Belohnung für Stammkunden nach 10 Bestellungen',
      potential: '+25% Wiederkäufer',
      icon: Users
    },
    {
      title: 'Zielgruppen-Kampagne',
      description: 'Personalisierte Angebote basierend auf Bestellhistorie',
      potential: '+20% Conversion',
      icon: Target
    }
  ];

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 bg-transparent">
        <div className="bg-white border border-border shadow-lg px-4 py-3 flex items-center justify-between" style={{ borderRadius: 'var(--radius-card)' }}>
          <img src={logoDark} alt="SIDES" className="h-7" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 pt-2 pb-24">
        {/* Store Selector - Always visible */}
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
                {selectedStore === 'all' ? (
                  <>
                    <div className="text-xs text-muted-foreground mb-0.5">Store Auswahl</div>
                    <div style={{ fontWeight: 'var(--font-weight-medium)' }}>Alle Stores</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Übersicht aller Standorte
                    </div>
                  </>
                ) : currentStore && (
                  <>
                    <div className="text-xs text-muted-foreground mb-0.5">Aktueller Store</div>
                    <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{currentStore.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin size={11} />
                      {currentStore.address}
                    </div>
                  </>
                )}
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
                className={`w-full p-3 text-left hover:bg-muted transition-colors border-b border-border ${
                  selectedStore === 'all' ? 'bg-primary/5' : ''
                }`}
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

        {/* KI-Vorschläge */}
        <div className="bg-card border border-border shadow-sm mb-4" style={{ borderRadius: 'var(--radius-card)' }}>
          <div className="bg-muted/50 px-4 py-3 border-b border-border">
            <h3 className="flex items-center gap-2" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              <Sparkles size={18} className="text-primary" />
              KI-Vorschläge
            </h3>
          </div>
          
          <div className="p-4 space-y-3">
            {aiSuggestions.map((suggestion, idx) => {
              const Icon = suggestion.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedSuggestion(suggestion);
                    setKampagneName(suggestion.title);
                    setIsKampagnePopupOpen(true);
                  }}
                  className="w-full p-4 border border-border hover:border-primary/50 transition-colors text-left"
                  style={{ borderRadius: 'var(--radius)' }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center flex-shrink-0" style={{ borderRadius: 'var(--radius)' }}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1" style={{ fontWeight: 'var(--font-weight-medium)' }}>{suggestion.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1" style={{ borderRadius: 'var(--radius-badge)' }}>
                        {suggestion.potential}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Aktive Kampagnen */}
        <div className="bg-card border border-border shadow-sm mb-4" style={{ borderRadius: 'var(--radius-card)' }}>
          <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 style={{ fontWeight: 'var(--font-weight-medium)' }}>Aktive Kampagnen</h3>
            <button className="p-2 bg-primary text-primary-foreground hover:opacity-90 transition-opacity" style={{ borderRadius: 'var(--radius)' }}>
              <Plus size={16} />
            </button>
          </div>
          
          <div className="p-4 space-y-3">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="p-4 border border-border"
                style={{ borderRadius: 'var(--radius)' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="mb-1" style={{ fontWeight: 'var(--font-weight-medium)' }}>{campaign.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-muted px-2 py-1" style={{ borderRadius: 'var(--radius-badge)' }}>
                        {campaign.type}
                      </span>
                      <span className={`text-xs px-2 py-1 ${
                        campaign.status === 'active' 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-chart-2/10 text-chart-2'
                      }`} style={{ borderRadius: 'var(--radius-badge)' }}>
                        {campaign.status === 'active' ? 'Aktiv' : 'Geplant'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Reichweite</div>
                    <div className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                      {campaign.reach > 0 ? campaign.reach.toLocaleString('de-DE') : '-'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Conversions</div>
                    <div className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                      {campaign.conversions > 0 ? campaign.conversions : '-'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Umsatz</div>
                    <div className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                      {campaign.revenue > 0 ? `${campaign.revenue.toLocaleString('de-DE')}€` : '-'}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    <span>{new Date(campaign.startDate).toLocaleDateString('de-DE')} - {new Date(campaign.endDate).toLocaleDateString('de-DE')}</span>
                  </div>
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
                Lass dir Kampagnen vorschlagen oder optimiere bestehende Aktionen.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-card px-2 py-1 text-xs border border-border" style={{ borderRadius: 'var(--radius)' }}>Kampagne erstellen</span>
                <span className="bg-card px-2 py-1 text-xs border border-border" style={{ borderRadius: 'var(--radius)' }}>Performance analysieren</span>
                <span className="bg-card px-2 py-1 text-xs border border-border" style={{ borderRadius: 'var(--radius)' }}>Zielgruppe finden</span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Kampagne Erstellen Popup - Bottom Sheet */}
      {isKampagnePopupOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setIsKampagnePopupOpen(false)}
          />
          
          {/* Bottom Sheet */}
          <div 
            className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-xl z-50 max-h-[90vh] overflow-hidden flex flex-col animate-slide-up"
            style={{ borderTopLeftRadius: 'var(--radius-card)', borderTopRightRadius: 'var(--radius-card)' }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center py-2">
              <div className="w-12 h-1 bg-muted-foreground/30" style={{ borderRadius: 'var(--radius)' }}></div>
            </div>

            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h3 className="flex items-center gap-2" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                <Sparkles size={18} className="text-primary" />
                Kampagne erstellen
              </h3>
              <button
                onClick={() => setIsKampagnePopupOpen(false)}
                className="p-1 hover:bg-muted transition-colors"
                style={{ borderRadius: 'var(--radius)' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Selected Suggestion Info */}
              {selectedSuggestion && (
                <div className="bg-primary/5 border border-primary/20 p-3" style={{ borderRadius: 'var(--radius)' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center flex-shrink-0" style={{ borderRadius: 'var(--radius)' }}>
                      {selectedSuggestion.icon && <selectedSuggestion.icon size={20} />}
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1" style={{ fontWeight: 'var(--font-weight-medium)' }}>{selectedSuggestion.title}</h4>
                      <p className="text-sm text-muted-foreground">{selectedSuggestion.description}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Kampagnenname */}
              <div>
                <label className="block text-sm mb-2" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                  Kampagnenname *
                </label>
                <input
                  type="text"
                  value={kampagneName}
                  onChange={(e) => setKampagneName(e.target.value)}
                  placeholder="z.B. Wochenend-Boost"
                  className="w-full px-3 py-2 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ borderRadius: 'var(--radius)' }}
                />
              </div>

              {/* Rabatt/Angebot - only show if NOT Treue-Programm */}
              {selectedSuggestion?.title !== 'Treue-Programm' && (
                <div>
                  <label className="block text-sm mb-2" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    Rabatt/Angebot *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={kampagneRabatt}
                      onChange={(e) => setKampagneRabatt(e.target.value)}
                      placeholder="15"
                      className="flex-1 px-3 py-2 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ borderRadius: 'var(--radius)' }}
                    />
                    <div className="px-4 py-2 bg-muted border border-border flex items-center" style={{ borderRadius: 'var(--radius)' }}>
                      %
                    </div>
                  </div>
                </div>
              )}

              {/* Bonuspunkte - only show if Treue-Programm */}
              {selectedSuggestion?.title === 'Treue-Programm' && (
                <div>
                  <label className="block text-sm mb-2" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    Bonuspunkte *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={kampagneBonuspunkte}
                      onChange={(e) => setKampagneBonuspunkte(e.target.value)}
                      placeholder="100"
                      className="flex-1 px-3 py-2 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ borderRadius: 'var(--radius)' }}
                    />
                    <div className="px-4 py-2 bg-muted border border-border flex items-center" style={{ borderRadius: 'var(--radius)' }}>
                      Punkte
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Punkte werden nach jeder 10. Bestellung gutgeschrieben
                  </p>
                </div>
              )}

              {/* Zeitraum */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-2" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    Startdatum *
                  </label>
                  <input
                    type="date"
                    value={kampagneStartDate}
                    onChange={(e) => setKampagneStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ borderRadius: 'var(--radius)' }}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    Enddatum *
                  </label>
                  <input
                    type="date"
                    value={kampagneEndDate}
                    onChange={(e) => setKampagneEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ borderRadius: 'var(--radius)' }}
                  />
                </div>
              </div>

              {/* Zielgruppe */}
              <div>
                <label className="block text-sm mb-2" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                  Zielgruppe
                </label>
                <select
                  value={kampagneZielgruppe}
                  onChange={(e) => setKampagneZielgruppe(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ borderRadius: 'var(--radius)' }}
                >
                  <option value="alle">Alle Kunden</option>
                  <option value="neukunden">Neukunden</option>
                  <option value="stammkunden">Stammkunden</option>
                  <option value="inaktiv">Inaktive Kunden (30+ Tage)</option>
                  <option value="vip">VIP Kunden</option>
                </select>
              </div>

              {/* Kanäle */}
              <div>
                <label className="block text-sm mb-3" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                  Kanäle auswählen
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setKampagneKanäle({...kampagneKanäle, email: !kampagneKanäle.email})}
                    className={`p-3 border transition-colors text-left ${
                      kampagneKanäle.email 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    style={{ borderRadius: 'var(--radius)' }}
                  >
                    <div className="flex items-center gap-2">
                      <Mail size={18} className={kampagneKanäle.email ? 'text-primary' : 'text-muted-foreground'} />
                      <span style={{ fontWeight: 'var(--font-weight-medium)' }}>Email</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setKampagneKanäle({...kampagneKanäle, sms: !kampagneKanäle.sms})}
                    className={`p-3 border transition-colors text-left ${
                      kampagneKanäle.sms 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    style={{ borderRadius: 'var(--radius)' }}
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare size={18} className={kampagneKanäle.sms ? 'text-primary' : 'text-muted-foreground'} />
                      <span style={{ fontWeight: 'var(--font-weight-medium)' }}>SMS</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setKampagneKanäle({...kampagneKanäle, push: !kampagneKanäle.push})}
                    className={`p-3 border transition-colors text-left ${
                      kampagneKanäle.push 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    style={{ borderRadius: 'var(--radius)' }}
                  >
                    <div className="flex items-center gap-2">
                      <Bell size={18} className={kampagneKanäle.push ? 'text-primary' : 'text-muted-foreground'} />
                      <span style={{ fontWeight: 'var(--font-weight-medium)' }}>Push</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setKampagneKanäle({...kampagneKanäle, webshop: !kampagneKanäle.webshop})}
                    className={`p-3 border transition-colors text-left ${
                      kampagneKanäle.webshop 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    style={{ borderRadius: 'var(--radius)' }}
                  >
                    <div className="flex items-center gap-2">
                      <Megaphone size={18} className={kampagneKanäle.webshop ? 'text-primary' : 'text-muted-foreground'} />
                      <span style={{ fontWeight: 'var(--font-weight-medium)' }}>Webshop</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-border flex gap-3 justify-end bg-muted/30">
              <button
                onClick={() => setIsKampagnePopupOpen(false)}
                className="px-4 py-2 border border-border hover:bg-muted transition-colors"
                style={{ borderRadius: 'var(--radius)' }}
              >
                Abbrechen
              </button>
              <button
                onClick={() => {
                  // Handle campaign creation
                  console.log('Kampagne erstellen:', {
                    name: kampagneName,
                    rabatt: kampagneRabatt,
                    bonuspunkte: kampagneBonuspunkte,
                    startDate: kampagneStartDate,
                    endDate: kampagneEndDate,
                    budget: kampagneBudget,
                    zielgruppe: kampagneZielgruppe,
                    kanäle: kampagneKanäle
                  });
                  setIsKampagnePopupOpen(false);
                }}
                className="px-4 py-2 bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                style={{ borderRadius: 'var(--radius)', fontWeight: 'var(--font-weight-medium)' }}
              >
                Kampagne starten
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}