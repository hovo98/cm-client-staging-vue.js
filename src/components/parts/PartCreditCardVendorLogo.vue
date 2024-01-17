<template>
  <img
    v-if="vendor in vendorImages"
    :src="vendorImages[vendor]"
    :alt="vendor"
  />
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    vendor: {
      type: String,
      default: "visa",
    },
  },
  setup() {
    const vendorImages = {
      visa: "https://d3i4yxtzktqr9n.cloudfront.net/web-payments-experience/6d63c4639b697728ec7770a4ea75e835.svg",
      mastercard: "https://d3i4yxtzktqr9n.cloudfront.net/web-money/4062c48b18afadc1a48be7aa1941aa5a.svg",
      amex: "https://d3i4yxtzktqr9n.cloudfront.net/web-payments-experience/1bedd2b1e025f4f6a7411e644ec3327b.svg",
    }

    return {
      vendorImages,
    }
  },
})
</script>