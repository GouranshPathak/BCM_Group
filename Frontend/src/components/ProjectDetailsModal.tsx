import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowLeft, MapPin, Calendar, Building, Home, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Project {
  id: string;
  title: string;
  location: string;
  type: 'Residential' | 'Commercial';
  status: 'Ongoing' | 'Completed';
  image: string;
  year: string;
  description: string;
}

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onEnrollment: (projectTitle: string) => void;
}

const ProjectDetailsModal = ({ project, isOpen, onClose, onEnrollment }: ProjectDetailsModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);  

  // ✅ Enhanced open/close handling with proper transitions
  useEffect(() => {
    if (isOpen && project) {
      setIsVisible(true);
      setHasError(false);
      // Small delay to trigger animation
      const animationTimer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(animationTimer);
    } else if (!isOpen) {
      setIsAnimating(false);
      // Wait for animation to complete before hiding
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(hideTimer);
    }
  }, [isOpen, project]);

  // ✅ Enhanced escape key and body scroll handling
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isClosing) {
        e.preventDefault();
        handleClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, isClosing]);

  // ✅ Error boundary protection
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message?.includes('multiVariateToggle') || 
          event.message?.includes('isInitialized') ||
          event.message?.includes('runtime.lastError')) {
        console.warn('External script error in modal prevented:', event.message);
        // Don't let external errors close the modal
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason?.message?.includes('multiVariateToggle')) {
        console.warn('Promise rejection in modal prevented:', event.reason);
        event.preventDefault();
      }
    };

    if (isOpen) {
      window.addEventListener('error', handleError);
      window.addEventListener('unhandledrejection', handleUnhandledRejection);
      
      return () => {
        window.removeEventListener('error', handleError);
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      };
    }
  }, [isOpen]);

  // ✅ Debug logging (remove in production)
  useEffect(() => {
    console.log('Modal state:', { 
      isOpen, 
      isVisible, 
      isAnimating, 
      isClosing, 
      hasProject: !!project, 
      projectTitle: project?.title 
    });
  }, [isOpen, isVisible, isAnimating, isClosing, project]);

  // ✅ Prevent double clicks and handle closing properly
  const handleClose = () => {
    if (isClosing) return;
    
    console.log('Modal closing initiated');
    setIsClosing(true);
    onClose();
  };

  // ✅ Enhanced backdrop click handler
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && isAnimating && !isClosing) {
      e.preventDefault();
      e.stopPropagation();
      handleClose();
    }
  };

      const handleDownloadBrochure = async () => {
      if (isClosing || isDownloading || !project) return;
      
      setIsDownloading(true);
      
      // Map project IDs to their corresponding PDF files
      const brochureMap: { [key: string]: string } = {
        'skyline-towers': '/lovable-uploads/SkylineTowers.pdf',
        'green-valley-homes': '/lovable-uploads/GreenValleyHomes.pdf',
        'metro-shopping-plaza': '/lovable-uploads/MetroShoppingPlaza.pdf',
        'riverside-apartments': '/lovable-uploads/RiversideApartments.pdf',
        'garden-estates': '/lovable-uploads/GardenEstates.pdf',
        'tech-park-building': '/lovable-uploads/TechPark.pdf',
        // Add fallbacks for featured projects
        'luxury-residential-complex': '/lovable-uploads/GreenValleyHomes.pdf',
        'skyline-business-tower': '/lovable-uploads/SkylineTowers.pdf',
        'modern-urban-residences': '/lovable-uploads/RiversideApartments.pdf',
      };

      const pdfUrl = brochureMap[project.id];
      
      if (pdfUrl) {
        try {
          // Check if file exists
          const response = await fetch(pdfUrl, { method: 'HEAD' });
          
          if (response.ok) {
            // Create download link
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = `${project.title.replace(/[^a-zA-Z0-9]/g, '_')}_Brochure.pdf`;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            throw new Error('PDF file not found');
          }
        } catch (error) {
          console.error('Error downloading brochure:', error);
          alert('Unable to download brochure at the moment. Please try again later.');
        }
      } else {
        alert('Brochure for this project will be available soon. Please contact us for more information.');
      }
      
      setIsDownloading(false);
    };

  // ✅ Don't render anything if not visible
  if (!isVisible || !project) {
    return null;
  }

  // ✅ Error fallback UI
  if (hasError) {
    const errorContent = (
      <div className="fixed inset-0 z-50 bg-dark/80 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-background p-6 rounded-lg shadow-xl max-w-md mx-4">
          <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
          <p className="text-muted-foreground mb-4">
            There was an error loading the project details. Please try again.
          </p>
          <Button onClick={handleClose} className="w-full">
            Close
          </Button>
        </div>
      </div>
    );
    return createPortal(errorContent, document.body);
  }

  const projectDetails = {
    area: project.type === 'Residential' ? '2.8 acres' : '1.5 acres',
    units: project.type === 'Residential' ? '150 units' : '40 floors',
    price: project.type === 'Residential' ? 'Starting from $250K' : 'From $180/sq ft',
    amenities: project.type === 'Residential' 
      ? ['Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden', 'Clubhouse']
      : ['Conference Rooms', 'Parking', 'Security', 'Elevators', 'Reception', 'Cafeteria'],
    features: project.type === 'Residential'
      ? ['Smart Home Technology', 'Energy Efficient', 'Modern Design', 'Prime Location']
      : ['Modern Architecture', 'HVAC Systems', 'High-Speed Internet', 'Professional Environment']
  };

  const modalContent = (
    <div 
      className={`fixed inset-0 z-50 transition-all duration-300 ease-out ${
        isAnimating && !isClosing
          ? 'bg-dark/80 backdrop-blur-sm opacity-100' 
          : 'bg-transparent opacity-0'
      }`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{ 
        pointerEvents: isAnimating && !isClosing ? 'auto' : 'none'
      }}
    >
      <div 
        className={`fixed inset-4 md:inset-8 bg-background rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-out ${
          isAnimating && !isClosing
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-95 opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{ 
          pointerEvents: 'auto'
        }}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="relative h-64 md:h-80">
            <img 
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
            
            {/* Header Controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              <Button 
                variant="outline" 
                size="icon"
                className="bg-background/10 border-white/20 text-white hover:bg-background/20 transition-colors"
                onClick={handleClose}
                disabled={isClosing}
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="bg-background/10 border-white/20 text-white hover:bg-background/20 transition-colors"
                onClick={handleClose}
                disabled={isClosing}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Project Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>
                  {project.status}
                </Badge>
                <Badge variant="outline" className="border-white/20 text-white">
                  {project.type}
                </Badge>
              </div>
              <h1 
                id="modal-title"
                className="text-3xl md:text-4xl font-bold mb-2"
              >
                {project.title}
              </h1>
              <div className="flex items-center text-white/90">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{project.location}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">About This Project</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {project.description}. This exceptional development represents our commitment to quality construction, innovative design, and creating spaces that enhance the lives of those who inhabit them.
                </p>
              </div>

              {/* Key Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <Building className="w-8 h-8 text-primary mb-3" />
                  <p className="text-sm text-muted-foreground">Total Area</p>
                  <p className="text-lg font-semibold">{projectDetails.area}</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <Home className="w-8 h-8 text-primary mb-3" />
                  <p className="text-sm text-muted-foreground">Units/Floors</p>
                  <p className="text-lg font-semibold">{projectDetails.units}</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <Calendar className="w-8 h-8 text-primary mb-3" />
                  <p className="text-sm text-muted-foreground">Completion</p>
                  <p className="text-lg font-semibold">{project.year}</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <DollarSign className="w-8 h-8 text-primary mb-3" />
                  <p className="text-sm text-muted-foreground">Pricing</p>
                  <p className="text-lg font-semibold">{projectDetails.price}</p>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Amenities & Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {projectDetails.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2 p-3 bg-secondary/20 rounded-lg">
                      <Users className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {projectDetails.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2 p-3 bg-secondary/20 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button 
                  className="btn-primary flex-1"
                  onClick={() => {
                    if (!isClosing) {
                      onEnrollment(project.title);
                      handleClose();
                    }
                  }}
                  disabled={isClosing}
                >
                  Enquire About This Project
                </Button>
                <Button 
                  className="btn-primary flex-1" 
                  onClick={handleDownloadBrochure}
                  disabled={isClosing || isDownloading}
                >
                  {isDownloading ? 'Downloading...' : 'Download Brochure'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ✅ Render in portal to avoid DOM conflicts
  return createPortal(modalContent, document.body);
};

export default ProjectDetailsModal;
