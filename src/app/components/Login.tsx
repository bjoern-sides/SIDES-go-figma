import { useState } from 'react';
import logo from 'figma:asset/28a67dfe032017251a62e75f40c487d74cdd6aa6.png';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication - in production this would call an API
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block mb-6">
            <img 
              src={logo} 
              alt="SIDES Logo" 
              className="h-12 w-auto"
            />
          </div>
        </div>

        {/* Login Card */}
        <div 
          className="bg-card p-4"
          style={{ borderRadius: 'var(--radius-card)' }}
        >
          <h1 className="mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-bold)' }}>
            Login to your account
          </h1>
          <p className="text-muted-foreground mb-6" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-regular)' }}>
            Enter your email below to login to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block mb-2 text-foreground"
                style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-regular)' }}
              >
                Benutzername
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Benutzername oder E-Mail"
                className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-all"
                style={{ 
                  borderRadius: 'var(--radius-input)',
                  fontSize: 'var(--text-sm)'
                }}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block mb-2 text-foreground"
                style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-regular)' }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-all"
                style={{ 
                  borderRadius: 'var(--radius-input)',
                  fontSize: 'var(--text-sm)'
                }}
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 hover:opacity-90 transition-opacity shadow-sm"
              style={{ 
                borderRadius: 'var(--radius-button)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Login
            </button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <button
                type="button"
                className="text-secondary hover:underline transition-all"
                style={{ 
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                Forgot password?
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        {/* ... remove this code ... */}
      </div>
    </div>
  );
}