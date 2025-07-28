import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Phone, Mail } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      category: "General Questions",
      items: [
        {
          question: "What types of construction projects do you handle?",
          answer: "BCM Group specializes in both residential and commercial construction projects. We handle new construction, renovations, remodeling, interior design, and project management services. Our portfolio includes custom homes, office buildings, retail spaces, restaurants, and mixed-use developments."
        },
        {
          question: "How long does a typical construction project take?",
          answer: "Project timelines vary depending on the scope and complexity. Residential projects typically range from 3-12 months, while commercial projects can take 6-24 months. We provide detailed timelines during the initial consultation and keep you updated throughout the construction process."
        },
        {
          question: "Do you provide free estimates?",
          answer: "Yes, we offer free initial consultations and estimates for all potential projects. Our team will assess your needs, discuss your vision, and provide a detailed estimate with no obligation. We believe in transparent pricing and clear communication from the start."
        },
        {
          question: "Are you licensed and insured?",
          answer: "Absolutely. BCM Group is fully licensed, bonded, and insured. We maintain comprehensive general liability insurance and workers' compensation coverage. All our contractors are certified professionals with the necessary permits and qualifications."
        }
      ]
    },
    {
      category: "Project Process",
      items: [
        {
          question: "What is your construction process?",
          answer: "Our process begins with an initial consultation to understand your needs and vision. We then move to design and planning, obtain necessary permits, and begin construction. Throughout each phase, we maintain regular communication and provide progress updates. We conclude with a final walkthrough and quality inspection."
        },
        {
          question: "How do you handle project management?",
          answer: "We assign a dedicated project manager to oversee every aspect of your construction project. They coordinate with all subcontractors, manage timelines, ensure quality control, and serve as your primary point of contact. You'll receive regular updates and have 24/7 access to project status."
        },
        {
          question: "What happens if there are changes during construction?",
          answer: "We understand that changes may be necessary during construction. All change orders are documented in writing with detailed cost and timeline impacts. We'll discuss the implications with you before proceeding and ensure you're comfortable with any adjustments to the original plan."
        },
        {
          question: "How do you ensure quality control?",
          answer: "Quality is our top priority. We conduct regular inspections at key milestones, use only high-quality materials from trusted suppliers, and our experienced supervisors oversee all work. We also perform a comprehensive final inspection before project completion."
        }
      ]
    },
    {
      category: "Pricing & Payment",
      items: [
        {
          question: "How do you structure payment schedules?",
          answer: "We typically structure payments based on project milestones rather than requiring large upfront payments. A small deposit secures your project start date, with subsequent payments tied to completion of specific phases. We'll discuss the payment schedule during contract negotiations."
        },
        {
          question: "Do you offer financing options?",
          answer: "Yes, we work with several financing partners to help make your construction project more affordable. We can connect you with reputable lenders who specialize in construction loans and renovation financing. Our team can help guide you through the financing process."
        },
        {
          question: "What factors affect construction costs?",
          answer: "Several factors influence construction costs including project size, complexity, material selections, site conditions, and local permit requirements. We provide detailed estimates that break down all costs so you understand exactly what you're paying for."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No, we believe in complete transparency. Our estimates include all anticipated costs, and we clearly outline what's included and what might be additional. Any potential extra costs are discussed upfront, and no work proceeds without your approval."
        }
      ]
    },
    {
      category: "Support & Warranty",
      items: [
        {
          question: "What warranty do you provide?",
          answer: "We provide a comprehensive warranty on all our construction work. Structural work comes with a 10-year warranty, while finishes and fixtures are covered for 1-2 years depending on the item. We also honor all manufacturer warranties on materials and appliances."
        },
        {
          question: "What kind of support do you provide after project completion?",
          answer: "Our relationship doesn't end when construction is complete. We provide ongoing support for any warranty issues, maintenance questions, or future renovation needs. Our customer service team is always available to address any concerns."
        },
        {
          question: "How do you handle warranty claims?",
          answer: "If you experience any issues covered under warranty, simply contact our customer service team. We'll schedule a prompt inspection and address any legitimate warranty concerns at no cost to you. Our goal is your complete satisfaction with our work."
        },
        {
          question: "Do you provide maintenance services?",
          answer: "Yes, we offer ongoing maintenance services for our completed projects. This includes routine inspections, preventive maintenance, and repairs. Regular maintenance helps protect your investment and can extend the life of your construction."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-padding text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="heading-lg">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Find answers to the most common questions about our construction services, 
              project process, and what you can expect when working with BCM Group.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding">
        <div className="container-padding max-w-4xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-primary">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.items.map((faq, index) => {
                  const itemIndex = categoryIndex * 100 + index;
                  const isOpen = openItems.includes(itemIndex);
                  
                  return (
                    <div 
                      key={itemIndex}
                      className="card-elevated overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(itemIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-muted/30 transition-colors duration-200"
                      >
                        <h3 className="font-medium text-foreground pr-4">
                          {faq.question}
                        </h3>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <div className="border-t border-border pt-4">
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-padding">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold">Still Have Questions?</h2>
            <p className="text-lg text-muted-foreground">
              Can't find the answer you're looking for? Our team is here to help. 
              Contact us directly and we'll get back to you as soon as possible.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="card-elevated p-6 text-center">
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with our team in real-time
                </p>
                <button className="btn-primary w-full">Start Chat</button>
              </div>
              
              <div className="card-elevated p-6 text-center">
                <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Speak directly with our experts
                </p>
                <a href="tel:+1234567890" className="btn-primary w-full inline-block">
                  (123) 456-7890
                </a>
              </div>
              
              <div className="card-elevated p-6 text-center">
                <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Send us your detailed questions
                </p>
                <a href="mailto:info@bcmgroup.com" className="btn-primary w-full inline-block">
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;