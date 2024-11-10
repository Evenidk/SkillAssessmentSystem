// app/register/page.tsx
"use client";
import { useState } from 'react';
import { registerUser } from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const data = await registerUser({ name, email, password });
      setSuccess(true);
      setTimeout(() => router.push('/login'), 2000);
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-foreground">Register</h1>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
              className="w-full p-3 border rounded-md bg-background text-foreground placeholder:text-muted-foreground border-input focus:border-primary focus:ring-1 focus:ring-primary"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border rounded-md bg-background text-foreground placeholder:text-muted-foreground border-input focus:border-primary focus:ring-1 focus:ring-primary"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border rounded-md bg-background text-foreground placeholder:text-muted-foreground border-input focus:border-primary focus:ring-1 focus:ring-primary"
              disabled={loading}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {success && (
          <p className="text-center text-green-600 dark:text-green-400 font-medium">
            Account registered successfully! Redirecting...
          </p>
        )}
        
        {error && (
          <p className="text-center text-destructive font-medium">
            {error}
          </p>
        )}

        <div className="text-center">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/login')}
              className="font-semibold text-primary hover:underline focus:outline-none"
              disabled={loading}
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}