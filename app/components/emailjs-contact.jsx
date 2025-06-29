"use client";
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function EmailJSContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Check if EmailJS is configured
      if (!process.env.NEXT_PUBLIC_EMAILJS_USER_ID || 
          !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 
          !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID) {
        throw new Error('EmailJS not configured. Please check environment variables.');
      }

      // Initialize EmailJS with your public key
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID);

      const templateParams = {
        to_email: 'zawadul1@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email
      };

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Message sent successfully! I\'ll get back to you soon.' 
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: 'Failed to send message. Please try again.' 
        });
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      
      // Provide specific error messages based on the error type
      let errorMessage = 'Failed to send message. Please try again later.';
      
      if (error.message.includes('not configured')) {
        errorMessage = 'Contact form is not configured. Please use the email link above.';
      } else if (error.message.includes('network')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message.includes('rate limit')) {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      }
      
      setSubmitStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-zinc-400 mb-2">Name</label>
        <input 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block text-sm text-zinc-400 mb-2">Email</label>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
          placeholder="your.email@example.com"
        />
      </div>
      <div>
        <label className="block text-sm text-zinc-400 mb-2">Message</label>
        <textarea 
          rows="4"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors resize-none"
          placeholder="Your message..."
        ></textarea>
      </div>
      
      {/* Status Message */}
      {submitStatus && (
        <div className={`p-3 rounded-lg text-sm ${
          submitStatus.type === 'success' 
            ? 'bg-green-600/20 border border-green-600/30 text-green-400' 
            : 'bg-red-600/20 border border-red-600/30 text-red-400'
        }`}>
          {submitStatus.message}
        </div>
      )}
      
      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-zinc-600 disabled:to-zinc-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
} 