import { ArrowRight, Home, Building2, Key, Palette, ClipboardList, FileText, CheckCircle, Users, Trophy, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import residentialImage from '@/assets/residential-building.jpg';
import commercialImage from '@/assets/commercial-building.jpg';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'residential-construction',
      icon: Home,
      title: 'Residential Construction',
      description: 'Custom homes, apartments, and residential developments built with precision, quality materials, and attention to every detail.',
      features: ['Custom Home Design', 'Luxury Apartments', 'Renovation Services', 'Landscaping'],
      image: residentialImage
    },
    {
      id: 'commercial-projects',
      icon: Building2,
      title: 'Commercial Projects',
      description: 'Office buildings, retail spaces, and commercial complexes designed for modern business requirements and efficiency.',
      features: ['Office Buildings', 'Retail Spaces', 'Industrial Facilities', 'Mixed-Use Developments'],
      image: commercialImage
    },
    {
      id: 'sales-leasing',
      icon: Key,
      title: 'Sales & Leasing',
      description: 'Comprehensive real estate services including property sales, leasing, and investment consultation for all your needs.',
      features: ['Property Sales', 'Rental Services', 'Investment Advice', 'Market Analysis'],
      image: residentialImage
    },
    {
      id: 'interior-design',
      icon: Palette,
      title: 'Interior Design',
      description: 'Professional interior design services that transform spaces into beautiful, functional environments reflecting your style.',
      features: ['Space Planning', 'Furniture Selection', 'Color Consultation', 'Project Management'],
      image: commercialImage
    },
    {
      id: 'project-management',
      icon: ClipboardList,
      title: 'Project Management',
      description: 'End-to-end project management ensuring timely delivery, quality control, and seamless coordination across all phases.',
      features: ['Timeline Management', 'Quality Control', 'Budget Oversight', 'Vendor Coordination'],
      image: residentialImage
    },
    {
      id: 'legal-documentation',
      icon: FileText,
      title: 'Legal Documentation',
      description: 'Complete legal support for all real estate transactions, permits, approvals, and regulatory compliance requirements.',
      features: ['Property Documentation', 'Permit Processing', 'Legal Compliance', 'Contract Management'],
      image: commercialImage
    }
  ];

  const metrics = [
    { icon: CheckCircle, value: '100+', label: 'Projects Completed' },
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Trophy, value: '15+', label: 'Years Experience' },
    { icon: Calendar, value: '24/7', label: 'Customer Support' }
  ];

  const whyChooseUs = [
    'Experienced team with proven track record',
    'Quality materials and construction standards',
    'Transparent pricing and timely delivery',
    'Comprehensive warranty on all projects',
    'Sustainable and eco-friendly practices',
    'Professional project management',
    'Customer satisfaction guarantee',
    'Post-completion support services'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-padding text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="heading-lg">Our Services</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From concept to completion, we provide comprehensive real estate and construction services 
              that exceed expectations and deliver exceptional value.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className="card-service group h-full flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-red">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                
                <ul className="space-y-2 mb-6 flex-grow">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="btn-ghost w-full group mt-auto"
                  onClick={() => navigate(`/services/${service.id}`)}
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="heading-md mb-6">Why Choose BCM Group?</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  With over 15 years of experience in the real estate and construction industry, 
                  we bring expertise, quality, and reliability to every project we undertake.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {whyChooseUs.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Metrics */}
            <div className="grid grid-cols-2 gap-6">
              {metrics.map((metric, index) => (
                <div 
                  key={metric.label}
                  className="text-center p-6 bg-card rounded-2xl shadow-medium hover:shadow-large transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <metric.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-padding">
          <div className="text-center bg-gradient-primary text-white rounded-3xl p-12 md:p-16">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl opacity-90">
                Let's discuss your vision and create something extraordinary together. 
                Our team is ready to bring your ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-primary hover:bg-gray-100 font-medium px-8 py-3 text-lg">
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-medium px-8 py-3 text-lg">
                  View Our Work
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;