import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/Auth/LoginForm';
import { RegisterForm } from '@/components/Auth/RegisterForm';

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { user } = useAuth();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">PAGCOR</h1>
          <p className="text-lg text-muted-foreground">Monthly Licensee Customer Feedback Report</p>
        </div>
        
        {isLoginMode ? (
          <LoginForm onToggleMode={() => setIsLoginMode(false)} />
        ) : (
          <RegisterForm onToggleMode={() => setIsLoginMode(true)} />
        )}
      </div>
    </div>
  );
};

export default Login;