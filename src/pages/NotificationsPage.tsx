import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  BellRing,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  Heart,
  Droplets,
  AlertTriangle,
  Calendar,
  UserPlus,
  Award,
  Settings,
  ArrowRight,
  Search,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { EmptyState } from '../components/ui/EmptyState';
import { useNotificationStore } from '../store';
import { useAuth } from '../hooks';

// ============================================
// Notifications Page
// ============================================

type FilterType = 'all' | 'unread' | 'requests' | 'pledges' | 'system' | 'success';

const filterOptions: { id: FilterType; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'All', icon: Bell },
  { id: 'unread', label: 'Unread', icon: BellRing },
  { id: 'requests', label: 'Requests', icon: Droplets },
  { id: 'pledges', label: 'Pledges', icon: Heart },
  { id: 'system', label: 'System', icon: Settings },
  { id: 'success', label: 'Success', icon: Award },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'request':
      return <Droplets className="w-5 h-5 text-red-500" />;
    case 'pledge':
      return <Heart className="w-5 h-5 text-pink-500" />;
    case 'reminder':
      return <Calendar className="w-5 h-5 text-orange-500" />;
    case 'system':
      return <Settings className="w-5 h-5 text-gray-500" />;
    case 'success':
      return <Award className="w-5 h-5 text-green-500" />;
    case 'alert':
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    default:
      return <Bell className="w-5 h-5 text-blue-500" />;
  }
};

const getNotificationBgColor = (type: string) => {
  switch (type) {
    case 'request': return 'bg-red-50 border-red-100';
    case 'pledge': return 'bg-pink-50 border-pink-100';
    case 'reminder': return 'bg-orange-50 border-orange-100';
    case 'system': return 'bg-gray-50 border-gray-100';
    case 'success': return 'bg-green-50 border-green-100';
    case 'alert': return 'bg-yellow-50 border-yellow-100';
    default: return 'bg-blue-50 border-blue-100';
  }
};

export const NotificationsPage: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotificationStore();
  const { user } = useAuth();
  
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Filter notifications based on active filter
  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notif.isRead;
    return notif.type === activeFilter;
  });

  const handleSelectAll = () => {
    if (selectedIds.size === filteredNotifications.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredNotifications.map((n) => n.id)));
    }
  };

  const handleToggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const handleMarkSelectedRead = () => {
    selectedIds.forEach((id) => markAsRead(id));
    setSelectedIds(new Set());
  };

  const handleDeleteSelected = () => {
    selectedIds.forEach((id) => deleteNotification(id));
    setSelectedIds(new Set());
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
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
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-1">
                {unreadCount > 0
                  ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                  : 'All caught up! No unread notifications.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {selectedIds.size > 0 && (
                <>
                  <Button variant="ghost" size="sm" onClick={handleMarkSelectedRead}>
                    <Check className="w-4 h-4 mr-2" />
                    Mark Read ({selectedIds.size})
                  </Button>
                  <Button variant="danger" size="sm" onClick={handleDeleteSelected}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </>
              )}
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  <CheckCheck className="w-4 h-4 mr-2" />
                  Mark All Read
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card>
            <CardBody className="p-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {filterOptions.map((filter) => {
                  const Icon = filter.icon;
                  const count = filter.id === 'unread'
                    ? unreadCount
                    : filter.id === 'all'
                      ? notifications.length
                      : notifications.filter((n) =>
                          filter.id === 'unread' ? !n.isRead : n.type === filter.id
                        ).length;

                  return (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                        activeFilter === filter.id
                          ? 'bg-primary text-white shadow-lg shadow-primary/25'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {filter.label}
                      {count > 0 && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            activeFilter === filter.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-4">
          {/* Select All */}
          {filteredNotifications.length > 0 && (
            <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg border border-gray-200">
              <input
                type="checkbox"
                checked={selectedIds.size === filteredNotifications.length && filteredNotifications.length > 0}
                onChange={handleSelectAll}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-600">Select all on this page</span>
              <span className="text-xs text-gray-400 ml-auto">{filteredNotifications.length} notifications</span>
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {filteredNotifications.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card>
                  <CardBody className="py-16">
                    <EmptyState
                      icon={<Bell className="w-16 h-16 text-gray-200" />}
                      title={activeFilter === 'unread' ? 'No Unread Notifications' : 'No Notifications'}
                      description={
                        activeFilter === 'unread'
                          ? "You're all caught up! Check back later for updates."
                          : `No ${activeFilter} notifications to display.`
                      }
                    />
                  </CardBody>
                </Card>
              </motion.div>
            ) : (
              filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: index * 0.03 }}
                  layout
                >
                  <Card
                    className={`transition-all cursor-pointer ${
                      !notification.isRead
                        ? 'shadow-md ring-2 ring-primary/10'
                        : 'hover:shadow-md'
                    } ${getNotificationBgColor(notification.type)}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <CardBody className="p-4 sm:p-5">
                      <div className="flex gap-4">
                        {/* Checkbox */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleSelect(notification.id);
                          }}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                            selectedIds.has(notification.id)
                              ? 'bg-primary border-primary'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {selectedIds.has(notification.id) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </button>

                        {/* Icon */}
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          !notification.isRead ? 'bg-white shadow-sm' : 'bg-white/50'
                        }`}>
                          {getNotificationIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                {!notification.isRead && (
                                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                )}
                                <h3 className={`font-semibold truncate ${
                                  !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                                }`}>
                                  {notification.title}
                                </h3>
                              </div>
                              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-gray-400">
                                <span>{formatTimeAgo(notification.createdAt)}</span>
                                {notification.actionUrl && (
                                  <Link
                                    to={notification.actionUrl}
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-1 text-primary hover:text-primary-dark font-medium"
                                  >
                                    View Details
                                    <ArrowRight className="w-3 h-3" />
                                  </Link>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-start gap-2 flex-shrink-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete notification"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {filteredNotifications.length >= 10 && (
          <div className="mt-8 text-center">
            <Button variant="outline">Load More Notifications</Button>
          </div>
        )}
      </div>
    </div>
  );
};
