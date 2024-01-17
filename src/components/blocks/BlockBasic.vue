<template>
  <section
    v-if="data.content"
    :id="data.sectionId"
    class="basic-block"
  >
    <b-container>
      <div
        class="entry-content"
        @click="imgClick"
        v-html="data.content"
      />
    </b-container>

    <CoolLightBox
      :items="items"
      :index="index"
      @close="closeLightBox"
    />
  </section>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoolLightBox from 'vue-cool-lightbox'

    export default Vue.extend({

        components: {
            CoolLightBox,
        },
		props: {
			data: {
				type: Object,
				required: true,
			},
		},

        data: function () {
            return {
                items: [],
                index: null,
            }
        },

        methods: {
            imgClick(e) {
                const el = e.target
                const elClass = el.getAttribute('class')
                if (elClass && elClass.includes('wp-image')) {
                    e.preventDefault()
                    this.items.push(el.parentNode.getAttribute('href'))
                    this.index = 0
                }
            },

            closeLightBox() {
                this.items = []
                this.index = null
            },
        },
	})
</script>

<style lang="scss" scoped>
    .basic-block {
        padding: 100px 0;
    }
</style>
