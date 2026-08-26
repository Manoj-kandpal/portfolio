'use client'

import { motion } from 'framer-motion'
import data from '@/data/data.json'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'

export default function ContactPage() {
  const { profile, contact } = data

  const contactMethods = [
    {
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      ),
      primary: true,
    },
    {
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phoneRaw}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      value: 'in/m-kandpal',
      href: profile.linkedin,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
        </svg>
      ),
    },
    {
      label: 'GitHub',
      value: 'Manoj-kandpal',
      href: profile.github,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.7.1-.7 1.3.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.4 1.2a11.8 11.8 0 0 1 6.2 0c2.4-1.5 3.4-1.2 3.4-1.2.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z"/>
        </svg>
      ),
    },
  ]

  return (
    <>
      {/* Header */}
      <section className="py-20 px-6 bg-bg-alt border-b border-border">
        <div className="max-w-content mx-auto text-center">
          <AnimatedSection>
            <p className="eyebrow justify-center">{contact.eyebrow}</p>
            <h1 className="font-display text-4xl md:text-5xl mb-4">
              {contact.title}
            </h1>
            <p className="text-lg text-ink-muted max-w-lg mx-auto">
              {contact.subtitle}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <StaggerContainer className="space-y-4" staggerDelay={0.1}>
            {contactMethods.map((method, i) => (
              <StaggerItem key={i}>
                <motion.a
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ x: 8 }}
                  className={`card flex items-center gap-5 group ${
                    method.primary ? 'border-accent bg-accent-soft' : ''
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    method.primary 
                      ? 'bg-accent text-accent-ink' 
                      : 'bg-accent-soft text-accent group-hover:bg-accent group-hover:text-accent-ink'
                  }`}>
                    {method.icon}
                  </div>
                  <div className="flex-grow">
                    <span className="text-xs font-mono text-ink-muted uppercase tracking-wide">
                      {method.label}
                    </span>
                    <p className="font-medium group-hover:text-accent transition-colors">
                      {method.value}
                    </p>
                  </div>
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.8" 
                    className="w-5 h-5 text-ink-muted group-hover:text-accent transition-colors"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Resume Download */}
      <section className="py-16 px-6 bg-bg-alt border-t border-border">
        <div className="max-w-content mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-display text-2xl mb-4">Need my resume?</h2>
            <p className="text-ink-muted mb-6">
              Download my full CV with detailed experience and skills.
            </p>
            <a
              href={profile.resume}
              download
              target="_blank"
              rel="noopener"
              className="btn btn-primary"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume (PDF)
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 px-6">
        <div className="max-w-content mx-auto text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 text-ink-muted">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-accent">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Based in {profile.location}</span>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
