import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  Building2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  HeadphonesIcon,
  Globe,
  Calendar,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';

// ============================================
// Contact Page - Professional Enhanced Version
// ============================================

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone Support',
    details: ['1-800-LIFEBLOOD (543-2566)', '+1 (555) 123-4567'],
    description: 'Available 24/7 for emergencies',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    action: 'tel:18005432566',
    actionLabel: 'Call Now',
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['support@lifeblood.com', 'partnerships@lifeblood.com'],
    description: 'Response within 24 hours',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    action: 'mailto:support@lifeblood.com',
    actionLabel: 'Send Email',
  },
  {
    icon: MapPin,
    title: 'Head Office',
    details: ['123 Health Street', 'Medical District, NY 10001'],
    description: 'Mon-Fri: 9AM - 6PM EST',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    action: '#map-section',
    actionLabel: 'Get Directions',
  },
  {
    icon: Clock,
    title: 'Emergency Line',
    details: ['1-800-555-BLOOD'],
    description: '24/7 for urgent blood requests',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    action: 'tel:18005552566',
    actionLabel: 'Emergency Call',
  },
];

const faqs = [
  {
    question: 'How do I register as a blood donor?',
    answer: 'Simply click on "Get Started" in the navigation and select "Donor" as your role. Complete your profile with basic health information including your blood type, medical history, and contact details. Once verified, you\'ll be ready to receive donation requests and save lives!',
  },
  {
    question: 'How quickly can I get blood in an emergency?',
    answer: 'Our average response time is under 15 minutes for critical requests. We use AI-powered matching to find compatible donors near you immediately. For life-threatening emergencies, we activate our rapid response protocol which can deliver blood to hospitals in under 30 minutes.',
  },
  {
    question: 'Is my personal information secure?',
    answer: 'Absolutely. We are HIPAA compliant and use bank-level AES-256 encryption to protect all your data. Your medical information is only shared with authorized healthcare providers who have signed confidentiality agreements. We never sell or share data with third parties.',
  },
  {
    question: 'Can hospitals partner with LifeBlood?',
    answer: 'Yes! Over 500 hospitals already use our platform for blood management. Partnership includes access to our donor network, real-time inventory management, emergency response protocols, and dedicated account managers. Contact our partnerships team at partnerships@lifeblood.com to learn more.',
  },
  {
    question: 'What are the eligibility requirements for donating blood?',
    answer: 'Donors must be between 17-65 years old (16 with parental consent), weigh at least 110 lbs, be in good health, and meet additional criteria regarding medications, travel history, and lifestyle factors. Our screening process ensures both donor and recipient safety.',
  },
  {
    question: 'How often can I donate blood?',
    answer: 'Whole blood donations can be made every 56 days (8 weeks), up to 6 times per year. Platelet donations can be made every 7 days, up to 24 times per year. Plasma donations can be made every 28 days. We track your donation history and remind you when you\'re eligible to donate again.',
  },
];

