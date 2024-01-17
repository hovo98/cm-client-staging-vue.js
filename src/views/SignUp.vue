<template>
  <BlockSignUp />
</template>

<script lang="ts">
    import Vue from 'vue'
    import BlockSignUp from '@/components/blocks/BlockSignUp/BlockSignUp.vue'

	export default Vue.extend({
		name: 'SignUp',

		components: {
            BlockSignUp,
        },
	})
</script>

<style lang="scss">
    .page-sign-up {
        padding: 10.4vh 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: $aqua-haze;
        min-height: calc(100vh - 85px);
        overflow-x: hidden;

        @include mq($lap-xxl) {
            padding: 75px 15px;
        }

        @include mq($lg) {
            padding: 50px 15px;
            min-height: calc(100vh - 127px);
        }
    }
</style>

