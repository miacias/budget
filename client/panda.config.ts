import { defineConfig } from '@pandacss/dev'
import { navigation } from './recipes';
import { createPreset } from '@park-ui/panda-preset'

export default defineConfig({
  preflight: true,
  // plugins: [tsconfigPaths({ root: './' })],
  presets: [createPreset({ radius: 'sm' })],
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  jsxFramework: 'react',
  outdir: 'styled-system',
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: { value: 'orange' },
          secondary: { value: '#334155' },
          slate: {
            100: { value: '#f1f5f9' },
            500: { value: '#64748b' },
            700: { value: '#334155' }
          }
        },
        fonts: {
          body: { value: 'system-ui, sans-serif' }
        },
        shadows: {
          sm: { value: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }
        }
      },
      recipes: {
        navigation
      }
    }
  }
})