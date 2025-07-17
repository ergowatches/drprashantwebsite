import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Phone, 
  MessageCircle, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  Bell,
  Eye,
  EyeOff,
  LogOut
} from 'lucide-react';
import { format, isToday, isTomorrow } from 'date-fns';

interface BookedSlot {
  date: string;
  time: string;
  patientName: string;
  patientPhone?: string; // Made optional
  consultationType: 'video' | 'in-person';
  timestamp?: number; // Made optional
  reason?: string;
}

interface PendingNotification {
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  patientMessage: string;
  whatsappLink: string;
  timestamp: number;
}

const Admin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [pendingNotifications, setPendingNotifications] = useState<PendingNotification[]>([]);

  // Check login status on mount
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Load data when logged in
  useEffect(() => {
    if (isLoggedIn) {
      const savedBookings = localStorage.getItem('drPrashantBookings');
      const savedPending = localStorage.getItem('pendingNotifications');
      
      if (savedBookings) {
        setBookedSlots(JSON.parse(savedBookings));
      }
      if (savedPending) {
        setPendingNotifications(JSON.parse(savedPending));
      }
    }
  }, [isLoggedIn]);

  // Login credentials: admin / doctor123
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'doctor123') {
      setIsLoggedIn(true);
      localStorage.setItem('adminLoggedIn', 'true');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    setLoginForm({ username: '', password: '' });
  };

  const getDateLabel = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return 'Invalid Date';
      if (isToday(date)) return 'Today';
      if (isTomorrow(date)) return 'Tomorrow';
      return format(date, 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const markNotificationSent = (index: number) => {
    const updated = pendingNotifications.filter((_, i) => i !== index);
    setPendingNotifications(updated);
    localStorage.setItem('pendingNotifications', JSON.stringify(updated));
  };

  const todayAppointments = bookedSlots.filter(apt => {
    try {
      return apt && apt.date && isToday(new Date(apt.date));
    } catch (error) {
      return false;
    }
  });

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">Dr</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-600 mt-2">Dr. Prashant Agrawal - Admin Panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Login to Admin Panel
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Demo Credentials:</h3>
            <p className="text-sm text-gray-600">Username: <code className="bg-white px-2 py-1 rounded">admin</code></p>
            <p className="text-sm text-gray-600">Password: <code className="bg-white px-2 py-1 rounded">doctor123</code></p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Bookings</p>
              <p className="text-2xl font-bold text-blue-700">{bookedSlots.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-yellow-700">{pendingNotifications.length}</p>
            </div>
            <Bell className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Today</p>
              <p className="text-2xl font-bold text-green-700">{todayAppointments.length}</p>
            </div>
            <Clock className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">This Week</p>
              <p className="text-2xl font-bold text-purple-700">{bookedSlots.filter(apt => {
                try {
                  if (!apt || !apt.date) return false;
                  const aptDate = new Date(apt.date);
                  if (isNaN(aptDate.getTime())) return false;
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return aptDate >= weekAgo;
                } catch (error) {
                  return false;
                }
              }).length}</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveTab('pending')}
          className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow text-left"
        >
          <div className="flex items-center justify-between mb-3">
            <Bell className="w-8 h-8 text-yellow-500" />
            {pendingNotifications.length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {pendingNotifications.length}
              </span>
            )}
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Pending Confirmations</h3>
          <p className="text-gray-600 text-sm">Send WhatsApp confirmations to patients</p>
        </button>

        <button
          onClick={() => setActiveTab('today')}
          className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow text-left"
        >
          <Clock className="w-8 h-8 text-blue-500 mb-3" />
          <h3 className="font-bold text-gray-900 mb-1">Today's Schedule</h3>
          <p className="text-gray-600 text-sm">View and manage today's appointments</p>
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow text-left"
        >
          <Calendar className="w-8 h-8 text-green-500 mb-3" />
          <h3 className="font-bold text-gray-900 mb-1">All Appointments</h3>
          <p className="text-gray-600 text-sm">View all upcoming appointments</p>
        </button>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Recent Bookings</h3>
        {bookedSlots.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No bookings yet</p>
        ) : (
          <div className="space-y-3">
            {bookedSlots
              .filter(appointment => appointment && appointment.patientName && appointment.date) // Filter out invalid entries
              .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
              .slice(0, 5)
              .map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{appointment.patientName}</p>
                    <p className="text-sm text-gray-600">{getDateLabel(appointment.date)} at {appointment.time}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">WhatsApp Video</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );

  // Pending Confirmations
  const renderPending = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Pending Confirmations</h2>
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
          {pendingNotifications.length} pending
        </span>
      </div>

      {pendingNotifications.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
          <p className="text-gray-600">No pending confirmations to send.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingNotifications.map((notification, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
                    <h4 className="font-bold text-gray-900">{notification.patientName}</h4>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {format(new Date(notification.date), 'EEEE, MMM dd, yyyy')} at {notification.time}
                    </p>
                    <p className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {notification.patientPhone}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <a 
                  href={`${notification.whatsappLink}?text=${encodeURIComponent(notification.patientMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => markNotificationSent(index)}
                  className="flex-1 flex items-center justify-center bg-green-500 text-white px-4 py-3 rounded-lg text-sm hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send WhatsApp Confirmation
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(notification.patientMessage);
                    alert('Message copied to clipboard!');
                  }}
                  className="flex items-center justify-center bg-blue-500 text-white px-4 py-3 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                >
                  Copy Message
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Today's Appointments
  const renderToday = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {todayAppointments.length} appointments
        </span>
      </div>

      {todayAppointments.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments today</h3>
          <p className="text-gray-600">Enjoy your free day!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {todayAppointments
            .filter(appointment => appointment && appointment.patientName) // Filter out invalid entries
            .sort((a, b) => {
              try {
                const timeA = new Date(`2000-01-01 ${a.time || '00:00'}`);
                const timeB = new Date(`2000-01-01 ${b.time || '00:00'}`);
                if (isNaN(timeA.getTime()) || isNaN(timeB.getTime())) return 0;
                return timeA.getTime() - timeB.getTime();
              } catch (error) {
                return 0;
              }
            })
            .map((appointment, index) => {
              const phoneNumber = appointment.patientPhone || '';
              const cleanPhone = phoneNumber.replace(/\D/g, '');
              const whatsappLink = cleanPhone ? `https://wa.me/91${cleanPhone}` : '#';
              
              return (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg mb-2">{appointment.patientName}</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {appointment.time}
                        </p>
                        <p className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          {phoneNumber || 'Phone not provided'}
                        </p>
                        {appointment.reason && (
                          <p className="flex items-start">
                            <MessageCircle className="w-4 h-4 mr-2 mt-0.5" />
                            {appointment.reason}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {cleanPhone ? (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <a 
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center bg-green-500 text-white px-4 py-3 rounded-lg text-sm hover:bg-green-600 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Start Video Call
                      </a>
                      <a 
                        href={`${whatsappLink}?text=${encodeURIComponent('Hello! This is Dr. Prashant Agrawal. I am ready for our video consultation. Are you available now?')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center bg-blue-500 text-white px-4 py-3 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                      >
                        Send Message
                      </a>
                    </div>
                  ) : (
                    <div className="text-center py-2 text-gray-500 text-sm">
                      No phone number available - Cannot start WhatsApp call
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );

  // All Appointments
  const renderAll = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">All Appointments</h2>

      {bookedSlots.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
          <p className="text-gray-600">Appointments will appear here once booked.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookedSlots
            .filter(appointment => appointment && appointment.patientName && appointment.date) // Filter out invalid entries
            .sort((a, b) => {
              try {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0;
                return dateA.getTime() - dateB.getTime();
              } catch (error) {
                return 0;
              }
            })
            .map((appointment, index) => {
              const phoneNumber = appointment.patientPhone || '';
              const cleanPhone = phoneNumber.replace(/\D/g, '');
              const whatsappLink = cleanPhone ? `https://wa.me/91${cleanPhone}` : '#';
              
              return (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="font-bold text-gray-900">{appointment.patientName}</h4>
                        <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          WhatsApp Video
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <p className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {getDateLabel(appointment.date)} at {appointment.time}
                        </p>
                        <p className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          {phoneNumber || 'Phone not provided'}
                        </p>
                      </div>
                      {cleanPhone ? (
                        <a 
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          WhatsApp
                        </a>
                      ) : (
                        <span className="inline-flex items-center bg-gray-300 text-gray-600 px-3 py-2 rounded text-sm">
                          <Phone className="w-4 h-4 mr-2" />
                          No Phone
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      Booked: {appointment.timestamp ? format(new Date(appointment.timestamp), 'MMM dd, HH:mm') : 'Unknown'}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Back</span>
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Dr. Prashant Admin</h1>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5 mr-1" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="px-4">
          <nav className="flex space-x-1 overflow-x-auto">
            {[
              { key: 'dashboard', label: 'Dashboard' },
              { key: 'pending', label: `Pending (${pendingNotifications.length})` },
              { key: 'today', label: `Today (${todayAppointments.length})` },
              { key: 'all', label: 'All' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`whitespace-nowrap py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="p-4 max-w-4xl mx-auto">
        {(() => {
          try {
            switch (activeTab) {
              case 'dashboard':
                return renderDashboard();
              case 'pending':
                return renderPending();
              case 'today':
                return renderToday();
              case 'all':
                return renderAll();
              default:
                return renderDashboard();
            }
          } catch (error) {
            console.error('Error rendering content:', error);
            return (
              <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
                <div className="text-red-500 mb-4">⚠️</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
                <p className="text-gray-600 mb-4">There was an error loading this section. Please try refreshing the page.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Refresh Page
                </button>
              </div>
            );
          }
        })()}
      </main>
    </div>
  );
};

export default Admin;