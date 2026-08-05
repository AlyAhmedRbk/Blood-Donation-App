import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Save,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  Mail,
  MessageSquare,
  Trash2,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Avatar } from '../components/ui/Avatar';
import { useAuth } from '../hooks';

// ============================================
// Settings Page
// ============================================

type SettingsTab = 'profile' | 'notifications' | 'security' | 'appearance' | 'privacy';

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  newRequestAlerts: boolean;
  pledgeReminders: boolean;
  donationReminders: boolean;
  marketingEmails: boolean;
  weeklyDigest: boolean;
}

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  compactMode: boolean;
  animations: boolean;
}

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    newRequestAlerts: true,
    pledgeReminders: true,
    donationReminders: true,
    marketingEmails: false,
    weeklyDigest: true,
  });

  // Appearance settings
  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>({
    theme: 'light',
    compactMode: false,
    animations: true,
  });

  const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Privacy', icon: Lock },
  ];

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    updateProfile(profileData);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleToggleNotification = (key: keyof NotificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-24">
              <CardBody className="p-2">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                      <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
                        activeTab === tab.id ? 'text-primary' : 'opacity-0'
                      }`} />
                    </button>
                  ))}
                </nav>
              </CardBody>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Success Message */}
            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-green-800 font-medium">Settings saved successfully!</span>
              </motion.div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <User className="w-6 h-6 text-primary" />
                    Profile Information
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Update your personal details and public profile</p>
                </CardHeader>
                <CardBody className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                    <div className="relative group">
                      <Avatar src={user?.avatar} alt={user?.name || 'User'} size="xl" />
                      <button className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        <Camera className="w-6 h-6 text-white" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                      <Button variant="ghost" size="sm" className="mt-2">
                        Change Photo
                      </Button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Type
                      </label>
                      <Input
                        value={user?.role || ''}
                        disabled
                        className="bg-gray-50 text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      size="lg"
                      isLoading={isSaving}
                      leftIcon={<Save className="w-5 h-5" />}
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </Button>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <Bell className="w-6 h-6 text-primary" />
                    Notification Preferences
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Choose how you want to be notified</p>
                </CardHeader>
                <CardBody className="space-y-6">
                  {/* Channel Preferences */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Notification Channels</h3>
                    <div className="space-y-4">
                      {[
                        {
                          key: 'emailNotifications' as keyof NotificationSettings,
                          icon: Mail,
                          title: 'Email Notifications',
                          description: 'Receive notifications via email',
                        },
                        {
                          key: 'pushNotifications' as keyof NotificationSettings,
                          icon: Smartphone,
                          title: 'Push Notifications',
                          description: 'Receive push notifications on mobile devices',
                        },
                        {
                          key: 'smsNotifications' as keyof NotificationSettings,
                          icon: MessageSquare,
                          title: 'SMS Notifications',
                          description: 'Receive text message alerts (carrier rates may apply)',
                        },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                              <item.icon className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{item.title}</p>
                              <p className="text-sm text-gray-500">{item.description}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleToggleNotification(item.key)}
                            className={`relative w-12 h-7 rounded-full transition-colors ${
                              notificationSettings[item.key] ? 'bg-primary' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                                notificationSettings[item.key] ? 'left-6' : 'left-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Alert Types */}
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-4">Alert Types</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'newRequestAlerts' as keyof NotificationSettings, label: 'New Blood Request Alerts' },
                        { key: 'pledgeReminders' as keyof NotificationSettings, label: 'Pledge Reminders' },
                        { key: 'donationReminders' as keyof NotificationSettings, label: 'Donation Eligibility Reminders' },
                        { key: 'marketingEmails' as keyof NotificationSettings, label: 'Marketing & Updates' },
                        { key: 'weeklyDigest' as keyof NotificationSettings, label: 'Weekly Impact Digest' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-2">
                          <span className="text-gray-700">{item.label}</span>
                          <button
                            onClick={() => handleToggleNotification(item.key)}
                            className={`relative w-11 h-6 rounded-full transition-colors ${
                              notificationSettings[item.key] ? 'bg-primary' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                                notificationSettings[item.key] ? 'left-5.5' : 'left-0.5'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button leftIcon={<Save className="w-5 h-5" />} onClick={() => setSaveSuccess(true)}>
                      Save Preferences
                    </Button>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <Lock className="w-6 h-6 text-primary" />
                      Change Password
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Ensure your account stays secure with a strong password</p>
                  </CardHeader>
                  <CardBody className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, currentPassword: e.target.value })
                          }
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <Input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({ ...passwordData, newPassword: e.target.value })
                        }
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <Input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                        }
                        placeholder="Confirm new password"
                      />
                    </div>
                    <div className="flex justify-end pt-2">
                      <Button leftIcon={<Shield className="w-5 h-5" />}>
                        Update Password
                      </Button>
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-bold text-gray-900">Active Sessions</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage where you're logged in</p>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Smartphone className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Current Session</p>
                            <p className="text-sm text-gray-500">Chrome on MacOS • New York, US</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Active Now
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-200">
                  <CardHeader>
                    <h2 className="text-xl font-bold text-red-600 flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6" />
                      Danger Zone
                    </h2>
                  </CardHeader>
                  <CardBody className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                      <div>
                        <p className="font-medium text-red-800">Sign Out of All Devices</p>
                        <p className="text-sm text-red-600">Sign out from all other active sessions</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                        Sign Out All
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                      <div>
                        <p className="font-medium text-red-800">Delete Account</p>
                        <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="danger" size="sm" leftIcon={<Trash2 className="w-4 h-4" />}>
                        Delete
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <Palette className="w-6 h-6 text-primary" />
                    Appearance
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Customize how LifeBlood looks for you</p>
                </CardHeader>
                <CardBody className="space-y-6">
                  {/* Theme Selection */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Theme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: 'light', label: 'Light', icon: '☀️' },
                        { value: 'dark', label: 'Dark', icon: '🌙' },
                        { value: 'system', label: 'System', icon: '💻' },
                      ].map((theme) => (
                        <button
                          key={theme.value}
                          onClick={() =>
                            setAppearanceSettings({
                              ...appearanceSettings,
                              theme: theme.value as 'light' | 'dark' | 'system',
                            })
                          }
                          className={`p-4 rounded-xl border-2 transition-all ${
                            appearanceSettings.theme === theme.value
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <span className="text-2xl block mb-2">{theme.icon}</span>
                          <span className="text-sm font-medium text-gray-700">{theme.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Other Options */}
                  <div className="pt-6 border-t border-gray-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Compact Mode</p>
                        <p className="text-sm text-gray-500">Reduce spacing for more content density</p>
                      </div>
                      <button
                        onClick={() =>
                          setAppearanceSettings({
                            ...appearanceSettings,
                            compactMode: !appearanceSettings.compactMode,
                          })
                        }
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          appearanceSettings.compactMode ? 'bg-primary' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            appearanceSettings.compactMode ? 'left-5.5' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Animations</p>
                        <p className="text-sm text-gray-500">Enable smooth transitions and micro-animations</p>
                      </div>
                      <button
                        onClick={() =>
                          setAppearanceSettings({
                            ...appearanceSettings,
                            animations: !appearanceSettings.animations,
                          })
                        }
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          appearanceSettings.animations ? 'bg-primary' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            appearanceSettings.animations ? 'left-5.5' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button leftIcon={<Save className="w-5 h-5" />}>Save Preferences</Button>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-primary" />
                    Privacy & Data
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Control your privacy and data sharing preferences</p>
                </CardHeader>
                <CardBody className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Profile Visibility</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Control who can see your donor profile information
                          </p>
                        </div>
                        <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary outline-none">
                          <option>Public</option>
                          <option>Registered Users Only</option>
                          <option>Private</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Donation History</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Show your donation history on your public profile
                          </p>
                        </div>
                        <button className="relative w-11 h-6 rounded-full bg-primary">
                          <span className="absolute top-0.5 left-5.5 w-5 h-5 bg-white rounded-full shadow" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Location Sharing</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Allow nearby blood requests to find you based on location
                          </p>
                        </div>
                        <button className="relative w-11 h-6 rounded-full bg-gray-200">
                          <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Data Export */}
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-4">Your Data</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="outline" leftIcon={<Globe className="w-4 h-4" />}>
                        Export My Data
                      </Button>
                      <Button variant="ghost" className="text-gray-600">
                        Download Donation History
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button leftIcon={<Save className="w-5 h-5" />}>Save Privacy Settings</Button>
                  </div>
                </CardBody>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
