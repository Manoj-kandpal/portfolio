'use client'

import { motion } from 'framer-motion'
import data from '@/data/data.json'
import { TiltCard, BlurFade, Counter, SpotlightCard } from '@/components/MotionEffects'

export default function SkillsPage() {
  const { skills } = data

  return (
    <>
      {/* Header */}
      <section className="py-20 px-6 bg-bg-alt border-b border-border overflow-hidden">
        <div className="max-w-content mx-auto">
          <BlurFade>
            <p className="eyebrow">{skills.eyebrow}</p>
            <h1 className="font-display text-4xl md:text-5xl mb-4">
              {skills.title}
            </h1>
            <p className="text-lg text-ink-muted max-w-xl">
              {skills.subtitle}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-20 px-6">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {skills.categories.map((category, i) => (
              <BlurFade key={i} delay={i * 0.08}>
                <SpotlightCard className="card h-full">
                  <h2 className="font-mono text-xs text-ink-muted uppercase tracking-wide mb-4 flex items-center gap-2">
                    <motion.span 
                      className="w-2 h-2 rounded-full bg-accent"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    />
                    {category.name}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, j) => (
                      <motion.span
                        key={j}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 + j * 0.03 }}
                        whileHover={{ scale: 1.08, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="chip cursor-default"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Proficiency Visual */}
      <section className="py-16 px-6 bg-bg-alt border-t border-border">
        <div className="max-w-content mx-auto">
          <BlurFade className="section-head text-center mx-auto">
            <p className="eyebrow justify-center">Proficiency</p>
            <h2>Core Competencies</h2>
          </BlurFade>

          <div className="max-w-2xl mx-auto space-y-6">
            {[
              { skill: 'Full Stack Development', level: 95 },
              { skill: 'React / Next.js', level: 92 },
              { skill: 'Java / Spring Boot', level: 88 },
              { skill: 'REST API Design', level: 90 },
              { skill: 'Cloud & DevOps (Azure)', level: 80 },
            ].map((item, i) => (
              <BlurFade key={i} delay={i * 0.1}>
                <div className="flex items-center gap-4 group">
                  <span className="w-40 text-sm font-medium group-hover:text-accent transition-colors">{item.skill}</span>
                  <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent to-accent-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3, ease: [0.2, 0.7, 0.3, 1] }}
                    />
                  </div>
                  <span className="font-mono text-xs text-ink-muted w-10">
                    <Counter to={item.level} duration={1.5} />%
                  </span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
