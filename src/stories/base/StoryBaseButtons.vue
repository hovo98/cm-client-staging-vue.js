<template>
  <div>
    <b-row class="styleguide__buttons">
      <b-col
        v-for="(btn, i) in buttons"
        :key="'btn-' + i"
        md="3"
      >
        <StorySubWrapper :title="btn.text">
          <div class="styleguide__btn">
            <a
              href="javascript:;"
              :class="btn.classes"
            >{{ btn.text }}</a>
          </div>
        </StorySubWrapper>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import Vue from 'vue'
    import StorySubWrapper from '../config/StorySubWrapper'

    export default Vue.extend({
        components: {
            StorySubWrapper,
        },

        data: function() {
            return {
                buttons: [
                    {
                        text: 'Normal',
                        classes: 'btn',
                    },
                    {
                        text: 'Green Button',
                        classes: 'btn',
                    },
                    {
                        text: 'Big Button',
                        classes: 'btn',
                    },
                    {
                        text: 'Big Green Button',
                        classes: 'btn',
                    },
                ],
            }
        },
    })
</script>
