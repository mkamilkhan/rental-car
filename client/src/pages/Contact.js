import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const phoneNumber = '971564455568'; // without +
  
    const text =
  `New Contact Form Message
  
  Name: ${formData.name}
  Email: ${formData.email}
  Subject: ${formData.subject}
  
  Message:
  ${formData.message}
  `;
  
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappURL, '_blank');
  
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  

  return (
    <div className="contact-page">
  

      <div className="contact-content">
        <div className="container">
          <div className="contact-main">
            <div className="contact-info">
              <div className="info-section">
                <h3>Get In Touch</h3>
                <h2>Our Contact Information</h2>
              </div>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-text">
                    <h4>Our Address</h4>
                    <p>2690 Hitara Street Victoria Rued, New York, Canada</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-text">
                    <h4>Phone Number</h4>
                    <p>+01 234 567 890</p>
                    <p>108 678 543 210</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div className="contact-text">
                    <h4>Email Address</h4>
                    <p>malinfo00@tourm.com</p>
                    <p>supuurt24@tourm.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-section">
              <h3>Send Us A Message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-large">
  Send via WhatsApp
</button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

