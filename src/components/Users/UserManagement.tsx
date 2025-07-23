import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/contexts/AuthContext';

export const UserManagement = () => {
  const [users, setUsers] = useState<(User & { password: string })[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<(User & { password: string }) | null>(null);
  const [formData, setFormData] = useState({
    fname: '',
    mname: '',
    lname: '',
    email: '',
    password: '',
    bday: '',
    company: '',
    role: 'user' as 'user' | 'auditor' | 'superadmin',
    status: 'active' as 'active' | 'inactive'
  });

  const { toast } = useToast();

  useEffect(() => {
    // Load users from localStorage or use mock data
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Initialize with mock users
      const mockUsers = [
        {
          id: 1,
          fname: 'John',
          mname: 'A',
          lname: 'Doe',
          email: 'superadmin@example.com',
          password: 'password',
          role: 'superadmin' as const,
          status: 'active' as const,
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
          role: 'user' as const,
          status: 'active' as const,
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
          role: 'auditor' as const,
          status: 'active' as const,
          company: 'Audit Firm',
          bday: '1988-08-20'
        }
      ];
      setUsers(mockUsers);
      localStorage.setItem('users', JSON.stringify(mockUsers));
    }
  }, []);

  const resetForm = () => {
    setFormData({
      fname: '',
      mname: '',
      lname: '',
      email: '',
      password: '',
      bday: '',
      company: '',
      role: 'user',
      status: 'active'
    });
    setEditingUser(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData }
          : user
      );
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      toast({
        title: "User Updated",
        description: "User information has been successfully updated.",
      });
    } else {
      // Create new user
      const newUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        ...formData
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      toast({
        title: "User Created",
        description: "New user has been successfully created.",
      });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (user: User & { password: string }) => {
    setEditingUser(user);
    setFormData({
      fname: user.fname,
      mname: user.mname || '',
      lname: user.lname,
      email: user.email,
      password: user.password,
      bday: user.bday,
      company: user.company,
      role: user.role,
      status: user.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      toast({
        title: "User Deleted",
        description: "User has been successfully deleted.",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-primary">User Management</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? 'Edit User' : 'Add New User'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fname">First Name</Label>
                  <Input
                    id="fname"
                    value={formData.fname}
                    onChange={(e) => handleInputChange('fname', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lname">Last Name</Label>
                  <Input
                    id="lname"
                    value={formData.lname}
                    onChange={(e) => handleInputChange('lname', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mname">Middle Name</Label>
                <Input
                  id="mname"
                  value={formData.mname}
                  onChange={(e) => handleInputChange('mname', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bday">Birthday</Label>
                <Input
                  id="bday"
                  type="date"
                  value={formData.bday}
                  onChange={(e) => handleInputChange('bday', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="auditor">Auditor</SelectItem>
                      <SelectItem value="superadmin">Superadmin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingUser ? 'Update User' : 'Create User'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Birthday</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>
                    {user.fname} {user.mname} {user.lname}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.company}</TableCell>
                  <TableCell>{new Date(user.bday).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(user.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};