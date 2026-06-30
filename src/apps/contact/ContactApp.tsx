import React, { useState } from 'react';
import { MailIcon, SendIcon, CheckCircleIcon, XCircleIcon, Loader2Icon, MapPinIcon } from 'lucide-react';

export const ContactApp: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key] || ''))
      .join('&');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('loading');
    
    // Netlify Forms AJAX submission
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        ...formData
      })
    })
      .then(() => setFormState('success'))
      .catch(() => setFormState('error'));
  };

  return (
    <div className="w-full h-full bg-[#161616] text-[#e0e0e0] flex flex-col md:flex-row p-8 overflow-y-auto">
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        
        {/* Left Side: Info */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center">
            <MailIcon size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Get In Touch</h1>
            <p className="text-white/50 text-sm leading-relaxed">
              I'm currently open to new opportunities. Whether you have a question, a project proposal, or just want to say hi, I'll try my best to get back to you!
            </p>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-sm mt-4">
            <MapPinIcon size={16} /> San Francisco, CA
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-2/3 bg-[#1e1e1e] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          
          {formState === 'success' && (
            <div className="absolute inset-0 bg-[#1e1e1e] flex flex-col items-center justify-center z-10 animate-in fade-in zoom-in duration-500">
              <CheckCircleIcon size={64} className="text-green-400 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
              <p className="text-white/50 text-center max-w-sm mb-6">
                Thank you for reaching out. I've received your message and will respond as soon as possible.
              </p>
              <button 
                onClick={() => { setFormState('idle'); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                Send Another
              </button>
            </div>
          )}

          {formState === 'error' && (
            <div className="absolute inset-0 bg-[#1e1e1e] flex flex-col items-center justify-center z-10 animate-in fade-in zoom-in duration-500">
              <XCircleIcon size={64} className="text-red-400 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
              <p className="text-white/50 text-center max-w-sm mb-6">
                There was an error sending your message. Please try again later.
              </p>
              <button 
                onClick={() => setFormState('idle')}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                Go Back
              </button>
            </div>
          )}

          {/* Form requires name="contact" and data-netlify="true" for Netlify to detect it during build */}
          <form 
            name="contact" 
            data-netlify="true" 
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className={`flex flex-col gap-5 ${formState !== 'idle' && formState !== 'loading' ? 'opacity-0' : 'opacity-100'} transition-opacity`}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-semibold text-white/70 uppercase tracking-wider">Name</label>
                <input 
                  id="name"
                  type="text" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-white/70 uppercase tracking-wider">Email</label>
                <input 
                  id="email"
                  type="email" 
                  name="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="subject" className="text-xs font-semibold text-white/70 uppercase tracking-wider">Subject</label>
              <input 
                id="subject"
                type="text" 
                name="subject" 
                required
                value={formData.subject}
                onChange={handleChange}
                className="bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                placeholder="What's this regarding?"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-semibold text-white/70 uppercase tracking-wider">Message</label>
              <textarea 
                id="message"
                name="message" 
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none" 
                placeholder="Your message here..."
              />
            </div>

            <button 
              type="submit" 
              disabled={formState === 'loading'}
              className="mt-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-6 py-3 font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formState === 'loading' ? (
                <>
                  <Loader2Icon size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <SendIcon size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ContactApp;
