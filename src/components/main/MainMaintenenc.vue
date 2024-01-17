<template>
  <div class="maintenance-container">
    <div class="maintenance-header">
      <img
        class="maintenance-logo"
        src="@/assets/images/logo.png"
        alt="Maintenance"
      >
    </div>
    <img
      class="maintenance-img"
      src="@/assets/images/repair.png"
      alt="Maintenance"
    >
    <h1 class="maintenance-title page-title">We’ll be back soon</h1>
    <p class="maintenance-text">Finance Lobby is closed for some scheduled upgrades.</p>
    <p class="maintenance-text">Our team’s hard at work making the site faster and better for you and we’ll be back up in just a few hours.</p>
  </div>
</template>

<script lang="ts">

	import Vue from 'vue'

    export default Vue.extend({

    })
</script>

<style lang="scss" scoped>
	.maintenance-container {
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background-color: $azure;
		position: relative;
		padding: 0 15px;
	}

	.maintenance-header {
		position: absolute;
		widows: 100%;
		top: 0;
		left: 0;
		width: 250px;
		padding: 20px 25px;
	}

	.maintenance-img {
		width: 180px;
		margin-bottom: 20px;

		@include mq(768px) {
			width: 130px;
		}
	}

	.maintenance-title {
		margin-bottom: 20px;
		text-align: center;
		line-height: 1;

		@include mq(768px) {
			font-size: 30px;
		}
	}

	.maintenance-text {
		margin-bottom: 10px;
		text-align: center;

		@include mq(768px) {
			font-size: 14px;
		}
	}
</style>
