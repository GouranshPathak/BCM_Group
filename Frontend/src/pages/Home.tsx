import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home as HomeIcon, Building2, Key, Palette, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import commercialImage from '@/assets/commercial-building.jpg';
import residentialImage from '@/assets/residential-building.jpg';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const services = [
    {
      icon: HomeIcon,
      title: 'Residential Construction',
      description: 'Custom homes and residential developments built to the highest standards of quality and craftsmanship.',
      image: residentialImage
    },
    {
      icon: Building2,
      title: 'Commercial Projects',
      description: 'Office buildings, retail spaces, and commercial complexes designed for modern business needs.',
      image: commercialImage
    },
    {
      icon: Key,
      title: 'Sales & Leasing',
      description: 'Comprehensive real estate services to help you find the perfect property for your needs.',
      image: residentialImage
    },
    {
      icon: Palette,
      title: 'Interior Design',
      description: 'Transform your space with our professional interior design and decoration services.',
      image: commercialImage
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Homeowner',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      quote: 'BCM Group exceeded our expectations in every way. Our dream home became a reality thanks to their exceptional craftsmanship and attention to detail.',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Business Owner',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      quote: 'The commercial space they built for our company is perfect. Professional service, on-time delivery, and excellent communication throughout the project.',
      rating: 5
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Property Investor',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      quote: 'Working with BCM Group on multiple investment properties has been a great experience. They understand the market and deliver quality results.',
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600">
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Building Dreams,<br />
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Delivering Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              Your trusted partner in real estate development and construction services. 
              Creating exceptional spaces that stand the test of time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link 
                to="/projects"
                className="inline-flex items-center justify-center bg-red-600 text-white hover:bg-red-700 font-medium px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View Our Projects
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/services"
                className="inline-flex items-center justify-center bg-white/10 text-white border border-white/20 hover:bg-white/20 font-medium px-8 py-4 rounded-xl text-lg transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-6">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From residential construction to commercial development, we offer comprehensive 
              real estate and construction services tailored to your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 p-8 hover:scale-105 group cursor-pointer h-full flex flex-col"
              >
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover rounded-xl"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-xl">
                      <service.icon className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed flex-1">{service.description}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center text-red-600 font-medium mt-6 hover:text-red-700 transition-colors duration-300"
                >
                  Learn More
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/services"
              className="inline-flex items-center justify-center bg-red-600 text-white hover:bg-red-700 font-medium px-8 py-3 rounded-xl transition-all duration-300 shadow-lg"
            >
              Explore All Services
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about working with BCM Group.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-3xl shadow-lg p-8 md:p-12">
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial ? 'bg-red-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-xl md:text-2xl font-medium text-gray-900 mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover shadow-lg"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/testimonials"
              className="inline-flex items-center justify-center bg-red-600 text-white hover:bg-red-700 font-medium px-8 py-3 rounded-xl transition-all duration-300 shadow-lg"
            >
              View All Testimonials
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;