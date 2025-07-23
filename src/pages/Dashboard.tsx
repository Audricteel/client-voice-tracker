import { useAuth } from '@/contexts/AuthContext';
import { FeedbackForm } from '@/components/Feedback/FeedbackForm';
import { FeedbackTable } from '@/components/Feedback/FeedbackTable';
import { Sidebar } from '@/components/Layout/Sidebar';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const renderContent = () => {
    switch (user.role) {
      case 'superadmin':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
              <p className="text-muted-foreground">Manage feedback reports and system data</p>
            </div>
            <FeedbackTable />
          </div>
        );
      
      case 'auditor':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-primary">Feedback Reports</h1>
              <p className="text-muted-foreground">View and audit customer feedback reports</p>
            </div>
            <FeedbackTable />
          </div>
        );
      
      default: // user
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-primary">Submit Feedback</h1>
              <p className="text-muted-foreground">Create new customer feedback reports</p>
            </div>
            <FeedbackForm />
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;