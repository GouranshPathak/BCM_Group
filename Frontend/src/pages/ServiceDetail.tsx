import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Mail, Phone, MapPin, Users, Calendar, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import residentialImage from '@/assets/residential-building.jpg';
import commercialImage from '@/assets/commercial-building.jpg';
import heroImage from '@/assets/hero-construction.jpg';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services = {
    'residential-construction': {
      title: 'Residential Construction',
      subtitle: 'Building Your Dream Home with Precision and Care',
      heroImage: residentialImage,
      description: [
        'Our residential construction services combine traditional craftsmanship with modern building techniques to create homes that stand the test of time. We specialize in custom home design, luxury apartments, and comprehensive renovation services that transform your vision into reality.',
        'What sets us apart is our commitment to quality materials, attention to detail, and personalized service. From the initial consultation to the final walkthrough, our experienced team ensures every aspect of your project meets the highest standards.',
        'We understand that building a home is one of life\'s biggest investments. That\'s why we work closely with you throughout the entire process, maintaining transparent communication and delivering exceptional value at every stage.'
      ],
      features: [
        { icon: CheckCircle, title: 'Custom Home Design', description: 'Tailored architectural plans that reflect your lifestyle' },
        { icon: CheckCircle, title: 'Luxury Apartments', description: 'Premium multi-unit residential developments' },
        { icon: CheckCircle, title: 'Renovation Services', description: 'Complete home makeovers and upgrades' },
        { icon: CheckCircle, title: 'Landscaping', description: 'Beautiful outdoor spaces and garden design' },
        { icon: CheckCircle, title: 'Energy Efficiency', description: 'Sustainable building practices and green technology' },
        { icon: CheckCircle, title: 'Quality Materials', description: 'Premium construction materials and finishes' }
      ],
      relatedProjects: [
        { title: 'Luxury Villa Complex', image: residentialImage, description: 'Modern 5-bedroom villas with contemporary design' },
        { title: 'Garden Apartments', image: commercialImage, description: 'Eco-friendly residential complex with green spaces' },
        { title: 'Heritage Home Restoration', image: heroImage, description: 'Restoration of historic property with modern amenities' }
      ]
    },
    'commercial-projects': {
      title: 'Commercial Projects',
      subtitle: 'Modern Business Spaces Built for Success',
      heroImage: commercialImage,
      description: [
        'Our commercial construction expertise spans office buildings, retail spaces, and mixed-use developments. We create functional, efficient, and visually striking commercial properties that enhance business operations and attract customers.',
        'Every commercial project we undertake is designed with the end user in mind. We consider workflow optimization, customer experience, and future scalability to ensure your investment delivers long-term value.',
        'From concept to completion, our team manages every aspect of commercial construction, including permits, inspections, and regulatory compliance, so you can focus on running your business.'
      ],
      features: [
        { icon: CheckCircle, title: 'Office Buildings', description: 'Modern workspaces designed for productivity' },
        { icon: CheckCircle, title: 'Retail Spaces', description: 'Customer-focused retail environments' },
        { icon: CheckCircle, title: 'Industrial Facilities', description: 'Efficient manufacturing and warehouse spaces' },
        { icon: CheckCircle, title: 'Mixed-Use Developments', description: 'Integrated commercial and residential complexes' },
        { icon: CheckCircle, title: 'HVAC Systems', description: 'Advanced climate control and air quality management' },
        { icon: CheckCircle, title: 'Security Integration', description: 'Comprehensive security and access control systems' }
      ],
      relatedProjects: [
        { title: 'Tech Hub Office', image: commercialImage, description: 'Modern co-working space with flexible layouts' },
        { title: 'Shopping Complex', image: residentialImage, description: 'Multi-level retail center with parking facilities' },
        { title: 'Business Park', image: heroImage, description: 'Corporate campus with multiple office buildings' }
      ]
    },
    'sales-leasing': {
      title: 'Sales & Leasing',
      subtitle: 'Your Trusted Real Estate Partner',
      heroImage: heroImage,
      description: [
        'Our comprehensive real estate services cover property sales, leasing, and investment consultation. With deep market knowledge and extensive networks, we help clients make informed decisions and achieve their real estate goals.',
        'Whether you\'re buying your first home, expanding your business, or building an investment portfolio, our experienced team provides personalized guidance and support throughout the entire process.',
        'We leverage advanced market analysis tools and maintain strong relationships with financial institutions to ensure you get the best deals and terms for your real estate transactions.'
      ],
      features: [
        { icon: CheckCircle, title: 'Property Sales', description: 'Expert guidance for buying and selling properties' },
        { icon: CheckCircle, title: 'Rental Services', description: 'Comprehensive leasing and property management' },
        { icon: CheckCircle, title: 'Investment Advice', description: 'Strategic consultation for real estate investments' },
        { icon: CheckCircle, title: 'Market Analysis', description: 'Detailed market research and valuation services' },
        { icon: CheckCircle, title: 'Legal Support', description: 'Complete documentation and legal compliance' },
        { icon: CheckCircle, title: 'Financial Planning', description: 'Mortgage assistance and financing options' }
      ],
      relatedProjects: [
        { title: 'Residential Portfolio', image: residentialImage, description: 'Successfully sold 50+ luxury homes this year' },
        { title: 'Commercial Leasing', image: commercialImage, description: 'Managed leasing for major office complexes' },
        { title: 'Investment Properties', image: heroImage, description: 'High-return investment opportunities for clients' }
      ]
    },
    'interior-design': {
      title: 'Interior Design',
      subtitle: 'Transform Your Space with Professional Design',
      heroImage: residentialImage,
      description: [
        'Our interior design team creates beautiful, functional spaces that reflect your personal style and enhance your daily life. From concept development to final installation, we handle every detail of your interior transformation.',
        'We believe that great design is about more than just aesthetics – it\'s about creating environments that improve how you live and work. Our designs balance form and function to deliver spaces that are both beautiful and practical.',
        'Using the latest design trends, premium materials, and innovative solutions, we transform ordinary spaces into extraordinary environments that exceed your expectations.'
      ],
      features: [
        { icon: CheckCircle, title: 'Space Planning', description: 'Optimal layout design for maximum functionality' },
        { icon: CheckCircle, title: 'Furniture Selection', description: 'Curated furniture and decor pieces' },
        { icon: CheckCircle, title: 'Color Consultation', description: 'Professional color schemes and palettes' },
        { icon: CheckCircle, title: 'Project Management', description: 'Complete oversight from design to installation' },
        { icon: CheckCircle, title: 'Lighting Design', description: 'Ambient, task, and accent lighting solutions' },
        { icon: CheckCircle, title: 'Custom Solutions', description: 'Bespoke furniture and built-in storage' }
      ],
      relatedProjects: [
        { title: 'Modern Penthouse', image: residentialImage, description: 'Luxury interior with panoramic city views' },
        { title: 'Corporate Office', image: commercialImage, description: 'Professional workspace with brand integration' },
        { title: 'Boutique Hotel', image: heroImage, description: 'Elegant hospitality interior design' }
      ]
    },
    'project-management': {
      title: 'Project Management',
      subtitle: 'Seamless Coordination from Start to Finish',
      heroImage: commercialImage,
      description: [
        'Our project management services ensure your construction or renovation project runs smoothly from conception to completion. We coordinate all aspects of the project, manage timelines, and maintain quality standards throughout.',
        'With our systematic approach and experienced project managers, we minimize delays, control costs, and ensure all work meets our high-quality standards. Regular progress reports keep you informed every step of the way.',
        'From permit acquisition to final inspections, we handle all the complexities of project coordination so you can focus on your business or enjoy the excitement of seeing your vision come to life.'
      ],
      features: [
        { icon: CheckCircle, title: 'Timeline Management', description: 'Detailed scheduling and milestone tracking' },
        { icon: CheckCircle, title: 'Quality Control', description: 'Regular inspections and quality assurance' },
        { icon: CheckCircle, title: 'Budget Oversight', description: 'Cost management and financial reporting' },
        { icon: CheckCircle, title: 'Vendor Coordination', description: 'Managing subcontractors and suppliers' },
        { icon: CheckCircle, title: 'Risk Management', description: 'Identifying and mitigating project risks' },
        { icon: CheckCircle, title: 'Communication', description: 'Regular updates and stakeholder meetings' }
      ],
      relatedProjects: [
        { title: 'Hospital Expansion', image: commercialImage, description: 'Major healthcare facility construction project' },
        { title: 'School Renovation', image: residentialImage, description: 'Complete modernization of educational facilities' },
        { title: 'Mixed-Use Complex', image: heroImage, description: 'Large-scale commercial and residential development' }
      ]
    },
    'legal-documentation': {
      title: 'Legal Documentation',
      subtitle: 'Complete Legal Support for All Real Estate Needs',
      heroImage: heroImage,
      description: [
        'Our legal documentation services ensure all your real estate transactions and construction projects comply with local regulations and legal requirements. We handle everything from permits to contracts.',
        'With our experienced legal team and deep understanding of real estate law, we protect your interests and ensure smooth transactions. We stay updated with changing regulations to provide accurate guidance.',
        'From initial documentation to final approvals, we manage all legal aspects of your project, giving you peace of mind and allowing you to focus on your goals.'
      ],
      features: [
        { icon: CheckCircle, title: 'Property Documentation', description: 'Complete legal paperwork and title verification' },
        { icon: CheckCircle, title: 'Permit Processing', description: 'Building permits and regulatory approvals' },
        { icon: CheckCircle, title: 'Legal Compliance', description: 'Ensuring adherence to all local regulations' },
        { icon: CheckCircle, title: 'Contract Management', description: 'Drafting and reviewing all project contracts' },
        { icon: CheckCircle, title: 'Due Diligence', description: 'Comprehensive property and legal research' },
        { icon: CheckCircle, title: 'Dispute Resolution', description: 'Legal support for any issues that arise' }
      ],
      relatedProjects: [
        { title: 'Commercial Acquisition', image: commercialImage, description: 'Legal support for major property acquisition' },
        { title: 'Development Permits', image: residentialImage, description: 'Secured permits for large residential project' },
        { title: 'Contract Negotiations', image: heroImage, description: 'Successful negotiations for complex development deal' }
      ]
    }
  };

  const currentService = services[serviceId as keyof typeof services];

  // Updated form state to include service field with auto-selection
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: currentService?.title || '', // Auto-select current service
    message: ''
  });

  if (!currentService) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Service Not Found</h1>
          <p className="text-muted-foreground">The requested service could not be found.</p>
          <Button onClick={() => navigate('/services')}>
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Services
          </Button>
        </div>
      </div>
    );
  }

  const whyChooseUs = [
    { icon: Users, title: 'Expert Team', description: 'Experienced professionals dedicated to excellence' },
    { icon: Trophy, title: 'Proven Track Record', description: '100+ successful projects and satisfied clients' },
    { icon: Calendar, title: 'Timely Delivery', description: 'On-time completion with quality guarantees' },
    { icon: CheckCircle, title: 'Quality Assurance', description: 'Rigorous quality control and testing processes' }
  ];

  // Updated to handle select element as well
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
    setSubmitStatus('idle');

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
        setSubmitStatus('success');
        alert(`Thank you for your interest in ${formData.service}! We'll get back to you within 24 hours to discuss your project requirements.`);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: currentService?.title || '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        alert(`Failed to send message: ${result.message}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('error');
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img 
          src={currentService.heroImage} 
          alt={currentService.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 to-dark/40"></div>
        <div className="absolute inset-0 flex items-center">
        {/* Back button with responsive positioning */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/services')}
          className="absolute top-4 left-4 md:top-6 md:left-6 text-white hover:bg-white/20 z-10"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Services
        </Button>
        
        <div className="container-padding">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {currentService.title}
            </h1>
            <p className="text-xl text-white/90">
              {currentService.subtitle}
            </p>
          </div>
        </div>
      </div>
      </section>

      {/* Detailed Description */}
      <section className="section-padding">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="heading-md">About This Service</h2>
            {currentService.description.map((paragraph, index) => (
              <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Features/Offerings */}
      <section className="section-padding bg-secondary/30">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-md mb-4">What We Offer</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions tailored to your specific needs and requirements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentService.features.map((feature, index) => (
              <Card key={index} className="card-elevated">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="section-padding">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-md mb-4">Related Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See some of our recent work in this service area
            </p>
          </div>

          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {currentService.relatedProjects.map((project, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="card-elevated overflow-hidden">
                    <div className="relative">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground">{project.description}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-secondary/30">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-md mb-4">Why Choose BCM Group?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the difference that expertise and dedication make
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Contact Form */}
      <section className="section-padding">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-md mb-4">Get Started Today</h2>
              <p className="text-lg text-muted-foreground">
                Ready to begin your project? Contact us for a free consultation and detailed quote.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form - Updated with backend integration */}
              <Card className="card-elevated">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>
                  
                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm">
                        ✅ Message sent successfully! We'll contact you within 24 hours.
                      </p>
                    </div>
                  )}
                  
                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">
                        ❌ Failed to send message. Please try again.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Input
                        name="phone"
                        placeholder="Your Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    {/* Service Selection Field */}
                    <div>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                        required
                        disabled={isSubmitting}
                      >
                        <option value="">Select a Service *</option>
                        {Object.entries(services).map(([key, service]) => (
                          <option key={key} value={service.title}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Tell us about your project requirements... *"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">info@bcmgroup.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-muted-foreground">123 Business St, City, State 12345</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service-Specific Information */}
                <div className="bg-primary/5 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3">About {currentService.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get expert consultation for your {currentService.title.toLowerCase()} needs.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Free initial consultation</li>
                    <li>• Detailed project proposal</li>
                    <li>• Competitive pricing</li>
                    <li>• Professional team</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
