import { Store, Globe, Truck, X, ChevronRight, PackageX, ShoppingBag } from 'lucide-react';

export interface ChannelStatus {
  store: boolean;
  webshop: boolean;
  lieferando: boolean;
  uberEats: boolean;
  wolt: boolean;
}

export interface WebshopSettings {
  delivery: boolean;
  pickup: boolean;
}

interface StatusBarProps {
  channels: ChannelStatus;
  webshopSettings?: WebshopSettings;
  onChannelClick?: (channel: keyof ChannelStatus) => void;
  onWebshopServiceClick?: (service: 'delivery' | 'pickup') => void;
}

export function StatusBar({ channels, webshopSettings, onChannelClick, onWebshopServiceClick }: StatusBarProps) {
  const channelConfig = [
    { key: 'store' as keyof ChannelStatus, label: 'Store', icon: Store },
    { key: 'webshop' as keyof ChannelStatus, label: 'Webshop', icon: Globe },
    { key: 'lieferando' as keyof ChannelStatus, label: 'Lieferando', icon: Truck },
    { key: 'uberEats' as keyof ChannelStatus, label: 'Uber Eats', icon: Truck },
    { key: 'wolt' as keyof ChannelStatus, label: 'Wolt', icon: Truck },
  ];

  const closedChannels = channelConfig.filter(channel => !channels[channel.key]);
  
  // Check webshop services
  const closedWebshopServices: Array<{key: 'delivery' | 'pickup', label: string, icon: any}> = [];
  if (webshopSettings) {
    if (!webshopSettings.delivery) {
      closedWebshopServices.push({ key: 'delivery', label: 'Webshop-Lieferung', icon: Truck });
    }
    if (!webshopSettings.pickup) {
      closedWebshopServices.push({ key: 'pickup', label: 'Webshop-Abholung', icon: ShoppingBag });
    }
  }

  if (closedChannels.length === 0 && closedWebshopServices.length === 0) return null;

  return (
    <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-2">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {/* Closed Channels */}
          {closedChannels.map((channel) => {
            return (
              <button
                key={channel.key}
                onClick={() => onChannelClick?.(channel.key)}
                className="bg-destructive text-destructive-foreground px-2.5 py-1 flex items-center gap-1.5 hover:opacity-90 transition-opacity active:scale-95"
                style={{ borderRadius: 'var(--radius)' }}
              >
                <span className="text-xs" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                  {channel.label}
                </span>
                <ChevronRight size={12} className="opacity-70" />
              </button>
            );
          })}
          
          {/* Closed Webshop Services */}
          {closedWebshopServices.map((service) => {
            return (
              <button
                key={service.key}
                onClick={() => onWebshopServiceClick?.(service.key)}
                className="bg-destructive text-destructive-foreground px-2.5 py-1 flex items-center gap-1.5 hover:opacity-90 transition-opacity active:scale-95"
                style={{ borderRadius: 'var(--radius)' }}
              >
                <span className="text-xs" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                  {service.label}
                </span>
                <ChevronRight size={12} className="opacity-70" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}