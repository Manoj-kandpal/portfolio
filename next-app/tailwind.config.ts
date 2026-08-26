import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme
        bg: 'var(--bg)',
        'bg-alt': 'var(--bg-alt)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)',
        'accent-soft': 'var(--accent-soft)',
        'accent-2': 'var(--accent-2)',
        border: 'var(--border)',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '14px',
      },
      maxWidth: {
        content: '1080px',
      },
      transitionDuration: {
        DEFAULT: '600ms',
      },
      boxShadow: {
        soft: '0 4px 12px var(--shadow)',
        card: '0 16px 32px -18px var(--shadow)',
        'card-hover': '0 18px 36px -20px var(--shadow)',
      },
      animation: {
        'draw-line': 'draw 2.4s 0.3s cubic-bezier(.2,.7,.3,1) forwards',
        'pop-in': 'pop 0.5s 2.2s ease forwards',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
      },
      keyframes: {
        draw: {
          to: { strokeDashoffset: '0' },
        },
        pop: {
          to: { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
