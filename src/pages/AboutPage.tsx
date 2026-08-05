import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Droplets,
  Heart,
  ShieldCheck,
  Users,
  Globe,
  Award,
  Target,
  Lightbulb,
  HandHeart,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Clock,
  Star,
  Zap,
  Eye,
  Handshake,
  BookOpen,
  Stethoscope,
  Microscope,
  Ambulance,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';

// Import AI-generated images
import missionImage from '../assets/images/ai-generated/about-mission-ai.png';

// ============================================
// About Page - Professional Enhanced Version
// ============================================

const teamMembers = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Founder & CEO',
    bio: 'Former hematologist with 15+ years of experience in transfusion medicine. Led groundbreaking research in blood preservation at Johns Hopkins.',
    avatar: null,
    initials: 'SJ',
    color: 'from-red-500 to-red-700',
  },
  {
    name: 'Michael Chen',
    role: 'CTO & Co-Founder',
    bio: 'Full-stack engineer passionate about healthcare technology solutions. Previously led engineering teams at Google Health.',
    avatar: null,
    initials: 'MC',
    color: 'from-blue-500 to-blue-700',
  },
  {
    name: 'Dr. Emily Rodriguez',
    role: 'Medical Director',
    bio: 'Board-certified pathologist overseeing all medical protocols and safety standards. Published researcher with 40+ peer-reviewed papers.',
    avatar: null,
    initials: 'ER',
    color: 'from-emerald-500 to-emerald-700',
  },
  {
    name: 'James Wilson',
    role: 'Head of Operations',
    bio: 'Healthcare operations expert with a track record of scaling life-saving platforms across 30+ countries.',
    avatar: null,
    initials: 'JW',
    color: 'from-purple-500 to-purple-700',
  },
  {
    name: 'Priya Patel',
    role: 'Community Lead',
    bio: 'Drives donor engagement and community partnerships across 50+ cities. Built donor networks exceeding 100,000 members.',
    avatar: null,
    initials: 'PP',
    color: 'from-orange-500 to-orange-700',
  },
  {
    name: 'David Kim',
    role: 'Lead Designer',
    bio: 'UX specialist focused on making blood donation accessible to everyone. Award-winning designer featured in Forbes 30 Under 30.',
    avatar: null,
    initials: 'DK',
    color: 'from-pink-500 to-pink-700',
  },
];

const milestones = [
  { year: '2019', title: 'Founded', description: 'LifeBlood started as a small initiative to connect local donors with patients in critical need.', icon: '🚀' },
  { year: '2020', title: 'First 1000 Donors', description: 'Reached our first milestone of 1,000 registered donors during the pandemic, saving countless lives.', icon: '🎯' },
  { year: '2021', title: 'Hospital Partnerships', description: 'Established partnerships with 50+ hospitals across the country, expanding our reach exponentially.', icon: '🏥' },
  { year: '2022', title: 'National Expansion', description: 'Expanded operations to cover all 50 states with mobile donation units and 24/7 support.', icon: '🗺️' },
  { year: '2023', title: '50K Lives Saved', description: 'Celebrated saving over 50,000 lives through our platform — a testament to our donors\' generosity.', icon: '💝' },
  { year: '2024', title: 'AI Matching System', description: 'Launched AI-powered donor-patient matching for faster response times and better compatibility.', icon: '🤖' },
];

const values = [
  {
    icon: Heart,
    title: 'Compassion First',
    description: 'Every decision we make is guided by empathy for both donors and recipients. We believe in the power of human connection to transform healthcare.',
    color: 'text-white bg-gradient-to-br from-red-500 to-red-600',
    bgColor: 'bg-red-50',
  },
  {
    icon: ShieldCheck,
    title: 'Safety & Trust',
    description: 'We maintain the highest safety standards and complete transparency in every aspect of our operations. Your trust is our most valuable asset.',
    color: 'text-white bg-gradient-to-br from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Our platform is built by the community, for the community. Every voice matters in shaping our future and improving our services.',
    color: 'text-white bg-gradient-to-br from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Always',
    description: 'We continuously leverage cutting-edge technology to make blood donation faster, easier, and more impactful than ever before.',
    color: 'text-white bg-gradient-to-br from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
  },
];

