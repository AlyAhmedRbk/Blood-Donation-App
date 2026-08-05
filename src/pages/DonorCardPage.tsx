import React from 'react';
import { motion } from 'framer-motion';
import {
  Droplets,
  Calendar,
  Award,
  Download,
  Share2,
  QrCode,
  User,
  MapPin,
  Phone,
  Heart,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { useAuth } from '../hooks';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { BloodGroupBadge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { formatDate, copyToClipboard } from '../utils/helpers';

// ============================================
// Donor Card Page
// ============================================

export const DonorCardPage: React.FC = () => {
  const { user, donorProfile } = useAuth();

  // Generate mock QR code data
  const qrData = JSON.stringify({
    donorId: donorProfile?.id || user?.id,
    name: user?.name,
    bloodGroup: donorProfile?.bloodGroup,
    verified: true,
    issuedDate: new Date().toISOString(),
  });

  const handleDownloadCard = () => {
    toast.success('Donor card downloaded successfully!');
    // In a real app, this would generate and download an image/PDF
  };

  const handleShareCard = async () => {
    const shareData = {
      title: 'My LifeBlood Donor Card',
      text: `Check out my blood donor card! I'm a ${donorProfile?.bloodGroup} donor with ${donorProfile?.totalDonations} donations.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // User cancelled or error
      }
    } else {
      await copyToClipboard(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 py-8">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 max-w-lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Digital Donor Card
          </h1>
          <p className="text-gray-500">
            Your official LifeBlood identification for donations
          </p>
        </motion.div>

        {/* Donor Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card
            padding="none"
            className="overflow-hidden shadow-2xl shadow-red-100/30"
            hover={false}
          >
            {/* Card Header with Gradient */}
            <div className="bg-gradient-to-br from-primary via-primary-dark to-red-900 p-6 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="card-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#card-grid)" />
                </svg>
              </div>

              {/* Decorative Circle */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full" />

              <div className="relative z-10 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar
                    src={user?.avatar}
                    alt={user?.name || 'Donor'}
                    size="xl"
                    className="ring-4 ring-white/20"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{user?.name}</h2>
                    <p className="text-white/80 text-sm">Certified Donor</p>
                  </div>
                </div>

                <div className="text-right">
                  <BloodGroupBadge bloodGroup={donorProfile?.bloodGroup || 'O+'} size="lg" />
                </div>
              </div>

              {/* Stats Row */}
              <div className="relative z-10 mt-6 pt-6 border-t border-white/20 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{donorProfile?.totalDonations || 0}</p>
                  <p className="text-xs text-white/70">Donations</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{(donorProfile?.totalDonations || 0) * 3}</p>
                  <p className="text-xs text-white/70">Lives Impacted</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {donorProfile?.lastDonationDate
                      ? new Date(donorProfile.lastDonationDate).getFullYear()
                      : '-'}
                  </p>
                  <p className="text-xs text-white/70">Last Donated</p>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <CardBody className="space-y-5">
              {/* QR Code Section */}
              <div className="flex justify-center py-4">
                <div className="p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  {/* Mock QR Code - In real app, use a library like qrcode.react */}
                  <div className="w-40 h-40 bg-white rounded-xl flex items-center justify-center relative overflow-hidden">
                    <QrCode className="w-32 h-32 text-gray-800" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center">
                        <Droplets className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-3">
                    Scan to verify donor status
                  </p>
                </div>
              </div>

              {/* Donor Details */}
              <div className="grid grid-cols-2 gap-4">
                <DetailItem
                  icon={<User className="w-4 h-4" />}
                  label="Donor ID"
                  value={`#${(donorProfile?.id || user?.id).slice(-8).toUpperCase()}`}
                />
                <DetailItem
                  icon={<Droplets className="w-4 h-4" />}
                  label="Blood Type"
                  value={donorProfile?.bloodGroup || 'N/A'}
                  highlight
                />
                <DetailItem
                  icon={<Calendar className="w-4 h-4" />}
                  label="Member Since"
                  value={
                    user?.createdAt
                      ? formatDate(user.createdAt)
                      : 'N/A'
                  }
                />
                <DetailItem
                  icon={<Award className="w-4 h-4" />}
                  label="Status"
                  value="Verified"
                  success
                />
              </div>

              {/* Verification Badge */}
              <div className="flex items-center justify-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200">
                <Award className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  Verified LifeBlood Donor • Certificate #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleDownloadCard}
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Download PDF
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleShareCard}
                  leftIcon={<Share2 className="w-4 h-4" />}
                >
                  Share Card
                </Button>
              </div>
            </CardBody>

            {/* Card Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>LifeBlood © {new Date().getFullYear()}</span>
                <span>Valid ID Document</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Info Cards */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <InfoCard
            icon={<Heart className="w-6 h-6" />}
            title="Why Carry This?"
            description="Your digital donor card verifies your donation history and eligibility. Show it at any participating hospital or blood drive center."
            color="bg-red-50 text-red-600"
          />
          <InfoCard
            icon={<ShieldCheck className="w-6 h-6" />}
            title="Privacy Protected"
            description="Only your name, blood group, and donation count are visible. Personal contact information is kept secure."
            color="bg-blue-50 text-blue-600"
          />
        </div>

        {/* How to Use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 bg-white rounded-2xl border border-gray-200"
        >
          <h3 className="font-semibold text-gray-900 mb-4">How to Use Your Donor Card</h3>
          
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: 'At Blood Drives',
                desc: 'Show your QR code for quick check-in and verification.',
              },
              {
                step: 2,
                title: 'At Hospitals',
                desc: 'Present your card when donating for a known patient.',
              },
              {
                step: 3,
                title: 'Digital Sharing',
                desc: 'Share securely with healthcare providers via the share button.',
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">{item.step}</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ============================================
// Helper Components
// ============================================

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
  success?: boolean;
}

const DetailItem: React.FC<DetailItemProps> = ({
  icon,
  label,
  value,
  highlight,
  success,
}) => (
  <div className="p-3 bg-gray-50 rounded-xl">
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-xs text-gray-500">{label}</span>
    </div>
    <p
      className={`font-semibold ${
        highlight
          ? 'text-primary'
          : success
            ? 'text-green-600'
            : 'text-gray-900'
      }`}
    >
      {value}
    </p>
  </div>
);

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description, color }) => (
  <div className="p-4 rounded-xl border border-gray-200 bg-white">
    <div className={`w-12 h-12 ${color.replace('text-', 'bg-').replace('-600', '-100')} rounded-xl flex items-center justify-center mb-3`}>
      <span className={color}>{icon}</span>
    </div>
    <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);

// Import icons used
import { ShieldCheck } from 'lucide-react';
