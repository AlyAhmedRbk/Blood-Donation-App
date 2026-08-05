import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Droplets,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  Clock,
  Info,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { BloodGroupBadge } from '../components/ui/Badge';
import { useRequestStore } from '../store';
import { useAuth } from '../hooks';
import type { BloodGroup, UrgencyLevel } from '../types';

// ============================================
// Create Request Page
// ============================================

const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const urgencyOptions: { value: UrgencyLevel; label: string; description: string; color: string }[] = [
  {
    value: 'critical',
    label: 'Critical',
    description: 'Needed within hours - life-threatening emergency',
    color: 'border-red-300 bg-red-50',
  },
  {
    value: 'high',
    label: 'High',
    description: 'Needed within 24 hours - urgent surgery or treatment',
    color: 'border-orange-300 bg-orange-50',
  },
  {
    value: 'medium',
    label: 'Medium',
    description: 'Needed within a few days - planned procedure',
    color: 'border-yellow-300 bg-yellow-50',
  },
  {
    value: 'low',
    label: 'Low',
    description: 'Needed within a week or more - routine requirement',
    color: 'border-green-300 bg-green-50',
  },
];

interface RequestFormData {
  patientName: string;
  patientAge: string;
  bloodGroup: BloodGroup | '';
  unitsNeeded: string;
  urgency: UrgencyLevel | '';
  requiredDate: string;
  reason: string;
  hospitalName: string;
  contactPhone: string;
  contactEmail: string;
  city: string;
  state: string;
  address: string;
  notes: string;
}

const initialFormData: RequestFormData = {
  patientName: '',
  patientAge: '',
  bloodGroup: '',
  unitsNeeded: '1',
  urgency: '',
  requiredDate: '',
  reason: '',
  hospitalName: '',
  contactPhone: '',
  contactEmail: '',
  city: '',
  state: '',
  address: '',
  notes: '',
};

