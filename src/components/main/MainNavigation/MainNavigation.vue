<template>
  <nav class="site-nav">
    <ul class="site-nav__list">
      <li
        v-for="item in menuItems"
        ref="nav-item"
        :key="item.id"
        class="site-nav__item"
        :class="checkForSub(item) ? 'has-sub-menu' : ''"
      >
        <router-link
          ref="nav-link"
          class="site-subnav__link"
          :to="item.url"
        >
          <span>{{ item.label }}</span>
        </router-link>

        <SvgIcon
          v-if="checkForSub(item)"
          class="site-nav__icon js-nav-icon"
          icon-name="ico-arrow-down"
          :on-click="toggleSubMenu"
        />

        <MainNavigationSub
          v-if="checkForSub(item)"
          :sub-items="item.childItems.nodes"
          :depth="1"
          :check-for-sub="checkForSub"
          :toggle-sub-menu="toggleSubMenu"
        />
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
    import Vue from 'vue'
    import MainNavigationSub from '@/components/main/MainNavigation/MainNavigationSub.vue'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import { domQueryAll, slideToggle } from '@/config/util'

    export default Vue.extend({
        components: {
            MainNavigationSub,
            SvgIcon,
        },

        props: {
            menuItems: {
                type: Array,
                required: true,
            },
        },

        data() {
            return {
                activeSubs: [],
            }
        },

        methods: {
            checkForSub(item) {
                return item.childItems && item.childItems.nodes.length > 0
            },
            toggleSubMenu(e) {
                const classActive = 'is-active'
                const slNavIcon = '.js-nav-icon'
                const slSubNav = '.js-subnav'

                const icon = e.target.closest(slNavIcon)
                const ul = icon.parentNode.querySelector(slSubNav)

                if (!icon.classList.contains(classActive)) {
                    icon.classList.add(classActive)
                    slideToggle.slideDown(ul)
                } else {
                    icon.classList.remove(classActive)
                    slideToggle.slideUp(ul)
                    domQueryAll(slSubNav, ul, el => {
                        el.parentNode.querySelector(slNavIcon).classList.remove(classActive)
                        slideToggle.slideUp(el)
                    })
                }
            },
        },
    })
</script>

<style lang="scss" scoped>
    .site-nav {
        line-height: 2;
    }

    .site-nav__list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        @include mq($xl) {
            display: block;
        }
    }

    .site-nav__item {
        position: relative;

        @include mq($xl + 1, 'min') {
            margin-left: 20px;

            &:first-child {
                margin: 0;
            }

            &.has-sub-menu {
                padding-right: 20px;
            }
        }

        @include mq($xl) {
            margin: 0 0 5px;
            padding-bottom: 5px;
            border-bottom: 1px solid rgba($white, .2);
            overflow: hidden;
            transition: $dur $ease;

            &:last-child {
                border: 0;
                margin: 0;
            }
        }

        @include hover {
            > .site-nav__link::after {
                transform: translateX(-50%) scaleX(1);
            }

            :deep() {
                > .site-subnav__list {
                    transform: translateY(0);
                    opacity: 1;
                    visibility: visible;
                }
            }
        }
    }

    .site-subnav__link {
        color: $white;
    }

    .site-nav__icon {
        color: $white;
        right: 0;
        @include center(y);

        @include mq($xl) {
            z-index: 10;
            cursor: pointer;
            font-size: 20px;
            padding: 5px;
            top: 1px;
            transform: none;
            transition: $dur $ease;

            &.is-active {
                transform: rotate(180deg);
            }
        }
    }

    .site-nav__link {
        display: block;
        position: relative;
        text-decoration: none;
        color: $white;
        transition: $dur $ease;

        &::after {
            content: '';
            display: block;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%) scaleX(0);
            width: 100%;
            height: 1px;
            background-color: $white;
            transition: $dur $ease;
        }

        &.nuxt-link-active {
            color: $red;
        }
    }
</style>
