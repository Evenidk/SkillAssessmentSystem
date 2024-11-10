"use client";
import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await login({ name, password });
    } catch (error) {
      setError(error.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-foreground">Login</h1>
        {error && <p className="text-destructive text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
              className="w-full p-3 border rounded-md bg-background text-foreground placeholder:text-muted-foreground border-input focus:border-primary focus:ring-1 focus:ring-primary"
              autoComplete="username"
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border rounded-md bg-background text-foreground placeholder:text-muted-foreground border-input focus:border-primary focus:ring-1 focus:ring-primary"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-3 font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="text-center">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/register')}
              className="font-semibold text-primary hover:underline focus:outline-none"
              disabled={loading}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}