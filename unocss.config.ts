import { defineConfig, presetUno, presetWind, presetIcons } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'

export default defineConfig({
  presets: [
    presetUno(),
    presetWind() /* tailwind compatible */,
    presetWebFonts({
      provider: 'google',
      fonts: {
        serif: {
          name: 'Kaisei HarunoUmi',
          weights: [400],
          italic: true,
        },
      },
    }),
    presetIcons(),
  ],
  theme: {},
  // cli: {
  //   entry: {
  //     outFile: "src/app/(app)/uno.css",
  //   },
  // },
})
