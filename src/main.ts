/**
 * @description Main imports.
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'
import VueCookies from 'vue-cookies'
import markerSDK from '@marker.io/browser'

/**
 * @description Import Bootstrap as a global component.
 */
import { LayoutPlugin } from 'bootstrap-vue'

Vue.use(LayoutPlugin, {breakpoints: ['xs', 'sm', 'md', 'lg', 'xl']})

/**
 * @description Use perfect scrollbar global
 */
Vue.use(PerfectScrollbar)

/**
 * @description Import Vue recaptcha
 */
Vue.use(VueReCaptcha, { siteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY })


Vue.use(VueGoogleMaps, {
	load: {
			key: process.env.VUE_APP_GOOGLE_MAPS_KEY,
			libraries: 'places',
			language: 'en',
	},
	installComponents: true,
})

Vue.use(VueCookies)

/**
 * @description Initialize Marker.io integration
 */
if (process.env.VUE_APP_MARKER_IO_PROJECT) {
	markerSDK.loadWidget({
		project: process.env.VUE_APP_MARKER_IO_PROJECT,
	})
}

/**
 * @description Initialize Sentry integration
 */
if (process.env.VUE_APP_SENTRY_DNS) {
	Sentry.init({
		Vue,
		dsn: process.env.VUE_APP_SENTRY_DNS,
		integrations: [
			new Integrations.BrowserTracing(),
			new Sentry.Replay({
				// Additional SDK configuration goes in here, for example:
				maskAllText: true,
				blockAllMedia: true,
			}),
		],

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: parseFloat(process.env.VUE_APP_SENTRY_TRACING) || 0.0,
		logErrors: true,
		release: process.env.VUE_APP_SENTRY_RELEASE || '',
		environment: process.env.VUE_APP_SENTRY_ENVIRONMENT || 'undefined',
		ignoreErrors: [
			// Random plugins/extensions
			'top.GLOBALS',
			// See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
			'originalCreateNotification',
			'canvas.contentDocument',
			'MyApp_RemoveAllHighlights',
			'http://tt.epicplay.com',
			'Can\'t find variable: ZiteReader',
			'jigsaw is not defined',
			'ComboSearch is not defined',
			'http://loading.retry.widdit.com/',
			'atomicFindClose',
			// Facebook borked
			'fb_xd_fragment',
			// ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
			// See http://stackoverflow.com/questions/4113268/how-to-stop-javascript-injection-from-vodafone-proxy
			'bmi_SafeAddOnload',
			'EBCallBackMessageReceived',
			// See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
			'conduitPage',
			// Generic error code from errors outside the security sandbox
			// You can delete this if using raven.js > 1.0, which ignores these automatically.
			'Script error.',
			// Avast extension error
			'_avast_submit',
			"undefined is not an object (evaluating 'auth.user')",
			"TypeError: Cannot read properties of undefined (reading 'user')",
			'Avoided redundant navigation to current location',
			'Redirected when going from',
			'TypeError: auth is undefined',
			"TypeError: Cannot read property 'user' of undefined",
			"TypeError: can't access property 'user', auth is undefined",
			"Cannot read properties of null (reading 'table')",
			'Non-Error promise rejection captured',
			//This is for google recpatcha ignore
			'Non-Error promise rejection captured with value: Timeout',
			'ResizeObserver loop limit exceeded',
			'HTMLScriptElement.script.onerror(kommunicate)',
			'Error while loading Jquery file.',
		],
		denyUrls: [
			// Google Adsense
			/pagead\/js/i,
			// Facebook flakiness
			/graph\.facebook\.com/i,
			// Facebook blocked
			/connect\.facebook\.net\/en_US\/all\.js/i,
			// Woopra flakiness
			/eatdifferent\.com\.woopra-ns\.com/i,
			/static\.woopra\.com\/js\/woopra\.js/i,
			// Chrome extensions
			/extensions\//i,
			/^chrome:\/\//i,
			// Other plugins
			/127\.0\.0\.1:4001\/isrunning/i,  // Cacaoweb
			/webappstoolbarba\.texthelp\.com\//i,
			/metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
			/googletagmanager\.com\/gtm\.js/i,
			/widget\.kommunicate\.io\/v2\/kommunicate\.app/i,
		],
	})
}

/**
 * @description Create Vue app.
 */
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
