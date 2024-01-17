<template>
  <span class="svg-icon">
    <Icon :icon-name="iconName" />
  </span>
</template>

<script lang="ts">
    import Icon from './SvgIconGen.vue'

    export default {
        components: {
            Icon,
        },
        props: {
            iconName: {
                type: String,
                required: true,
            },
        },
    }
</script>

<style lang="scss" scoped>
    .svg-icon {
        display: inline-flex;
        line-height: 1;

        svg {
            width: 1em;
        }
    }

    @include browser-support(safari) {
        // This fixes the height of svg icons, on safari.
        .svg-icon {
            display: inline-block;
        }
    }
</style>
