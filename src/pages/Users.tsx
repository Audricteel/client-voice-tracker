import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { UserManagement } from '@/components/Users/UserManagement';
import { Sidebar } from '@/components/Layout/Sidebar';

const Users = () => {
  const { user } = useAuth();

  // Only superadmin can access user management
  if (!user || user.role !== 'superadmin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-primary">User Management</h1>
            <p className="text-muted-foreground">Manage system users and their roles</p>
          </div>
          <UserManagement />
        </div>
      </main>
    </div>
  );
};

export default Users;