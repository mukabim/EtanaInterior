import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitMessage('Thank you! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setSubmitMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const services = [
    {
      title: 'Furniture',
      description: 'Custom and modern furniture solutions for homes and offices',
      image: 'https://images.unsplash.com/photo-1698864551603-0f7aefaebeb4'
    },
    {
      title: 'Curtains',
      description: 'Elegant curtains and window treatments for every space',
      image: 'https://images.pexels.com/photos/462197/pexels-photo-462197.jpeg'
    },
    {
      title: 'Carpets & Rugs',
      description: 'Premium carpets and rugs to enhance your floor aesthetics',
      image: 'https://images.unsplash.com/photo-1561578428-5d58d0d965ec'
    },
    {
      title: 'Wallpapers',
      description: 'Stunning wallpaper designs to transform your walls',
      image: 'https://images.unsplash.com/photo-1682589183322-698a60e903ce'
    },
    {
      title: 'Fabric & Upholstery',
      description: 'Quality fabrics and upholstery services for furniture',
      image: 'https://images.unsplash.com/photo-1638972691611-69633a3d3127'
    },
    {
      title: 'Complete Decor',
      description: 'Full home and office decoration and branding solutions',
      image: 'https://images.unsplash.com/photo-1628744876497-eb30460be9f6'
    }
  ];

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-etana-brown">ETANA INTERIORS</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="text-etana-brown hover:text-etana-orange px-3 py-2 text-sm font-medium">Home</a>
                <a href="#services" className="text-etana-brown hover:text-etana-orange px-3 py-2 text-sm font-medium">Services</a>
                <a href="#portfolio" className="text-etana-brown hover:text-etana-orange px-3 py-2 text-sm font-medium">Portfolio</a>
                <a href="#contact" className="text-etana-brown hover:text-etana-orange px-3 py-2 text-sm font-medium">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center bg-gradient-to-br from-etana-brown to-etana-orange">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1698864551603-0f7aefaebeb4')`
          }}
        ></div>
        <div className="relative text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            ETANA INTERIORS
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Transforming spaces with elegance and sophistication. Your premier interior design partner in Kenya.
          </p>
          <div className="space-x-4">
            <a href="#services" className="bg-etana-orange hover:bg-opacity-90 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300">
              Our Services
            </a>
            <a href="#contact" className="border-2 border-white text-white hover:bg-white hover:text-etana-brown px-8 py-3 rounded-lg text-lg font-semibold transition duration-300">
              Get Quote
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-etana-brown mb-4">About Etana Interiors</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are a leading interior design company in Kenya, specializing in creating beautiful, functional spaces 
              that reflect your unique style and personality. With years of experience and a passion for excellence, 
              we transform homes and offices into stunning environments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-etana-orange rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h6M7 3v18M13 3v18"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-etana-brown mb-2">Expert Design</h3>
              <p className="text-gray-600">Professional interior design solutions tailored to your needs</p>
            </div>
            <div className="text-center">
              <div className="bg-etana-orange rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-etana-brown mb-2">Quality Materials</h3>
              <p className="text-gray-600">Premium furniture, fabrics, and materials for lasting beauty</p>
            </div>
            <div className="text-center">
              <div className="bg-etana-orange rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-etana-brown mb-2">Timely Delivery</h3>
              <p className="text-gray-600">Efficient project management and on-time completion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-etana-brown mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From furniture to complete home makeovers, we offer comprehensive interior design services 
              to transform your space into something extraordinary.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url('${service.image}')`}}></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-etana-brown mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-etana-brown mb-4">Our Portfolio</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore some of our recent projects and see how we've transformed spaces for our clients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img src="https://images.pexels.com/photos/32006059/pexels-photo-32006059.jpeg" alt="Portfolio 1" className="w-full h-64 object-cover group-hover:scale-110 transition duration-300" />
              <div className="absolute inset-0 bg-etana-brown bg-opacity-0 group-hover:bg-opacity-80 transition duration-300 flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <h3 className="text-xl font-semibold mb-2">Luxury Living Room</h3>
                  <p>Complete home transformation</p>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img src="https://images.pexels.com/photos/32817551/pexels-photo-32817551.jpeg" alt="Portfolio 2" className="w-full h-64 object-cover group-hover:scale-110 transition duration-300" />
              <div className="absolute inset-0 bg-etana-brown bg-opacity-0 group-hover:bg-opacity-80 transition duration-300 flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <h3 className="text-xl font-semibold mb-2">Modern Office</h3>
                  <p>Corporate interior design</p>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img src="https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg" alt="Portfolio 3" className="w-full h-64 object-cover group-hover:scale-110 transition duration-300" />
              <div className="absolute inset-0 bg-etana-brown bg-opacity-0 group-hover:bg-opacity-80 transition duration-300 flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <h3 className="text-xl font-semibold mb-2">Elegant Bedroom</h3>
                  <p>Custom curtains and decor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-etana-brown mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ready to transform your space? Contact us today for a consultation and let's bring your vision to life.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-etana-brown mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-etana-orange mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span className="text-gray-700">+254 700 188 923</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-etana-orange mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-gray-700">sales@etanainteriors.co.ke</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-etana-orange mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-gray-700">Nairobi, Kenya</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-etana-orange mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0m5.568 8.16c-.169 1.858-.896 3.463-2.174 4.741-1.278 1.278-2.883 2.005-4.741 2.174-.28.025-.602.025-.882 0-1.858-.169-3.463-.896-4.741-2.174C3.752 11.623 3.025 10.018 2.856 8.16c-.025-.28-.025-.602 0-.882.169-1.858.896-3.463 2.174-4.741C6.308 1.259 7.913.532 9.771.363c.28-.025.602-.025.882 0 1.858.169 3.463.896 4.741 2.174 1.278 1.278 2.005 2.883 2.174 4.741.025.28.025.602 0 .882"></path>
                  </svg>
                  <a href="https://www.instagram.com/etanainteriors" className="text-etana-orange hover:text-etana-brown">@etanainteriors</a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-etana-brown mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-etana-orange"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-etana-orange"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-etana-orange"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Interested In</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-etana-orange"
                  >
                    <option value="">Select a service</option>
                    <option value="furniture">Furniture</option>
                    <option value="curtains">Curtains</option>
                    <option value="carpets">Carpets & Rugs</option>
                    <option value="wallpapers">Wallpapers</option>
                    <option value="fabric">Fabric & Upholstery</option>
                    <option value="complete">Complete Home Decor</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-etana-orange"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-etana-orange text-white py-2 px-4 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-etana-orange disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitMessage && (
                  <div className={`mt-4 p-3 rounded-md ${submitMessage.includes('Thank you') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-etana-brown text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">ETANA INTERIORS</h3>
              <p className="text-gray-300">
                Your premier interior design partner in Kenya, creating beautiful and functional spaces.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Furniture</li>
                <li>Curtains</li>
                <li>Carpets & Rugs</li>
                <li>Wallpapers</li>
                <li>Fabric & Upholstery</li>
                <li>Complete Home Decor</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <p>+254 700 188 923</p>
                <p>sales@etanainteriors.co.ke</p>
                <p>Nairobi, Kenya</p>
                <a href="https://www.instagram.com/etanainteriors" className="text-etana-orange hover:text-white">@etanainteriors</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Etana Interiors. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;