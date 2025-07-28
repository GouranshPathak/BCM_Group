import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Building, ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import EnrollmentForm from '@/components/EnquiryForm';
import ProjectDetailsModal from '@/components/ProjectDetailsModal';
import residentialImage from '@/assets/residential-building.jpg';
import commercialImage from '@/assets/commercial-building.jpg';

const Projects = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<any>();
  const [featuredCarouselApi, setFeaturedCarouselApi] = useState<any>();
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedProjectDetails, setSelectedProjectDetails] = useState<any>(null);
  const [isProjectDetailsOpen, setIsProjectDetailsOpen] = useState(false);
  
  // ✅ Add refs to prevent multiple rapid clicks and handle timeouts
  const modalTimeoutRef = useRef<NodeJS.Timeout>();
  const clickTimeoutRef = useRef<NodeJS.Timeout>();

  const filters = ['All', 'Residential', 'Commercial', 'Ongoing', 'Completed'];

  const featuredProjects = [
    {
      id: 'luxury-residential-complex',
      title: 'Luxury Residential Complex',
      location: 'Downtown Business District',
      type: 'Residential',
      area: '2.5 acres',
      units: '120 Units',
      year: '2024',
      status: 'Ongoing',
      description: 'A premium residential development featuring modern apartments with world-class amenities, sustainable design, and prime location access.',
      image: residentialImage
    },
    {
      id: 'skyline-business-tower',
      title: 'Skyline Business Tower',
      location: 'Financial District',
      type: 'Commercial',
      area: '1.8 acres',
      units: '45 Floors',
      year: '2024',
      status: 'Ongoing',
      description: 'State-of-the-art commercial tower with premium office spaces, modern amenities, and sustainable architecture.',
      image: commercialImage
    },
    {
      id: 'modern-urban-residences',
      title: 'Modern Urban Residences',
      location: 'City Center',
      type: 'Residential',
      area: '3.2 acres',
      units: '200 Units',
      year: '2023',
      status: 'Completed',
      description: 'Contemporary residential complex with smart home features, community facilities, and eco-friendly design.',
      image: residentialImage
    }
  ];

  const projects = [
    {
      id: 'skyline-towers',
      title: 'Skyline Towers',
      location: 'City Center',
      type: 'Commercial',
      status: 'Completed',
      image: commercialImage,
      year: '2023',
      description: 'Modern office complex with premium facilities'
    },
    {
      id: 'green-valley-homes',
      title: 'Green Valley Homes',
      location: 'Suburban Area',
      type: 'Residential',
      status: 'Completed',
      image: residentialImage,
      year: '2023',
      description: 'Eco-friendly residential community'
    },
    {
      id: 'metro-shopping-plaza',
      title: 'Metro Shopping Plaza',
      location: 'Commercial District',
      type: 'Commercial',
      status: 'Ongoing',
      image: commercialImage,
      year: '2024',
      description: 'Large-scale retail and entertainment complex'
    },
    {
      id: 'riverside-apartments',
      title: 'Riverside Apartments',
      location: 'Riverside',
      type: 'Residential',
      status: 'Completed',
      image: residentialImage,
      year: '2022',
      description: 'Luxury apartments with river views'
    },
    {
      id: 'tech-park-building',
      title: 'Tech Park Building',
      location: 'Innovation District',
      type: 'Commercial',
      status: 'Ongoing',
      image: commercialImage,
      year: '2024',
      description: 'State-of-the-art technology office space'
    },
    {
      id: 'garden-estates',
      title: 'Garden Estates',
      location: 'Garden District',
      type: 'Residential',
      status: 'Completed',
      image: residentialImage,
      year: '2023',
      description: 'Premium villas with landscaped gardens'
    }
  ];

  const filteredProjects = projects.filter(project => 
    activeFilter === 'All' || 
    project.type === activeFilter || 
    project.status === activeFilter
  );

  const carouselProjects = [
    {
      title: 'Heritage Business Center',
      description: 'Restored historic building converted into modern office spaces while preserving architectural heritage.',
      image: commercialImage,
      location: 'Heritage District',
      type: 'Commercial',
      year: '2023',
      status: 'Completed',
      area: '1.2 acres',
      units: '85 Offices'
    },
    {
      title: 'Waterfront Condominiums',
      description: 'Luxury waterfront living with panoramic views, premium amenities, and direct marina access.',
      image: residentialImage,
      location: 'Marina Bay',
      type: 'Residential',
      year: '2024',
      status: 'Ongoing',
      area: '3.1 acres',
      units: '180 Units'
    },
    {
      title: 'Urban Lifestyle Mall',
      description: 'Contemporary shopping and entertainment complex with sustainable design and smart building features.',
      image: commercialImage,
      location: 'City Center',
      type: 'Commercial',
      year: '2024',
      status: 'Ongoing',
      area: '2.8 acres',
      units: '200 Stores'
    },
    {
      title: 'Eco Garden Residences',
      description: 'Green living spaces with rooftop gardens, solar panels, and eco-friendly construction materials.',
      image: residentialImage,
      location: 'Green Valley',
      type: 'Residential',
      year: '2023',
      status: 'Completed',
      area: '4.2 acres',
      units: '250 Units'
    }
  ];

  // ✅ Handle external script errors that might interfere with modal
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      if (event.message?.includes('multiVariateToggle') || 
          event.message?.includes('isInitialized') ||
          event.message?.includes('runtime.lastError')) {
        event.preventDefault();
        event.stopPropagation();
        console.warn('External script error prevented:', event.message);
        return false;
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason?.message?.includes('multiVariateToggle') ||
          event.reason?.message?.includes('runtime.lastError')) {
        console.warn('Promise rejection prevented:', event.reason);
        event.preventDefault();
      }
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Auto-scroll functionality for both carousels
  useEffect(() => {
    if (!carouselApi) return;

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [carouselApi]);

  useEffect(() => {
    if (!featuredCarouselApi) return;

    const interval = setInterval(() => {
      featuredCarouselApi.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [featuredCarouselApi]);

  // ✅ Enhanced card click handler with better protection
  const handleCardClick = (project: any, e: React.MouseEvent) => {
    // Prevent all event propagation immediately
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent?.stopImmediatePropagation?.();
    
    // Clear any existing timeouts
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    if (modalTimeoutRef.current) {
      clearTimeout(modalTimeoutRef.current);
    }
    
    console.log('Card clicked:', project.title);
    
    // Prevent rapid clicking
    if (isProjectDetailsOpen) {
      return;
    }
    
    // Set project details immediately
    setSelectedProjectDetails(project);
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      modalTimeoutRef.current = setTimeout(() => {
        setIsProjectDetailsOpen(true);
      }, 50);
    });
  };

  // ✅ Enhanced modal close handler with proper cleanup
  const handleModalClose = () => {
    console.log('Closing modal');
    
    // Clear any pending timeouts
    if (modalTimeoutRef.current) {
      clearTimeout(modalTimeoutRef.current);
    }
    
    // Close the modal first
    setIsProjectDetailsOpen(false);
    
    // Clear project details after animation completes
    setTimeout(() => {
      setSelectedProjectDetails(null);
    }, 200);
  };

  // ✅ Debug state changes (remove in production)
  useEffect(() => {
    console.log('Modal state changed:', { 
      isProjectDetailsOpen, 
      selectedProjectDetails: selectedProjectDetails?.title 
    });
  }, [isProjectDetailsOpen, selectedProjectDetails]);

  // ✅ Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (modalTimeoutRef.current) {
        clearTimeout(modalTimeoutRef.current);
      }
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Featured Projects Carousel */}
      <section className="section-padding bg-secondary/30">
        <div className="container-padding">
          <div className="text-center mb-16">
            <h1 className="heading-lg mb-6">Our Projects</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our portfolio of exceptional residential and commercial developments that showcase our commitment to quality and innovation.
            </p>
          </div>

          <Carousel 
            className="w-full max-w-7xl mx-auto"
            setApi={setFeaturedCarouselApi}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {featuredProjects.map((project, index) => (
                <CarouselItem key={`${project.id}-${index}`} className="pl-4 md:basis-1/1 lg:basis-1/1">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Project Image */}
                    <div className="relative">
                      <div className="relative overflow-hidden rounded-2xl shadow-large group">
                        <img 
                          src={project.image}
                          alt={project.title}
                          className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-6">
                      <div>
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                          Featured Project
                        </span>
                        <h2 className="heading-md mb-4">{project.title}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="font-medium">{project.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Building className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Type</p>
                            <p className="font-medium">{project.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Year</p>
                            <p className="font-medium">{project.year}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Filter className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Status</p>
                            <p className="font-medium">{project.status}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-4">
                        <span className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium">
                          {project.area}
                        </span>
                        <span className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium">
                          {project.units}
                        </span>
                      </div>

                      <Button 
                        className="btn-primary"
                        onClick={() => navigate(`/projects/${project.id}`)}
                      >
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </section>

      {/* Project Listings */}
      <section className="section-padding">
        <div className="container-padding">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <h2 className="heading-md mb-6 md:mb-0">All Projects</h2>
            
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-primary text-white shadow-red'
                      : 'bg-secondary hover:bg-muted text-foreground'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="card-elevated overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-500"
                onClick={(e) => handleCardClick(project, e)}
                onMouseDown={(e) => e.preventDefault()}
                style={{ 
                  userSelect: 'none',
                  WebkitTouchCallout: 'none',
                  WebkitUserSelect: 'none'
                }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-sm bg-dark/50 px-2 py-1 rounded">
                      {project.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <div className="flex items-center space-x-2 text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{project.year}</span>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Layout */}
      <section className="section-padding bg-secondary/30">
        <div className="container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-md mb-6">More Featured Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore more of our exceptional projects that demonstrate our expertise across various sectors.
            </p>
          </div>

          <div className="space-y-24">
            {carouselProjects.map((project, index) => (
              <div key={project.title} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Alternate layout based on index */}
                {index % 2 === 0 ? (
                  <>
                    {/* Project Image on Left */}
                    <div>
                      <div className="relative overflow-hidden rounded-2xl shadow-large group">
                        <img 
                          src={project.image}
                          alt={project.title}
                          className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                      </div>
                    </div>
                    
                    {/* Project Details on Right */}
                    <div className="space-y-6">
                      <div>
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                          Featured Project
                        </span>
                        <h3 className="heading-md mb-4">{project.title}</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="font-medium">{project.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Building className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Type</p>
                            <p className="font-medium">{project.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Year</p>
                            <p className="font-medium">{project.year}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Filter className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Status</p>
                            <p className="font-medium">{project.status}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-4">
                        <span className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium">
                          {project.area}
                        </span>
                        <span className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium">
                          {project.units}
                        </span>
                      </div>

                      <Button 
                        className="btn-primary"
                        onClick={() => {
                          setSelectedProject(project.title);
                          setIsEnrollmentOpen(true);
                        }}
                      >
                        Enquire Now
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Project Details on Left */}
                    <div className="space-y-6">
                      <div>
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                          Featured Project
                        </span>
                        <h3 className="heading-md mb-4">{project.title}</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="font-medium">{project.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Building className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Type</p>
                            <p className="font-medium">{project.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Year</p>
                            <p className="font-medium">{project.year}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Filter className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Status</p>
                            <p className="font-medium">{project.status}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-4">
                        <span className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium">
                          {project.area}
                        </span>
                        <span className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium">
                          {project.units}
                        </span>
                      </div>

                      <Button 
                        className="btn-primary"
                        onClick={() => {
                          setSelectedProject(project.title);
                          setIsEnrollmentOpen(true);
                        }}
                      >
                        Enquire Now
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                    
                    {/* Project Image on Right */}
                    <div>
                      <div className="relative overflow-hidden rounded-2xl shadow-large group">
                        <img 
                          src={project.image}
                          alt={project.title}
                          className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProjectDetails}
        isOpen={isProjectDetailsOpen}
        onClose={handleModalClose}
        onEnrollment={(projectTitle) => {
          setSelectedProject(projectTitle);
          setIsEnrollmentOpen(true);
        }}
      />

      {/* Enrollment Form Modal */}
      <EnrollmentForm 
        isOpen={isEnrollmentOpen}
        onClose={() => setIsEnrollmentOpen(false)}
        projectName={selectedProject}
      />
    </div>
  );
};

export default Projects;
