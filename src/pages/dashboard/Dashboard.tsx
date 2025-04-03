
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@/types';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Redirect to dashboard based on role
  const getDashboardContent = () => {
    if (!user) return null;

    switch (user.role) {
      case 'farmer':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Farmer Dashboard</h2>
            <p className="text-muted-foreground">
              Welcome to your farmer dashboard! Here you can manage your crop listings, 
              view market trends, and handle orders from merchants.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <DashboardCard 
                title="List New Crop" 
                description="Add a new crop product to the marketplace"
                action={() => navigate('/farmer/list-crop')}
              />
              <DashboardCard 
                title="My Listings" 
                description="View and manage your current crop listings"
                action={() => navigate('/farmer/my-listings')}
              />
              <DashboardCard 
                title="Orders" 
                description="Manage your pending and completed orders"
                action={() => navigate('/farmer/orders')}
              />
            </div>
          </div>
        );
      case 'merchant':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Merchant Dashboard</h2>
            <p className="text-muted-foreground">
              Welcome to your merchant dashboard! Here you can browse crops from farmers,
              place orders, and manage your inventory.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <DashboardCard 
                title="Browse Marketplace" 
                description="Find new crops to purchase from farmers"
                action={() => navigate('/merchant/marketplace')}
              />
              <DashboardCard 
                title="My Orders" 
                description="View and manage your pending and completed orders"
                action={() => navigate('/merchant/orders')}
              />
              <DashboardCard 
                title="My Inventory" 
                description="Manage your current inventory of products"
                action={() => navigate('/merchant/inventory')}
              />
            </div>
          </div>
        );
      case 'customer':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Customer Dashboard</h2>
            <p className="text-muted-foreground">
              Welcome to your customer dashboard! Here you can browse products, place orders,
              and track your deliveries.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <DashboardCard 
                title="Browse Products" 
                description="Find fresh farm products to purchase"
                action={() => navigate('/customer/products')}
              />
              <DashboardCard 
                title="My Orders" 
                description="View and track your orders"
                action={() => navigate('/customer/orders')}
              />
              <DashboardCard 
                title="Saved Items" 
                description="View your saved products"
                action={() => navigate('/customer/saved')}
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="text-muted-foreground">Welcome to your dashboard!</p>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name || user?.email}</h1>
          <p className="text-muted-foreground">
            Role: {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      
      {getDashboardContent()}
    </div>
  );
};

// Helper component for cards in dashboard
const DashboardCard = ({ 
  title, 
  description, 
  action 
}: { 
  title: string; 
  description: string; 
  action: () => void; 
}) => (
  <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="mt-2 text-muted-foreground">{description}</p>
    <Button className="mt-4" onClick={action}>
      View
    </Button>
  </div>
);

export default Dashboard;
