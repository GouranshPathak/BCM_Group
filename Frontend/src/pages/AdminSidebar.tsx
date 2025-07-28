import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  X,
  Settings
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onToggle }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Overview and statistics',
      active: true
    },
    {
      id: 'enquiries',
      label: 'Enquiries',
      icon: MessageSquare,
      description: 'Project enquiries',
      active: false
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: Users,
      description: 'Contact messages',
      active: false
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'System settings',
      active: false
    }
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200"> {/* Reduced padding */}
          <div>
            <h2 className="text-lg font-bold text-gray-900">BCM Admin</h2> {/* Reduced font size */}
            <p className="text-xs text-gray-600">Management Panel</p> {/* Reduced font size */}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Menu - REMOVED PROJECTS */}
        <nav className="p-3"> {/* Reduced padding */}
          <div className="space-y-1"> {/* Reduced spacing */}
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={item.active ? "default" : "ghost"}
                className={`w-full justify-start h-auto p-3 ${  /* Reduced padding */
                  item.active 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  // Handle navigation here
                  console.log(`Navigate to ${item.id}`);
                }}
              >
                <item.icon className="h-4 w-4 mr-3" /> {/* Reduced icon size */}
                <div className="text-left">
                  <div className="font-medium text-sm">{item.label}</div> {/* Reduced font size */}
                  <div className={`text-xs ${  /* Reduced font size */
                    item.active ? 'text-primary-foreground/80' : 'text-gray-500'
                  }`}>
                    {item.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200"> {/* Reduced padding */}
          <div className="text-center">
            <p className="text-xs text-gray-500">BCM Group Admin</p>
            <p className="text-xs text-gray-400">© 2024</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
