import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/HomePage.vue'
import LenderProfile from "@/services/graphql/Lender/LenderProfile"
import $store from "@/store"

Vue.use(VueRouter)

/**
 * @author Nikola Popov
 */


const lenderRole = (to, from, next) => {
    const lStorage = localStorage.getItem('auth') || null
    if (lStorage) {
        const data = JSON.parse(lStorage)

        if(data.user.role === 'lender') {
            if(data.non_beta_user && to.path !== '/lender-deals' && to.path !== '/profile-settings') {
                if(from.path === '/lender-deals' || from.path === '/profile-settings') {
                    return
                } else {
                    next('/lender-deals')
                }
            } else {
                next()
            }
        } else {
            next('/broker-deals')
        }
    } else {
        localStorage.setItem('rememberPath', JSON.stringify(to.fullPath))
        next('/login')
    }
}


const brokerRole = (to, from, next) => {
    const lStorage = localStorage.getItem('auth') || null
    if (lStorage) {
        const data = JSON.parse(lStorage)

        if(data.user.role === 'broker') {
            if(data.non_beta_user && to.path !== '/broker-deals' && to.path !== '/profile-settings') {
                if(from.path === '/broker-deals' || from.path === '/profile-settings') {
                    return
                } else {
                    console.warn('ENTRO POR EL MIDDLEWARE DE BROKER ROLE')
                    next('/broker-deals')
                }
            } else {
                next()
            }
        } else {
            next('/lender-deals')
        }
    } else {
        localStorage.setItem('rememberPath', JSON.stringify(to.fullPath))
        next('/login')
    }
}

const forbidenPage = (to, from, next) => {
    const lStorage = localStorage.getItem('auth') || null
    if (lStorage) {
        const data = JSON.parse(lStorage);
        (data.user.role === 'broker')
            ? next('/broker-deals')
            : next('/lender-deals')
    } else {
        localStorage.setItem('rememberPath', JSON.stringify(to.fullPath))
        next('/login')
    }
}

