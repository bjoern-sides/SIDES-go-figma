import { DollarSign, TrendingUp, TrendingDown, Calendar, Download, CreditCard, Wallet } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export function Finanzen() {
  const dailyData = [
    { day: 'Mo', umsatz: 2340, ausgaben: 890 },
    { day: 'Di', umsatz: 2890, ausgaben: 1020 },
    { day: 'Mi', umsatz: 2450, ausgaben: 850 },
    { day: 'Do', umsatz: 3120, ausgaben: 980 },
    { day: 'Fr', umsatz: 4230, ausgaben: 1150 },
    { day: 'Sa', umsatz: 5120, ausgaben: 1340 },
    { day: 'So', umsatz: 3890, ausgaben: 1100 },
  ];

  const stats = {
    today: {
      revenue: 2847,
      expenses: 1023,
      profit: 1824,
      change: '+12%'
    }
  };

  const expenses = [
    { category: 'Wareneinkauf', amount: 4230, percentage: 45, color: 'bg-chart-2' },
    { category: 'Personal', amount: 3890, percentage: 41, color: 'bg-chart-3' },
    { category: 'Miete & Nebenkosten', amount: 850, percentage: 9, color: 'bg-chart-1' },
    { category: 'Marketing', amount: 360, percentage: 4, color: 'bg-primary' },
    { category: 'Sonstiges', amount: 100, percentage: 1, color: 'bg-muted-foreground' },
  ];

  const transactions = [
    { type: 'income', name: 'Kartenzahlung', amount: 245.50, time: '10:32' },
    { type: 'income', name: 'Bar', amount: 87.00, time: '10:45' },
    { type: 'expense', name: 'Getränke Lieferung', amount: -420.00, time: '11:15' },
    { type: 'income', name: 'Kartenzahlung', amount: 156.80, time: '12:10' },
    { type: 'income', name: 'Online Bestellung', amount: 94.50, time: '12:45' },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-secondary via-secondary to-chart-2 text-secondary-foreground px-5 pt-6 pb-8">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl flex items-center gap-2">
            <Wallet size={24} />
            Finanzen
          </h1>
        </div>
        <p className="text-sm opacity-90">Umsatz & Ausgaben</p>
      </div>

      <div className="flex-1 overflow-auto px-4 -mt-4 pb-4 space-y-4">
        {/* Period Tabs */}
        <div className="bg-card border border-border rounded-xl p-1 shadow-sm flex gap-1">
          <button className="flex-1 bg-primary text-primary-foreground rounded-lg py-2.5 text-sm transition-all" style={{ fontWeight: 'var(--font-weight-medium)' }}>
            Heute
          </button>
          <button className="flex-1 hover:bg-muted rounded-lg py-2.5 text-sm transition-all">
            Woche
          </button>
          <button className="flex-1 hover:bg-muted rounded-lg py-2.5 text-sm transition-all">
            Monat
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <div className="bg-primary/10 text-primary w-10 h-10 rounded-lg flex items-center justify-center mb-3">
              <DollarSign size={20} />
            </div>
            <div className="text-xs text-muted-foreground mb-1">Umsatz</div>
            <div className="text-xl mb-1" style={{ fontWeight: 'var(--font-weight-bold)' }}>
              {stats.today.revenue.toLocaleString('de-DE')}€
            </div>
            <div className="text-xs text-primary">{stats.today.change}</div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <div className="bg-destructive/10 text-destructive w-10 h-10 rounded-lg flex items-center justify-center mb-3">
              <TrendingDown size={20} />
            </div>
            <div className="text-xs text-muted-foreground mb-1">Ausgaben</div>
            <div className="text-xl mb-1" style={{ fontWeight: 'var(--font-weight-bold)' }}>
              {stats.today.expenses.toLocaleString('de-DE')}€
            </div>
            <div className="text-xs text-muted-foreground">36%</div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-chart-1/10 border border-primary/20 rounded-xl p-4 shadow-sm">
            <div className="bg-primary text-primary-foreground w-10 h-10 rounded-lg flex items-center justify-center mb-3">
              <TrendingUp size={20} />
            </div>
            <div className="text-xs text-muted-foreground mb-1">Gewinn</div>
            <div className="text-xl text-primary mb-1" style={{ fontWeight: 'var(--font-weight-bold)' }}>
              {stats.today.profit.toLocaleString('de-DE')}€
            </div>
            <div className="text-xs text-primary">{stats.today.change}</div>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3>Umsatzentwicklung</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Letzte 7 Tage</p>
            </div>
            <Calendar size={18} className="text-muted-foreground" />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={dailyData}>
              <defs>
                <linearGradient id="colorUmsatz" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAusgaben" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                axisLine={{ stroke: 'var(--border)' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                tickFormatter={(value) => `${value}€`}
                axisLine={{ stroke: 'var(--border)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                formatter={(value: number) => `${value}€`}
              />
              <Area 
                type="monotone" 
                dataKey="umsatz" 
                stroke="var(--primary)" 
                strokeWidth={2}
                fill="url(#colorUmsatz)"
                name="Umsatz"
              />
              <Area 
                type="monotone" 
                dataKey="ausgaben" 
                stroke="var(--destructive)" 
                strokeWidth={2}
                fill="url(#colorAusgaben)"
                name="Ausgaben"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Expenses Breakdown */}
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <h3 className="mb-4">Ausgaben (Diese Woche)</h3>
          <div className="space-y-4">
            {expenses.map((expense, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">{expense.category}</span>
                  <span className="text-sm" style={{ fontWeight: 'var(--font-weight-bold)' }}>
                    {expense.amount.toLocaleString('de-DE')}€
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`${expense.color} h-2.5 rounded-full transition-all`}
                      style={{ width: `${expense.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground min-w-[2.5rem] text-right">{expense.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3>Letzte Transaktionen</h3>
            <button className="text-primary text-sm hover:underline" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              Alle anzeigen
            </button>
          </div>
          <div className="space-y-2">
            {transactions.map((transaction, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
                  }`}>
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <div className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                      {transaction.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{transaction.time} Uhr</div>
                  </div>
                </div>
                <div 
                  className={`text-sm ${
                    transaction.type === 'income' ? 'text-primary' : 'text-destructive'
                  }`}
                  style={{ fontWeight: 'var(--font-weight-bold)' }}
                >
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}€
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Button */}
        <button className="w-full bg-secondary text-secondary-foreground rounded-xl p-4 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-sm">
          <Download size={20} />
          <span style={{ fontWeight: 'var(--font-weight-medium)' }}>Bericht exportieren</span>
        </button>
      </div>
    </div>
  );
}
