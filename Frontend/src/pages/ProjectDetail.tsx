import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { ArrowLeft, Calendar, MapPin, Building, Users, ArrowRight } from 'lucide-react';
import EnrollmentForm from '@/components/EnquiryForm';

// ✅ Updated project data with all missing projects
const projectsData = {
  'skyline-residences': {
    id: 'skyline-residences',
    title: 'Skyline Residences',
    location: 'Downtown Mumbai',
    type: 'Residential',
    status: 'Completed',
    year: '2023',
    heroImage: '/src/assets/residential-building.jpg',
    description: `Skyline Residences represents the pinnacle of luxury living in the heart of Downtown Mumbai. This prestigious development offers unparalleled views of the city skyline and Arabian Sea, combining modern architecture with timeless elegance.

    Our commitment to excellence is evident in every detail, from the premium finishes to the world-class amenities. Each residence is thoughtfully designed to maximize natural light and ventilation, creating spaces that are both beautiful and functional.

    The development features state-of-the-art security systems, high-speed elevators, and smart home integration, ensuring residents enjoy the finest in modern convenience and peace of mind.`,
    gallery: [
      '/src/assets/residential-building.jpg',
      '/src/assets/commercial-building.jpg',
      '/src/assets/hero-construction.jpg'
    ],
    keyFacts: [
      { label: 'Total Area', value: '2.5 Million sq ft', icon: Building },
      { label: 'Units', value: '450 Apartments', icon: Users },
      { label: 'Completion', value: 'December 2023', icon: Calendar },
      { label: 'Location', value: 'Downtown Mumbai', icon: MapPin }
    ],
    amenities: [
      'Swimming Pool', 'Fitness Center', '24/7 Security', 'Parking',
      'Garden Area', 'Children\'s Play Area', 'Community Hall', 'Power Backup'
    ]
  },
  'metro-plaza': {
    id: 'metro-plaza',
    title: 'Metro Plaza',
    location: 'Business District, Delhi',
    type: 'Commercial',
    status: 'Ongoing',
    year: '2024',
    heroImage: '/src/assets/commercial-building.jpg',
    description: `Metro Plaza is set to become Delhi's premier commercial destination, strategically located in the heart of the business district. This iconic development will house multinational corporations, innovative startups, and everything in between.

    Designed with sustainability in mind, Metro Plaza features green building technologies, energy-efficient systems, and environmentally conscious materials throughout. The building's modern facade and intelligent design create an inspiring work environment.

    With its prime location and world-class facilities, Metro Plaza offers businesses the perfect platform to grow and thrive in one of India's most dynamic commercial markets.`,
    gallery: [
      '/src/assets/commercial-building.jpg',
      '/src/assets/hero-construction.jpg',
      '/src/assets/residential-building.jpg'
    ],
    keyFacts: [
      { label: 'Total Area', value: '1.8 Million sq ft', icon: Building },
      { label: 'Floors', value: '32 Floors', icon: Users },
      { label: 'Expected Completion', value: 'June 2024', icon: Calendar },
      { label: 'Location', value: 'Business District, Delhi', icon: MapPin }
    ],
    amenities: [
      'High-Speed Elevators', 'Conference Facilities', 'Food Court', 'Parking',
      'Security', 'Power Backup', 'Cafeteria', 'Meeting Rooms'
    ]
  },
  // ✅ Added missing featured projects
  'luxury-residential-complex': {
    id: 'luxury-residential-complex',
    title: 'Luxury Residential Complex',
    location: 'Downtown Business District',
    type: 'Residential',
    status: 'Ongoing',
    year: '2024',
    heroImage: '/src/assets/residential-building.jpg',
    description: `A premium residential development featuring modern apartments with world-class amenities, sustainable design, and prime location access. This exceptional development represents our commitment to quality construction and innovative design.

    The complex showcases contemporary architecture with intelligent space planning, creating homes that are both luxurious and functional. Every unit is designed with premium finishes and modern conveniences to enhance the living experience.

    Located in the heart of the business district, residents enjoy easy access to corporate offices, shopping centers, and entertainment hubs, making it the perfect choice for urban professionals and families alike.`,
    gallery: [
      '/src/assets/residential-building.jpg',
      '/src/assets/commercial-building.jpg',
      '/src/assets/hero-construction.jpg'
    ],
    keyFacts: [
      { label: 'Total Area', value: '2.5 acres', icon: Building },
      { label: 'Units', value: '120 Units', icon: Users },
      { label: 'Expected Completion', value: '2024', icon: Calendar },
      { label: 'Location', value: 'Downtown Business District', icon: MapPin }
    ],
    amenities: [
      'Swimming Pool', 'Fitness Center', '24/7 Security', 'Parking',
      'Garden Area', 'Children\'s Play Area', 'Community Hall', 'Power Backup',
      'Smart Home Features', 'Concierge Service'
    ]
  },
  'skyline-business-tower': {
    id: 'skyline-business-tower',
    title: 'Skyline Business Tower',
    location: 'Financial District',
    type: 'Commercial',
    status: 'Ongoing',
    year: '2024',
    heroImage: '/src/assets/commercial-building.jpg',
    description: `State-of-the-art commercial tower with premium office spaces, modern amenities, and sustainable architecture. This iconic development is designed to house multinational corporations, innovative startups, and progressive businesses.

    The tower features cutting-edge technology integration, energy-efficient systems, and flexible floor plans that can accommodate businesses of all sizes. Green building technologies and environmentally conscious materials are used throughout the construction.

    With its prime location in the financial district and world-class facilities, Skyline Business Tower offers companies the perfect platform to establish their presence and grow in one of the city's most prestigious commercial areas.`,
    gallery: [
      '/src/assets/commercial-building.jpg',
      '/src/assets/hero-construction.jpg',
      '/src/assets/residential-building.jpg'
    ],
    keyFacts: [
      { label: 'Total Area', value: '1.8 acres', icon: Building },
      { label: 'Floors', value: '45 Floors', icon: Users },
      { label: 'Expected Completion', value: '2024', icon: Calendar },
      { label: 'Location', value: 'Financial District', icon: MapPin }
    ],
    amenities: [
      'High-Speed Elevators', 'Conference Facilities', 'Food Court', 'Parking',
      'Security', 'Power Backup', 'Cafeteria', 'Meeting Rooms',
      'Business Center', 'Executive Lounge'
    ]
  },
  'modern-urban-residences': {
    id: 'modern-urban-residences',
    title: 'Modern Urban Residences',
    location: 'City Center',
    type: 'Residential',
    status: 'Completed',
    year: '2023',
    heroImage: '/src/assets/residential-building.jpg',
    description: `Contemporary residential complex with smart home features, community facilities, and eco-friendly design. This completed development showcases modern architecture with intelligent design creating an inspiring living environment.

    Each residence is thoughtfully designed to maximize natural light and ventilation while incorporating the latest smart home technologies. The eco-friendly approach includes solar panels, rainwater harvesting, and energy-efficient appliances throughout.

    The complex offers a perfect blend of urban convenience and peaceful living, with landscaped gardens, recreational facilities, and a strong sense of community among residents.`,
    gallery: [
      '/src/assets/residential-building.jpg',
      '/src/assets/commercial-building.jpg',
      '/src/assets/hero-construction.jpg'
    ],
    keyFacts: [
      { label: 'Total Area', value: '3.2 acres', icon: Building },
      { label: 'Units', value: '200 Units', icon: Users },
      { label: 'Completion', value: '2023', icon: Calendar },
      { label: 'Location', value: 'City Center', icon: MapPin }
    ],
    amenities: [
      'Swimming Pool', 'Fitness Center', '24/7 Security', 'Parking',
      'Garden Area', 'Smart Home Features', 'Community Hall', 'Eco-friendly Design',
      'Solar Panels', 'Rainwater Harvesting'
    ]
  },
  // ✅ Added missing "All Projects" section projects
  'skyline-towers': {
    id: 'skyline-towers',
    title: 'Skyline Towers',
    location: 'City Center',
    type: 'Commercial',
    status: 'Completed',
    year: '2023',
    heroImage: '/src/assets/commercial-building.jpg',
    description: `Modern office complex with premium facilities located in the heart of the city center. This completed commercial development represents excellence in corporate real estate and modern workplace design.

    The towers feature state-of-the-art office spaces with flexible layouts, high-speed connectivity, and premium amenities. Every floor is designed to promote productivity and collaboration while maintaining the highest standards of comfort.

    With its strategic location and world-class facilities, Skyline Towers has become the preferred choice for leading corporations and growing businesses seeking a prestigious address.`,
    gallery: [
      '/src/assets/commercial-building.jpg',
      '/src/assets/hero-construction.jpg',
      '/src/assets/residential-building.jpg'
    ],
    keyFacts: [
      { label: 'Total Area', value: '1.5 Million sq ft', icon: Building },
      { label: 'Floors', value: '28 Floors', icon: Users },
      { label: 'Completion', value: '2023', icon: Calendar },
      { label: 'Location', value: 'City Center', icon: MapPin }
    ],
    amenities: [
      'High-Speed Elevators', 'Conference Facilities', 'Food Court', 'Parking',
      'Security', 'Power Backup', 'Business Center', 'Executive Lounge'
    ]
  },
  'green-valley-homes': {
    id: 'green-valley-homes',
    title: 'Green Valley Homes',
    location: 'Suburban Area',
    type: 'Residential',
    status: 'Completed',
    year: '2023',
    heroImage: '/src/assets/residential-building.jpg',
    description: `Eco-friendly residential community nestled in a peaceful suburban setting. This completed development emphasizes sustainable living and harmony with nature while providing modern comforts and amenities.

    Green Valley Homes features energy-efficient construction, extensive green spaces, and community gardens. Each home is designed with natural ventilation, solar integration, and eco-friendly materials to minimize environmental impact.

    The community promotes a healthy lifestyle with walking trails, recreational areas, and organic farming spaces, creating a perfect balance between modern living and environmental consciousness.`,
    gallery: [
      '/src/assets/residential-building.jpg',
      '/src/assets/commercial-building.jpg',
      '/src/assets/hero-construction.jpg'
    ],
    keyFacts: [
      { label: 'Total Area', value: '5.0 acres', icon: Building },
      { label: 'Units', value: '180 Homes', icon: Users },
      { label: 'Completion', value: '2023', icon: Calendar },
      { label: 'Location', value: 'Suburban Area', icon: MapPin }
    ],
    amenities: [
      'Community Gardens', 'Walking Trails', 'Solar Panels', 'Parking',
      'Security', 'Children\'s Play Area', 'Community Center', 'Organic Farming'
    ]
  },
  'metro-shopping-plaza': {
    id: 'metro-shopping-plaza',
    title: 'Metro Shopping Plaza',
    location: 'Commercial District',
    type: 'Commercial',
    status: 'Ongoing',
    year: '2024',
    heroImage: '/src/assets/commercial-building.jpg',
    description: `Large-scale retail and entertainment complex set to become the premier shopping destination in the commercial district. This ambitious project will house international brands, local retailers, restaurants, and entertainment facilities.

    The plaza features modern architecture with spacious layouts, natural lighting, and efficient circulation patterns. Multiple levels of retail space, food courts, and entertainment zones are designed to create an engaging shopping experience.

    With ample parking, excellent connectivity, and a diverse mix of tenants, Metro Shopping Plaza will serve as a vibrant community hub attracting visitors from across the city.`,
    gallery: [
      '/src/assets/commercial-building.jpg',
      '/src/assets/hero-construction.jpg',
      '/src/assets/residential-building.jpg'
    ],
    keyFacts: [
      { label: 'Total Area', value: '800,000 sq ft', icon: Building },
      { label: 'Stores', value: '200+ Retail Units', icon: Users },
      { label: 'Expected Completion', value: '2024', icon: Calendar },
      { label: 'Location', value: 'Commercial District', icon: MapPin }
    ],
    amenities: [
      'Food Court', 'Entertainment Zone', 'Parking', 'Security',
      'Escalators & Elevators', 'Air Conditioning', 'Restrooms', 'ATM Services'
    ]
  },
  'riverside-apartments': {
    id: 'riverside-apartments',
    title: 'Riverside Apartments',
    location: 'Riverside',
    type: 'Residential',
    status: 'Completed',
    year: '2022',
    heroImage: '/src/assets/residential-building.jpg',
    description: `Luxury apartments with stunning river views offering a serene living experience by the waterfront. This completed development combines the tranquility of riverside living with modern urban conveniences.

    Each apartment is designed to maximize river views while providing spacious layouts and premium finishes. The building features contemporary architecture that complements the natural riverside setting.

    Residents enjoy exclusive access to waterfront amenities, landscaped gardens, and recreational facilities, making it an ideal choice for those seeking luxury living in a peaceful environment.`,
    gallery: [
      '/src/assets/residential-building.jpg',
      '/src/assets/commercial-building.jpg',
      '/src/assets/hero-construction.jpg'
    ],
    keyFacts: [
      { label: 'Total Area', value: '3.5 acres', icon: Building },
      { label: 'Units', value: '150 Apartments', icon: Users },
      { label: 'Completion', value: '2022', icon: Calendar },
      { label: 'Location', value: 'Riverside', icon: MapPin }
    ],
    amenities: [
      'River Views', 'Swimming Pool', 'Fitness Center', 'Parking',
      'Security', 'Landscaped Gardens', 'Waterfront Access', 'Boating Facility'
    ]
  },
  'tech-park-building': {
    id: 'tech-park-building',
    title: 'Tech Park Building',
    location: 'Innovation District',
    type: 'Commercial',
    status: 'Ongoing',
    year: '2024',
    heroImage: '/src/assets/commercial-building.jpg',
    description: `State-of-the-art technology office space designed specifically for IT companies and innovative startups in the thriving innovation district. This modern development will feature cutting-edge infrastructure and flexible workspace solutions.

    The building incorporates the latest in smart building technology, high-speed connectivity, and collaborative work environments. Every aspect is designed to foster innovation and productivity in the technology sector.

    With its location in the innovation district and proximity to other tech companies, the Tech Park Building will become a hub for technological advancement and business growth.`,
    gallery: [
      '/src/assets/commercial-building.jpg',
      '/src/assets/hero-construction.jpg',
      '/src/assets/residential-building.jpg'
    ],
    keyFacts: [
      { label: 'Total Area', value: '1.2 Million sq ft', icon: Building },
      { label: 'Floors', value: '25 Floors', icon: Users },
      { label: 'Expected Completion', value: '2024', icon: Calendar },
      { label: 'Location', value: 'Innovation District', icon: MapPin }
    ],
    amenities: [
      'High-Speed Internet', 'Smart Building Features', 'Collaborative Spaces', 'Parking',
      'Security', 'Cafeteria', 'Conference Rooms', 'Innovation Labs'
    ]
  },
  'garden-estates': {
    id: 'garden-estates',
    title: 'Garden Estates',
    location: 'Garden District',
    type: 'Residential',
    status: 'Completed',
    year: '2023',
    heroImage: '/src/assets/residential-building.jpg',
    description: `Premium villas with landscaped gardens offering an exclusive residential experience in the prestigious garden district. This completed development features luxury homes surrounded by meticulously maintained gardens and green spaces.

    Each villa is architecturally distinct with spacious layouts, premium materials, and private gardens. The community emphasizes privacy and exclusivity while maintaining a strong sense of neighborhood harmony.

    Garden Estates represents the pinnacle of luxury residential living, combining elegant design with natural beauty to create homes that are both sophisticated and welcoming.`,
    gallery: [
      '/src/assets/residential-building.jpg',
      '/src/assets/commercial-building.jpg',
      '/src/assets/hero-construction.jpg'
    ],
    keyFacts: [
      { label: 'Total Area', value: '8.0 acres', icon: Building },
      { label: 'Units', value: '45 Villas', icon: Users },
      { label: 'Completion', value: '2023', icon: Calendar },
      { label: 'Location', value: 'Garden District', icon: MapPin }
    ],
    amenities: [
      'Private Gardens', 'Landscaped Common Areas', 'Security', 'Parking',
      'Community Club', 'Swimming Pool', 'Tennis Court', 'Children\'s Play Area'
    ]
  }
};

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [galleryApi, setGalleryApi] = useState<any>();

  const project = projectId ? projectsData[projectId as keyof typeof projectsData] : null;

  // Auto-scroll gallery carousel
  useEffect(() => {
    if (!galleryApi) return;

    const intervalId = setInterval(() => {
      galleryApi.scrollNext();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [galleryApi]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => navigate('/projects')}>
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: `url(${project.heroImage})` }}>
        <div className="absolute inset-0 bg-black/50" />
        {/* Back Button - Hero Section Corner */}
        <Button 
          variant="ghost" 
          className="absolute top-4 left-4 z-10 text-white hover:text-white hover:bg-white/20 backdrop-blur-sm animate-fade-in"
          onClick={() => navigate('/projects')}
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Projects
        </Button>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {project.type}
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {project.status}
              </Badge>
            </div>
            <p className="text-xl flex items-center">
              <MapPin className="mr-2 w-5 h-5" />
              {project.location}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Detailed Description */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">About This Project</h2>
          <div className="prose prose-lg max-w-none">
            {project.description.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-muted-foreground leading-relaxed">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </section>

        {/* Gallery Carousel */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Project Gallery</h2>
          <Carousel 
            className="w-full"
            setApi={setGalleryApi}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {project.gallery.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[400px] rounded-lg overflow-hidden hover-scale">
                    <img 
                      src={image} 
                      alt={`${project.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Key Project Facts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Key Project Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.keyFacts.map((fact, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <fact.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{fact.label}</h3>
                  <p className="text-muted-foreground">{fact.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Amenities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Amenities & Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.amenities.map((amenity, index) => (
              <div key={index} className="bg-secondary rounded-lg p-4 text-center">
                <span className="font-medium">{amenity}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary/5 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in This Project?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get in touch with our team to learn more about {project.title} and explore investment opportunities.
          </p>
          <Button 
            size="lg" 
            className="btn-primary"
            onClick={() => setIsEnrollmentOpen(true)}
          >
            Enquire Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </section>
      </div>

      {/* Enrollment Modal */}
      <EnrollmentForm
        isOpen={isEnrollmentOpen}
        onClose={() => setIsEnrollmentOpen(false)}
        projectName={project.title}
      />
    </div>
  );
};

export default ProjectDetail;
