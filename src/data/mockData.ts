// ============================================
// Blood Donation System - Mock Data
// ============================================

import {
  User,
  DonorProfile,
  BloodRequest,
  Donation,
  Notification,
  PlatformStats,
  MonthlyStats,
  BloodGroupStats,
  BloodGroup,
  UrgencyLevel,
  RequestStatus,
} from '../types';

// Helper to generate random dates
const randomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Sample data arrays
const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
  'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
  'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
  'Kenneth', 'Carol', 'Kevin', 'Amanda', 'Brian', 'Dorothy', 'George', 'Melissa',
  'Edward', 'Deborah', 'Rahul', 'Priya', 'Amit', 'Anita', 'Vikram', 'Pooja',
  'Rajesh', 'Sneha', 'Sanjay', 'Kavita', 'Arun', 'Meera', 'Deepak', 'Sunita',
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen',
  'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera',
  'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Sharma', 'Patel', 'Reddy',
  'Gupta', 'Singh', 'Kumar', 'Joshi', 'Verma', 'Yadav', 'Mishra', 'Das',
];

const cities = [
  { name: 'New York', state: 'NY' },
  { name: 'Los Angeles', state: 'CA' },
  { name: 'Chicago', state: 'IL' },
  { name: 'Houston', state: 'TX' },
  { name: 'Phoenix', state: 'AZ' },
  { name: 'Philadelphia', state: 'PA' },
  { name: 'San Antonio', state: 'TX' },
  { name: 'San Diego', state: 'CA' },
  { name: 'Dallas', state: 'TX' },
  { name: 'San Jose', state: 'CA' },
  { name: 'Austin', state: 'TX' },
  { name: 'Jacksonville', state: 'FL' },
  { name: 'Mumbai', state: 'MH' },
  { name: 'Delhi', state: 'DL' },
  { name: 'Bangalore', state: 'KA' },
  { name: 'Chennai', state: 'TN' },
  { name: 'Hyderabad', state: 'TS' },
  { name: 'Kolkata', state: 'WB' },
  { name: 'Pune', state: 'MH' },
  { name: 'Ahmedabad', state: 'GJ' },
];

const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const urgencyLevels: UrgencyLevel[] = ['critical', 'high', 'medium', 'low'];

const reasons = [
  'Emergency surgery required due to accident trauma',
  'Patient undergoing major cardiac surgery',
  'Chemotherapy treatment causing low blood count',
  'Complications during childbirth requiring transfusion',
  'Severe anemia due to chronic kidney disease',
  'Bone marrow transplant preparation',
  'Sickle cell disease crisis management',
  'Major orthopedic surgery - hip replacement',
  'Liver transplant surgery',
  'Pediatric leukemia treatment',
  'Gastrointestinal bleeding emergency',
  'Burn injury treatment requiring plasma',
];

const hospitalNames = [
  'City General Hospital',
  "St. Mary's Medical Center",
  'Memorial Health System',
  'University Medical Center',
  'Community Hospital & Clinic',
  'Regional Trauma Center',
  "Children's Specialty Hospital",
  'Cancer Care Institute',
  'Heart & Vascular Center',
  'Orthopedic & Sports Medicine Hospital',
  'Sunrise Medical Center',
  'Grandview Hospital',
  'Riverside Medical Center',
  'Parkview Community Hospital',
  'Metropolitan General',
  'Central City Hospital',
  'Westside Medical Center',
  'North County Hospital',
  'Southbay Health System',
  'Eastside Regional Medical',
];

// ============================================
// Generate Mock Users
// ============================================

export const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: `user-${i + 1}`,
  email: `${firstNames[i % firstNames.length].toLowerCase()}.${lastNames[i % lastNames.length].toLowerCase()}${i}@example.com`,
  password: 'Password123!',
  name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
  role: randomItem(['donor', 'donor', 'donor', 'recipient', 'hospital'] as const),
  phone: `+1-${randomNumber(200, 999)}-${randomNumber(100, 999)}-${randomNumber(1000, 9999)}`,
  createdAt: randomDate(new Date(2022, 0, 1), new Date()),
  isActive: Math.random() > 0.1,
}));

// ============================================
// Generate Mock Donors
// ============================================

