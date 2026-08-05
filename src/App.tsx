import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

// Layout Components
import { MainLayout, AuthLayout } from './components/layout/Layout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { DashboardPage } from './pages/DashboardPage';
import { RequestFeedPage } from './pages/RequestFeedPage';
import { ProfilePage } from './pages/ProfilePage';
import { DonorCardPage } from './pages/DonorCardPage';

// Hooks
import { useAuth } from './hooks';

// ============================================
// Create React Query Client
// ============================================

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// ============================================
// Protected Route Component
// ============================================

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// ============================================
// Public Route (redirects if authenticated)
// ============================================

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    // Redirect based on role
    switch (user?.role) {
      case 'admin':
        return <Navigate to="/dashboard/admin" replace />;
      case 'hospital':
        return <Navigate to="/dashboard/hospital" replace />;
      case 'donor':
        return <Navigate to="/dashboard/donor" replace />;
      case 'recipient':
        return <Navigate to="/dashboard/recipient" replace />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

// ============================================
// 404 Page
// ============================================

const NotFoundPage: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
        className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <span className="text-5xl font-bold text-primary">404</span>
      </motion.div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
        >
          Go Back
        </button>
        <a
          href="/"
          className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all inline-flex items-center justify-center gap-2"
        >
          Go Home
        </a>
      </div>
    </div>
  </div>
);

// ============================================
// App Component with Routing
// ============================================

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
      
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Role-specific dashboards (aliases) */}
      <Route
        path="/dashboard/donor"
        element={
          <ProtectedRoute allowedRoles={['donor']}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/hospital"
        element={
          <ProtectedRoute allowedRoles={['hospital']}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/recipient"
        element={
          <ProtectedRoute allowedRoles={['recipient']}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Feature Routes */}
      <Route
        path="/requests"
        element={
          <ProtectedRoute>
            <RequestFeedPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/requests/new"
        element={
          <ProtectedRoute allowedRoles={['recipient', 'hospital']}>
            <div className="min-h-screen bg-gray-50 pt-18"><CreateRequestPlaceholder /></div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/requests/:id"
        element={
          <ProtectedRoute>
            <RequestFeedPage />
          </ProtectedRoute>
        }
      />

      {/* Profile Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/donor-card"
        element={
          <ProtectedRoute allowedRoles={['donor']}>
            <DonorCardPage />
          </ProtectedRoute>
        }
      />

      {/* Placeholder Pages */}
      <Route
        path="/appointments/*"
        element={<PlaceholderPage title="Appointments" description="Appointment management coming soon!" />}
      />
      <Route
        path="/notifications"
        element={<PlaceholderPage title="Notifications" description="Notification center coming soon!" />}
      />
      <Route
        path="/settings"
        element={<PlaceholderPage title="Settings" description="Settings page coming soon!" />}
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute allowedRoles={['admin', 'hospital']}>
            <PlaceholderPage title="Analytics" description="Analytics dashboard coming soon!" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/map"
        element={<PlaceholderPage title="Map View" description="Interactive map coming soon!" />}
      />
      <Route
        path="/eligibility"
        element={<PlaceholderPage title="Eligibility Checker" description="Eligibility checker coming soon!" />}
      />

      {/* Static Pages */}
      <Route path="/about" element={<StaticPage title="About Us" />} />
      <Route path="/contact" element={<StaticPage title="Contact Us" />} />
      <Route path="/privacy" element={<StaticPage title="Privacy Policy" />} />
      <Route path="/terms" element={<StaticPage title="Terms of Service" />} />

      {/* 404 Catch-all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

// ============================================
// Placeholder Page Component
// ============================================

interface PlaceholderPageProps {
  title: string;
  description: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description,
}) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="text-center max-w-md">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">🚧</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-500">{description}</p>
    </div>
  </div>
);

const CreateRequestPlaceholder: React.FC = () => (
  <div className="container-custom mx-auto px-4 py-8">
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Blood Request</h1>
      <PlaceholderPage
        title="Coming Soon"
        description="The blood request creation form is under development. Please check back later!"
      />
    </div>
  </div>
);

// ============================================
// Static Page Component
// ============================================

interface StaticPageProps {
  title: string;
}

const StaticPage: React.FC<StaticPageProps> = ({ title }) => (
  <MainLayout>
    <div className="py-16 md:py-24">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{title}</h1>
        <div className="max-w-3xl prose prose-lg">
          <p className="text-gray-600">
            This page is currently being built. Check back soon for more information about {title.toLowerCase()}.
          </p>
        </div>
      </div>
    </div>
  </MainLayout>
);

// ============================================
// Main App Component
// ============================================

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
        
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#1f2937',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
