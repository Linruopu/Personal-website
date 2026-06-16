/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,md}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        'bg-soft': 'rgb(var(--color-bg-soft) / <alpha-value>)',
        'bg-card': 'rgb(var(--color-bg-card) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        'text-strong': 'rgb(var(--color-text-strong) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-hover': 'rgb(var(--color-accent-hover) / <alpha-value>)',
      },
      fontFamily: {
        sans: [
          'Inter', 'ui-sans-serif', 'system-ui', '-apple-system',
          'BlinkMacSystemFont', '"Segoe UI"', '"PingFang SC"',
          '"Hiragino Sans GB"', '"Microsoft YaHei"', '"Noto Sans SC"',
          'sans-serif',
        ],
        mono: [
          '"SF Mono"', '"Fira Code"', '"Fira Mono"',
          '"Roboto Mono"', 'Menlo', 'monospace',
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            // Wire prose variables into our CSS custom properties.
            // When .dark changes --color-*, prose picks up the new values automatically.
            '--tw-prose-body': 'rgb(var(--color-text))',
            '--tw-prose-headings': 'rgb(var(--color-text-strong))',
            '--tw-prose-lead': 'rgb(var(--color-text))',
            '--tw-prose-links': 'rgb(var(--color-accent))',
            '--tw-prose-bold': 'rgb(var(--color-text-strong))',
            '--tw-prose-counters': 'rgb(var(--color-text-muted))',
            '--tw-prose-bullets': 'rgb(var(--color-text-muted))',
            '--tw-prose-hr': 'rgb(var(--color-border))',
            '--tw-prose-quotes': 'rgb(var(--color-text))',
            '--tw-prose-quote-borders': 'rgb(var(--color-accent))',
            '--tw-prose-captions': 'rgb(var(--color-text-muted))',
            '--tw-prose-code': 'rgb(var(--color-text-strong))',
            '--tw-prose-pre-code': 'rgb(var(--color-text))',
            '--tw-prose-pre-bg': 'rgb(var(--color-bg-card))',
            '--tw-prose-th-borders': 'rgb(var(--color-border))',
            '--tw-prose-td-borders': 'rgb(var(--color-border))',
            // Override Tailwind's default gray-code background
            '--tw-prose-code-bg': 'rgb(var(--color-bg-soft))',
            color: 'rgb(var(--color-text))',
            h2: {
              color: 'rgb(var(--color-text-strong))',
              fontFamily: 'inherit',
              fontSize: '1.55rem',
              lineHeight: '1.35',
              fontWeight: '750',
              marginTop: '3rem',
              marginBottom: '1rem',
            },
            h3: {
              color: 'rgb(var(--color-text-strong))',
              fontFamily: 'inherit',
              fontSize: '1.2rem',
              lineHeight: '1.4',
              fontWeight: '700',
              marginTop: '2rem',
              marginBottom: '0.75rem',
            },
            p: {
              fontSize: '1.05rem',
              lineHeight: '1.85',
              marginBottom: '1.25rem',
            },
            li: {
              fontSize: '1.05rem',
              lineHeight: '1.85',
            },
            a: {
              color: 'rgb(var(--color-accent))',
              textDecoration: 'underline',
              textDecorationStyle: 'dotted',
              textDecorationThickness: '2px',
              textUnderlineOffset: '4px',
            },
            'a:hover': {
              color: 'rgb(var(--color-accent-hover))',
            },
            blockquote: {
              color: 'rgb(var(--color-text))',
              borderLeftColor: 'rgb(var(--color-accent))',
            },
            strong: {
              color: 'rgb(var(--color-text-strong))',
            },
            code: {
              fontFamily: 'inherit',
              backgroundColor: 'rgb(var(--color-bg-soft))',
              color: 'rgb(var(--color-text-strong))',
              border: '1px solid rgb(var(--color-border))',
              borderRadius: '6px',
              padding: '2px 6px',
              fontSize: '0.9em',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              backgroundColor: 'rgb(var(--color-bg-card))',
              border: '1px solid rgb(var(--color-border))',
              borderRadius: '14px',
              fontSize: '0.9rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
              border: 'none',
              padding: '0',
            },
            table: {
              fontSize: '0.9rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