export const mockDonors: DonorProfile[] = Array.from({ length: 100 }, (_, i) => {
  const city = randomItem(cities);
  const lastDonation = randomDate(new Date(2023, 0, 1), new Date());
  const lastDonationDate = Math.random() > 0.3 ? lastDonation : null;
  
  return {
    ...mockUsers.filter(u => u.role === 'donor')[i] || mockUsers[i],
    id: `donor-${i + 1}`,
    bloodGroup: randomItem(bloodGroups),
    age: randomNumber(18, 65),
    weight: randomNumber(50, 95),
    gender: randomItem(['male', 'female', 'other']),
    address: `${randomNumber(100, 9999)} ${randomItem(['Main', 'Oak', 'Maple', 'Cedar', 'Elm', 'Pine', 'Park', 'Lake'])} ${randomItem(['Street', 'Avenue', 'Boulevard', 'Drive', 'Lane', 'Road'])}`,
    city: city.name,
    state: city.state,
    zipCode: `${randomNumber(10000, 99999)}`,
    isAvailable: Math.random() > 0.25,
    lastDonationDate,
    totalDonations: randomNumber(0, 25),
    eligibilityDate: lastDonationDate 
      ? new Date(new Date(lastDonationDate).getTime() + 56 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      : null,
    donations: [],
    pledges: [],
  };
});

// ============================================
// Generate Mock Blood Requests
// ============================================

export const mockRequests: BloodRequest[] = Array.from({ length: 80 }, (_, i) => {
  const city = randomItem(cities);
  const unitsNeeded = randomNumber(1, 6);
  const statusWeights: RequestStatus[] = ['active', 'active', 'active', 'fulfilled', 'cancelled', 'expired'];
  const status = randomItem(statusWeights);
  const urgency = randomItem(urgencyLevels);
  
  return {
    id: `request-${i + 1}`,
    patientName: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
    patientAge: randomNumber(1, 85),
    bloodGroup: randomItem(bloodGroups),
    unitsNeeded,
    unitsReceived: status === 'fulfilled' ? unitsNeeded : randomNumber(0, unitsNeeded - 1),
    urgency,
    status,
    requestedBy: `user-${randomNumber(1, 50)}`,
    requesterName: randomItem(firstNames) + ' ' + randomItem(lastNames),
    requesterType: Math.random() > 0.4 ? 'hospital' : 'recipient',
    hospitalName: randomItem(hospitalNames),
    requestDate: randomDate(new Date(2024, 0, 1), new Date()),
    requiredDate: randomDate(new Date(), new Date(2025, 11, 31)),
    reason: randomItem(reasons),
    contactPhone: `+1-${randomNumber(200, 999)}-${randomNumber(100, 999)}-${randomNumber(1000, 9999)}`,
    contactEmail: `contact${i + 1}@hospital.com`,
    city: city.name,
    state: city.state,
    notes: Math.random() > 0.7 ? 'Patient has no known allergies. Please bring donor ID.' : undefined,
    pledges: [],
    location: {
      ward: `Ward ${String.fromCharCode(65 + randomNumber(0, 5))}`,
      roomNumber: `${randomNumber(100, 500)}`,
      address: `${randomItem(hospitalNames)}, ${city.name}, ${city.state}`,
    },
  };
});

// ============================================
// Generate Mock Donations
// ============================================

export const mockDonations: Donation[] = Array.from({ length: 200 }, (_, i) => ({
  id: `donation-${i + 1}`,
  donorId: `donor-${randomNumber(1, 100)}`,
  requestId: `request-${randomNumber(1, 80)}`,
  patientName: randomItem(mockRequests)?.patientName || 'Unknown Patient',
  bloodGroup: randomItem(bloodGroups),
  units: 1,
  donationDate: randomDate(new Date(2023, 0, 1), new Date()),
  hospitalName: randomItem(hospitalNames),
}));

// ============================================
// Generate Mock Notifications
// ============================================

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: 'alert',
    title: 'Urgent: O- Blood Needed',
    message: 'Critical request for O- blood at City General Hospital. Your blood type is urgently needed!',
    isRead: false,
    actionUrl: '/requests/request-5',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    type: 'pledge',
    title: 'Pledge Confirmed',
    message: 'Thank you! Your donation pledge for Sarah Johnson has been confirmed.',
    isRead: false,
    actionUrl: '/dashboard',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'notif-3',
    userId: 'user-1',
    type: 'reminder',
    title: 'Upcoming Donation Appointment',
    message: 'Reminder: You have a donation scheduled tomorrow at 10:00 AM at Memorial Health System.',
    isRead: true,
    actionUrl: '/appointments',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'notif-4',
    userId: 'user-1',
    type: 'success',
    title: 'Donation Certificate Available',
    message: 'Your donation certificate for your 5th donation is now available. Download it from your profile!',
    isRead: true,
    actionUrl: '/profile',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: 'notif-5',
    userId: 'user-1',
    type: 'system',
    title: 'Welcome to LifeBlood!',
    message: 'Thank you for joining our community of life-savers. Complete your profile to get started.',
    isRead: true,
    actionUrl: '/onboarding',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
  {
    id: 'notif-6',
    userId: 'user-1',
    type: 'request',
    title: 'New Request Matching Your Blood Type',
    message: 'A new A+ blood request has been posted in your area. Would you like to help?',
    isRead: false,
    actionUrl: '/requests/request-15',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
];

// ============================================
// Platform Statistics
// ============================================

export const platformStats: PlatformStats = {
  totalDonors: 15847,
  totalDonations: 42593,
  livesSaved: 127779,
  activeRequests: 234,
  partnerHospitals: 350,
  pintsCollected: 85186,
};

export const monthlyStats: MonthlyStats[] = [
  { month: 'Jan', donations: 3200, newDonors: 450, requests: 890 },
  { month: 'Feb', donations: 3400, newDonors: 520, requests: 920 },
  { month: 'Mar', donations: 3800, newDonors: 610, requests: 1050 },
  { month: 'Apr', donations: 3600, newDonors: 540, requests: 980 },
  { month: 'May', donations: 4100, newDonors: 680, requests: 1120 },
  { month: 'Jun', donations: 3900, newDonors: 590, requests: 1040 },
  { month: 'Jul', donations: 4200, newDonors: 720, requests: 1180 },
  { month: 'Aug', donations: 4500, newDonors: 780, requests: 1250 },
  { month: 'Sep', donations: 4300, newDonors: 700, requests: 1150 },
  { month: 'Oct', donations: 4700, newDonors: 820, requests: 1300 },
  { month: 'Nov', donations: 4400, newDonors: 750, requests: 1200 },
  { month: 'Dec', donations: 4800, newDonors: 850, requests: 1350 },
];

export const bloodGroupStats: BloodGroupStats[] = [
  { bloodGroup: 'A+', count: 4520, percentage: 28.5, demand: 38 },
  { bloodGroup: 'A-', count: 1280, percentage: 8.1, demand: 12 },
  { bloodGroup: 'B+', count: 3210, percentage: 20.2, demand: 25 },
  { bloodGroup: 'B-', count: 890, percentage: 5.6, demand: 8 },
  { bloodGroup: 'AB+', count: 1560, percentage: 9.8, demand: 6 },
  { bloodGroup: 'AB-', count: 480, percentage: 3.0, demand: 2 },
  { bloodGroup: 'O+', count: 3480, percentage: 21.9, demand: 32 },
  { bloodGroup: 'O-', count: 1427, percentage: 9.0, demand: 18 },
];

// ============================================
// Test/Demo User Accounts
// ============================================

export const demoAccounts = {
  donor: {
    email: 'donor@lifeblood.com',
    password: 'Password123!',
    name: 'Alex Johnson',
    role: 'donor' as const,
  },
  recipient: {
    email: 'recipient@lifeblood.com',
    password: 'Password123!',
    name: 'Sarah Williams',
    role: 'recipient' as const,
  },
  hospital: {
    email: 'hospital@lifeblood.com',
    password: 'Password123!',
    name: 'City General Hospital',
    role: 'hospital' as const,
  },
  admin: {
    email: 'admin@lifeblood.com',
    password: 'Admin123!',
    name: 'System Administrator',
    role: 'admin' as const,
  },
};

// ============================================
// Blood Compatibility Data
// ============================================

export const bloodCompatibility = {
  'A+': { canDonateTo: ['A+', 'AB+'], canReceiveFrom: ['A+', 'A-', 'O+', 'O-'] },
  'A-': { canDonateTo: ['A+', 'A-', 'AB+', 'AB-'], canReceiveFrom: ['A-', 'O-'] },
  'B+': { canDonateTo: ['B+', 'AB+'], canReceiveFrom: ['B+', 'B-', 'O+', 'O-'] },
  'B-': { canDonateTo: ['B+', 'B-', 'AB+', 'AB-'], canReceiveFrom: ['B-', 'O-'] },
  'AB+': { canDonateTo: ['AB+'], canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  'AB-': { canDonateTo: ['AB+', 'AB-'], canReceiveFrom: ['A-', 'B-', 'AB-', 'O-'] },
  'O+': { canDonateTo: ['A+', 'B+', 'AB+', 'O+'], canReceiveFrom: ['O+', 'O-'] },
  'O-': { canDonateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], canReceiveFrom: ['O-'] },
};

// ============================================
// Testimonials
// ============================================

export const testimonials = [
  {
    id: 1,
    name: 'Michael Chen',
    role: 'Regular Donor',
    avatar: 'MC',
    content: 'Donating blood through this platform has been incredibly rewarding. The process is seamless, and knowing that my donations have helped save over 12 lives makes every visit worthwhile.',
    donations: 12,
    yearsActive: 3,
  },
  {
    id: 2,
    name: 'Dr. Emily Rodriguez',
    role: 'Hospital Director',
    avatar: 'ER',
    content: 'As a hospital director, this platform has transformed how we manage blood requests. The response time has improved by 60%, and we\'ve never been able to help patients faster.',
    donations: 0,
    yearsActive: 2,
  },
  {
    id: 3,
    name: 'James Thompson',
    role: 'Recipient Family',
    avatar: 'JT',
    content: 'When my daughter needed emergency surgery, this platform connected us with donors within hours. The community here saved her life. We are forever grateful.',
    donations: 0,
    yearsActive: 1,
  },
  {
    id: 4,
    name: 'Priya Sharma',
    role: 'First-time Donor',
    avatar: 'PS',
    content: 'I was nervous about donating for the first time, but the staff made me feel comfortable. The app guided me through everything, and now I\'m a regular donor!',
    donations: 3,
    yearsActive: 0,
  },
  {
    id: 5,
    name: 'Robert Kim',
    role: 'Corporate Partner',
    avatar: 'RK',
    content: 'Our company organizes quarterly blood drives through this platform. The impact we\'ve made together as a team - over 500 units collected - shows the power of community.',
    donations: 8,
    yearsActive: 4,
  },
];

// ============================================
// FAQ Data
// ============================================

export const faqData = [
  {
    question: 'Who can donate blood?',
    answer: 'Generally, anyone aged 18-65 who weighs at least 50kg (110lbs) and is in good health can donate. You must not have had certain medical conditions, recent tattoos/piercings, or traveled to specific countries. A quick health screening is done before each donation.',
  },
  {
    question: 'How often can I donate blood?',
    answer: 'Whole blood donations can be made every 56 days (8 weeks). Platelet donations can be made more frequently - up to 24 times a year. Power Red donations require a waiting period of 112 days (16 weeks) between donations.',
  },
  {
    question: 'How long does the donation process take?',
    answer: 'The entire process takes about 1-1.5 hours. This includes registration (15 min), health history and mini-physical (20 min), the actual donation (8-10 minutes), and refreshments in the recovery area (15 min).',
  },
  {
    question: 'Is donating blood safe?',
    answer: 'Yes, absolutely! All donation equipment is sterile, used only once, and then disposed of. You cannot contract any disease through donating blood. Trained professionals monitor you throughout the process.',
  },
  {
    question: 'What should I do before donating?',
    answer: 'Eat a healthy meal, drink plenty of water (about 16 ounces), get a good night\'s sleep, and bring a valid ID. Avoid fatty foods, alcohol, and aspirin 24-48 hours before donation.',
  },
  {
    question: 'What happens to my donated blood?',
    answer: 'Your blood is processed into components (red cells, platelets, plasma), tested for infectious diseases, typed, and then distributed to hospitals based on patient needs. One donation can save up to 3 lives!',
  },
  {
    question: 'Are there any side effects after donation?',
    answer: 'Most people feel fine after donation. Some may experience lightheadedness, dizziness, or bruising at the needle site. These are usually mild and temporary. Drinking fluids and avoiding strenuous activity for 24 hours helps recovery.',
  },
  {
    question: 'Can I donate if I have a tattoo or piercing?',
    answer: 'In most states, there\'s a waiting period of 3-6 months after getting a tattoo or piercing. Rules vary by location, so check with your local blood center about their specific requirements.',
  },
];