export const CreateRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createRequest } = useRequestStore();

  const [formData, setFormData] = useState<RequestFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof RequestFormData, string>>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 3;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof RequestFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof RequestFormData, string>> = {};

    if (step === 1) {
      if (!formData.patientName.trim()) newErrors.patientName = 'Patient name is required';
      if (!formData.patientAge.trim()) newErrors.patientAge = 'Patient age is required';
      else if (parseInt(formData.patientAge) < 0 || parseInt(formData.patientAge) > 120)
        newErrors.patientAge = 'Please enter a valid age';
      if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
      if (!formData.unitsNeeded || parseInt(formData.unitsNeeded) < 1)
        newErrors.unitsNeeded = 'Units needed must be at least 1';
      if (!formData.urgency) newErrors.urgency = 'Please select urgency level';
      if (!formData.requiredDate) newErrors.requiredDate = 'Required date is needed';
      else {
        const selectedDate = new Date(formData.requiredDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) newErrors.requiredDate = 'Date cannot be in the past';
      }
    }

    if (step === 2) {
      if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Phone number is required';
      if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail))
        newErrors.contactEmail = 'Please enter a valid email';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.hospitalName.trim()) newErrors.hospitalName = 'Hospital name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    setIsSubmitting(true);
    try {
      await createRequest({
        patientName: formData.patientName,
        patientAge: parseInt(formData.patientAge),
        bloodGroup: formData.bloodGroup as BloodGroup,
        unitsNeeded: parseInt(formData.unitsNeeded),
        urgency: formData.urgency as UrgencyLevel,
        requiredDate: formData.requiredDate,
        reason: formData.reason,
        hospitalName: formData.hospitalName,
        contactPhone: formData.contactPhone,
        contactEmail: formData.contactEmail,
        city: formData.city,
        state: formData.state,
        notes: formData.notes,
        requestedBy: user?.id || '',
        requesterName: user?.name || '',
        requesterType: user?.role === 'hospital' ? 'hospital' : 'recipient',
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error creating request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success State
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto"
          >
            <Card className="text-center">
              <CardBody className="py-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </motion.div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">Request Created!</h1>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Your blood request has been posted successfully. We'll notify you when donors pledge to help. 
                  You can track your request status from your dashboard.
                </p>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-left text-sm text-green-700">
                      <p className="font-medium">What happens next?</p>
                      <ul className="mt-2 space-y-1 list-disc list-inside">
                        <li>Donors in your area will be notified</li>
                        <li>You'll receive alerts when someone pledges</li>
                        <li>Contact donors directly to coordinate</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => navigate('/requests')} leftIcon={<Droplets className="w-5 h-5" />}>
                    View Requests
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setFormData(initialFormData);
                    setCurrentStep(1);
                    setIsSubmitted(false);
                  }}>
                    Create Another Request
                  </Button>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>

          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Create Blood Request</h1>
          <p className="text-gray-600 mt-1">Fill out the form below to request blood donations</p>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-8 max-w-2xl">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                      step <= currentStep
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step < currentStep ? <CheckCircle2 className="w-5 h-5" /> : step}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    step <= currentStep ? 'text-primary' : 'text-gray-400'
                  }`}>
                    {step === 1 ? 'Patient Info' : step === 2 ? 'Contact Details' : 'Review'}
                  </span>
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    step < currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Card>
            <CardBody className="p-6 lg:p-8">
              {/* Step 1: Patient Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                    <User className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-bold text-gray-900">Patient Information</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-2">
                        Patient Name *
                      </label>
                      <Input
                        id="patientName"
                        name="patientName"
                        placeholder="Enter patient's full name"
                        value={formData.patientName}
                        onChange={handleChange}
                        error={errors.patientName}
                      />
                    </div>
                    <div>
                      <label htmlFor="patientAge" className="block text-sm font-medium text-gray-700 mb-2">
                        Patient Age *
                      </label>
                      <Input
                        id="patientAge"
                        name="patientAge"
                        type="number"
                        min="0"
                        max="120"
                        placeholder="Enter age"
                        value={formData.patientAge}
                        onChange={handleChange}
                        error={errors.patientAge}
                      />
                    </div>
                  </div>

                  {/* Blood Group Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Blood Group Required *
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                      {bloodGroups.map((bg) => (
                        <button
                          key={bg}
                          type="button"
                          onClick={() => setFormData({ ...formData, bloodGroup: bg })}
                          className={`px-3 py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                            formData.bloodGroup === bg
                              ? 'border-primary bg-red-50 text-primary shadow-sm'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          {bg}
                        </button>
                      ))}
                    </div>
                    {errors.bloodGroup && (
                      <p className="mt-2 text-sm text-red-500">{errors.bloodGroup}</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="unitsNeeded" className="block text-sm font-medium text-gray-700 mb-2">
                        Units Needed *
                      </label>
                      <Input
                        id="unitsNeeded"
                        name="unitsNeeded"
                        type="number"
                        min="1"
                        max="20"
                        value={formData.unitsNeeded}
                        onChange={handleChange}
                        error={errors.unitsNeeded}
                      />
                    </div>
                    <div>
                      <label htmlFor="requiredDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Required By Date *
                      </label>
                      <Input
                        id="requiredDate"
                        name="requiredDate"
                        type="date"
                        value={formData.requiredDate}
                        onChange={handleChange}
                        error={errors.requiredDate}
                      />
                    </div>
                  </div>

                  {/* Urgency Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Urgency Level *
                    </label>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {urgencyOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, urgency: option.value })}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            formData.urgency === option.value
                              ? `${option.color} ring-2 ring-offset-2 ring-primary/20`
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-semibold text-gray-900">{option.label}</div>
                          <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                        </button>
                      ))}
                    </div>
                    {errors.urgency && (
                      <p className="mt-2 text-sm text-red-500">{errors.urgency}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Blood Need
                    </label>
                    <Textarea
                      id="reason"
                      name="reason"
                      rows={3}
                      placeholder="e.g., Surgery, Accident, Anemia treatment, etc."
                      value={formData.reason}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                    <Phone className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-bold text-gray-900">Contact & Location Details</h2>
                  </div>

                  <div>
                    <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 mb-2">
                      Hospital/Facility Name *
                    </label>
                    <Input
                      id="hospitalName"
                      name="hospitalName"
                      placeholder="Enter hospital or facility name"
                      value={formData.hospitalName}
                      onChange={handleChange}
                      error={errors.hospitalName}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Phone *
                      </label>
                      <Input
                        id="contactPhone"
                        name="contactPhone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        error={errors.contactPhone}
                      />
                    </div>
                    <div>
                      <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Email *
                      </label>
                      <Input
                        id="contactEmail"
                        name="contactEmail"
                        type="email"
                        placeholder="contact@example.com"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        error={errors.contactEmail}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="City name"
                        value={formData.city}
                        onChange={handleChange}
                        error={errors.city}
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                        State / Province
                      </label>
                      <Input
                        id="state"
                        name="state"
                        placeholder="State or province"
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Address
                    </label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Street address, ward/room number"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes
                    </label>
                    <Textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      placeholder="Any additional information for donors (visiting hours, special instructions, etc.)"
                      value={formData.notes}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Emergency Notice */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium">Important Notice</p>
                      <p className="mt-1">
                        Please ensure all contact information is accurate. Donors will use this 
                        information to reach you and coordinate the donation.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                    <FileText className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-bold text-gray-900">Review Your Request</h2>
                  </div>

                  {/* Summary Cards */}
                  <div className="space-y-4">
                    {/* Patient Summary */}
                    <div className="bg-gray-50 rounded-xl p-5">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        Patient Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Name:</span>
                          <p className="font-medium text-gray-900">{formData.patientName}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Age:</span>
                          <p className="font-medium text-gray-900">{formData.patientAge} years</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Blood Group:</span>
                          <div className="mt-1">
                            <BloodGroupBadge bloodGroup={formData.bloodGroup as BloodGroup} size="md" />
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Units Needed:</span>
                          <p className="font-medium text-gray-900">{formData.unitsNeeded} unit(s)</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Urgency:</span>
                          <p className={`font-medium capitalize ${
                            formData.urgency === 'critical' ? 'text-red-600' :
                            formData.urgency === 'high' ? 'text-orange-600' :
                            formData.urgency === 'medium' ? 'text-yellow-600' : 'text-green-600'
                          }`}>{formData.urgency}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Required By:</span>
                          <p className="font-medium text-gray-900">{formData.requiredDate}</p>
                        </div>
                        {formData.reason && (
                          <div className="col-span-2">
                            <span className="text-gray-500">Reason:</span>
                            <p className="font-medium text-gray-900 mt-1">{formData.reason}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Contact Summary */}
                    <div className="bg-gray-50 rounded-xl p-5">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        Contact & Location
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Hospital:</span>
                          <p className="font-medium text-gray-900">{formData.hospitalName}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Phone:</span>
                          <p className="font-medium text-gray-900">{formData.contactPhone}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Email:</span>
                          <p className="font-medium text-gray-900">{formData.contactEmail}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Location:</span>
                          <p className="font-medium text-gray-900">
                            {[formData.city, formData.state].filter(Boolean).join(', ') || 'N/A'}
                          </p>
                        </div>
                        {(formData.address || formData.notes) && (
                          <div className="col-span-2 space-y-2">
                            {formData.address && (
                              <div>
                                <span className="text-gray-500">Address:</span>
                                <p className="font-medium text-gray-900">{formData.address}</p>
                              </div>
                            )}
                            {formData.notes && (
                              <div>
                                <span className="text-gray-500">Notes:</span>
                                <p className="font-medium text-gray-900">{formData.notes}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Confirmation Checkbox */}
                  <label className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-blue-800">
                      I confirm that all information provided is accurate and I authorize LifeBlood to share this 
                      information with potential donors to facilitate blood donation.
                    </span>
                  </label>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                <Button
                  variant="outline"
                  onClick={currentStep > 1 ? handleBack : () => navigate(-1)}
                  disabled={isSubmitting}
                >
                  {currentStep > 1 ? <>Back</> : <>Cancel</>}
                </Button>

                {currentStep < 3 ? (
                  <Button onClick={handleNext}>
                    Continue
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    leftIcon={<Droplets className="w-5 h-5" />}
                    size="lg"
                  >
                    Submit Request
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