const stats = [
  { value: '50,000+', label: 'Active Donors', icon: Users, color: 'from-red-500 to-orange-500' },
  { value: '150,000+', label: 'Lives Saved', icon: Heart, color: 'from-pink-500 to-red-500' },
  { value: '500+', label: 'Partner Hospitals', icon: Droplets, color: 'from-blue-500 to-cyan-500' },
  { value: '99.8%', label: 'Satisfaction Rate', icon: Award, color: 'from-emerald-500 to-green-500' },
];

const services = [
  {
    icon: Stethoscope,
    title: 'Donor Screening',
    description: 'Comprehensive health screening ensures donor safety and recipient health through rigorous medical protocols.',
  },
  {
    icon: Ambulance,
    title: 'Emergency Response',
    description: '24/7 emergency response team coordinates rapid blood delivery for critical situations nationwide.',
  },
  {
    icon: Microscope,
    title: 'Blood Testing',
    description: 'State-of-the-art laboratories perform thorough testing on every donation for maximum safety.',
  },
  {
    icon: BookOpen,
    title: 'Education Programs',
    description: 'Community education initiatives raise awareness about the importance of regular blood donation.',
  },
];

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* ===== Hero Section ===== */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-800">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ 
                x: [0, 100, 0], 
                y: [0, -50, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ 
                x: [0, -80, 0], 
                y: [0, 60, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/10 rounded-full"
            />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="heroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#heroGrid)" />
              </svg>
            </div>
          </div>
        </div>

        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">About LifeBlood</span>
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Saving Lives,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-red-200">
                One Donation at a Time
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-red-100 max-w-3xl mx-auto mb-10 leading-relaxed">
              We're on a mission to ensure that no one has to struggle to find blood when they need it most. 
              Our platform connects generous donors with those in need, creating a lifeline that spans communities 
              and saves thousands of lives every year.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                leftIcon={<Heart className="w-5 h-5" />} 
                onClick={() => window.location.href = '/register?role=donor'}
                variant="secondary"
                className="!bg-white !text-red-600 hover:!bg-red-50 !border-0 shadow-xl"
              >
                Become a Donor Today
              </Button>
              <Button 
                size="lg" 
                variant="glass"
                onClick={() => document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn Our Story
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-16 lg:mt-20"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center group hover:bg-white/20 transition-all duration-300"
                >
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-red-200">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== Mission Section ===== */}
      <section id="mission" className="py-20 lg:py-28 bg-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="missionPattern" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="1.5" fill="#dc2626" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#missionPattern)" />
          </svg>
        </div>

        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-6">
                <Eye className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Mission</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Making Blood Accessible to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                  Everyone, Everywhere
                </span>
              </h2>
              
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Founded in 2019, LifeBlood emerged from a simple yet powerful realization: while millions of people 
                  are willing to donate blood, the process of connecting donors with those in need remains fragmented 
                  and inefficient. We set out to change that.
                </p>
                <p>
                  Our platform leverages cutting-edge technology to bridge this gap, creating an ecosystem where a single blood 
                  donation can save up to three lives. We work tirelessly with hospitals, blood banks, and communities 
                  to ensure that blood is always available when it matters most.
                </p>
                <p>
                  Today, we're proud to serve over 50,000 active donors across all 50 states, with partnerships 
                  spanning more than 500 healthcare facilities. But our work is far from done — every day, someone 
                  somewhere needs blood, and we're committed to being there for them.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { label: 'FDA Certified', icon: CheckCircle2 },
                  { label: 'WHO Compliant', icon: ShieldCheck },
                  { label: 'HIPAA Secure', icon: Lock }
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 rounded-full border border-emerald-100">
                    <badge.icon className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-700">{badge.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visual Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div 
                className="rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden shadow-2xl shadow-red-900/30 min-h-[400px] bg-cover bg-center"
                style={{ backgroundImage: `url(${missionImage})` }}
              >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/90 via-red-700/85 to-red-800/90" />
                
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="visionGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#visionGrid)" />
                  </svg>
                </div>

                <div className="relative z-10 space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Target className="w-8 h-8 text-yellow-400" />
                      <h3 className="text-2xl font-bold">Our Vision</h3>
                    </div>
                    <p className="text-white/90 text-lg leading-relaxed">
                      A world where no one dies due to lack of blood availability. Where every person in need 
                      can access life-saving blood within minutes, anywhere on the planet.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: 'Average Response Time', value: '< 15 min', icon: Clock },
                      { label: 'Donor Match Accuracy', value: '98.5%', icon: Target },
                      { label: 'Coverage Area', value: '50 States', icon: Globe },
                      { label: 'Active Partners', value: '500+', icon: Handshake },
                    ].map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={item.label} className="flex justify-between items-center py-3 border-b border-white/15 last:border-0">
                          <div className="flex items-center gap-3">
                            <ItemIcon className="w-4 h-4 text-yellow-400" />
                            <span className="text-white/80">{item.label}</span>
                          </div>
                          <span className="font-bold text-lg text-yellow-400">{item.value}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4">
                    <Link to="/contact">
                      <Button 
                        variant="secondary" 
                        className="!bg-white/20 !border-white/30 hover:!bg-white/30 text-white hover:!text-white shadow-lg"
                      >
                        Partner With Us
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Floating Decorative Elements */}
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400/20 rounded-full backdrop-blur-sm"
                />
                <motion.div
                  animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
                  transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Services Section ===== */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">What We Do</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Blood Services
            </h2>
            <p className="text-gray-600 text-lg">
              From donor recruitment to emergency delivery, we provide end-to-end blood management solutions.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 group border-0 shadow-lg">
                    <CardBody className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Values Section ===== */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
              <Star className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">Our Values</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-gray-600 text-lg">
              Our core values shape every decision we make and every feature we build into our platform.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className={`h-full hover:shadow-xl transition-all duration-300 ${value.bgColor} border-0`}>
                    <CardBody className="p-6 text-center">
                      <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Timeline / Milestones ===== */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-600 uppercase tracking-wider">Our Journey</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Key Milestones
            </h2>
            <p className="text-gray-600 text-lg">
              From a small idea to a national movement — here's how we've grown and made an impact.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-orange-400 to-red-200 transform md:-translate-x-1/2 rounded-full" />

              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-start mb-8 last:mb-0 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot with Icon */}
                  <div className="absolute left-4 md:left-1/2 w-10 h-10 bg-white rounded-full border-4 border-red-500 shadow-lg transform -translate-x-1/2 z-10 flex items-center justify-center text-lg">
                    {milestone.icon}
                  </div>

                  {/* Content Card */}
                  <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-red-500">
                        <CardBody className="p-5">
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-full mb-3 shadow-md">
                            {milestone.year}
                          </span>
                          <h3 className="font-bold text-gray-900 text-lg mb-2">{milestone.title}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{milestone.description}</p>
                        </CardBody>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Team Section ===== */}
      <section id="team" className="py-20 lg:py-24 bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Our Team</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet the People Behind LifeBlood
            </h2>
            <p className="text-gray-600 text-lg">
              A dedicated team of healthcare professionals, engineers, and changemakers united by a common goal: saving lives.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                  {/* Avatar Area */}
                  <div className={`h-56 bg-gradient-to-br ${member.color} flex items-center justify-center relative overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`teamPattern${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="1" fill="white"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#teamPattern${index})`} />
                      </svg>
                    </div>
                    
                    <motion.div 
                      className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-bold shadow-2xl border-4 border-white/30 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 5 }}
                    >
                      {member.initials}
                    </motion.div>
                    
                    {/* Social Links Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                      <a href="#" className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.756v6.479z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </a>
                    </div>
                  </div>

                  <CardBody className="p-6 text-center">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{member.name}</h3>
                    <p className="text-sm font-semibold text-primary mb-3">{member.role}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-red-600 via-red-700 to-red-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ctaDots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="white" opacity="0.1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ctaDots)" />
          </svg>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-20 h-20 mx-auto mb-8 bg-white/10 rounded-full flex items-center justify-center"
            >
              <HandHeart className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Make a{' '}
              <span className="text-yellow-300">Difference?</span>
            </h2>
            <p className="text-lg text-red-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of heroes who have already stepped up to save lives. Your single donation can give someone 
              another chance at life, another moment with loved ones, another tomorrow.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="xl"
                variant="secondary"
                className="!bg-white !text-red-600 hover:!bg-red-50 !border-0 px-10 shadow-2xl"
                onClick={() => window.location.href = '/register?role=donor'}
                leftIcon={<Droplets className="w-6 h-6" />}
              >
                Register as Donor
              </Button>
              <Button
                size="xl"
                variant="glass"
                className="px-10"
                onClick={() => window.location.href = '/requests/new'}
              >
                Request Blood Now
              </Button>
            </div>

            <p className="mt-10 text-sm text-red-200">
              Questions?{' '}
              <Link to="/contact" className="underline hover:text-white font-medium transition-colors inline-flex items-center gap-1">
                Contact our team
                <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

// Lock icon for HIPAA badge
function Lock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}
