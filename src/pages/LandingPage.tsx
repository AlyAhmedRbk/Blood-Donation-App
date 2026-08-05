import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Droplets,
  Heart,
  Users,
  Building2,
  Search,
  ArrowRight,
  ShieldCheck,
  Clock,
  Award,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  Star,
  Play,
  CheckCircle2,
  ArrowLeftRight,
} from 'lucide-react';

import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { BloodGroupBadge } from '../components/ui/Badge';
import { useAnimatedNumber } from '../hooks';
import {
  platformStats,
  bloodCompatibility,
  testimonials,
  faqData,
} from '../data/mockData';
import type { BloodGroup } from '../types';

// ============================================
// Landing Page
// ============================================

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchBloodGroup, setSearchBloodGroup] = useState<BloodGroup | ''>('');
  const [searchCity, setSearchCity] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Animated stats
  const animatedDonors = useAnimatedNumber(platformStats.totalDonors);
  const animatedLivesSaved = useAnimatedNumber(platformStats.livesSaved);
  const animatedHospitals = useAnimatedNumber(platformStats.partnerHospitals);

  return (
    <div className="overflow-hidden">
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-white to-red-50">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
          
          {/* Grid Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#dc2626" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-32">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
              >
                <Heart className="w-4 h-4" />
                Save Lives Today
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Donate Blood,{' '}
                <span className="gradient-text">Save a Life</span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                Join thousands of heroes who donate blood regularly. Your single donation 
                can save up to three lives. Be someone's hero today.
              </p>

              {/* Quick Search */}
              <Card className="p-4 md:p-6 shadow-xl" hover={false}>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Group
                    </label>
                    <select
                      value={searchBloodGroup}
                      onChange={(e) => setSearchBloodGroup(e.target.value as BloodGroup)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    >
                      <option value="">All Groups</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      placeholder="Enter city..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      size="lg"
                      onClick={() =>
                        navigate(
                          `/requests?bloodGroup=${searchBloodGroup}&city=${searchCity}`
                        )
                      }
                      rightIcon={<Search className="w-5 h-5" />}
                    >
                      Find
                    </Button>
                  </div>
                </div>
              </Card>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <Button
                  size="lg"
                  onClick={() => navigate('/register?role=donor')}
                  leftIcon={<Droplets className="w-5 h-5" />}
                >
                  Become a Donor
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/requests/new')}
                >
                  Request Blood
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 mt-10 pt-10 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">FDA Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-600">WHO Approved</span>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative z-10">
                  <img
                    src="https://images.unsplash.com/photo-1615461066841-6116e610584f?w=600&h=700&fit=crop"
                    alt="Blood Donation Hero"
                    className="rounded-3xl shadow-2xl w-full object-cover"
                    style={{ height: '600px' }}
                  />

                  {/* Floating Cards */}
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -left-8 top-20 bg-white p-4 rounded-2xl shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{animatedDonors.toLocaleString()}+</p>
                        <p className="text-xs text-gray-500">Active Donors</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1,
                    }}
                    className="absolute -right-8 bottom-40 bg-white p-4 rounded-2xl shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                        <Heart className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{(animatedLivesSaved / 1000).toFixed(0)}K+</p>
                        <p className="text-xs text-gray-500">Lives Saved</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.5,
                    }}
                    className="absolute -right-4 bottom-20 bg-white p-4 rounded-2xl shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{animatedHospitals}+</p>
                        <p className="text-xs text-gray-500">Hospitals</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Background Blob */}
                <div className="absolute -z-10 top-10 right-10 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* STATS SECTION */}
      {/* ============================================ */}
      <section className="py-16 gradient-bg">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                value: platformStats.totalDonors.toLocaleString(),
                label: 'Registered Donors',
                icon: Users,
              },
              {
                value: platformStats.livesSaved.toLocaleString(),
                label: 'Lives Saved',
                icon: Heart,
              },
              {
                value: platformStats.partnerHospitals.toString(),
                label: 'Partner Hospitals',
                icon: Building2,
              },
              {
                value: `${platformStats.pintsCollected.toLocaleString()}`,
                label: 'Pints Collected',
                icon: Droplets,
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-white/80 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* WHY DONATE SECTION */}
      {/* ============================================ */}
      <section className="section-padding bg-white" id="why-donate">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Why Donate?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Every Donation Makes a Difference
            </h2>
            <p className="text-lg text-gray-600">
              Blood donation is a simple act that has an extraordinary impact on people's lives.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Save Lives',
                description:
                  'One donation can save up to three lives. Your blood can help accident victims, surgery patients, cancer patients, and those with chronic illnesses.',
                color: 'bg-red-100 text-red-600',
              },
              {
                icon: ShieldCheck,
                title: 'Health Benefits',
                description:
                  'Regular blood donation helps reduce harmful iron stores, stimulates blood cell production, and can improve cardiovascular health.',
                color: 'bg-green-100 text-green-600',
              },
              {
                icon: Clock,
                title: 'Quick Process',
                description:
                  'The entire process takes only about an hour. The actual donation takes just 8-10 minutes. You can save a life during your lunch break!',
                color: 'bg-blue-100 text-blue-600',
              },
              {
                icon: Award,
                title: 'Free Health Screening',
                description:
                  'Every donor receives a mini-physical including blood pressure check, temperature, pulse, and hemoglobin test - all for free!',
                color: 'bg-purple-100 text-purple-600',
              },
              {
                icon: Users,
                title: 'Build Community',
                description:
                  'Join a community of compassionate individuals working together to ensure blood is always available for those in need.',
                color: 'bg-orange-100 text-orange-600',
              },
              {
                icon: Star,
                title: 'Feel Rewarded',
                description:
                  'Experience the emotional reward of knowing you made a difference. Many donors describe it as one of the most fulfilling experiences.',
                color: 'bg-yellow-100 text-yellow-600',
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full group cursor-pointer">
                  <CardBody>
                    <div
                      className={`w-14 h-14 ${benefit.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                    >
                      <benefit.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* BLOOD COMPATIBILITY CHART */}
      {/* ============================================ */}
      <section className="section-padding bg-gray-50" id="compatibility">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Know Your Type
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Blood Compatibility Chart
            </h2>
            <p className="text-lg text-gray-600">
              Understanding which blood types can safely give and receive helps ensure safe transfusions.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 bg-gray-100 rounded-tl-xl">
                    Blood Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 bg-gray-100">
                    Can Donate To
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 bg-gray-100 rounded-tr-xl">
                    Can Receive From
                  </th>
                </tr>
              </thead>
              <tbody>
                {(Object.keys(bloodCompatibility) as BloodGroup[]).map((type: BloodGroup, index) => (
                  <motion.tr
                    key={type}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-6 py-4">
                      <BloodGroupBadge bloodGroup={type} size="md" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {bloodCompatibility[type].canDonateTo.map((group: BloodGroup) => (
                          <BloodGroupBadge
                            key={group}
                            bloodGroup={group}
                            size="sm"
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {bloodCompatibility[type].canReceiveFrom.map((group: BloodGroup) => (
                          <BloodGroupBadge
                            key={group}
                            bloodGroup={group}
                            size="sm"
                          />
                        ))}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Special Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-4"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <ArrowLeftRight className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">
                Universal Donor & Recipient
              </h4>
              <p className="text-sm text-blue-700">
                <strong>O-</strong> is the universal donor (can give to anyone), while{' '}
                <strong>AB+</strong> is the universal recipient (can receive from anyone).
                These types are always in high demand!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* HOW IT WORKS / PROCESS SECTION */}
      {/* ============================================ */}
      <section className="section-padding bg-white" id="how-it-works">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              From registration to saving lives in just a few simple steps.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-dark to-red-400 rounded-full" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: 1,
                  title: 'Create Account',
                  description:
                    'Sign up as a donor or recipient. Complete your profile with your details and preferences.',
                  icon: Users,
                },
                {
                  step: 2,
                  title: 'Find or Post Request',
                  description:
                    'Browse urgent blood requests or create one if you or someone you know needs blood.',
                  icon: Search,
                },
                {
                  step: 3,
                  title: 'Connect & Schedule',
                  description:
                    'Connect with donors or hospitals. Schedule a convenient time for donation or pickup.',
                  icon: Phone,
                },
                {
                  step: 4,
                  title: 'Save Lives',
                  description:
                    'Complete the donation process. Receive recognition and track the impact you\'ve made.',
                  icon: Heart,
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  <Card className="text-center pt-8" hover={false}>
                    {/* Step Number */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-red-500/25 ring-4 ring-white">
                      {item.step}
                    </div>

                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TESTIMONIALS SECTION */}
      {/* ============================================ */}
      <section className="section-padding bg-gray-50" id="testimonials">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stories of Hope & Gratitude
            </h2>
            <p className="text-lg text-gray-600">
              Real stories from our community of donors, recipients, and healthcare partners.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full" hover={false}>
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  <blockquote className="text-gray-700 leading-relaxed mb-6">
                    "{testimonial.content}"
                  </blockquote>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                    {testimonial.donations > 0 && (
                      <div className="ml-auto text-right">
                        <p className="text-sm font-semibold text-primary">
                          {testimonial.donations} donations
                        </p>
                        <p className="text-xs text-gray-400">
                          {testimonial.yearsActive > 0
                            ? `${testimonial.yearsActive}+ years`
                            : 'New member'}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FAQ SECTION */}
      {/* ============================================ */}
      <section className="section-padding bg-white" id="faq">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about blood donation.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full text-left p-6 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-expanded={expandedFaq === index}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                      {expandedFaq === index ? (
                        <ChevronUp className="w-4 h-4 text-primary" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedFaq === index ? 'auto' : 0,
                      opacity: expandedFaq === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section className="py-20 md:py-28 gradient-bg relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="cta-grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>

        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Save a Life Today?
            </h2>
            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of donors who are making a difference every day.
              Your decision to donate could save someone's loved one.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 shadow-xl"
                onClick={() => navigate('/register?role=donor')}
                leftIcon={<Droplets className="w-5 h-5" />}
              >
                Become a Donor Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm">Free Registration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm">Safe & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
