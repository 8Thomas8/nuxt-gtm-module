<template>
  <div>
    <h1>
      Playground for 8Thomas8/nuxt-gtm-module
    </h1>

    <strong>
      Module options
    </strong>

    <pre>
      {{ options }}
    </pre>

    <hr>

    <strong>
      Tests events (check your console or a GTM Browser plugin)
    </strong>

    <button @click="triggerEvent()">
      Trigger Event
    </button>

    <button @click="triggerView()">
      Trigger Page View Event
    </button>
  </div>
</template>

<script lang="ts" setup>
import { type DataLayerObject, useGtm } from '@gtm-support/vue-gtm'
import { computed, onMounted, ref } from 'vue'

const gtm = useGtm()

const dataLayerPayload = ref<DataLayerObject[] | false | undefined >(undefined)

const options = computed(() => gtm?.options)

onMounted(() => {
  dataLayerPayload.value = window?.dataLayer
})

const triggerEvent = () => {
  gtm?.trackEvent({
    event: 'Test',
    label: 'Label',
  })

  dataLayerPayload.value = gtm?.dataLayer()
  console.log(dataLayerPayload.value)
}

const triggerView = () => {
  gtm?.trackView('Home page', '/')

  dataLayerPayload.value = gtm?.dataLayer()
}
</script>
