<template>
  <ul
    ref="subnav"
    class="site-subnav__list js-subnav"
    :class="`site-subnav__list--depth-${navDepth}`"
  >
    <li
      v-for="item in navItems"
      :key="item.id"
      class="site-subnav__item"
      :class="checkForSub(item) ? 'has-sub-menu' : ''"
    >
      <router-link
        class="site-subnav__link"
        :to="item.url"
      >
        <span>{{ item.label }}</span>
      </router-link>

      <SvgIcon
        v-if="checkForSub(item)"
        class="site-subnav__icon js-nav-icon"
        :icon-name="`ico-arrow-${icon}`"
        :on-click="toggleSubMenu"
      />

      <MainNavigationSub
        v-if="checkForSub(item)"
        :sub-items="item.childItems.nodes"
        :depth="depthInc(navDepth)"
        :check-for-sub="checkForSub"
        :toggle-sub-menu="toggleSubMenu"
      />
    </li>
  </ul>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'

    export default Vue.extend({
        name: 'MainNavigationSub',

        components: {
            SvgIcon,
        },

        props: {
            subItems: {
                type: Array,
                required: true,
            },
            depth: {
                type: Number,
                required: true,
            },
            checkForSub: {
                type: Function,
                required: true,
            },
            toggleSubMenu: {
                type: Function,
                required: true,
            },
        },

        data() {
            return {
                navDepth: this.depth,
                innerWidth: 0,
                icon: 'right',
            }
        },

        computed: {
            navItems() {
                return this.subItems
            },
        },

        watch: {
            innerWidth(newWidth) {
                this.icon = newWidth < 1200 ? 'down' : 'right'
            },
        },

        beforeMount() {
            window.addEventListener('resize', this.handleResize)
            this.handleResize()
        },

        destroyed() {
            window.removeEventListener('resize', this.handleResize)
        },

        methods: {
            depthInc(depth) {
                return ++depth
            },
            handleResize() {
                this.innerWidth = window.innerWidth
            },
        },
    })
</script>

<style lang="scss" scoped>
    .site-subnav__list {
        @include mq($xl + 1, 'min') {
            position: absolute;
            left: 0;
            top: 100%;
            z-index: 10;
            background-color: $white;
            transition: $dur $ease;
            transform: translateY(5px);
            opacity: 0;
            visibility: hidden;
            padding: 15px;
            list-style: none;
            margin: 0;
            font-size: 14px;
            line-height: 1.3;
            box-shadow: 5px 5px 0 0 rgba($black, .3);

            .site-subnav__list {
                left: 100%;
                top: 0;
                transform: translateX(5px);
            }
        }

        @include mq($xl) {
            padding-left: 15px;
            overflow: hidden;
            display: none;
        }
    }

    .site-subnav__item {
        position: relative;

        @include mq($xl + 1, 'min') {
            margin: 20px 0;
            position: relative;

            &:first-of-type {
                margin-top: 0;
            }

            &:last-of-type {
                margin-bottom: 0;

                &::after {
                    content: none;
                }
            }

            &::after {
                content: '';
                display: block;
                background-color: $red;
                width: 100%;
                height: 1px;
                position: absolute;
                bottom: -10px;
                left: 0;
            }

            &.has-sub-menu {
                padding-right: 20px;
            }
        }

        @include hover {
            > .site-subnav__link {
                color: $red;
            }

            :deep() {
                > .site-subnav__list {
                    transform: translateX(0);
                    opacity: 1;
                    visibility: visible;
                }
            }
        }
    }

    .site-subnav__icon {
        color: $black;
        right: 0;
        @include center(y);

        @include mq($xl) {
            color: $white;
            z-index: 10;
            cursor: pointer;
            font-size: 20px;
            padding: 4px 5px;
            top: 2px;
            transform: none;
            transition: $dur $ease;

            &.is-active {
                transform: rotate(180deg);
            }
        }
    }

    .site-subnav__link {
        display: block;
        color: $black;
        transition: $dur $ease;

        @include mq($xl + 1, 'min') {
            width: 200px;
        }

        @include mq($xl) {
            color: $white;
            font-size: 14px;
        }
    }
</style>
