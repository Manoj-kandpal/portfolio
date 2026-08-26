'use client'

import { Metadata } from 'next'
import { motion } from 'framer-motion'
import data from '@/data/data.json'
import { AnimatedSection } from '@/components/AnimatedSection'

export default function ExperiencePage() {
  const { experience } = data

  return (
    <>
      {/* Header */}
      <section className="py-20 px-6 bg-bg-alt border-b border-border">
        <div className="max-w-content mx-auto">
          <AnimatedSection>
            <p className="eyebrow">{experience.eyebrow}</p>
            <h1 className="font-display text-4xl md:text-5xl mb-4">
              {experience.title}
            </h1>
            <p className="text-lg text-ink-muted max-w-xl">
              {experience.subtitle}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-content mx-auto">
          <div className="relative pl-12">
            {/* Timeline Line */}
            <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-border" />
            
            {/* Animated Progress Line */}
            <motion.div
              className="absolute left-[9px] top-2 w-0.5 bg-accent"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.5, ease: [0.2, 0.7, 0.3, 1] }}
            />

            {/* Jobs */}
            <div className="space-y-14">
              {experience.jobs.map((job, i) => (
                <AnimatedSection key={i} delay={i * 0.15}>
                  <div className="relative">
                    {/* Timeline Dot */}
                    <motion.div
                      className="absolute -left-12 top-1 w-5 h-5 rounded-full bg-surface border-2 border-accent flex items-center justify-center"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    </motion.div>

                    {/* Card */}
                    <div className="card">
                      <div className="flex justify-between items-baseline flex-wrap gap-3 mb-2">
                        <h2 className="font-display text-2xl">{job.role}</h2>
                        <span className="font-mono text-sm text-ink-muted whitespace-nowrap">
                          {job.date}
                        </span>
                      </div>
                      <p className="text-accent font-semibold mb-6">{job.company}</p>

                      <ul className="space-y-4">
                        {job.highlights.map((highlight, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 + j * 0.05 }}
                            className="relative pl-5 text-ink-muted leading-relaxed"
                          >
                            <span className="absolute left-0 top-0 text-accent-2">–</span>
                            {highlight}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-bg-alt border-t border-border text-center">
        <AnimatedSection>
          <h2 className="font-display text-3xl mb-4">Interested in working together?</h2>
          <p className="text-ink-muted mb-8">
            I'm open to new opportunities and collaborations.
          </p>
          <a href={`mailto:${data.profile.email}`} className="btn btn-primary">
            Get in touch
          </a>
        </AnimatedSection>
      </section>
    </>
  )
}
