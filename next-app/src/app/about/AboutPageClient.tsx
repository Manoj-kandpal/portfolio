'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import data from '@/data/data.json'
import { TiltCard, BlurFade, Magnetic, Counter, SlideIn, TextReveal } from '@/components/MotionEffects'

export function AboutPageClient() {
  const { profile, about, background } = data

  return (
    <>
      {/* Hero */}
      <section className="py-20 px-6 bg-bg-alt border-b border-border overflow-hidden">
        <div className="max-w-content mx-auto grid md:grid-cols-[1fr_1.2fr] gap-14 items-center">
          <SlideIn direction="left">
            <TiltCard className="aspect-square rounded-[14px] bg-surface border border-border overflow-hidden shadow-card">
              <Image
                src={profile.photo}
                alt={profile.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </TiltCard>
          </SlideIn>

          <SlideIn direction="right" delay={0.15}>
            <p className="eyebrow">{about.eyebrow}</p>
            <h1 className="font-display text-4xl md:text-5xl mb-6">
              Hi, I'm <span className="text-accent">{profile.name.split(' ')[0]}</span>
            </h1>
            {about.paragraphs.map((p, i) => (
              <BlurFade key={i} delay={0.2 + i * 0.1}>
                <p className={`text-lg leading-relaxed ${i === 0 ? 'text-ink' : 'text-ink-muted mt-4'}`}>
                  {p}
                </p>
              </BlurFade>
            ))}
          </SlideIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-content mx-auto">
          <BlurFade>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
              {about.stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="card group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="block font-display text-4xl text-accent font-semibold">
                    {stat.value.includes('+') ? (
                      <>
                        <Counter to={parseInt(stat.value)} duration={2} />+
                      </>
                    ) : stat.value}
                  </span>
                  <span className="text-sm text-ink-muted mt-2 block group-hover:text-ink transition-colors">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Education */}
      <section className="py-16 px-6 bg-bg-alt border-y border-border">
        <div className="max-w-content mx-auto">
          <BlurFade className="section-head">
            <p className="eyebrow">Education</p>
            <h2>Academic Background</h2>
          </BlurFade>

          {background.education.map((edu, i) => (
            <BlurFade key={i} delay={0.1 + i * 0.1}>
              <motion.div 
                className="card group"
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex justify-between items-baseline flex-wrap gap-2 mb-2">
                  <h3 className="font-display text-xl group-hover:text-accent transition-colors">{edu.degree}</h3>
                  <span className="font-mono text-xs text-ink-muted">{edu.period}</span>
                </div>
                <p className="text-accent font-semibold">{edu.institution}</p>
                <p className="text-ink-muted mt-2 font-mono text-sm">{edu.grade}</p>
              </motion.div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-6">
        <div className="max-w-content mx-auto">
          <BlurFade className="section-head">
            <p className="eyebrow">Certifications</p>
            <h2>Continuous Learning</h2>
          </BlurFade>

          <div className="grid md:grid-cols-2 gap-4">
            {background.certifications.map((cert, i) => (
              <BlurFade key={i} delay={i * 0.05}>
                <motion.a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card flex justify-between items-center group"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div>
                    <h3 className="font-semibold group-hover:text-accent transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-ink-muted">{cert.issuer}</p>
                  </div>
                  <motion.span 
                    className="text-xs font-mono text-accent bg-accent-soft px-3 py-1.5 rounded-md"
                    whileHover={{ x: 3 }}
                  >
                    Verify →
                  </motion.span>
                </motion.a>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 px-6 bg-bg-alt border-t border-border">
        <div className="max-w-content mx-auto">
          <BlurFade className="section-head">
            <p className="eyebrow">Recognition</p>
            <h2>Achievements & Awards</h2>
          </BlurFade>

          <div className="space-y-4">
            {background.achievements.map((ach, i) => (
              <BlurFade key={i} delay={i * 0.1}>
                <motion.div 
                  className="card flex gap-4 items-start group"
                  whileHover={{ x: 8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div 
                    className="w-10 h-10 rounded-lg bg-accent-soft text-accent flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold group-hover:text-accent transition-colors">{ach.title}</h3>
                      <span className="font-mono text-xs text-accent">{ach.issuer}</span>
                    </div>
                    <p className="text-ink-muted text-sm">{ach.description}</p>
                  </div>
                </motion.div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center overflow-hidden">
        <BlurFade>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl mb-4">Want to work together?</h2>
            <p className="text-ink-muted mb-8">Let's connect and discuss opportunities.</p>
            <div className="flex justify-center gap-4">
              <Magnetic strength={0.2}>
                <Link href="/contact" className="btn btn-primary">
                  Get in touch
                </Link>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Link href="/experience" className="btn btn-ghost">
                  View experience
                </Link>
              </Magnetic>
            </div>
          </motion.div>
        </BlurFade>
      </section>
    </>
  )
}
