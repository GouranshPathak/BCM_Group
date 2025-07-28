import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 6;

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Homeowner',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      quote: 'BCM Group exceeded our expectations in every way. Our dream home became a reality thanks to their exceptional craftsmanship and attention to detail. The team was professional, responsive, and delivered exactly what they promised.',
      rating: 5,
      project: 'Custom Family Home'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Business Owner',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      quote: 'The commercial space they built for our company is perfect. Professional service, on-time delivery, and excellent communication throughout the project. I would highly recommend BCM Group for any commercial construction needs.',
      rating: 5,
      project: 'Office Building'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Property Investor',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      quote: 'Working with BCM Group on multiple investment properties has been a great experience. They understand the market and deliver quality results that maximize rental potential and property value.',
      rating: 5,
      project: 'Residential Complex'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Restaurant Owner',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      quote: 'BCM Group transformed our restaurant space beautifully. Their interior design team created an ambiance that perfectly matches our brand, and the construction quality is outstanding.',
      rating: 5,
      project: 'Restaurant Interior'
    },
    {
      id: 5,
      name: 'Lisa Park',
      role: 'Retail Manager',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      quote: 'The retail space they designed and built for us has significantly improved our customer experience. The layout is perfect, and the attention to detail in the finishing work is impressive.',
      rating: 5,
      project: 'Retail Store'
    },
    {
      id: 6,
      name: 'Robert Kim',
      role: 'Apartment Owner',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      quote: 'BCM Group helped us renovate our apartment building, and the results exceeded our expectations. The value of our property increased significantly, and tenants love the modern updates.',
      rating: 5,
      project: 'Apartment Renovation'
    },
    {
      id: 7,
      name: 'Amanda White',
      role: 'Homeowner',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      quote: 'From initial consultation to final walkthrough, BCM Group provided exceptional service. Our new home is everything we dreamed of and more. The quality of work is simply outstanding.',
      rating: 5,
      project: 'Luxury Home'
    },
    {
      id: 8,
      name: 'James Wilson',
      role: 'Office Manager',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
      quote: 'Our new office space has improved productivity and employee satisfaction dramatically. BCM Group understood our needs and delivered a workspace that perfectly fits our company culture.',
      rating: 5,
      project: 'Corporate Office'
    },
    {
      id: 9,
      name: 'Maria Garcia',
      role: 'Property Developer',
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
      quote: 'As a developer, I have worked with many construction companies. BCM Group stands out for their professionalism, quality work, and ability to meet tight deadlines consistently.',
      rating: 5,
      project: 'Mixed-Use Development'
    }
  ];

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  const currentTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-padding text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="heading-lg">Client Testimonials</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Don't just take our word for it. Here's what our satisfied clients have to say 
              about their experience working with BCM Group.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding">
        <div className="container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentTestimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="card-elevated p-8 hover:scale-105 transition-all duration-500 h-full flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary/20" />
                </div>
                
                <blockquote className="text-foreground mb-6 leading-relaxed flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center space-x-4 mt-auto">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover shadow-medium"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-primary font-medium">{testimonial.project}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={prevPage}
                className="w-12 h-12 rounded-full bg-secondary hover:bg-muted transition-colors duration-300 flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentPage ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                className="w-12 h-12 rounded-full bg-secondary hover:bg-muted transition-colors duration-300 flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-padding">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-4">
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="text-lg font-medium">Happy Clients</div>
              <div className="text-sm text-muted-foreground">Satisfied customers across all our services</div>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-primary">4.9/5</div>
              <div className="text-lg font-medium">Average Rating</div>
              <div className="text-sm text-muted-foreground">Based on client feedback and reviews</div>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-primary">98%</div>
              <div className="text-lg font-medium">Client Retention</div>
              <div className="text-sm text-muted-foreground">Clients who return for additional projects</div>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-lg font-medium">On-Time Delivery</div>
              <div className="text-sm text-muted-foreground">Projects completed within agreed timelines</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;