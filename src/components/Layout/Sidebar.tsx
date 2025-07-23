import { NavLink } from 'react-router-dom';
import { Home, User, Users, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export const Sidebar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const getNavItems = () => {
    switch (user.role) {
      case 'superadmin':
        return [
          { path: '/dashboard', label: 'Home', icon: Home },
          { path: '/users', label: 'User Management', icon: Users },
          { path: '/profile', label: 'Profile Information', icon: User }
        ];
      case 'auditor':
        return [
          { path: '/dashboard', label: 'Feedback Reports', icon: Home },
          { path: '/profile', label: 'Profile Information', icon: User }
        ];
      default: // user
        return [
          { path: '/dashboard', label: 'Home', icon: Home },
          { path: '/profile', label: 'Profile Information', icon: User }
        ];
    }
  };

  return (
    <div className="w-64 bg-primary text-primary-foreground min-h-screen flex flex-col">
      <div className="p-6 border-b border-primary-foreground/10">
        <h2 className="text-xl font-bold">PAGCOR</h2>
        <p className="text-sm opacity-90">Feedback System</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {getNavItems().map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-foreground/10 text-primary-foreground font-medium'
                      : 'text-primary-foreground/80 hover:bg-primary-foreground/5 hover:text-primary-foreground'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-primary-foreground/10">
        <div className="mb-3 text-sm">
          <p className="font-medium">Welcome, {user.lname}</p>
          <p className="text-primary-foreground/80 text-xs">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
        </div>
        <Button
          onClick={logout}
          variant="outline"
          size="sm"
          className="w-full bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};