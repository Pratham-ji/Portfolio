import React, { useState } from 'react';
import { MailIcon, SendIcon, CheckCircleIcon, XCircleIcon, Loader2Icon, MapPinIcon, CodeIcon, BriefcaseIcon, MessageSquareIcon } from 'lucide-react';
import { socialData } from '../../data/social';
import { profileData } from '../../data/profile';
import { motion, AnimatePresence } from 'motion/react';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="ds-app-container overflow-y-auto">
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="ds-app-content-inner w-full flex-col md:flex-row gap-12 items-start mt-8">
        
        {/* Left Side: Info */}
        <motion.div variants={itemVariants} className="w-full md:w-[40%] flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-inner">
              <MailIcon size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--theme-text)] mb-3 tracking-tight">Let's Connect</h1>
              <p className="text-[var(--theme-text-muted)] text-[13px] font-medium leading-relaxed">
                I'm currently open to new opportunities. Whether you have a question, a project proposal, or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>
            <div className="ds-tag self-start bg-[var(--theme-surface)] shadow-sm">
              <MapPinIcon size={16} className="text-red-400" /> {profileData.location.includes('TODO') ? 'Location Pending' : profileData.location}
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-[var(--theme-border)]">
            <h3 className="text-sm font-bold text-[var(--theme-text-muted)] uppercase tracking-wider">Social Profiles</h3>
            <div className="flex flex-col gap-3">
              <SocialLink href={socialData.github} icon={CodeIcon} label="GitHub" />
              <SocialLink href={socialData.linkedin} icon={BriefcaseIcon} label="LinkedIn" />
              {socialData.twitter && !socialData.twitter.includes('TODO') && (
                <SocialLink href={socialData.twitter} icon={MessageSquareIcon} label="Twitter" />
              )}
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div variants={itemVariants} className="w-full md:w-[60%] ds-card relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {formState === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[var(--theme-surface)] flex flex-col items-center justify-center z-10 backdrop-blur-md"
              >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20 shadow-inner">
                  <CheckCircleIcon size={40} className="text-green-500" />
                </div>
                <h2 className="text-2xl font-extrabold text-[var(--theme-text)] mb-3">Message Sent!</h2>
                <p className="text-[var(--theme-text-muted)] font-medium text-center max-w-xs mb-8 leading-relaxed">
                  Thank you for reaching out. I've received your message and will respond as soon as possible.
                </p>
                <button 
                  onClick={() => { setFormState('idle'); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                  className="ds-btn ds-btn-secondary shadow-sm"
                >
                  Send Another
                </button>
              </motion.div>
            )}

            {formState === 'error' && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[var(--theme-surface)] flex flex-col items-center justify-center z-10 backdrop-blur-md"
              >
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20 shadow-inner">
                  <XCircleIcon size={40} className="text-red-500" />
                </div>
                <h2 className="text-2xl font-extrabold text-[var(--theme-text)] mb-3">Delivery Failed</h2>
                <p className="text-[var(--theme-text-muted)] font-medium text-center max-w-xs mb-8 leading-relaxed">
                  There was an error sending your message. Please verify your connection or try again later.
                </p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="ds-btn ds-btn-secondary shadow-sm"
                >
                  Go Back
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <form 
            name="contact" 
            data-netlify="true" 
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className={`flex flex-col gap-6 ${formState !== 'idle' && formState !== 'loading' ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-300`}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-bold text-[var(--theme-text-muted)] uppercase tracking-wider pl-1">Name</label>
                <input 
                  id="name"
                  type="text" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-transparent border border-[var(--theme-border)] rounded-xl px-4 py-3 text-[var(--theme-text)] text-[15px] font-medium placeholder:text-[var(--theme-text-muted)]/50 focus:outline-none focus:border-[var(--theme-accent)] focus:ring-1 focus:ring-[var(--theme-accent)] transition-all shadow-inner" 
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-bold text-[var(--theme-text-muted)] uppercase tracking-wider pl-1">Email</label>
                <input 
                  id="email"
                  type="email" 
                  name="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent border border-[var(--theme-border)] rounded-xl px-4 py-3 text-[var(--theme-text)] text-[15px] font-medium placeholder:text-[var(--theme-text-muted)]/50 focus:outline-none focus:border-[var(--theme-accent)] focus:ring-1 focus:ring-[var(--theme-accent)] transition-all shadow-inner" 
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-xs font-bold text-[var(--theme-text-muted)] uppercase tracking-wider pl-1">Subject</label>
              <input 
                id="subject"
                type="text" 
                name="subject" 
                required
                value={formData.subject}
                onChange={handleChange}
                className="bg-transparent border border-[var(--theme-border)] rounded-xl px-4 py-3 text-[var(--theme-text)] text-[15px] font-medium placeholder:text-[var(--theme-text-muted)]/50 focus:outline-none focus:border-[var(--theme-accent)] focus:ring-1 focus:ring-[var(--theme-accent)] transition-all shadow-inner" 
                placeholder="What's this regarding?"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-bold text-[var(--theme-text-muted)] uppercase tracking-wider pl-1">Message</label>
              <textarea 
                id="message"
                name="message" 
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="bg-transparent border border-[var(--theme-border)] rounded-xl px-4 py-3 text-[var(--theme-text)] text-[15px] font-medium placeholder:text-[var(--theme-text-muted)]/50 focus:outline-none focus:border-[var(--theme-accent)] focus:ring-1 focus:ring-[var(--theme-accent)] transition-all resize-none shadow-inner custom-scrollbar" 
                placeholder="Your message here..."
              />
            </div>

            <button 
              type="submit" 
              disabled={formState === 'loading'}
              className="mt-2 ds-btn ds-btn-primary py-5 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed group w-full"
            >
              {formState === 'loading' ? (
                <>
                  <Loader2Icon size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <SendIcon size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Send Message
                </>
              )}
            </button>
          </form>

        </motion.div>
      </motion.div>
    </div>
  );
};

const SocialLink: React.FC<{ href: string; icon: React.ElementType; label: string }> = ({ href, icon: Icon, label }) => {
  const isPending = href.includes('TODO');
  return (
    <a 
      href={isPending ? '#' : href} 
      target={isPending ? '_self' : '_blank'} 
      rel="noreferrer"
      onClick={(e) => isPending && e.preventDefault()}
      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
        isPending 
          ? 'bg-transparent border-dashed border-[var(--theme-border)] text-[var(--theme-text-muted)] cursor-not-allowed opacity-60' 
          : 'bg-transparent border-[var(--theme-border)] hover:border-[var(--theme-accent)] text-[var(--theme-text)] hover:shadow-md group'
      }`}
    >
      <div className={`p-2 rounded-lg ${isPending ? 'bg-[var(--theme-surface)]' : 'bg-[var(--theme-surface)] group-hover:bg-[var(--theme-accent)]/10 group-hover:text-[var(--theme-accent)] transition-colors'}`}>
        <Icon size={18} />
      </div>
      <span className="font-semibold text-sm">
        {isPending ? `${label} (Pending)` : label}
      </span>
    </a>
  );
};

export default ContactApp;
