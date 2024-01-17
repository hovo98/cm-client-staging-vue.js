<template>
  <div class="page-basic">
    <BlockBasicText :data="basicContent" />
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import BlockBasicText from '@/components/blocks/BlockBasicText.vue'

	export default Vue.extend({
		name: 'BasicPage',

		components: {
            BlockBasicText,
		},

		data() {
			return {
                page: 'basic-page',
                basicContent: {
                    title: 'Cookie Policy',
                    text: `
                        <h3>INTRODUCTION</h3>

                        <p>Commercial Mortgage respects the privacy of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [name of website.com] [and our mobile application], including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the “Site”). Please read this privacy policy carefully.  If you do not agree with the terms of this privacy policy, please do not access the site.</p>

                        <p>We reserve the right to make changes to this Privacy Policy at any time and for any reason.  We will alert you about any changes by updating the “Last Updated” date of this Privacy Policy.  Any changes or modifications will be effective immediately upon posting the updated Privacy Policy on the Site, and you waive the right to receive specific notice of each such change or modification.</p>

                        <p>You are encouraged to periodically review this Privacy Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy Policy by your continued use of the Site after the date such revised Privacy Policy is posted.</p>

                        <p>This Privacy Policy was created using Termly’s Privacy Policy Generator.</p>

                        <h3>COLLECTION OF YOUR INFORMATION</h3>
                        <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>

                        <h4>Personal Data</h4>
                        <p>Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us [when you register with the Site [or our mobile application,] or] when you choose to participate in various activities related to the Site [and our mobile application], such as online chat and message boards. You are under no obligation to provide us with personal information of any kind, however your refusal to do so may prevent you from using certain features of the Site [and our mobile application].</p>

                        <h4>Derivative Data </h4>
                        <p>Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site. [If you are using our mobile application, this information may also include your device name and type, your operating system, your phone number, your country, your likes and replies to a post, and other interactions with the application and other users via server log files, as well as any other information you choose to provide.]</p>

                        </h4>Financial Data </h4>
                        </p>Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site [or our mobile application]. [We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, [Amazon Payments,] [Authornize.Net,]  [Braintree Payments,] [Chargify,] [Dwolla,] [Google Checkout,] [Paypal,] [SafeCharge,] [Stripe,] [WePay,] [2Checkout,] [other], and you are encouraged to review their privacy policy and contact them directly for responses to your questions.]</p>

                        </h4>Facebook Permissions  </h4>
                        </p>The Site [and our mobile application] may by default access your Facebook basic account information, including your name, email, gender, birthday, current city, and profile picture URL, as well as other information that you choose to make public. We may also request access to other permissions related to your account, such as friends, checkins, and likes, and you may choose to grant or deny us access to each individual permission. For more information regarding Facebook permissions, refer to the Facebook Permissions Reference page.</p>

                        <h4>Data From Social Networks </h4>
                        </p>User information from social networking sites, such as [Apple’s Game Center, Facebook, Google+, Instagram, Pinterest, Twitter], including your name, your social network username, location, gender, birth date, email address, profile picture, and public data for contacts, if you connect your account to such social networks. [If you are using our mobile application, this information may also include the contact information of anyone you invite to use and/or join our mobile application.]</p>

                        <h4>Mobile Device Data </h4>
                        </p>Device information, such as your mobile device ID, model, and manufacturer, and information about the location of your device, if you access the Site from a mobile device.</p>

                        <h4>Third-Party Data </h4>
                        </p>Information from third parties, such as personal information or network friends, if you connect your account to the third party and  grant the Site permission to access this information.</p>

                        <h4>Data From Contests, Giveaways, and Surveys </h4>
                        </p>Personal and other information you may provide when entering contests or giveaways and/or responding to surveys.</p>

                        <h4>Mobile Application Information</h4>
                        </p>If you connect using our mobile application:</p>

                        <ul>
                            <li>Geo-Location Information. We may request access or permission to and track location-based information from your mobile device, either continuously or while you are using our mobile application, to provide location-based services. If you wish to change our access or permissions, you may do so in your device’s settings.</li>
                            <li>Mobile Device Access. We may request access or permission to certain features from your mobile device, including your mobile device’s [bluetooth, calendar, camera, contacts, microphone, reminders, sensors, SMS messages, social media accounts, storage,] and other features. If you wish to change our access or permissions, you may do so in your device’s settings.</li>
                            <li>Mobile Device Data. We may collect device information (such as your mobile device ID, model and manufacturer), operating system, version information and IP address.</li>
                            <li>Push Notifications. We may request to send you push notifications regarding your account or the Application. If you wish to opt-out from receiving these types of communications, you may turn them off in your device’s settings.</li>
                        </ul>
                    `,
                },
			}
		},
	})
</script>

