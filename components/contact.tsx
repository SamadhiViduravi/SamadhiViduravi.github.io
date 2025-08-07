"use client"

import type React from "react"
import { useState } from "react"
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Instagram } from "lucide-react"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [focusedFields, setFocusedFields] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleFocus = (field: string) => {
    setFocusedFields((prev) => ({ ...prev, [field]: true }))
  }

  const handleBlur = (field: string) => {
    if (!formState[field as keyof typeof formState]) {
      setFocusedFields((prev) => ({ ...prev, [field]: false }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      
      const emailjs = await import("@emailjs/browser")

      await emailjs.send(
        "service_itgex95", 
        "template_3br40ak", 
        {
          from_name: formState.name,
          from_email: formState.email,
          subject: formState.subject,
          message: formState.message,
        },
        "1d-81HDGRkfHJOSHG", 
      )

      alert("Thank you for your message! I will get back to you soon.")
      setFormState({ name: "", email: "", subject: "", message: "" })
      setFocusedFields({ name: false, email: false, subject: false, message: false })
    } catch (error) {
      console.error("Error sending email:", error)
      alert("Sorry, there was an error sending your message. Please try again or contact me directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact" data-scroll-section>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" data-scroll data-scroll-speed="1">
            Get In Touch
          </h2>
          <div className="section-line" data-scroll data-scroll-speed="1.2"></div>
        </div>
        <div className="contact-content">
          <div className="contact-info" data-scroll data-scroll-speed="1">
            <div className="contact-item">
              <div className="contact-icon">
                <Mail size={32} />
              </div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>
                  <a href="mailto:s.viduravee@example.com">s.viduravee@example.com</a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <MapPin size={32} />
              </div>
              <div className="contact-details">
                <h3>Home Address</h3>
                <p>Mahawalathenna Bibiligamuwa Bogahakumbura</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <Phone size={32} />
              </div>
              <div className="contact-details">
                <h3>Phone</h3>
                <p>
                  <a href="tel:+94756002304">+94 75 600 2304</a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <Github size={32} />
              </div>
              <div className="contact-details">
                <h3>GitHub</h3>
                <p>
                  <a href="https://github.com/samadhividuravi" target="_blank" rel="noopener noreferrer">
                    github.com/samadhividuravi
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-social">
              <a href="https://github.com/samadhividuravi" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/samadhi-dissanayake-745abb338/" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
              
              <a href="https://www.instagram.com/sl_maari_?igsh=MXNmdW4wMmxqMnd3cw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          <div className="contact-form" data-scroll data-scroll-speed="1.2">
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className={`form-group ${focusedFields.name || formState.name ? "focused" : ""}`}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                  required
                />
                <label htmlFor="name">Your Name</label>
              </div>
              <div className={`form-group ${focusedFields.email || formState.email ? "focused" : ""}`}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  required
                />
                <label htmlFor="email">Your Email</label>
              </div>
              <div className={`form-group ${focusedFields.subject || formState.subject ? "focused" : ""}`}>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("subject")}
                  onBlur={() => handleBlur("subject")}
                  required
                />
                <label htmlFor="subject">Subject</label>
              </div>
              <div className={`form-group ${focusedFields.message || formState.message ? "focused" : ""}`}>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("message")}
                  onBlur={() => handleBlur("message")}
                  required
                ></textarea>
                <label htmlFor="message">Your Message</label>
              </div>
              <button type="submit" className="btn primary-btn" disabled={isSubmitting}>
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
