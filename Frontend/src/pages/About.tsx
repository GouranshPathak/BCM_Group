import { ArrowRight, Users, Award, Building, Target, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const team = [
    {
      name: 'John Mitchell',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
      bio: 'With over 20 years in real estate development, John leads BCM Group with vision and expertise.'
    },
    {
      name: 'Sarah Davis',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
      bio: 'Sarah brings creativity and innovation to every project with her architectural design expertise.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Construction Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'Michael ensures quality construction and timely project delivery with his extensive field experience.'
    },
    {
      name: 'Emily Chen',
      role: 'Project Coordinator',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      bio: 'Emily coordinates all project aspects, ensuring seamless communication and client satisfaction.'
    }
  ];

  const timeline = [
    {
      year: '2009',
      title: 'Company Founded',
      description: 'BCM Group was established with a vision to transform the real estate and construction industry.'
    },
    {
      year: '2012',
      title: 'First Major Project',
      description: 'Completed our first large-scale residential development, setting new quality standards.'
    },
    {
      year: '2015',
      title: 'Commercial Expansion',
      description: 'Expanded into commercial construction with several successful office building projects.'
    },
    {
      year: '2018',
      title: 'Award Recognition',
      description: 'Received Excellence in Construction Award for innovation and quality in building practices.'
    },
    {
      year: '2021',
      title: 'Sustainable Focus',
      description: 'Launched our green building initiative, focusing on sustainable and eco-friendly construction.'
    },
    {
      year: '2024',
      title: 'Digital Innovation',
      description: 'Integrated cutting-edge technology and digital tools to enhance project efficiency and client experience.'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for perfection in every project, ensuring the highest quality standards and attention to detail.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with our clients, understanding their vision and bringing it to life through teamwork.'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We conduct business with honesty, transparency, and ethical practices in all our interactions.'
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'We embrace new technologies and methods to deliver cutting-edge solutions for modern construction.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-padding text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="heading-lg">About BCM Group</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              For over 15 years, we've been building dreams and delivering excellence in real estate 
              development and construction services. Our commitment to quality, innovation, and client 
              satisfaction has made us a trusted name in the industry.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-semibold">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To transform the real estate and construction industry by delivering exceptional quality, 
                innovative solutions, and outstanding customer service. We're committed to building not 
                just structures, but lasting relationships and communities that thrive.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-semibold">Our Vision</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the leading real estate and construction company, recognized for our innovation, 
                quality, and commitment to sustainable building practices. We envision a future where 
                every project we complete contributes positively to the community and environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-md mb-6">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These values guide everything we do and define who we are as a company.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="text-center space-y-6 p-6 bg-card rounded-2xl shadow-medium hover:shadow-large transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding">
        <div className="container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-md mb-6">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From humble beginnings to industry leadership, here's how we've grown and evolved over the years.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20"></div>
            
            <div className="space-y-16">
              {timeline.map((event, index) => (
                <div 
                  key={event.year}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right lg:pr-8' : 'lg:pl-8'}`}>
                    <div className="bg-card p-6 rounded-2xl shadow-medium hover:shadow-large transition-all duration-500">
                      <div className="text-2xl font-bold text-primary mb-2">{event.year}</div>
                      <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="hidden lg:flex w-2/12 justify-center">
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-medium"></div>
                  </div>
                  
                  <div className="hidden lg:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-md mb-6">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our experienced professionals are the backbone of BCM Group, bringing expertise, 
              creativity, and dedication to every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div 
                key={member.name}
                className="text-center space-y-6 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-large group-hover:shadow-red transition-all duration-500">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-padding">
          <div className="text-center bg-gradient-primary text-white rounded-3xl p-12 md:p-16">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Work with Us?
              </h2>
              <p className="text-xl opacity-90">
                Let's discuss your project and see how we can bring your vision to life. 
                Our team is ready to provide expert consultation and exceptional service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-primary hover:bg-gray-100 font-medium px-8 py-3 text-lg">
                  Contact Us Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-medium px-8 py-3 text-lg">
                  View Our Projects
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;