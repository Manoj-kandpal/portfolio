'use client'

import { motion } from 'framer-motion'
import data from '@/data/data.json'
import { TiltCard, BlurFade, Magnetic, GradientBorder } from '@/components/MotionEffects'

export default function ProjectsPage() {
  const { projects } = data

  return (
    <>
      {/* Header */}
      <section className="py-20 px-6 bg-bg-alt border-b border-border overflow-hidden">
        <div className="max-w-content mx-auto">
          <BlurFade>
            <p className="eyebrow">{projects.eyebrow}</p>
            <h1 className="font-display text-4xl md:text-5xl mb-4">
              {projects.title}
            </h1>
            <p className="text-lg text-ink-muted max-w-xl">
              {projects.subtitle}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-6">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.items.map((project, i) => (
              <BlurFade key={i} delay={i * 0.1}>
                <TiltCard className="card flex flex-col h-full group">
                  {/* Header */}
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <motion.h2 
                      className="font-display text-xl group-hover:text-accent transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      {project.title}
                    </motion.h2>
                    <div className="flex gap-2 flex-shrink-0">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                          aria-label="View on GitHub"
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.7.1-.7 1.3.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.4 1.2a11.8 11.8 0 0 1 6.2 0c2.4-1.5 3.4-1.2 3.4-1.2.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z"/>
                          </svg>
                        </motion.a>
                      )}
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, rotate: -10 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                          aria-label="View live demo"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-ink-muted leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border">
                    {project.tags.map((tag, j) => (
                      <motion.span
                        key={j}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 + j * 0.04 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="tag cursor-default"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </TiltCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source CTA */}
      <section className="py-16 px-6 bg-bg-alt border-t border-border text-center">
        <BlurFade>
          <GradientBorder className="inline-block">
            <div className="px-8 py-6">
              <h2 className="font-display text-3xl mb-4">More on GitHub</h2>
              <p className="text-ink-muted mb-6 max-w-md mx-auto">
                Check out my other repositories and open source contributions.
              </p>
              <Magnetic strength={0.2}>
                <a
                  href={data.profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary inline-flex"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.7.1-.7 1.3.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.4 1.2a11.8 11.8 0 0 1 6.2 0c2.4-1.5 3.4-1.2 3.4-1.2.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z"/>
                  </svg>
                  View GitHub Profile
                </a>
              </Magnetic>
            </div>
          </GradientBorder>
        </BlurFade>
      </section>
    </>
  )
}
