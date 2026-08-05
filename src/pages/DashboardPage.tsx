import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Droplets,
  Heart,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  Award,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Activity,
  Users,
  Plus,
} from 'lucide-react';

import { useAuth, useDonor } from '../hooks';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { BloodGroupBadge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { cn } from '../utils/helpers';

// ============================================
// Dashboard Page (Role-based)
// ============================================

export const DashboardPage: React.FC = () => {
  const { user, donorProfile, isDonor, isRecipient, isHospital, isAdmin } = useAuth();
  const { eligibility, canDonate, totalDonations, bloodGroup } = useDonor();
  const navigate = useNavigate();

  // Render based on user role
  if (isDonor || !user?.role) {
    return <DonorDashboard />;
  }

  if (isRecipient) {
    return <RecipientDashboard />;
  }

  if (isHospital) {
    return <HospitalDashboard />;
  }

  if (isAdmin) {
    return <AdminDashboard />;
  }

  // Default fallback
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome!</h1>
        <p className="text-gray-600">Please complete your profile to access your dashboard.</p>
        <Button className="mt-4" onClick={() => navigate('/profile')}>
          Complete Profile
        </Button>
      </div>
    </div>
  );
};

// ============================================
// Donor Dashboard
// ============================================

const DonorDashboard: React.FC = () => {
  const { user, donorProfile } = useAuth();
  const { eligibility, canDonate, totalDonations, bloodGroup } = useDonor();
  const navigate = useNavigate();

  // Mock data for dashboard
  const upcomingAppointments = [
    {
      id: '1',
      date: '2025-01-20',
      time: '10:00 AM',
      hospitalName: 'City General Hospital',
      status: 'confirmed' as const,
    },
  ];

  const recentDonations = [
    {
      id: '1',
      date: '2024-10-15',
      patientName: 'John Smith',
      bloodGroup: 'O+',
      hospitalName: 'Memorial Health System',
    },
    {
      id: '2',
      date: '2024-08-22',
      patientName: 'Sarah Johnson',
      bloodGroup: 'A+',
      hospitalName: "St. Mary's Medical Center",
    },
  ];

  const nearbyRequests = [
    {
      id: '1',
      patientName: 'Emily Davis',
      bloodGroup: 'O+' as const,
      urgency: 'high' as const,
      distance: '2.3 km',
      hospitalName: 'City General Hospital',
    },
    {
      id: '2',
      patientName: 'Michael Brown',
      bloodGroup: 'A-' as const,
      urgency: 'medium' as const,
      distance: '3.8 km',
      hospitalName: 'Regional Trauma Center',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between"
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Welcome back, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-gray-500 mt-1">
                Here's an overview of your donation journey.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/requests')}
                leftIcon={<Search className="w-4 h-4" />}
              >
                Find Requests
              </Button>
              <Button
                size="sm"
                onClick={() => navigate('/appointments/book')}
                leftIcon={<Calendar className="w-4 h-4" />}
              >
                Book Appointment
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StatCard
            title="Total Donations"
            value={totalDonations.toString()}
            icon={Droplets}
            color="bg-red-100 text-red-600"
            trend="+2 this year"
          />
          <StatCard
            title="Lives Impacted"
            value={(totalDonations * 3).toString()}
            icon={Heart}
            color="bg-pink-100 text-pink-600"
            trend={`${totalDonations * 3} lives`}
          />
          <StatCard
            title="Next Eligible"
            value={eligibility?.nextEligibleDate ? new Date(eligibility.nextEligibleDate).toLocaleDateString() : 'Ready'}
            icon={Clock}
            color={canDonate ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}
            trend={canDonate ? 'Eligible now!' : `${eligibility?.daysUntilEligible} days left`}
          />
          <StatCard
            title="Your Blood Type"
            value={bloodGroup || 'N/A'}
            icon={Droplets}
            color="bg-blue-100 text-blue-600"
            trend="Universal donor" 
            hideTrend={!bloodGroup?.includes('O-')}
          />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Eligibility Status Card */}
            <Card
              className={
                canDonate ? 'border-green-200 bg-green-50/50' : 'border-yellow-200 bg-yellow-50/50'
              }
            >
              <CardBody className="flex items-start gap-4">
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                    canDonate ? 'bg-green-100' : 'bg-yellow-100'
                  )}
                >
                  {canDonate ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {canDonate
                      ? 'You are eligible to donate!'
                      : 'Not yet eligible for donation'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {canDonate
                      ? 'Great news! You meet all requirements and can donate today.'
                      : `You need to wait ${eligibility?.daysUntilEligible} more days before your next donation.`}
                  </p>
                </div>
                {canDonate && (
                  <Button size="sm" onClick={() => navigate('/requests')}>
                    Find Requests
                  </Button>
                )}
              </CardBody>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader
                title="Upcoming Appointments"
                action={
                  <Link
                    to="/appointments"
                    className="text-sm font-medium text-primary hover:text-primary-dark flex items-center gap-1"
                  >
                    View All <ArrowRight className="w-4 h-4" />
                  </Link>
                }
              />

              {upcomingAppointments.length > 0 ? (
                <div className="space-y-3">
                  {upcomingAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {apt.hospitalName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(apt.date).toLocaleDateString()} at {apt.time}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Confirmed
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyStateMini
                  message="No upcoming appointments"
                  actionLabel="Book Now"
                  onAction={() => navigate('/appointments/book')}
                />
              )}
            </Card>

            {/* Recent Donations */}
            <Card>
              <CardHeader
                title="Recent Donations"
                action={
                  <Link
                    to="/donations/history"
                    className="text-sm font-medium text-primary hover:text-primary-dark flex items-center gap-1"
                  >
                    View History <ArrowRight className="w-4 h-4" />
                  </Link>
                }
              />

              <div className="space-y-3">
                {recentDonations.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <Avatar name={donation.patientName} alt={donation.patientName} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">
                        Donated to {donation.patientName}
                      </p>
                      <p className="text-sm text-gray-500">{donation.hospitalName}</p>
                    </div>
                    <BloodGroupBadge bloodGroup={donation.bloodGroup as any} size="sm" />
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {new Date(donation.date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card padding="sm">
              <h3 className="font-semibold text-gray-900 p-4 pb-2">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2 p-4 pt-2">
                <QuickActionButton
                  icon={<Droplets className="w-5 h-5" />}
                  label="Find Requests"
                  onClick={() => navigate('/requests')}
                />
                <QuickActionButton
                  icon={<Calendar className="w-5 h-5" />}
                  label="Book Slot"
                  onClick={() => navigate('/appointments/book')}
                />
                <QuickActionButton
                  icon={<Award className="w-5 h-5" />}
                  label="My Certificates"
                  onClick={() => navigate('/profile/certificates')}
                />
                <QuickActionButton
                  icon={<Users className="w-5 h-5" />}
                  label="Donor Card"
                  onClick={() => navigate('/profile/donor-card')}
                />
              </div>
            </Card>

            {/* Nearby Requests */}
            <Card>
              <CardHeader
                title="Nearby Requests"
                action={
                  <Link
                    to="/requests"
                    className="text-sm font-medium text-primary hover:text-primary-dark"
                  >
                    See All
                  </Link>
                }
              />

              <div className="space-y-3">
                {nearbyRequests.map((req) => (
                  <button
                    key={req.id}
                    onClick={() => navigate(`/requests/${req.id}`)}
                    className="w-full text-left p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-medium text-gray-900 text-sm">
                        {req.patientName}
                      </span>
                      <BloodGroupBadge bloodGroup={req.bloodGroup} size="sm" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      {req.distance} • {req.hospitalName}
                    </div>
                    <div className="mt-2">
                      <span
                        className={cn(
                          'inline-block px-2 py-0.5 rounded text-xs font-medium',
                          req.urgency === 'high'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        )}
                      >
                        {req.urgency === 'high' ? '🚨 Urgent' : '⚠️ Medium'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader title="Achievements" />
              <div className="space-y-3">
                {[
                  { icon: '🏆', name: 'First Donation', earned: true },
                  { icon: '❤️', name: '3 Lives Saved', earned: true },
                  { icon: '⭐', name: '5 Donations', earned: totalDonations >= 5 },
                  { icon: '🎖️', name: 'Hero Donor', earned: totalDonations >= 10 },
                ].map((achievement) => (
                  <div
                    key={achievement.name}
                    className={cn(
                      'flex items-center gap-3 p-2 rounded-lg',
                      achievement.earned ? '' : 'opacity-50'
                    )}
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <span
                      className={cn(
                        'text-sm font-medium',
                        achievement.earned ? 'text-gray-900' : 'text-gray-400'
                      )}
                    >
                      {achievement.name}
                    </span>
                    {!achievement.earned && (
                      <span className="ml-auto text-xs text-gray-400">
                        Locked
                      </span>
                    )}
                    {achievement.earned && (
                      <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Recipient Dashboard
// ============================================

const RecipientDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const myRequests = [
    {
      id: '1',
      patientName: 'Jane Doe',
      bloodGroup: 'A+' as const,
      unitsNeeded: 3,
      unitsReceived: 2,
      status: 'active' as const,
      createdAt: '2025-01-10',
    },
    {
      id: '2',
      patientName: 'Robert Smith',
      bloodGroup: 'O-' as const,
      unitsNeeded: 2,
      unitsReceived: 2,
      status: 'fulfilled' as const,
      createdAt: '2024-12-05',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Request Dashboard
              </h1>
              <p className="text-gray-500 mt-1">
                Manage your blood requests and track donations.
              </p>
            </div>
            <Button
              onClick={() => navigate('/requests/new')}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              New Request
            </Button>
          </div>
        </div>
      </div>

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StatCard
            title="Active Requests"
            value="2"
            icon={Activity}
            color="bg-blue-100 text-blue-600"
          />
          <StatCard
            title="Fulfilled"
            value="1"
            icon={CheckCircle2}
            color="bg-green-100 text-green-600"
          />
          <StatCard
            title="Donors Found"
            value="5"
            icon={Users}
            color="bg-purple-100 text-purple-600"
          />
          <StatCard
            title="Units Received"
            value="4"
            icon={Droplets}
            color="bg-red-100 text-red-600"
          />
        </div>

        {/* My Requests */}
        <Card>
          <CardHeader
            title="My Blood Requests"
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/requests/new')}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Create New
              </Button>
            }
          />

          <div className="space-y-4">
            {myRequests.map((request) => (
              <div
                key={request.id}
                className="p-4 bg-gray-50 rounded-xl flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {request.patientName}
                    </h4>
                    <BloodGroupBadge bloodGroup={request.bloodGroup} size="sm" />
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-medium',
                        request.status === 'active'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      )}
                    >
                      {request.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Created {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {request.unitsReceived}/{request.unitsNeeded}
                  </p>
                  <p className="text-xs text-gray-500">units received</p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/requests/${request.id}`)}
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ============================================
// Hospital Dashboard
// ============================================

const HospitalDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Hospital Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage requests, inventory, and coordinate with donors.
          </p>
        </div>
      </div>

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StatCard
            title="Active Requests"
            value="12"
            icon={Activity}
            color="bg-blue-100 text-blue-600"
            trend="+3 this week"
          />
          <StatCard
            title="Today's Donors"
            value="8"
            icon={Users}
            color="bg-green-100 text-green-600"
            trend="2 scheduled"
          />
          <StatCard
            title="Inventory Level"
            value="78%"
            icon={Droplets}
            color="bg-orange-100 text-orange-600"
            trend="Low on O-"
          />
          <StatCard
            title="Fulfilled Today"
            value="5"
            icon={CheckCircle2}
            color="bg-purple-100 text-purple-600"
            trend="↑ 25%"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader
              title="Recent Blood Requests"
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/requests/new')}
                >
                  + New Request
                </Button>
              }
            />
            <CardBody>
              <p className="text-gray-500 text-center py-8">
                Hospital request management coming soon...
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Today's Schedule" />
            <CardBody>
              <p className="text-gray-500 text-center py-8">
                Appointment calendar coming soon...
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Admin Dashboard
// ============================================

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Platform overview and management controls.
          </p>
        </div>
      </div>

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StatCard
            title="Total Users"
            value="15,847"
            icon={Users}
            color="bg-indigo-100 text-indigo-600"
            trend="+12% this month"
          />
          <StatCard
            title="Total Donations"
            value="42,593"
            icon={Droplets}
            color="bg-red-100 text-red-600"
            trend="+8% this month"
          />
          <StatCard
            title="Active Requests"
            value="234"
            icon={Activity}
            color="bg-yellow-100 text-yellow-600"
            trend="45 critical"
          />
          <StatCard
            title="Partner Hospitals"
            value="350"
            icon={Building2}
            color="bg-green-100 text-green-600"
            trend="+5 this quarter"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="User Management" />
            <CardBody>
              <p className="text-gray-500 text-center py-8">
                User management interface coming soon...
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="System Analytics" />
            <CardBody>
              <p className="text-gray-500 text-center py-8">
                Analytics charts coming soon...
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Helper Components
// ============================================

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend?: string;
  hideTrend?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  trend,
  hideTrend,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <Card padding="md" className="hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
        {!hideTrend && trend && (
          <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{title}</p>
    </Card>
  </motion.div>
);

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon,
  label,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 transition-colors group"
  >
    <div className="w-10 h-10 bg-gray-100 group-hover:bg-primary/10 rounded-lg flex items-center justify-center text-gray-600 group-hover:text-primary transition-colors">
      {icon}
    </div>
    <span className="text-xs font-medium text-gray-700 text-center leading-tight">
      {label}
    </span>
  </button>
);

interface EmptyStateMiniProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyStateMini: React.FC<EmptyStateMiniProps> = ({
  message,
  actionLabel,
  onAction,
}) => (
  <div className="text-center py-8">
    <p className="text-gray-500 mb-3">{message}</p>
    {actionLabel && onAction && (
      <Button variant="outline" size="sm" onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </div>
);

// Import icons used in components
import { Search, Building2 } from 'lucide-react';
