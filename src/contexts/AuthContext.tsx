import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: number;
  fname: string;
  mname?: string;
  lname: string;
  email: string;
  role: 'superadmin' | 'user' | 'auditor';
  status: 'active' | 'inactive';
  company: string;
  bday: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: (User & { password: string })[] = [
  {
    id: 1,
    fname: 'John',
    mname: 'A',
    lname: 'Doe',
    email: 'superadmin@example.com',
    password: 'password',
    role: 'superadmin',
    status: 'active',
    company: 'PAGCOR',
    bday: '1985-01-01'
  },
  {
    id: 2,
    fname: 'Jane',
    mname: 'B',
    lname: 'Smith',
    email: 'user@example.com',
    password: 'password',
    role: 'user',
    status: 'active',
    company: 'Gaming Corp',
    bday: '1990-05-15'
  },
  {
    id: 3,
    fname: 'Mike',
    mname: 'C',
    lname: 'Johnson',
    email: 'auditor@example.com',
    password: 'password',
    role: 'auditor',
    status: 'active',
    company: 'Audit Firm',
    bday: '1988-08-20'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser = {
      ...userData,
      id: mockUsers.length + 1
    };
    
    mockUsers.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};