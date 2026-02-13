import { Home, Bell, TrendingUp, Rocket, Sparkles } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAIClick: () => void;
}

export function BottomNav({ activeTab, onTabChange, onAIClick }: BottomNavProps) {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'hinweise', icon: Bell, label: 'Hinweise' },
    { id: 'marketing', icon: Rocket, label: 'Marketing' },
    { id: 'statistiken', icon: TrendingUp, label: 'Statistiken' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-30">
      <div className="relative flex justify-around items-center h-16 px-2">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          // Add AI button in the center
          if (index === 2) {
            return (
              <div key="ai-container" className="flex justify-around items-center flex-1">
                <button
                  onClick={() => onTabChange(tab.id)}
                  className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all relative ${
                    isActive ? '' : 'text-foreground'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-b-full"></div>
                  )}
                  <Icon size={22} className={isActive ? 'scale-110 text-primary' : ''} />
                  <span 
                    className={`text-xs ${isActive ? 'text-primary' : 'text-foreground'}`}
                    style={{ fontWeight: 'var(--font-weight-normal)' }}
                  >
                    {tab.label}
                  </span>
                </button>
                
                {/* AI Assistant Button */}
                <button
                  onClick={onAIClick}
                  className="absolute left-1/2 -translate-x-1/2 -top-6 bg-gradient-to-br from-primary to-chart-1 text-primary-foreground w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform border-4 border-background"
                >
                  <Sparkles size={24} />
                </button>
              </div>
            );
          }
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all relative ${
                isActive ? '' : 'text-foreground'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-b-full"></div>
              )}
              <Icon size={22} className={isActive ? 'scale-110 text-primary' : ''} />
              <span 
                className={`text-xs ${isActive ? 'text-primary' : 'text-foreground'}`}
                style={{ fontWeight: 'var(--font-weight-normal)' }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}