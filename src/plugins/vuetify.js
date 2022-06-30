
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
import es from 'vuetify/src/locale/es.ts'
Vue.use(Vuetify)




const opts = {
    theme: {
        themes: {
          light: {
            primary: colors.purple,
            secondary: colors.grey.darken1,
            accent: colors.shades.black,
            error: colors.red.accent3,
          },
          dark: {
            primary: colors.blue.lighten3,
          },
        },
      },
      lang: {
        locales: { es },
        current: 'es'
      }
}

export default new Vuetify(opts)

