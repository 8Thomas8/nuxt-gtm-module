import type { VueGtmUseOptions } from '@gtm-support/vue-gtm'
import VueGtm from '@gtm-support/vue-gtm'
import { defineNuxtPlugin, useRouter } from '#app'
import type { ModuleOptions } from '~/src/module'

export default defineNuxtPlugin((_nuxtApp) => {
  const options = _nuxtApp.$config.public.gtmModule as ModuleOptions
  const router = useRouter()

  if (!options.id) {
    console.warn('GTM ID is required')
    return
  }

  const gtmOptions: VueGtmUseOptions = {
    ...options,
    vueRouter: options.routerSync && router ? router : undefined,
  }

  _nuxtApp.vueApp.use(VueGtm, gtmOptions)
})
