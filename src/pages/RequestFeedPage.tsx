import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  Clock,
  Users,
  Heart,
  ChevronDown,
  Grid3X3,
  List,
  X,
} from 'lucide-react';

import { Button } from '../components/ui/Button';
import { Card, CardBody, CardHeader, CardFooter } from '../components/ui/Card';
import {
  BloodGroupBadge,
  UrgencyBadge,
  StatusBadge,
} from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { EmptyState } from '../components/ui/EmptyState';
import { Skeleton, CardSkeleton } from '../components/ui/Skeleton';
import { Modal } from '../components/ui/Modal';
import { Select } from '../components/ui/Select';
import { useRequests } from '../hooks';
import type { BloodGroup, UrgencyLevel, RequestStatus, BloodRequest } from '../types';

// ============================================
// Request Feed Page
// ============================================

export const RequestFeedPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    requests,
    isLoading,
    filters,
    setFilters,
    pagination,
    setPage,
    total: totalCount,
  } = useRequests();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null);
  const [showPledgeModal, setShowPledgeModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Local filter states
  const [localFilters, setLocalFilters] = useState({
    bloodGroup: (filters.bloodGroup as BloodGroup) || '',
    urgency: (filters.urgency as UrgencyLevel) || '',
    status: (filters.status as RequestStatus) || '',
  });

  // Apply search and local filters
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setFilters({
        ...localFilters,
        search: searchQuery || undefined,
      });
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, localFilters, setFilters]);

  // Filter options
  const bloodGroupOptions = [
    { value: '', label: 'All Groups' },
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
  ];

  const urgencyOptions = [
    { value: '', label: 'All Levels' },
    { value: 'critical', label: '🚨 Critical' },
    { value: 'high', label: '⚠️ High' },
    { value: 'medium', label: '📋 Medium' },
    { value: 'low', label: '✅ Low' },
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'fulfilled', label: 'Fulfilled' },
  ];

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setLocalFilters({ bloodGroup: '', urgency: '', status: '' });
    setFilters({});
  };

  const hasActiveFilters =
    searchQuery ||
    localFilters.bloodGroup ||
    localFilters.urgency ||
    localFilters.status;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-[72px] z-30">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Title & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Blood Requests
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {totalCount} requests found
                {hasActiveFilters && ` (filtered)`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-sm text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white shadow-sm text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <Button
                onClick={() => navigate('/requests/new')}
                leftIcon={<Heart className="w-4 h-4" />}
                size="sm"
              >
                New Request
              </Button>
            </div>
          </div>

          {/* Search & Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by patient name, hospital, or reason..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <Button
              variant={showFilters ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<SlidersHorizontal className="w-4 h-4" />}
            >
              Filters
              {hasActiveFilters && (
                <span className="ml-1 w-5 h-5 bg-white/20 rounded-full text-xs flex items-center justify-center">
                  !
                </span>
              )}
            </Button>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-100 mt-4">
                  <Select
                    options={bloodGroupOptions}
                    value={localFilters.bloodGroup}
                    onChange={(value) =>
                      setLocalFilters((prev) => ({ ...prev, bloodGroup: value }))
                    }
                    placeholder="Blood Group"
                  />

                  <Select
                    options={urgencyOptions}
                    value={localFilters.urgency}
                    onChange={(value) =>
                      setLocalFilters((prev) => ({ ...prev, urgency: value }))
                    }
                    placeholder="Urgency Level"
                  />

                  <Select
                    options={statusOptions}
                    value={localFilters.status}
                    onChange={(value) =>
                      setLocalFilters((prev) => ({ ...prev, status: value }))
                    }
                    placeholder="Status"
                  />

                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    disabled={!hasActiveFilters}
                    className="text-gray-600"
                  >
                    Clear All
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {isLoading ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {[...Array(6)].map((_, i) =>
              viewMode === 'grid' ? (
                <CardSkeleton key={i} showAvatar lines={4} />
              ) : (
                <CardSkeleton key={i} showAvatar lines={3} />
              )
            )}
          </div>
        ) : requests.length === 0 ? (
          /* Empty State */
          <EmptyState
            variant="requests"
            title="No blood requests found"
            description={
              hasActiveFilters
                ? 'Try adjusting your filters to see more results.'
                : 'There are no blood requests at the moment.'
            }
            actionLabel={hasActiveFilters ? 'Clear Filters' : 'Create a Request'}
            onAction={
              hasActiveFilters ? clearFilters : () => navigate('/requests/new')
            }
          />
        ) : (
          <>
            {/* Requests Grid/List */}
            <div
              className={
                viewMode === 'grid'
                  ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              <AnimatePresence mode="popLayout">
                {requests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <RequestCard
                      request={request}
                      viewMode={viewMode}
                      onViewDetails={() => setSelectedRequest(request)}
                      onPledge={() => {
                        setSelectedRequest(request);
                        setShowPledgeModal(true);
                      }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                >
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: Math.min(5, pagination.totalPages) },
                    (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.page <= 3) {
                        pageNum = i + 1;
                      } else if (pagination.page >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = pagination.page - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                            pagination.page === pageNum
                              ? 'bg-primary text-white'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Request Detail Modal */}
      <Modal
        isOpen={!!selectedRequest && !showPledgeModal}
        onClose={() => setSelectedRequest(null)}
        title="Request Details"
        size="lg"
      >
        {selectedRequest && (
          <RequestDetailContent request={selectedRequest} onPledge={() => setShowPledgeModal(true)} />
        )}
      </Modal>

      {/* Pledge Modal */}
      <Modal
        isOpen={showPledgeModal}
        onClose={() => setShowPledgeModal(false)}
        title="Pledge to Donate"
        description={`Help ${selectedRequest?.patientName} by donating your blood.`}
        size="md"
      >
        <PledgeForm
          request={selectedRequest}
          onSuccess={() => {
            setShowPledgeModal(false);
            setSelectedRequest(null);
          }}
        />
      </Modal>
    </div>
  );
};

// ============================================
// Request Card Component
// ============================================

interface RequestCardProps {
  request: BloodRequest;
  viewMode: 'grid' | 'list';
  onViewDetails: () => void;
  onPledge: () => void;
}

const RequestCard: React.FC<RequestCardProps> = ({
  request,
  viewMode,
  onViewDetails,
  onPledge,
}) => {
  const isUrgent = request.urgency === 'critical' || request.urgency === 'high';
  const progressPercentage = Math.round(
    (request.unitsReceived / request.unitsNeeded) * 100
  );

  if (viewMode === 'list') {
    return (
      <Card padding="none" className="overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              {/* Patient Avatar */}
              <Avatar name={request.patientName} alt={request.patientName} size="lg" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {request.patientName}
                  </h3>
                  <BloodGroupBadge bloodGroup={request.bloodGroup} size="sm" />
                  <UrgencyBadge urgency={request.urgency} />
                  <StatusBadge status={request.status} />
                </div>

                <p className="text-sm text-gray-600 line-clamp-1 mb-2">
                  {request.reason}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {request.hospitalName}, {request.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Needed by {new Date(request.requiredDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress & Actions */}
            <div className="flex-shrink-0 w-48 text-right">
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {request.unitsReceived}/{request.unitsNeeded} units
                </p>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      progressPercentage >= 80
                        ? 'bg-green-500'
                        : progressPercentage >= 50
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                    }`}
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={onViewDetails}>
                  Details
                </Button>
                <Button
                  size="sm"
                  onClick={onPledge}
                  className={isUrgent ? 'animate-pulse-slow' : ''}
                >
                  Donate Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Grid View
  return (
    <Card padding="none" className="overflow-hidden group cursor-pointer" onClick={onViewDetails}>
      {/* Urgency Banner for Critical */}
      {isUrgent && (
        <div className="bg-gradient-to-r from-red-500 to-orange-500 px-4 py-1.5">
          <span className="text-xs font-semibold text-white flex items-center gap-1">
            🚨 URGENT - Immediate donor needed!
          </span>
        </div>
      )}

      <CardBody className="pt-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar name={request.patientName} alt={request.patientName} size="md" />
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                {request.patientName}
              </h3>
              <p className="text-xs text-gray-500">{request.patientAge} years old</p>
            </div>
          </div>
          <BloodGroupBadge bloodGroup={request.bloodGroup} size="sm" />
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <UrgencyBadge urgency={request.urgency} />
          <StatusBadge status={request.status} />
        </div>

        {/* Reason */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {request.reason}
        </p>

        {/* Location & Date */}
        <div className="space-y-2 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{request.hospitalName}, {request.city}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>Needed by {new Date(request.requiredDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="font-medium text-gray-700">Units Collected</span>
            <span className="text-gray-500">
              {request.unitsReceived}/{request.unitsNeeded}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                progressPercentage >= 80
                  ? 'bg-green-500'
                  : progressPercentage >= 50
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
              }`}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <CardFooter className="gap-2 -mb-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
          >
            Details
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onPledge();
            }}
          >
            Pledge to Donate
          </Button>
        </CardFooter>
      </CardBody>
    </Card>
  );
};

// ============================================
// Request Detail Content
// ============================================

interface RequestDetailProps {
  request: BloodRequest;
  onPledge: () => void;
}

const RequestDetailContent: React.FC<RequestDetailProps> = ({
  request,
  onPledge,
}) => {
  const progressPercentage = Math.round(
    (request.unitsReceived / request.unitsNeeded) * 100
  );

  return (
    <div className="space-y-6">
      {/* Patient Info */}
      <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
        <Avatar name={request.patientName} alt={request.patientName} size="xl" />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="text-xl font-bold text-gray-900">
              {request.patientName}
            </h3>
            <BloodGroupBadge bloodGroup={request.bloodGroup} />
            <UrgencyBadge urgency={request.urgency} />
            <StatusBadge status={request.status} />
          </div>
          <p className="text-gray-600">{request.patientAge} years old</p>
        </div>
      </div>

      {/* Medical Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Medical Information</h4>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Reason</dt>
              <dd className="text-sm font-medium text-gray-900 max-w-[200px] text-right">
                {request.reason}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Units Needed</dt>
              <dd className="text-sm font-medium text-gray-900">
                {request.unitsNeeded}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Units Received</dt>
              <dd className="text-sm font-medium text-green-600">
                {request.unitsReceived}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Required By</dt>
              <dd className="text-sm font-medium text-gray-900">
                {new Date(request.requiredDate).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Location</h4>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Hospital</dt>
              <dd className="text-sm font-medium text-gray-900 max-w-[200px] text-right">
                {request.hospitalName}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">City</dt>
              <dd className="text-sm font-medium text-gray-900">
                {request.city}, {request.state}
              </dd>
            </div>
            {request.location && (
              <>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Ward</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {request.location.ward}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Room</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {request.location.roomNumber}
                  </dd>
                </div>
              </>
            )}
          </dl>
        </div>
      </div>

      {/* Progress */}
      <div className="p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-gray-900">Collection Progress</span>
          <span className="text-sm text-gray-500">
            {progressPercentage}% complete
          </span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full rounded-full ${
              progressPercentage >= 80
                ? 'bg-green-500'
                : progressPercentage >= 50
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            }`}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {request.unitsNeeded - request.unitsReceived} more units needed
        </p>
      </div>

      {/* Contact Info */}
      <div className="p-4 bg-blue-50 rounded-xl">
        <h4 className="font-semibold text-blue-900 mb-2">Contact Information</h4>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <a
            href={`tel:${request.contactPhone}`}
            className="flex items-center gap-2 text-blue-700 hover:text-blue-800"
          >
            📞 {request.contactPhone}
          </a>
          <a
            href={`mailto:${request.contactEmail}`}
            className="flex items-center gap-2 text-blue-700 hover:text-blue-800"
          >
            ✉️ {request.contactEmail}
          </a>
        </div>
      </div>

      {/* Notes */}
      {request.notes && (
        <div className="p-4 bg-yellow-50 rounded-xl">
          <h4 className="font-semibold text-yellow-800 mb-1">Additional Notes</h4>
          <p className="text-sm text-yellow-700">{request.notes}</p>
        </div>
      )}

      {/* Action */}
      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
        <Button
          className="flex-1"
          onClick={onPledge}
          leftIcon={<Heart className="w-4 h-4" />}
        >
          Pledge to Donate
        </Button>
      </div>
    </div>
  );
};

// ============================================
// Pledge Form Component
// ============================================

interface PledgeFormProps {
  request: BloodRequest | null | undefined;
  onSuccess: () => void;
}

const PledgeForm: React.FC<PledgeFormProps> = ({ request, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      setStep(2);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success
    setStep(3);

    // Close after delay
    setTimeout(onSuccess, 2500);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Step Indicators */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                s <= step
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {s === 3 && step === 3 ? '✓' : s}
            </div>
            {s < 3 && (
              <div
                className={`w-12 h-1 rounded-full ${
                  s < step ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Confirm Eligibility */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-xl text-center">
            <p className="text-blue-800 font-medium">
              You're about to pledge for{' '}
              <strong>{request?.patientName}</strong>
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Blood Group: <strong>{request?.bloodGroup}</strong> | Units:{' '}
              <strong>{request?.unitsNeeded}</strong>
            </p>
          </div>

          <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer">
            <input
              type="checkbox"
              required
              className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary mt-0.5"
            />
            <span className="text-sm text-gray-700">
              I confirm that I am eligible to donate blood and my blood type matches
              this request.
            </span>
          </label>

          <Button type="submit" className="w-full">
            Continue to Schedule
          </Button>
        </div>
      )}

      {/* Step 2: Schedule Donation */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Date *
            </label>
            <input
              type="date"
              required
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Time *
            </label>
            <select
              required
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            >
              <option value="">Select time slot</option>
              <option value="09:00">9:00 AM - 10:00 AM</option>
              <option value="10:00">10:00 AM - 11:00 AM</option>
              <option value="11:00">11:00 AM - 12:00 PM</option>
              <option value="14:00">2:00 PM - 3:00 PM</option>
              <option value="15:00">3:00 PM - 4:00 PM</option>
              <option value="16:00">4:00 PM - 5:00 PM</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={300}
              rows={3}
              placeholder="Any special requirements or questions..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1"
            >
              Back
            </Button>
            <Button type="submit" className="flex-1">
              Confirm Pledge
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Success */}
      {step === 3 && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Heart className="w-10 h-10 text-green-600" />
          </motion.div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Thank You! 🎉
          </h3>
          <p className="text-gray-600 mb-4">
            Your pledge has been submitted successfully. You're making a real difference
            in someone's life.
          </p>

          <div className="p-4 bg-gray-50 rounded-xl text-left space-y-2">
            <p className="text-sm"><strong>Patient:</strong> {request?.patientName}</p>
            <p className="text-sm"><strong>Date:</strong> {scheduledDate}</p>
            <p className="text-sm"><strong>Time:</strong> {scheduledTime}</p>
          </div>
        </motion.div>
      )}
    </form>
  );
};
