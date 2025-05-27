import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Check } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {
      name: '',
      email: '',
      message: '',
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setTimeout(() => setIsSubmitted(false), 4000);
      }, 1200);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-title">
          <h2><span>Contact Me</span></h2>
        </div>
        <div className="contact-content">
          {/* Left: Contact Info */}
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <p>
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
              Feel free to contact me using the form or the contact information.
            </p>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <span className="contact-icon">
                  <Mail size={20} />
                </span>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:ayush975600@gmail.com">
                    ayush975600@gmail.com
                  </a>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="contact-icon">
                  <Phone size={20} />
                </span>
                <div>
                  <h4>Phone</h4>
                  <a href="tel:+12243588722">(224) 358-8722</a>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="contact-icon">
                  <MapPin size={20} />
                </span>
                <div>
                  <h4>Location</h4>
                  <span>Chicago, IL</span>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Contact Form */}
          <div className="contact-form-card">
            {isSubmitted ? (
              <div className="contact-thankyou">
                <div className="checkmark-bg">
                  <Check size={36} color="#21c55d" />
                </div>
                <h3>Message Sent!</h3>
                <p>
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">
                    Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'input-error' : ''}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="error-msg">{errors.name}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'input-error' : ''}
                    placeholder="Your email address"
                  />
                  {errors.email && (
                    <p className="error-msg">{errors.email}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject of your message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={errors.message ? 'input-error' : ''}
                    placeholder="Your message"
                  ></textarea>
                  {errors.message && (
                    <p className="error-msg">{errors.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="contact-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} style={{ marginRight: 8 }} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
