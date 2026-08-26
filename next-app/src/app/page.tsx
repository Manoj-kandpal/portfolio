'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import data from '@/data/data.json'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { TiltCard, BlurFade, Magnetic, TextReveal, Floating, GradientBorder, SlideIn } from '@/components/MotionEffects'

export default function Home() {
  const { profile, about, experience, skills, projects } = data
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <>
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center py-20 px-6 overflow-hidden">
        {/* Animated Background Gradient */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute top-20 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-40 w-96 h-96 bg-accent-2/10 rounded-full blur-3xl" />
        </motion.div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-content mx-auto w-full relative z-10"
        >
          {/* Status Pill with pulse */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="status-pill"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"
            />
            <span>{profile.status.replace('🟢 ', '')}</span>
          </motion.div>

          {/* Eyebrow */}
          <BlurFade delay={0.2}>
            <p className="eyebrow">{profile.eyebrow}</p>
          </BlurFade>

          {/* Main Headline with Text Reveal */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight"
          >
            <TextReveal text={profile.heroHeadline} delay={0.4} />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="block text-accent italic font-medium text-xl md:text-2xl mt-4"
            >
              {profile.heroRole}
            </motion.span>
          </motion.h1>

          {/* Subtitle with blur fade */}
          <BlurFade delay={0.6}>
            <p
              className="max-w-xl mt-6 text-lg text-ink-muted"
              dangerouslySetInnerHTML={{ __html: profile.heroSub }}
            />
          </BlurFade>

          {/* CTAs with Magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <Magnetic strength={0.2}>
              <Link href="/experience" className="btn btn-primary">
                View my work
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href={profile.resume}
                className="btn btn-ghost"
                download
                target="_blank"
                rel="noopener"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>Resume</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link href="/contact" className="btn btn-ghost">
                Get in touch
              </Link>
            </Magnetic>
          </motion.div>

          {/* Animated Route Line */}
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-16 w-full max-w-2xl"
            viewBox="0 0 640 60"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,30 C 100,10 180,50 280,28 S 460,4 640,34"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="text-accent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.2, ease: [0.2, 0.7, 0.3, 1] }}
            />
            <motion.circle
              cx="0"
              cy="30"
              r="4"
              className="fill-bg stroke-accent-2"
              strokeWidth="1.6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.8 }}
            />
            <motion.circle
              cx="640"
              cy="34"
              r="4"
              className="fill-bg stroke-accent-2"
              strokeWidth="1.6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 3 }}
            />
          </motion.svg>
        </motion.div>
      </section>

      {/* Quick About Preview */}
      <section className="py-20 px-6 bg-bg-alt border-y border-border">
        <div className="max-w-content mx-auto grid md:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
          <SlideIn direction="left">
            <TiltCard className="aspect-square rounded-[14px] bg-surface border border-border overflow-hidden shadow-lg">
              <Image
                src={profile.photo}
                alt={profile.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
                priority
              />
            </TiltCard>
          </SlideIn>

          <SlideIn direction="right" delay={0.1}>
            <p className="eyebrow">{about.eyebrow}</p>
            {about.paragraphs.map((p, i) => (
              <BlurFade key={i} delay={0.2 + i * 0.1}>
                <p className={`text-lg ${i === 0 ? 'text-ink' : 'text-ink-muted mt-4'}`}>
                  {p}
                </p>
              </BlurFade>
            ))}

            <div className="flex flex-wrap gap-9 mt-8">
              {about.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="block font-display text-3xl text-accent font-semibold">
                    {stat.value}
                  </span>
                  <span className="text-sm text-ink-muted">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            <Magnetic strength={0.15}>
              <Link href="/about" className="btn btn-ghost mt-8 inline-flex">
                More about me
              </Link>
            </Magnetic>
          </SlideIn>
        </div>
      </section>

      {/* Experience Preview */}
      <section className="py-20 px-6">
        <div className="max-w-content mx-auto">
          <BlurFade className="section-head">
            <p className="eyebrow">{experience.eyebrow}</p>
            <h2>{experience.title}</h2>
            <p>{experience.subtitle}</p>
          </BlurFade>

          <div className="space-y-6">
            {experience.jobs.slice(0, 2).map((job, i) => (
              <BlurFade key={i} delay={0.1 + i * 0.15}>
                <motion.div 
                  className="card group"
                  whileHover={{ x: 8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex justify-between items-baseline flex-wrap gap-2 mb-1">
                    <h3 className="font-display text-xl group-hover:text-accent transition-colors">{job.role}</h3>
                    <span className="font-mono text-xs text-ink-muted">{job.date}</span>
                  </div>
                  <span className="text-accent font-semibold text-sm block mb-4">
                    {job.company}
                  </span>
                  <ul className="space-y-2">
                    {job.highlights.slice(0, 3).map((h, j) => (
                      <li key={j} className="text-ink-muted text-sm pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-accent-2">
                        {h}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </BlurFade>
            ))}
          </div>

          <BlurFade delay={0.4} className="mt-8">
            <Magnetic strength={0.15}>
              <Link href="/experience" className="btn btn-ghost inline-flex">
                View full experience
              </Link>
            </Magnetic>
          </BlurFade>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-20 px-6 bg-bg-alt border-y border-border">
        <div className="max-w-content mx-auto">
          <BlurFade className="section-head">
            <p className="eyebrow">{skills.eyebrow}</p>
            <h2>{skills.title}</h2>
            <p>{skills.subtitle}</p>
          </BlurFade>

          <div className="grid md:grid-cols-2 gap-6">
            {skills.categories.slice(0, 4).map((cat, i) => (
              <BlurFade key={i} delay={0.1 + i * 0.1}>
                <TiltCard className="card h-full">
                  <h3 className="font-mono text-xs text-ink-muted uppercase tracking-wide mb-3">
                    {cat.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item, j) => (
                      <motion.span 
                        key={j} 
                        className="chip"
                        whileHover={{ scale: 1.1, y: -3 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </TiltCard>
              </BlurFade>
            ))}
          </div>

          <BlurFade delay={0.5} className="mt-8">
            <Magnetic strength={0.15}>
              <Link href="/skills" className="btn btn-ghost inline-flex">
                View all skills
              </Link>
            </Magnetic>
          </BlurFade>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-20 px-6">
        <div className="max-w-content mx-auto">
          <BlurFade className="section-head">
            <p className="eyebrow">{projects.eyebrow}</p>
            <h2>{projects.title}</h2>
            <p>{projects.subtitle}</p>
          </BlurFade>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.items.slice(0, 2).map((project, i) => (
              <BlurFade key={i} delay={0.1 + i * 0.15}>
                <TiltCard className="card flex flex-col gap-4 h-full group">
                  <div className="flex justify-between items-start">
                    <h3 className="font-display text-lg group-hover:text-accent transition-colors">{project.title}</h3>
                    <div className="flex gap-2">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                          aria-label="GitHub"
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
                          whileHover={{ scale: 1.15, rotate: -5 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                          aria-label="Live Demo"
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
                  <p className="text-ink-muted text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {project.tags.slice(0, 4).map((tag, j) => (
                      <motion.span 
                        key={j} 
                        className="tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + j * 0.05 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </TiltCard>
              </BlurFade>
            ))}
          </div>

          <BlurFade delay={0.4} className="mt-8">
            <Magnetic strength={0.15}>
              <Link href="/projects" className="btn btn-ghost inline-flex">
                View all projects
              </Link>
            </Magnetic>
          </BlurFade>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-bg-alt border-t border-border text-center overflow-hidden">
        <BlurFade>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow justify-center">{data.contact.eyebrow}</p>
            <h2 className="font-display text-4xl md:text-5xl max-w-xl mx-auto">
              <TextReveal text={data.contact.title} delay={0.2} />
            </h2>
            <motion.p 
              className="text-ink-muted mt-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {data.contact.subtitle}
            </motion.p>
            <motion.div 
              className="flex justify-center gap-4 mt-8 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <Magnetic strength={0.2}>
                <a href={`mailto:${profile.email}`} className="btn btn-primary">
                  Email me
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Link href="/contact" className="btn btn-ghost">
                  All contact options
                </Link>
              </Magnetic>
            </motion.div>
          </motion.div>
        </BlurFade>
      </section>
    </>
  )
}
