import { Lock, Unlock, Phone, AlertTriangle, Megaphone, Users } from 'lucide-react';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

export function QuickActions({ onAction }: QuickActionsProps) {
  const actions = [
    { id: 'close', icon: Lock, label: 'Store schließen', color: 'bg-destructive text-destructive-foreground' },
    { id: 'open', icon: Unlock, label: 'Store öffnen', color: 'bg-primary text-primary-foreground' },
    { id: 'emergency', icon: AlertTriangle, label: 'Notfall', color: 'bg-chart-3 text-white' },
    { id: 'callStaff', icon: Phone, label: 'Personal rufen', color: 'bg-secondary text-secondary-foreground' },
    { id: 'marketing', icon: Megaphone, label: 'Marketing starten', color: 'bg-chart-1 text-primary-foreground' },
    { id: 'staffMeeting', icon: Users, label: 'Team Meeting', color: 'bg-chart-2 text-white' },
  ];

  return (
    <div className="bg-card border border-border rounded-[--radius-card] p-4">
      <h3 className="mb-3">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onAction(action.id)}
              className={`${action.color} p-3 rounded-lg flex flex-col items-center gap-2 hover:opacity-90 transition-opacity`}
            >
              <Icon size={20} />
              <span className="text-xs text-center leading-tight">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
