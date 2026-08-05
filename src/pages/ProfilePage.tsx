import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Droplets,
  Camera,
  Edit3,
  Save,
  X,
  ShieldCheck,
  Bell,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { useAuth } from '../hooks';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardBody, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Avatar } from '../components/ui/Avatar';
import { BloodGroupBadge } from '../components/ui/Badge';
import { cn } from '../utils/helpers';

// ============================================
// Profile Page
// ============================================

export const ProfilePage: React.FC = () => {
  const { user, donorProfile, updateProfile, updateDonorProfile } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');

  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: donorProfile?.address || '',
    city: donorProfile?.city || '',
    state: donorProfile?.state || '',
    zipCode: donorProfile?.zipCode || '',
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSaveProfile = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      updateProfile({
        name: formData.name,
        phone: formData.phone,
      });

      updateDonorProfile({
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      });

      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                My Profile
              </h1>
              <p className="text-gray-500 mt-1">
                Manage your account settings and preferences
              </p>
            </div>

            {!isEditing && activeTab === 'profile' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                leftIcon={<Edit3 className="w-4 h-4" />}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Tabs */}
          <div className="lg:col-span-1">
            <Card padding="none" className="sticky top-24 overflow-hidden">
              <nav className="p-2">
                {[
                  { id: 'profile', label: 'Profile Info', icon: User },
                  { id: 'security', label: 'Security', icon: ShieldCheck },
                  { id: 'notifications', label: 'Notifications', icon: Bell },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors mb-1',
                      activeTab === tab.id
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    )}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <>
                {/* Avatar Section */}
                <Card>
                  <CardBody>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="relative group">
                        <Avatar
                          src={user?.avatar}
                          alt={user?.name || 'User'}
                          size="xl"
                        />
                        <button
                          className={cn(
                            'absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full',
                            'flex items-center justify-center text-white shadow-lg',
                            'opacity-0 group-hover:opacity-100 transition-opacity'
                          )}
                        >
                          <Camera className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-xl font-bold text-gray-900">
                          {user?.name}
                        </h2>
                        <p className="text-gray-500">{user?.email}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium capitalize">
                            {user?.role}
                          </span>
                          {donorProfile?.bloodGroup && (
                            <BloodGroupBadge bloodGroup={donorProfile.bloodGroup} size="md" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Profile Form */}
                <Card>
                  <CardHeader title="Personal Information" />

                  <CardBody>
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        disabled={!isEditing}
                        leftIcon={<User className="w-5 h-5" />}
                      />

                      <Input
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        disabled
                        leftIcon={<Mail className="w-5 h-5" />}
                        helperText="Email cannot be changed"
                      />

                      <Input
                        label="Phone Number"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        disabled={!isEditing}
                        leftIcon={<Phone className="w-5 h-5" />}
                      />

                      <Input
                        label="City"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        disabled={!isEditing}
                        leftIcon={<MapPin className="w-5 h-5" />}
                      />

                      <div className="md:col-span-2">
                        <Input
                          label="Address"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                          }
                          disabled={!isEditing}
                          leftIcon={<MapPin className="w-5 h-5" />}
                        />
                      </div>

                      <Input
                        label="State"
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                        disabled={!isEditing}
                      />

                      <Input
                        label="ZIP Code"
                        value={formData.zipCode}
                        onChange={(e) =>
                          setFormData({ ...formData, zipCode: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </CardBody>

                  {isEditing && (
                    <CardFooter className="justify-end gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSaveProfile}
                        isLoading={isLoading}
                        leftIcon={<Save className="w-4 h-4" />}
                      >
                        Save Changes
                      </Button>
                    </CardFooter>
                  )}
                </Card>

                {/* Donor Information (if applicable) */}
                {donorProfile && (
                  <Card>
                    <CardHeader title="Donor Information" />

                    <CardBody>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <InfoItem
                          label="Blood Group"
                          value={
                            <BloodGroupBadge
                              bloodGroup={donorProfile.bloodGroup}
                              size="lg"
                            />
                          }
                          icon={<Droplets className="w-5 h-5" />}
                        />
                        <InfoItem
                          label="Age"
                          value={`${donorProfile.age} years`}
                          icon={<Calendar className="w-5 h-5" />}
                        />
                        <InfoItem
                          label="Weight"
                          value={`${donorProfile.weight} kg`}
                          icon={<User className="w-5 h-5" />}
                        />
                        <InfoItem
                          label="Total Donations"
                          value={`${donorProfile.totalDonations}`}
                          icon={<Droplets className="w-5 h-5" />}
                        />
                        <InfoItem
                          label="Last Donation"
                          value={
                            donorProfile.lastDonationDate
                              ? new Date(donorProfile.lastDonationDate).toLocaleDateString()
                              : 'Never'
                          }
                          icon={<Calendar className="w-5 h-5" />}
                        />
                        <InfoItem
                          label="Availability"
                          value={
                            <span
                              className={cn(
                                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                                donorProfile.isAvailable
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-700'
                              )}
                            >
                              <span
                                className={cn(
                                  'w-1.5 h-1.5 rounded-full',
                                  donorProfile.isAvailable
                                    ? 'bg-green-500'
                                    : 'bg-gray-400'
                                )}
                              />
                              {donorProfile.isAvailable ? 'Available' : 'Unavailable'}
                            </span>
                          }
                          icon={<CheckCircle2 className="w-5 h-5" />}
                        />
                      </div>
                    </CardBody>
                  </Card>
                )}
              </>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <Card>
                <CardHeader title="Change Password" />

                <CardBody className="space-y-6">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <p className="text-sm text-yellow-800">
                      For security reasons, please choose a strong password that you don't 
                      use on other websites.
                    </p>
                  </div>

                  <div className="relative">
                    <Input
                      label="Current Password"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      leftIcon={<Lock className="w-5 h-5" />}
                      rightIcon={
                        <button
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="p-1 hover:text-gray-600"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      }
                    />
                  </div>

                  <div className="relative">
                    <Input
                      label="New Password"
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      leftIcon={<Lock className="w-5 h-5" />}
                      helperText="Must be at least 8 characters with uppercase, lowercase, and number"
                      rightIcon={
                        <button
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="p-1 hover:text-gray-600"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      }
                    />
                  </div>

                  <Input
                    label="Confirm New Password"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    leftIcon={<Lock className="w-5 h-5" />}
                  />

                  <Button
                    onClick={handleChangePassword}
                    isLoading={isLoading}
                    disabled={
                      !passwordData.currentPassword ||
                      !passwordData.newPassword ||
                      !passwordData.confirmPassword
                    }
                  >
                    Update Password
                  </Button>
                </CardBody>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <Card>
                <CardHeader title="Notification Preferences" />

                <CardBody className="space-y-6">
                  {[
                    {
                      title: 'Email Notifications',
                      description: 'Receive email updates about your donations and requests',
                      enabled: true,
                    },
                    {
                      title: 'Push Notifications',
                      description: 'Get browser push notifications for urgent requests',
                      enabled: true,
                    },
                    {
                      title: 'SMS Alerts',
                      description: 'Receive text messages for appointment reminders',
                      enabled: false,
                    },
                    {
                      title: 'Marketing Emails',
                      description: 'Newsletters and promotional content',
                      enabled: false,
                    },
                  ].map((setting, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {setting.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {setting.description}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          defaultChecked={setting.enabled}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Helper Components
// ============================================

interface InfoItemProps {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, icon }) => (
  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 shadow-sm">
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="font-medium text-gray-900 mt-1">{value}</p>
    </div>
  </div>
);
