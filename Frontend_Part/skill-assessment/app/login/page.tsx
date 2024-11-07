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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4 w-80">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
          className="w-full p-2 border border-gray-300 rounded"
          autoComplete="username"
          disabled={loading}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
          autoComplete="current-password"
          disabled={loading}
        />
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-blue-400"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="mt-4">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => router.push('/register')}
            className="text-blue-600 hover:underline"
            disabled={loading}
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}