const departments = [
  { name: 'General Inquiry', email: 'support@lifeblood.com', icon: MessageSquare },
  { name: 'Donor Support', email: 'donors@lifeblood.com', icon: HeartIcon },
  { name: 'Hospital Partnerships', email: 'partnerships@lifeblood.com', icon: Building2 },
  { name: 'Technical Issues', email: 'tech@lifeblood.com', icon: Globe },
  { name: 'Media & Press', email: 'media@lifeblood.com', icon: Megaphone },
  { name: 'Volunteer Program', email: 'volunteer@lifeblood.com', icon: UsersIcon },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ===== Hero Section ===== */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-20 right-20 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 25, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 12, repeat: Infinity, delay: 2 }}
            className="absolute bottom-10 left-20 w-[350px] h-[350px] bg-orange-500/10 rounded-full blur-3xl"
          />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="contactHeroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#contactHeroGrid)" />
            </svg>
          </div>
        </div>

        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20"
            >
              <MessageSquare className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">Contact Us</span>
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Get in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Touch With Us
              </span>
            </h1>
            
            <p className="text-lg text-red-100 max-w-2xl mx-auto leading-relaxed mb-10">
              Have questions about donating, requesting blood, partnering with us, or anything else? 
              We're here to help — reach out and our dedicated team will respond promptly.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>Avg. Response: &lt; 2 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <HeadphonesIcon className="w-5 h-5 text-yellow-400" />
                <span>24/7 Support Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-yellow-400" />
                <span>Serving 50 States</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Contact Info Cards ===== */}
      <section className="py-12 -mt-6 relative z-20">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className={`h-full hover:shadow-2xl transition-all duration-300 ${info.bgColor} border-0 shadow-lg`}>
                    <CardBody className="p-6">
                      <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-3">{info.title}</h3>
                      {info.details.map((detail) => (
                        <p key={detail} className="text-sm text-gray-700 font-semibold">{detail}</p>
                      ))}
                      <p className="text-xs text-gray-500 mt-3 mb-4">{info.description}</p>
                      <a
                        href={info.action}
                        className={`inline-flex items-center gap-1.5 text-sm font-semibold ${info.textColor} hover:underline`}
                      >
                        {info.actionLabel}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Contact Form & FAQ ===== */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
                  <Send className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">Send a Message</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  We'd Love to Hear From You
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and our team will get back to you within 24 hours. 
                  For urgent matters, please call our hotline.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-10 text-center shadow-lg"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-emerald-800 mb-3">Message Sent Successfully!</h3>
                  <p className="text-emerald-600 mb-6">
                    Thank you for reaching out. Our team has received your message and will respond 
                    within 24 hours. Check your email for a confirmation.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSubmitted(false)}
                    className="!border-emerald-300 !text-emerald-600 hover:!bg-emerald-50"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full h-11 px-4 rounded-xl border-2 border-gray-200 bg-white text-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm font-medium hover:border-gray-300"
                      >
                        <option value="">Select a topic</option>
                        <option value="general">📋 General Inquiry</option>
                        <option value="donor">🩸 Donor Support</option>
                        <option value="request">🆘 Blood Request</option>
                        <option value="partnership">🤝 Partnership Opportunity</option>
                        <option value="technical">💻 Technical Issue</option>
                        <option value="feedback">💬 Feedback & Suggestions</option>
                        <option value="media">📰 Media & Press</option>
                        <option value="other">❓ Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-xs text-gray-500">
                      * Required fields. Your information is secure and will never be shared.
                    </p>
                    <Button
                      type="submit"
                      size="lg"
                      isLoading={isSubmitting}
                      leftIcon={<Send className="w-5 h-5" />}
                      className="shadow-lg shadow-red-500/25"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
                  <HelpCircle className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">FAQ</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600">
                  Quick answers to common questions about our platform and services.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`overflow-hidden transition-all duration-300 cursor-pointer ${
                        expandedFaq === index ? 'shadow-xl ring-2 ring-red-500/20' : 'hover:shadow-lg'
                      }`}
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      <CardBody className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-semibold text-gray-900 pr-4 leading-snug">{faq.question}</h3>
                          <motion.button
                            type="button"
                            animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                              expandedFaq === index ? 'bg-red-100' : 'bg-gray-100'
                            }`}
                          >
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </motion.button>
                        </div>
                        
                        <motion.div
                          initial={false}
                          animate={{
                            height: expandedFaq === index ? 'auto' : 0,
                            opacity: expandedFaq === index ? 1 : 0,
                          }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="pt-4 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                        </motion.div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Emergency Notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg"
                  >
                    <AlertCircle className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-red-800 text-lg mb-2">Need Blood Urgently?</h3>
                    <p className="text-sm text-red-700 mb-4 leading-relaxed">
                      For emergency blood requests, please call our 24/7 hotline immediately. 
                      Our emergency response team is available around the clock to coordinate 
                      rapid blood delivery to hospitals.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="tel:18005552566"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-md"
                      >
                        <Phone className="w-4 h-4" />
                        1-800-555-BLOOD
                      </a>
                      <Link
                        to="/requests/new"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-red-600 border-2 border-red-200 rounded-xl font-semibold hover:bg-red-50 transition-colors"
                      >
                        Request Online
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Departments Section ===== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
              <Mail className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Departments</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Reach the Right Team</h2>
            <p className="text-gray-600">
              Contact specific departments directly for faster assistance with your inquiry.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {departments.map((dept, index) => {
              const Icon = dept.icon;
              return (
                <motion.a
                  key={dept.name}
                  href={`mailto:${dept.email}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-primary/30 hover:bg-red-50/50 transition-all group"
                >
                  <div className="w-11 h-11 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{dept.name}</p>
                    <p className="text-xs text-gray-500 truncate">{dept.email}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Map / Location Section ===== */}
      <section id="map-section" className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <Building2 className="w-14 h-14 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
            <p className="text-gray-600 text-lg">
              Come say hello! Our doors are always open for donors, partners, and anyone interested 
              in learning more about our mission to save lives.
            </p>
          </motion.div>

          {/* Office Info Cards */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-10">
            <Card className="border-l-4 border-l-red-500">
              <CardBody className="p-5">
                <MapPin className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Address</h3>
                <p className="text-gray-600 text-sm">123 Health Street<br/>Medical District<br/>New York, NY 10001</p>
              </CardBody>
            </Card>
            <Card className="border-l-4 border-l-blue-500">
              <CardBody className="p-5">
                <Clock className="w-6 h-6 text-blue-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Office Hours</h3>
                <p className="text-gray-600 text-sm">
                  Mon-Fri: 9:00 AM - 6:00 PM EST<br/>
                  Sat: 10:00 AM - 2:00 PM EST<br/>
                  Sun: Closed
                </p>
              </CardBody>
            </Card>
            <Card className="border-l-4 border-l-emerald-500">
              <CardBody className="p-5">
                <Calendar className="w-6 h-6 text-emerald-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Schedule Visit</h3>
                <p className="text-gray-600 text-sm mb-3">Book a tour of our facility</p>
                <Button variant="outline" size="sm" onClick={() => window.location.href = '/contact'}>
                  Book Now
                </Button>
              </CardBody>
            </Card>
          </div>

          {/* Map Placeholder */}
          <div className="max-w-5xl mx-auto">
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden shadow-xl aspect-video md:aspect-[21/9] border border-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-xl"
                  >
                    <MapPin className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">LifeBlood Headquarters</h3>
                  <p className="text-gray-500 mb-6">123 Health Street, Medical District, NY 10001</p>
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<ExternalLink className="w-5 h-5" />}
                    onClick={() => window.open('https://maps.google.com', '_blank')}
                  >
                    Open in Google Maps
                  </Button>
                </div>
              </div>

              {/* Decorative Grid Pattern */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="mapGridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#dc2626" strokeWidth="0.5"/>
                      <circle cx="20" cy="20" r="1" fill="#dc2626"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mapGridPattern)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Additional Icons
function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}

function Megaphone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m3 11 18-5v12L3 14v-3z"/>
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
      <line x1="21" x2="21" y1="6" y2="13"/>
    </svg>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}
