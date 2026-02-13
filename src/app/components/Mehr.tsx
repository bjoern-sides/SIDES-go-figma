import { Users, Package, DollarSign, Star, Settings, LogOut, Clock, Calendar, Menu, ChevronRight } from 'lucide-react';

interface MehrProps {
  onNavigate: (page: string) => void;
}

export function Mehr({ onNavigate }: MehrProps) {
  const menuItems = [
    { icon: Users, label: 'Personal & Schichten', color: 'text-chart-1', bgColor: 'bg-chart-1/10', badge: '2', page: 'personal' },
    { icon: Package, label: 'Warenwirtschaft', color: 'text-chart-2', bgColor: 'bg-chart-2/10', badge: null, page: 'waren' },
    { icon: DollarSign, label: 'Umsatz & Finanzen', color: 'text-primary', bgColor: 'bg-primary/10', badge: null, page: 'finanzen' },
    { icon: Calendar, label: 'Reservierungen', color: 'text-chart-3', bgColor: 'bg-chart-3/10', badge: '3', page: 'reservierungen' },
    { icon: Star, label: 'Bewertungen', color: 'text-chart-3', bgColor: 'bg-chart-3/10', badge: null, page: 'bewertungen' },
    { icon: Clock, label: 'Öffnungszeiten', color: 'text-chart-2', bgColor: 'bg-chart-2/10', badge: null, page: 'oeffnungszeiten' },
    { icon: Settings, label: 'Einstellungen', color: 'text-muted-foreground', bgColor: 'bg-muted', badge: null, page: 'settings' },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-secondary via-secondary to-chart-2 text-secondary-foreground px-5 pt-6 pb-8">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl flex items-center gap-2">
            <Menu size={24} />
            Mehr
          </h1>
        </div>
        <p className="text-sm opacity-90">Weitere Funktionen & Einstellungen</p>
      </div>

      <div className="flex-1 overflow-auto px-4 -mt-4 pb-4 space-y-4">
        {/* Restaurant Info Card */}
        <div className="bg-gradient-to-br from-primary/10 to-chart-1/10 border border-primary/20 rounded-xl p-5 shadow-sm">
          <h3 className="mb-1">Restaurant Bella Italia</h3>
          <p className="text-muted-foreground text-sm mb-4">Hauptstraße 123, 10115 Berlin</p>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card/70 backdrop-blur-sm rounded-lg p-3 text-center border border-border/50">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span style={{ fontWeight: 'var(--font-weight-bold)' }} className="text-primary text-lg">
                  Geöffnet
                </span>
              </div>
              <div className="text-xs text-muted-foreground">bis 23:00 Uhr</div>
            </div>
            <div className="bg-card/70 backdrop-blur-sm rounded-lg p-3 text-center border border-border/50">
              <div className="text-lg mb-1" style={{ fontWeight: 'var(--font-weight-bold)' }}>
                8 / 12
              </div>
              <div className="text-xs text-muted-foreground">Personal anwesend</div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div>
          <h4 className="text-xs text-muted-foreground mb-3 px-1">FUNKTIONEN</h4>
          <div className="space-y-2">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => item.page && onNavigate(item.page)}
                  className="w-full bg-card border border-border rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition-all active:scale-[0.98]"
                >
                  <div className={`${item.bgColor} ${item.color} w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} />
                  </div>
                  <span className="flex-1 text-left" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="bg-destructive text-destructive-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ fontWeight: 'var(--font-weight-bold)' }}>
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight size={18} className="text-muted-foreground" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Logout Button */}
        <button className="w-full bg-destructive text-destructive-foreground rounded-xl p-4 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-sm">
          <LogOut size={20} />
          <span style={{ fontWeight: 'var(--font-weight-medium)' }}>Abmelden</span>
        </button>
      </div>
    </div>
  );
}
