import { useState } from 'react';
import { X, User, Mail, Phone, MapPin, Building, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface EnrollmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
}

const EnrollmentForm = ({ isOpen, onClose, projectName }: EnrollmentFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    interestedIn: projectName || '',
    budget: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/enquiry/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          interestedIn: formData.interestedIn,
          budget: formData.budget,
          message: formData.message,
          projectName: projectName // This comes from props
        })
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Enquiry Submitted Successfully!",
          description: "Thank you for your interest. We'll contact you within 24-48 hours.",
        });
        
        // Reset form and close
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          location: '',
          interestedIn: projectName || '',
          budget: '',
          message: ''
        });
        onClose();
      } else {
        toast({
          title: "Submission Failed",
          description: result.message || "Please try again later.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Network Error",
        description: "Please check your connection and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold">Project Enquiry</h2>
            <p className="text-muted-foreground mt-1">
              {projectName ? `Interested in ${projectName}` : 'Tell us about your requirements'}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-secondary"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center space-x-2">
                <User className="w-4 h-4 text-primary" />
                <span>Full Name *</span>
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                disabled={isSubmitting}
                className="focus:ring-primary"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>Email Address *</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
                className="focus:ring-primary"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>Phone Number *</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                required
                disabled={isSubmitting}
                className="focus:ring-primary"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Your Location</span>
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter your city/area"
                disabled={isSubmitting}
                className="focus:ring-primary"
              />
            </div>

            {/* Interested In */}
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-primary" />
                <span>Interested In</span>
              </Label>
              <Select
                value={formData.interestedIn}
                onValueChange={(value) => handleSelectChange('interestedIn', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className="focus:ring-primary">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Residential">Residential Projects</SelectItem>
                  <SelectItem value="Commercial">Commercial Projects</SelectItem>
                  <SelectItem value="Luxury Residential Complex">Luxury Residential Complex</SelectItem>
                  <SelectItem value="Skyline Business Tower">Skyline Business Tower</SelectItem>
                  <SelectItem value="Modern Urban Residences">Modern Urban Residences</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Budget Range */}
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <span>Budget Range</span>
              </Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => handleSelectChange('budget', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className="focus:ring-primary">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-50l">Under ₹50 Lakhs</SelectItem>
                  <SelectItem value="50l-1cr">₹50 Lakhs - ₹1 Crore</SelectItem>
                  <SelectItem value="1cr-2cr">₹1 - ₹2 Crores</SelectItem>
                  <SelectItem value="2cr-5cr">₹2 - ₹5 Crores</SelectItem>
                  <SelectItem value="above-5cr">Above ₹5 Crores</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span>Additional Message</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us more about your requirements, preferred location, timeline, etc."
              rows={4}
              disabled={isSubmitting}
              className="focus:ring-primary resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn-primary flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </Button>
          </div>
        </form>

        {/* Footer Note */}
        <div className="px-6 pb-6">
          <p className="text-sm text-muted-foreground text-center">
            Our team will review your application and contact you within 24-48 hours to discuss your requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentForm;
