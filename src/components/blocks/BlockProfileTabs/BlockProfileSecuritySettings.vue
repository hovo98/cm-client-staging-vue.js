<template>
  <div class="profile-tab-security">
    <form class="profile-tab-security">
      <div class="input-holder">
        <label class="input-label">Old password</label>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|min:6"
          class="error-message-holder error-message-holder--block"
        >
          <input
            v-model="password"
            :type="type"
            minlength="6"
            required
          >
          <a
            v-if="password"
            href="javascript:;"
            class="show-pass"
            @click="showPass"
          >
            <SvgIcon
              class="show-pass__icon show-pass__icon-hide"
              icon-name="ico-eye"
            />
            <SvgIcon
              class="show-pass__icon show-pass__icon-show"
              icon-name="ico-eyeslash"
            />
          </a>
          <span class="error-message">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="input-holder">
        <label class="input-label">New password</label>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|min:8"
          name="confirm"
          class="error-message-holder error-message-holder--block"
        >
          <input
            v-model="password_new"
            :type="type"
            minlength="6"
            required
          >
          <a
            v-if="password_new"
            href="javascript:;"
            class="show-pass"
            @click="showPass"
          >
            <SvgIcon
              class="show-pass__icon show-pass__icon-hide"
              icon-name="ico-eye"
            />
            <SvgIcon
              class="show-pass__icon show-pass__icon-show"
              icon-name="ico-eyeslash"
            />
          </a>
          <span class="error-message">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="input-holder">
        <label class="input-label">New password</label>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|min:8|password:@confirm"
          class="error-message-holder error-message-holder--block"
        >
          <input
            v-model="confirmation"
            :type="type"
            minlength="6"
            required
          >
          <a
            v-if="confirmation"
            href="javascript:;"
            class="show-pass"
            @click="showPass"
          >
            <SvgIcon
              class="show-pass__icon show-pass__icon-hide"
              icon-name="ico-eye"
            />
            <SvgIcon
              class="show-pass__icon show-pass__icon-show"
              icon-name="ico-eyeslash"
            />
          </a>
          <span class="error-message">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { ValidationProvider, extend } from 'vee-validate'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    /* eslint-disable */
    import { required, email, min } from 'vee-validate/dist/rules';

    extend('required', {
        ...required,
        message: 'This field is required'
    });

    extend('min', {
        validate(password, args) {
            return password.length >= args.length;
        },
        params: ['length'],
        message: 'The field must have at least {length} characters'
    });

    extend('password', {
        params: ['target'],
        validate(value, { target } : any) {
            return value === target;
        },
        message: 'Password confirmation does not match'
    });

    interface Data {
        password: string
        password_new: string
        confirmation: string
        passIcon: string
        type: string
    }

    export default Vue.extend({
        props: {
        },

        data(): Data {
            return {
                password: '',
                confirmation: '',
                password_new: '',
                passIcon: 'ico-eye',
                type: 'password'
            };
        },
        components: {
            ValidationProvider,
            SvgIcon
        },
        methods: {
            showPass(e) {
                const _self = e.currentTarget;
                const prev =  _self.previousElementSibling;

                if(prev.getAttribute('type') === 'password') {
                   prev.type = 'text';
                   _self.querySelector('.show-pass__icon-hide').classList.add('hide');
                } else {
                    prev.type = 'password';
                    _self.querySelector('.show-pass__icon-hide').classList.remove('hide');
                }
            }
        }
    });
</script>

<style lang="scss" scoped>
    .profile-tab-security {
        width: 100%;
        max-width: 607px;
    }
</style>
