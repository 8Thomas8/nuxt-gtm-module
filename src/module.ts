import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {
  id: string
  defer?: boolean
  compatibility?: boolean
  enabled?: boolean
  debug?: boolean
  loadScript?: boolean
  trackOnNextTick?: boolean
  routerSync?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@8Thomas8/nuxt-gtm-module',
    configKey: 'gtmModule',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults: {
    id: '',
    defer: false,
    compatibility: false,
    enabled: true,
    debug: false,
    loadScript: true,
    trackOnNextTick: false,
    routerSync: true,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.gtmModule = {
      ...options,
      ...nuxt.options.runtimeConfig.public.gtmModule as ModuleOptions,
    }

    addPlugin({
      src: resolver.resolve('./runtime/plugin'),
      mode: 'client' })
  },
})
