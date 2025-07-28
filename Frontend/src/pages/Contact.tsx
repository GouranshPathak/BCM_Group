import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        alert('Message sent successfully! We\'ll get back to you within 24 hours.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        alert(`Failed to send message: ${result.message}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Office',
      details: ['123 Business Avenue', 'City Center, State 12345'],
      link: '#'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568'],
      link: 'tel:+15551234567'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@bcmgroup.com', 'support@bcmgroup.com'],
      link: 'mailto:info@bcmgroup.com'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Mon - Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 4:00 PM'],
      link: '#'
    }
  ];

  const services = [
    'Residential Construction',
    'Commercial Projects',
    'Sales & Leasing',
    'Interior Design',
    'Project Management',
    'Legal Documentation',
    'Other'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-padding text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="heading-lg">Contact Us</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ready to start your project? Get in touch with us today for a free consultation. 
              We're here to answer your questions and help bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding">
        <div className="container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div 
                key={info.title}
                className="text-center space-y-6 p-6 bg-card rounded-2xl shadow-medium hover:shadow-large transition-all duration-500 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <info.icon className="w-8 h-8 text-primary group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding bg-secondary/30">
        <div className="container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="heading-md mb-6">Send Us a Message</h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      disabled={isSubmitting}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      disabled={isSubmitting}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      disabled={isSubmitting}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium mb-2">
                      Service Type *
                    </label>
                    <Select onValueChange={handleSelectChange} required disabled={isSubmitting}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project..."
                    rows={6}
                    disabled={isSubmitting}
                    className="w-full"
                  />
                </div>

                <Button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </div>

            {/* Map */}
            <div className="space-y-8">
              <div>
                <h2 className="heading-md mb-6">Find Our Office</h2>
                <p className="text-lg text-muted-foreground">
                  Visit us at our headquarters for in-person consultations and project discussions.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-2xl shadow-large h-96">
                {/* Google Maps Embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.3!2d-74.0059!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a197c06b7cb%3A0x40a06c78f79e5de6!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BCM Group Office Location"
                ></iframe>
              </div>

              <div className="bg-card p-6 rounded-2xl shadow-medium space-y-4">
                <h3 className="text-lg font-semibold">Additional Information</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Free consultation for all new projects</li>
                  <li>• 24/7 emergency support for existing clients</li>
                  <li>• Parking available on-site</li>
                  <li>• Wheelchair accessible building</li>
                  <li>• Public transportation nearby</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-md mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions? Here are some common inquiries we receive from our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-2xl shadow-medium">
                <h3 className="font-semibold mb-3">How long does a typical project take?</h3>
                <p className="text-muted-foreground text-sm">
                  Project timelines vary based on scope and complexity. Residential projects typically take 6-12 months, while commercial projects may take 12-24 months.
                </p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-medium">
                <h3 className="font-semibold mb-3">Do you provide free consultations?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we offer free initial consultations to discuss your project requirements and provide preliminary estimates.
                </p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-medium">
                <h3 className="font-semibold mb-3">What areas do you serve?</h3>
                <p className="text-muted-foreground text-sm">
                  We primarily serve the metropolitan area and surrounding regions. Contact us to confirm service availability in your location.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-2xl shadow-medium">
                <h3 className="font-semibold mb-3">Do you handle permits and approvals?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we handle all necessary permits, approvals, and regulatory compliance as part of our comprehensive project management service.
                </p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-medium">
                <h3 className="font-semibold mb-3">What payment options do you accept?</h3>
                <p className="text-muted-foreground text-sm">
                  We accept various payment methods and offer flexible payment schedules aligned with project milestones.
                </p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-medium">
                <h3 className="font-semibold mb-3">Do you provide warranties?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we provide comprehensive warranties on all our work and use materials with manufacturer warranties.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a href="/faq" className="btn-primary inline-flex items-center">
              View All FAQs
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
