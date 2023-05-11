import "@formkit/themes/genesis"
import { genesisIcons } from "@formkit/icons"
import { defaultConfig } from '@formkit/vue'
import { createMultiStepPlugin } from '@formkit/addons'
import { generateClasses } from '@formkit/themes'
import theme from './theme';
import '@formkit/addons/css/multistep'
import { fr } from '@formkit/i18n'

const config = defaultConfig({
  config: {
    classes: generateClasses(theme)
  },
  locales: {fr},
  locale: 'fr',
  icons: { ...genesisIcons },
  plugins: [createMultiStepPlugin()],
})

export default config
