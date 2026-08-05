import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  Droplets,
  Calendar,
  MapPin,
  Download,
  Filter,
  Award,
  TrendingUp,
  Clock,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { BloodGroupBadge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { EmptyState } from '../components/ui/EmptyState';
import { useAuth, useDonor } from '../hooks';
import { formatNumber, formatDate, timeAgo } from '../utils/helpers';

// ============================================
// Donation History Page
// ============================================

interface DonationRecord {
  id: string;
  date: string;
  bloodGroup: string;
  units: number;
  hospitalName: string;
  patientName?: string;
  recipientType: 'hospital' | 'individual';
  status: 'completed' | 'in-progress' | 'scheduled';
  certificateUrl?: string;
  notes?: string;
}

// Mock donation history data
const mockDonationHistory: DonationRecord[] = [
  {
    id: 'don-001',
    date: '2024-12-15',
    bloodGroup: 'O+',
    units: 1,
    hospitalName: 'City General Hospital',
    patientName: 'John Smith',
    recipientType: 'hospital',
    status: 'completed',
    certificateUrl: '#',
  },
  {
    id: 'don-002',
    date: '2024-10-28',
    bloodGroup: 'O+',
    units: 1,
    hospitalName: 'Memorial Medical Center',
    patientName: 'Sarah Johnson',
    recipientType: 'individual',
    status: 'completed',
    certificateUrl: '#',
  },
  {
    id: 'don-003',
    date: '2024-08-10',
    bloodGroup: 'O+',
    units: 2,
    hospitalName: 'St. Mary\'s Hospital',
    recipientType: 'hospital',
    status: 'completed',
    certificateUrl: '#',
  },
  {
    id: 'don-004',
    date: '2024-06-05',
    bloodGroup: 'O+',
    units: 1,
    hospitalName: 'Community Health Center',
    patientName: 'Michael Brown',
    recipientType: 'individual',
    status: 'completed',
    certificateUrl: '#',
  },
  {
    id: 'don-005',
    date: '2024-03-22',
    bloodGroup: 'O+',
    units: 1,
    hospitalName: 'City General Hospital',
    recipientType: 'hospital',
    status: 'completed',
    certificateUrl: '#',
  },
  {
    id: 'don-006',
    date: '2025-01-20',
    bloodGroup: 'O+',
    units: 1,
    hospitalName: 'University Hospital',
    recipientType: 'hospital',
    status: 'scheduled',
    notes: 'Scheduled donation appointment',
  },
];

type FilterStatus = 'all' | 'completed' | 'scheduled' | 'in-progress';

export const DonationHistoryPage: React.FC = () => {
  const { user } = useAuth();
  const { totalDonations, bloodGroup, canDonate, eligibility } = useDonor();

  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all');
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list');

  // Filter donations based on active filter
  const filteredDonations = mockDonationHistory.filter((donation) => {
    if (activeFilter === 'all') return true;
    return donation.status === activeFilter;
  });

  // Calculate stats
  const totalUnitsDonated = mockDonationHistory
    .filter((d) => d.status === 'completed')
    .reduce((sum, d) => sum + d.units, 0);

  const livesSavedEstimate = totalUnitsDonated * 3; // Each unit can save up to 3 lives

  const getStatusBadge = (status: DonationRecord['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
            <Calendar className="w-3 h-3" />
            Scheduled
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
            <Clock className="w-3 h-3" />
            In Progress
          </span>
        );
    }
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Donation History</h1>
              <p className="text-gray-600 mt-1">Track your life-saving donations over time</p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                Export History
              </Button>
              <Button size="sm" leftIcon={<Heart className="w-4 h-4" />} onClick={() => window.location.href = '/requests'}>
                Find Requests to Help
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8"
        >
          <Card className="bg-gradient-to-br from-red-500 to-red-600 border-0">
            <CardBody className="p-5 text-white">
              <Heart className="w-8 h-8 mb-3 opacity-80" />
              <div className="text-3xl font-bold">{totalDonations || 8}</div>
              <div className="text-sm text-white/80 mt-1">Total Donations</div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0">
            <CardBody className="p-5 text-white">
              <Droplets className="w-8 h-8 mb-3 opacity-80" />
              <div className="text-3xl font-bold">{totalUnitsDonated}</div>
              <div className="text-sm text-white/80 mt-1">Units Donated</div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0">
            <CardBody className="p-5 text-white">
              <Award className="w-8 h-8 mb-3 opacity-80" />
              <div className="text-3xl font-bold">{formatNumber(livesSavedEstimate)}+</div>
              <div className="text-sm text-white/80 mt-1">Lives Impacted</div>
            </CardBody>
          </Card>

          <Card className={`border-0 ${canDonate ? 'bg-gradient-to-br from-purple-500 to-purple-600' : 'bg-gradient-to-br from-gray-500 to-gray-600'}`}>
            <CardBody className="p-5 text-white">
              <TrendingUp className="w-8 h-8 mb-3 opacity-80" />
              <div className="text-3xl font-bold">
                {eligibility?.daysUntilEligible ? `${eligibility.daysUntilEligible}d` : 'Ready'}
              </div>
              <div className="text-sm text-white/80 mt-1">
                {canDonate ? 'Eligible to Donate' : 'Until Eligible'}
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Filters & View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
        >
          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: 'all', label: 'All' },
              { id: 'completed', label: 'Completed' },
              { id: 'scheduled', label: 'Scheduled' },
              { id: 'in-progress', label: 'In Progress' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as FilterStatus)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-white rounded-xl p-1 border border-gray-200">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-primary text-white shadow'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'timeline'
                  ? 'bg-primary text-white shadow'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Timeline
            </button>
          </div>
        </motion.div>

        {/* Donations List/Timeline */}
        {filteredDonations.length === 0 ? (
          <Card>
            <CardBody className="py-16">
              <EmptyState
                icon={<Heart className="w-16 h-16 text-gray-200" />}
                title="No Donations Found"
                description={
                  activeFilter !== 'all'
                    ? `No ${activeFilter} donations in your history`
                    : "You haven't made any donations yet. Start your journey today!"
                }
                onAction={
                  activeFilter !== 'all'
                    ? undefined
                    : () => window.location.href = '/requests'
                }
                actionLabel="Find Requests"
              />
            </CardBody>
          </Card>
        ) : viewMode === 'list' ? (
          <div className="space-y-4">
            {filteredDonations.map((donation, index) => (
              <motion.div
                key={donation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardBody className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Icon & Date */}
                      <div className="flex items-center gap-4 sm:w-48">
                        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Droplets className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{formatDate(donation.date)}</p>
                          <p className="text-xs text-gray-500">{timeAgo(donation.date)}</p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 block">Blood Group</span>
                          <BloodGroupBadge bloodGroup={donation.bloodGroup as any} size="sm" />
                        </div>
                        <div>
                          <span className="text-gray-500 block">Units</span>
                          <p className="font-medium text-gray-900">{donation.units}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Hospital</span>
                          <p className="font-medium text-gray-900 truncate max-w-[150px]">
                            {donation.hospitalName}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Status</span>
                          {getStatusBadge(donation.status)}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 sm:flex-col">
                        {donation.status === 'completed' && donation.certificateUrl && (
                          <Button variant="outline" size="sm" leftIcon={<FileText className="w-4 h-4" />}>
                            Certificate
                          </Button>
                        )}
                        {donation.patientName && (
                          <span className="text-xs text-gray-400 hidden sm:block text-center mt-2">
                            For: {donation.patientName}
                          </span>
                        )}
                      </div>
                    </div>

                    {donation.notes && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Note:</span> {donation.notes}
                        </p>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Timeline View */
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

            <div className="space-y-6">
              {filteredDonations.map((donation, index) => (
                <motion.div
                  key={donation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-6 w-5 h-5 rounded-full border-4 border-white shadow ${
                    donation.status === 'completed' ? 'bg-green-500' :
                    donation.status === 'scheduled' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`} />

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardBody className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Blood Donation - {donation.bloodGroup}
                          </h3>
                          <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(donation.date)}
                          </p>
                        </div>
                        {getStatusBadge(donation.status)}
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {donation.hospitalName}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-500">
                            <Droplets className="w-4 h-4 inline mr-1" />
                            {donation.units} unit{donation.units > 1 ? 's' : ''}
                          </span>
                          {donation.patientName && (
                            <span className="text-gray-500">
                              For: {donation.patientName}
                            </span>
                          )}
                        </div>
                      </div>

                      {donation.status === 'completed' && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <Button variant="ghost" size="sm" leftIcon={<FileText className="w-4 h-4" />}>
                            Download Certificate
                          </Button>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Milestone Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl" />
            <CardBody className="p-6 sm:p-8 relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">You're a Hero!</h3>
                  <p className="text-gray-600">
                    With {totalDonations || 8} donations and {formatNumber(livesSavedEstimate)}+ lives impacted, 
                    you're making a real difference. Keep up the amazing work!
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Button onClick={() => window.location.href = '/profile/donor-card'} leftIcon={<Droplets className="w-5 h-5" />}>
                    View Donor Card
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
