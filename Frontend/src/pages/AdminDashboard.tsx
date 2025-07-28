import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  MessageSquare, 
  TrendingUp,
  Bell,
  Search,
  Eye,
  Reply,
  LogOut,
  Loader2,
  RefreshCw,
  Calendar,
  Phone,
  Mail,
  MapPin,
  LayoutDashboard,
  Home,
  Menu,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Types for our data
interface Enquiry {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  location?: string;
  interestedIn?: string;
  budget?: string;
  message?: string;
  projectName?: string;
  status: 'pending' | 'reviewed' | 'responded';
  createdAt: string;
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  status: 'pending' | 'reviewed' | 'responded';
  createdAt: string;
}

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'enquiries' | 'messages'>('dashboard');
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    totalContacts: 0,
    newMessages: 0,
    pendingRequests: 0
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Authentication check
  useEffect(() => {
    const checkAuthentication = () => {
      const isLoggedIn = localStorage.getItem('adminLoggedIn');
      const loginTime = localStorage.getItem('adminLoginTime');
      
      console.log('Auth check - isLoggedIn:', isLoggedIn);
      
      if (isLoggedIn !== 'true') {
        console.log('Not authenticated, redirecting to login');
        navigate('/admin', { replace: true });
        return false;
      }

      if (loginTime) {
        const loginDate = new Date(loginTime);
        const now = new Date();
        const hoursDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff > 24) {
          console.log('Session expired, clearing and redirecting');
          localStorage.removeItem('adminLoggedIn');
          localStorage.removeItem('adminUsername');
          localStorage.removeItem('adminLoginTime');
          navigate('/admin', { replace: true });
          toast({
            title: "Session Expired",
            description: "Please log in again.",
            variant: "destructive",
          });
          return false;
        }
      }

      console.log('Authentication successful');
      setIsAuthenticated(true);
      return true;
    };

    const isAuth = checkAuthentication();
    if (isAuth) {
      fetchDashboardData();
    }
  }, [navigate, toast]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const enquiriesResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/enquiry/all`);
      const enquiriesData = await enquiriesResponse.json();
      
      const contactsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/all`);
      const contactsData = await contactsResponse.json();

      if (enquiriesData.success) {
        setEnquiries(enquiriesData.data || []);
      }

      if (contactsData.success) {
        setContacts(contactsData.data || []);
      }

      const totalEnquiries = enquiriesData.success ? (enquiriesData.data?.length || 0) : 0;
      const totalContacts = contactsData.success ? (contactsData.data?.length || 0) : 0;
      const newMessages = [
        ...(enquiriesData.success ? (enquiriesData.data || []).filter((e: Enquiry) => e.status === 'pending') : []),
        ...(contactsData.success ? (contactsData.data || []).filter((c: Contact) => c.status === 'pending') : [])
      ].length;

      setStats({
        totalEnquiries,
        totalContacts,
        newMessages,
        pendingRequests: newMessages
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('adminLoggedIn');
      localStorage.removeItem('adminUsername');
      localStorage.removeItem('adminLoginTime');
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-red-100 text-red-800 border-red-200';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'responded': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getBudgetDisplay = (budget: string) => {
    const budgetMap: { [key: string]: string } = {
      'under-50l': 'Under ₹50L',
      '50l-1cr': '₹50L - ₹1Cr',
      '1cr-2cr': '₹1 - ₹2Cr',
      '2cr-5cr': '₹2 - ₹5Cr',
      'above-5cr': 'Above ₹5Cr'
    };
    return budgetMap[budget] || budget;
  };

  const updateStatus = async (type: 'enquiry' | 'contact', id: string, newStatus: string) => {
    try {
      const endpoint = type === 'enquiry' ? 'enquiry' : 'contact';
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${endpoint}/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Status Updated",
          description: `${type.charAt(0).toUpperCase() + type.slice(1)} status updated successfully.`,
        });
        fetchDashboardData();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update ${type} status.`,
        variant: "destructive",
      });
    }
  };

  // Handle tab change and close mobile menu
  const handleTabChange = (tab: 'dashboard' | 'enquiries' | 'messages') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  // Show loading screen until authentication is verified
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Checking authentication...</span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  const recentMessages = [
    ...enquiries.map(e => ({
      id: e._id,
      type: 'enquiry' as const,
      name: e.fullName,
      email: e.email,
      phone: e.phone,
      project: e.interestedIn || e.projectName || 'General Enquiry',
      message: e.message,
      budget: e.budget,
      location: e.location,
      status: e.status,
      time: e.createdAt
    })),
    ...contacts.map(c => ({
      id: c._id,
      type: 'contact' as const,
      name: c.name,
      email: c.email,
      phone: c.phone,
      project: c.service,
      message: c.message,
      status: c.status,
      time: c.createdAt
    }))
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 10);

  const dashboardStats = [
    {
      title: 'Total Enquiries',
      value: stats.totalEnquiries.toString(),
      change: '+' + enquiries.filter(e => {
        const date = new Date(e.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return date > weekAgo;
      }).length + ' this week',
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
    },
    {
      title: 'Contact Messages',
      value: stats.totalContacts.toString(),
      change: '+' + contacts.filter(c => {
        const date = new Date(c.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return date > weekAgo;
      }).length + ' this week',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100',
    },
    {
      title: 'Pending Requests',
      value: stats.pendingRequests.toString(),
      change: 'Needs attention',
      icon: Bell,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      iconBg: 'bg-red-100',
    },
    {
      title: 'Total Messages',
      value: (stats.totalEnquiries + stats.totalContacts).toString(),
      change: '+' + stats.newMessages + ' new',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100',
    },
  ];

  const renderEnquiries = () => (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Project Enquiries</h2>
        <p className="text-sm md:text-base text-gray-600">Manage all project enquiries received from users</p>
      </div>
      {enquiries.length > 0 ? enquiries.map((enquiry) => (
        <Card key={enquiry._id} className="shadow-sm">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 text-lg mb-2 sm:mb-0">{enquiry.fullName}</h4>
                  <Badge className={`text-xs border ${getStatusColor(enquiry.status)} w-fit`}>
                    {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{enquiry.email}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span>{enquiry.phone}</span>
                  </div>
                  
                  {enquiry.location && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{enquiry.location}</span>
                    </div>
                  )}
                  
                  {enquiry.interestedIn && (
                    <div className="flex items-start text-sm text-gray-600">
                      <span className="font-medium mr-1">Interested In:</span>
                      <span className="truncate">{enquiry.interestedIn}</span>
                    </div>
                  )}
                  
                  {enquiry.budget && (
                    <div className="flex items-start text-sm text-gray-600 sm:col-span-2">
                      <span className="font-medium mr-1">Budget:</span>
                      <span>{getBudgetDisplay(enquiry.budget)}</span>
                    </div>
                  )}
                </div>
                
                {enquiry.message && (
                  <div className="bg-gray-50 p-3 rounded mb-3">
                    <p className="text-sm text-gray-700 break-words">{enquiry.message}</p>
                  </div>
                )}
                
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(enquiry.createdAt)}
                </div>
              </div>
              
              <div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 lg:ml-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 lg:flex-none"
                  onClick={() => console.log('View enquiry:', enquiry)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">View</span>
                </Button>
                {enquiry.status === 'pending' && (
                  <Button 
                    variant="default"
                    size="sm"
                    className="flex-1 lg:flex-none"
                    onClick={() => updateStatus('enquiry', enquiry._id, 'reviewed')}
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Review</span>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )) : (
        <div className="text-center py-12 text-gray-500">
          <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-30" />
          <h3 className="text-lg font-medium mb-2">No enquiries yet</h3>
          <p className="text-sm">Enquiries will appear here when users submit project enquiry forms.</p>
        </div>
      )}
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Contact Messages</h2>
        <p className="text-sm md:text-base text-gray-600">Manage all contact form messages received from users</p>
      </div>
      {contacts.length > 0 ? contacts.map((contact) => (
        <Card key={contact._id} className="shadow-sm">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 text-lg mb-2 sm:mb-0">{contact.name}</h4>
                  <Badge className={`text-xs border ${getStatusColor(contact.status)} w-fit`}>
                    {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                  
                  {contact.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span>{contact.phone}</span>
                    </div>
                  )}
                  
                  <div className="flex items-start text-sm text-gray-600 sm:col-span-2">
                    <span className="font-medium mr-1">Service:</span>
                    <span className="truncate">{contact.service}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded mb-3">
                  <p className="text-sm text-gray-700 break-words">{contact.message}</p>
                </div>
                
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(contact.createdAt)}
                </div>
              </div>
              
              <div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 lg:ml-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 lg:flex-none"
                  onClick={() => console.log('View contact:', contact)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">View</span>
                </Button>
                {contact.status === 'pending' && (
                  <Button 
                    variant="default"
                    size="sm"
                    className="flex-1 lg:flex-none"
                    onClick={() => updateStatus('contact', contact._id, 'reviewed')}
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Review</span>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )) : (
        <div className="text-center py-12 text-gray-500">
          <Users className="h-16 w-16 mx-auto mb-4 opacity-30" />
          <h3 className="text-lg font-medium mb-2">No messages yet</h3>
          <p className="text-sm">Contact messages will appear here when users submit contact forms.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* RESPONSIVE HEADER NAVIGATION */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Logo and Mobile Menu Toggle */}
            <div className="flex items-center space-x-3">
              <button
                className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">B</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-gray-900">BCM Admin</h1>
                  <p className="text-xs text-gray-600">Management Panel</p>
                </div>
              </div>
            </div>
            
            {/* Right Side - User Info and Actions */}
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="hidden sm:block text-right mr-2 md:mr-4">
                <p className="text-sm font-medium text-gray-900">
                  Welcome, {localStorage.getItem('adminUsername') || 'Admin'}
                </p>
                <p className="text-xs text-gray-600">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={fetchDashboardData}
                className="hover:bg-gray-100"
                title="Refresh"
              >
                <RefreshCw className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              
              <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-gray-100">
                <Search className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              
              <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
                <Bell className="h-4 w-4 md:h-5 md:w-5" />
                {stats.newMessages > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-[8px] md:text-[10px] text-white font-medium">
                      {stats.newMessages > 9 ? '9+' : stats.newMessages}
                    </span>
                  </span>
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/')}
                className="hidden sm:flex hover:bg-gray-100"
                title="Go to Home"
              >
                <Home className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                className="hover:bg-gray-100"
                title="Logout"
              >
                <LogOut className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-primary-foreground">
                  {(localStorage.getItem('adminUsername') || 'A').charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 mt-4">
            <Button
              variant={activeTab === 'dashboard' ? "default" : "ghost"}
              className="flex items-center space-x-2 px-4 py-2"
              onClick={() => handleTabChange('dashboard')}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
            
            <Button
              variant={activeTab === 'enquiries' ? "default" : "ghost"}
              className="flex items-center space-x-2 px-4 py-2"
              onClick={() => handleTabChange('enquiries')}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Enquiries</span>
              {enquiries.filter(e => e.status === 'pending').length > 0 && (
                <Badge variant="destructive" className="ml-1 text-xs">
                  {enquiries.filter(e => e.status === 'pending').length}
                </Badge>
              )}
            </Button>
            
            <Button
              variant={activeTab === 'messages' ? "default" : "ghost"}
              className="flex items-center space-x-2 px-4 py-2"
              onClick={() => handleTabChange('messages')}
            >
              <Users className="h-4 w-4" />
              <span>Messages</span>
              {contacts.filter(c => c.status === 'pending').length > 0 && (
                <Badge variant="destructive" className="ml-1 text-xs">
                  {contacts.filter(c => c.status === 'pending').length}
                </Badge>
              )}
            </Button>
          </nav>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-3 space-y-2">
              <Button
                variant={activeTab === 'dashboard' ? "default" : "ghost"}
                className="w-full justify-start px-4 py-3"
                onClick={() => handleTabChange('dashboard')}
              >
                <LayoutDashboard className="h-4 w-4 mr-3" />
                Dashboard
              </Button>
              
              <Button
                variant={activeTab === 'enquiries' ? "default" : "ghost"}
                className="w-full justify-start px-4 py-3"
                onClick={() => handleTabChange('enquiries')}
              >
                <MessageSquare className="h-4 w-4 mr-3" />
                Enquiries
                {enquiries.filter(e => e.status === 'pending').length > 0 && (
                  <Badge variant="destructive" className="ml-auto text-xs">
                    {enquiries.filter(e => e.status === 'pending').length}
                  </Badge>
                )}
              </Button>
              
              <Button
                variant={activeTab === 'messages' ? "default" : "ghost"}
                className="w-full justify-start px-4 py-3"
                onClick={() => handleTabChange('messages')}
              >
                <Users className="h-4 w-4 mr-3" />
                Messages
                {contacts.filter(c => c.status === 'pending').length > 0 && (
                  <Badge variant="destructive" className="ml-auto text-xs">
                    {contacts.filter(c => c.status === 'pending').length}
                  </Badge>
                )}
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="p-4 md:p-6">
        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              {dashboardStats.map((stat, index) => (
                <Card key={index} className={`${stat.bgColor} border-0 shadow-sm hover:shadow-lg transition-all duration-200`}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-600 mb-1 truncate">{stat.title}</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                        <p className="text-xs text-green-600 font-medium truncate">{stat.change}</p>
                      </div>
                      <div className={`p-2 rounded-xl ${stat.iconBg} flex-shrink-0`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
              <Card className="xl:col-span-2 shadow-sm">
                <CardHeader className="border-b border-gray-100 p-4 md:p-6">
                  <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      <span className="text-base md:text-lg">Recent Messages</span>
                      <Badge variant="secondary" className="text-xs">
                        {recentMessages.length}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" onClick={fetchDashboardData}>
                      <RefreshCw className="h-4 w-4 mr-1 md:mr-2" />
                      <span className="text-xs md:text-sm">Refresh</span>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[400px] md:max-h-[500px] overflow-y-auto">
                    {recentMessages.length > 0 ? recentMessages.map((message, index) => (
                      <div key={`${message.type}-${message.id}`} className={`p-3 md:p-4 hover:bg-gray-50 transition-colors ${index !== recentMessages.length - 1 ? 'border-b border-gray-100' : ''}`}>
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-3 lg:space-y-0">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-1 sm:space-y-0">
                              <h4 className="font-semibold text-gray-900 truncate text-sm md:text-base">{message.name}</h4>
                              <Badge className={`text-xs border ${getStatusColor(message.status)} w-fit`}>
                                {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                              </Badge>
                            </div>
                            
                            <div className="space-y-1 mb-3">
                              <div className="flex items-center text-xs md:text-sm text-gray-600">
                                <Mail className="h-3 w-3 md:h-4 md:w-4 mr-2 text-gray-400 flex-shrink-0" />
                                <span className="truncate">{message.email}</span>
                              </div>
                              
                              {message.phone && (
                                <div className="flex items-center text-xs md:text-sm text-gray-600">
                                  <Phone className="h-3 w-3 md:h-4 md:w-4 mr-2 text-gray-400 flex-shrink-0" />
                                  <span>{message.phone}</span>
                                </div>
                              )}
                              
                              <div className="flex items-start text-xs md:text-sm text-gray-600">
                                <span className="font-medium mr-1">
                                  {message.type === 'enquiry' ? 'Project:' : 'Service:'}
                                </span>
                                <span className="truncate">{message.project}</span>
                              </div>
                            </div>
                            
                            <p className="text-xs md:text-sm text-gray-700 mb-2 bg-gray-50 p-2 rounded break-words line-clamp-3">
                              {message.message}
                            </p>
                            
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(message.time)}
                            </div>
                          </div>
                          
                          <div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 lg:ml-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex-1 lg:flex-none text-xs"
                              onClick={() => console.log('View details:', message)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            {message.status === 'pending' && (
                              <Button 
                                variant="default"
                                size="sm"
                                className="flex-1 lg:flex-none text-xs"
                                onClick={() => updateStatus(message.type, message.id, 'reviewed')}
                              >
                                <Reply className="h-3 w-3 mr-1" />
                                Review
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-8 md:py-12 text-gray-500">
                        <MessageSquare className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 opacity-30" />
                        <h3 className="text-base md:text-lg font-medium mb-2">No messages yet</h3>
                        <p className="text-sm">Messages will appear here when users submit forms.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Statistics */}
              <Card className="shadow-sm">
                <CardHeader className="border-b border-gray-100 p-4 md:p-6">
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    <span className="text-base md:text-lg">Quick Statistics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm md:text-base">Today's Messages</h4>
                        <p className="text-xs md:text-sm text-gray-600">New enquiries and contacts</p>
                      </div>
                      <div className="text-lg md:text-xl font-bold text-blue-600 flex-shrink-0">
                        {recentMessages.filter(m => {
                          const today = new Date();
                          const messageDate = new Date(m.time);
                          return messageDate.toDateString() === today.toDateString();
                        }).length}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm md:text-base">This Week</h4>
                        <p className="text-xs md:text-sm text-gray-600">Messages from last 7 days</p>
                      </div>
                      <div className="text-lg md:text-xl font-bold text-green-600 flex-shrink-0">
                        {recentMessages.filter(m => {
                          const weekAgo = new Date();
                          weekAgo.setDate(weekAgo.getDate() - 7);
                          return new Date(m.time) > weekAgo;
                        }).length}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm md:text-base">Response Rate</h4>
                        <p className="text-xs md:text-sm text-gray-600">Messages responded to</p>
                      </div>
                      <div className="text-lg md:text-xl font-bold text-purple-600 flex-shrink-0">
                        {recentMessages.length > 0 
                          ? ((recentMessages.filter(m => m.status === 'responded').length / recentMessages.length) * 100).toFixed(0)
                          : 0}%
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <Button className="w-full text-sm" onClick={fetchDashboardData}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Refresh Data
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Enquiries View */}
        {activeTab === 'enquiries' && renderEnquiries()}

        {/* Messages View */}
        {activeTab === 'messages' && renderMessages()}
      </main>
    </div>
  );
};

export default AdminDashboard;