const checkIflogedIn = (to, from, next) => {
    const lStorage = localStorage.getItem('auth') || null
    if (lStorage) {
        next()
    } else {
        localStorage.setItem('rememberPath', JSON.stringify(to.fullPath))
        next('/login')
    }
}

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutPage.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/LoginPage.vue'),
    },
    {
        path: '/sign-up',
        name: 'Sign Up',
        component: () => import(/* webpackChunkName: "sign-up" */ '../views/SignUp.vue'),
    },
    {
        path: '/sign-up/:type',
        name: 'Sign Up With Type',
        component: () => import(/* webpackChunkName: "sign-up" */ '../views/SignUp.vue'),
    },
    {
        path: '/sign-up/:type/:step',
        name: 'Sign Up With Type And Steps',
        component: () => import(/* webpackChunkName: "sign-up" */ '../views/SignUp.vue'),
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import(/* webpackChunkName: "contact" */ '../views/ContactPage.vue'),
    },
    {
        path: '/terms-of-service',
        name: 'Terms of Service',
        component: () => import(/* webpackChunkName: "terms-of-service" */ '../views/TermsOfService.vue'),
    },
    {
        path: '/privacy-policy',
        name: 'Privacy Policy',
        component: () => import(/* webpackChunkName: "privacy-policy" */ '../views/PrivacyPolicy.vue'),
    },
    {
        path: '/cookie-policy',
        name: 'Cookie Policy',
        component: () => import(/* webpackChunkName: "cookie-policy" */ '../views/CookiePolicy.vue'),
    },
    {
        path: '/reset-password',
        name: 'Reset Password',
        component: () => import(/* webpackChunkName: "reset-password" */ '../views/ResetPassword.vue'),
    },
    {
        path: '/verify',
        name: 'Verify Token',
        component: () => import(/* webpackChunkName: "verify" */ '../views/VerifyToken.vue'),
    },
    {
        path: '/ignore-deal',
        name: 'Lender Ignore Deal',
        component: () => import(/* webpackChunkName: "ignore-deal" */ '../views/LenderIgnoreDeal.vue'),
        children: [
            {
                path: ':id',
                name: 'Ignore Deal ID',
                component: () => import('../views/LenderIgnoreDeal.vue'),
            },
        ],
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        beforeEnter: checkIflogedIn,
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/DashboardPage.vue'),
    },
    {
        path: '/profile-settings',
        name: 'Profile Settings',
        beforeEnter: checkIflogedIn,
        component: () => import(/* webpackChunkName: "profile-settings" */ '../views/ProfileSettings.vue'),
    },
    {
        path: '*',
        name: '404',
        beforeEnter: forbidenPage,
        component: () => import(/* webpackChunkName: "404" */ '../views/404Page.vue'),
    },
    {
        path: '/create-deal',
        name: 'Create Deal',
        component: () => import(/* webpackChunkName: "create-deal" */ '../views/CreateDeal.vue'),
        beforeEnter: brokerRole,
        children: [
            {
                path: ':step',
                name: 'Update Deal',
                component: () => import(/* webpackChunkName: "create-deal" */ '../views/CreateDeal.vue'),
                beforeEnter: brokerRole,
                children: [
                    {
                        path: ':deal',
                        name: 'Update Deal',
                        component: () => import(/* webpackChunkName: "create-deal" */ '../views/CreateDeal.vue'),
                        beforeEnter: brokerRole,
                    },
                ],
            },
        ],
    },
    {
        path: '/create-quote',
        name: 'Create Quote',
        component: () => import(/* webpackChunkName: "create-quote" */ '../views/CreateQuote.vue'),
        beforeEnter: lenderRole,
        children: [
            {
                path: ':deal',
                name: 'Update Quote',
                component: () => import(/* webpackChunkName: "create-quote" */ '../views/CreateQuote.vue'),
                beforeEnter: lenderRole,
                children: [
                    {
                        path: ':step',
                        name: 'Update Quote',
                        component: () => import(/* webpackChunkName: "create-quote" */ '../views/CreateQuote.vue'),
                        beforeEnter: lenderRole,
                        children: [
                            {
                                path: ':quote',
                                name: 'Update Quote',
                                component: () => import(/* webpackChunkName: "create-quote" */ '../views/CreateQuote.vue'),
                                beforeEnter: lenderRole,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: '/lender-deals',
        name: 'Lender Deals',
        beforeEnter: lenderRole,
        component: () => import(/* webpackChunkName: "lender-deals" */ '../views/LenderDeals.vue'),
    },
    {
        path: '/individual-quote',
        name: 'Individual Quote',
        beforeEnter: lenderRole,
        component: () => import(/* webpackChunkName: "individual-quote" */ '../views/IndividualQuote.vue'),
        children: [
            {
                path: ':id',
                name: 'Deal',
                beforeEnter: lenderRole,
                component: () => import('../views/IndividualQuote.vue'),
                children: [
                    {
                        path: ':quote',
                        name: 'quote',
                        beforeEnter: lenderRole,
                        component: () => import('../views/IndividualQuote.vue'),
                    },
                ],
            },
        ],
    },
    {
        path: '/individual-quote-broker',
        name: 'Individual Quote Broker',
        beforeEnter: brokerRole,
        component: () => import(/* webpackChunkName: "individual-quote-broker" */ '../views/IndividualQuoteBroker.vue'),
        children: [
            {
                path: ':id',
                name: 'Deal',
                beforeEnter: brokerRole,
                component: () => import('../views/IndividualQuoteBroker.vue'),
                children: [
                    {
                        path: ':lender',
                        name: 'lender',
                        beforeEnter: brokerRole,
                        component: () => import('../views/IndividualQuoteBroker.vue'),
                    },
                ],
            },
        ],
    },
    {
        path: '/individual-deal',
        name: 'Individual Deal',
        beforeEnter: lenderRole,
        component: () => import('../views/IndividualDeal.vue'),
        children: [
            {
                path: ':id',
                name: 'View Deal',
                component: () => import('../views/IndividualDeal.vue'),
            },
        ],
    },
    {
        path: '/broker-deals',
        name: 'Broker Deals',
        beforeEnter: brokerRole,
        component: () => import(/* webpackChunkName: "broker-deals" */ '../views/BrokerDeals.vue'),
    },
    {
        path: '/individual-deal-broker',
        name: 'Individual Deal Broker',
        beforeEnter: brokerRole,
        component: () => import(/* webpackChunkName: "individual-quote-broker" */ '../views/IndividualDealBroker.vue'),
        children: [
            {
                path: ':id',
                name: 'View Deal',
                component: () => import('../views/IndividualDealBroker.vue'),
            },
        ],
    },
    {
        path: '/broker-quotes',
        name: 'Broker Quotes',
        beforeEnter: brokerRole,
        component: () => import(/* webpackChunkName: "broker-quotes" */ '../views/BrokerQuotes.vue'),
    },
    {
        path: '/lender-quotes',
        name: 'Lender Quotes',
        beforeEnter: lenderRole,
        component: () => import(/* webpackChunkName: "lender-quotes" */ '../views/LenderQuotes.vue'),
    },
    {
        path: '/active-quote',
        name: 'Active Quotes',
        beforeEnter: lenderRole,
        component: () => import(/* webpackChunkName: "active-quotes" */ '../views/activeQuotes.vue'),
        children: [
            {
                path: ':token',
                name: 'Active quote token',
                component: () => import(/* webpackChunkName: "active-quotes" */ '../views/activeQuotes.vue'),
            },
        ],
    },
    {
        path: '/choose-quote',
        name: 'Choose Quote',
        beforeEnter: brokerRole,
        component: () => import(/* webpackChunkName: "active-quotes" */ '../views/chooseQuote.vue'),
        children: [
            {
                path: ':token',
                name: 'Choose Quote token',
                component: () => import(/* webpackChunkName: "active-quotes" */ '../views/chooseQuote.vue'),
            },
        ],
    },
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior() {
        return {x: 0, y: 0}
    },
})

router.onError(error => {
    if (/ChunkLoadError:.*failed./i.test(error.message)) {
        window.location.reload()
    }

    else if (/Loading.*chunk.*failed./i.test(error.message)) {
        window.location.reload()
    }
})

router.beforeEach(async (to, from, next) => {
    const lStorage = localStorage.getItem('auth') || null
    const tempToken = localStorage.getItem('tempToken')
    let lsAuth = null

    if (lStorage) {
        lsAuth = JSON.parse(lStorage)
        if(lsAuth.user.role === 'lender' && lsAuth?.isloggedIn) {
            if($store.getters.isSignupIncomplete !== true) {
                const isInc = await LenderProfile.hasLenderCompletedSignup()
                if(!isInc && to.path !== '/sign-up/lender/2') {
                    next('/sign-up/lender/2')
                }

                if(isInc) {
                    $store.commit('SET_SIGNUP_INCOMPLETE', true)
                }
            }
        }
    }

    if(tempToken !== null) {
        if(to.path !== '/sign-up/lender/2') {
            next('/sign-up/lender/2')
        }
    } else {
        if (to.path === '/sign-up/lender') {
            const queryString = window.location.search
            const urlParams = new URLSearchParams(queryString)
            const id = urlParams.get('id')
            const ref = urlParams.get('ref')
            if(id) {
                localStorage.setItem('tempToken', id)
                next('/sign-up/lender/2')
            }
            if(ref) {
                localStorage.setItem('tempTokenRef', ref)
                next('/sign-up/lender/')
            }
        }
    }

    // Root route
    if (to.path === '/') {
        return next({name: 'Login'})
    }

    if (to.path === '/login') {
        if (lStorage) {
            lsAuth = JSON.parse(lStorage)
            // If user is logged in and completed signup, redirect to dashboard
            if (lsAuth?.isloggedIn) {
                if(lsAuth.user.role === 'lender') {
                    return next({name: 'Lender Deals'})
                } else {
                    return next({name: 'Broker Deals'})
                }
            }
        } else {
            $store.commit('loginFailure')
        }
        return next()
    }

    next()
})



export default router
