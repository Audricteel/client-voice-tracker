import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sidebar } from '@/components/Layout/Sidebar';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getRoleBadge = (role: string) => {
    const colors = {
      superadmin: 'bg-primary text-primary-foreground',
      auditor: 'bg-warning text-warning-foreground',
      user: 'bg-secondary text-secondary-foreground'
    };
    
    return (
      <Badge className={colors[role as keyof typeof colors]}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge 
        variant={status === 'active' ? 'default' : 'secondary'}
        className={status === 'active' ? 'bg-success text-success-foreground' : ''}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-primary">Profile Information</h1>
            <p className="text-muted-foreground">Your account details and information</p>
          </div>
          
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">First Name</label>
                  <p className="text-lg font-medium">{user.fname}</p>
                </div>
                
                {user.mname && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Middle Name</label>
                    <p className="text-lg font-medium">{user.mname}</p>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                  <p className="text-lg font-medium">{user.lname}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-lg font-medium">{user.email}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Birthday</label>
                  <p className="text-lg font-medium">{new Date(user.bday).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Company</label>
                  <p className="text-lg font-medium">{user.company}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <div className="mt-1">
                    {getRoleBadge(user.role)}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">
                    {getStatusBadge(user.status)}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <label className="text-sm font-medium text-muted-foreground">User ID</label>
                <p className="text-lg font-medium">#{user.id}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;