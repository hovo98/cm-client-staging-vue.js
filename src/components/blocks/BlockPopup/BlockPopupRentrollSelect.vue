<template>
  <div class="popup__wrap">
    <!-- {{clickedIndex}} -->
    <div class="popup">
      <a
        class="popup__close"
        href="javascript:;"
        @click="closePopUp()"
      />
      <div class="entry-content">
        <h3>Assign a column label</h3>
        <p>Select a column name</p>
        <div>
          <template v-for="(obj, key, index) in thMap">
            <span
              :key="obj.label"
              @click="setFilterColumn(obj.label, index)"
            >
              {{ obj.label }}
            </span>
          </template>
        </div>
      </div>
      <div class="popup__btn-wrap">
        <a
          class="btn btn--alt popup__btn"
          href="javascript:;"
          @click="closePopUp()"
        >Cancel</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    props: {
        thMap: {
            require: true,
        },
        clickedIndex: {
            require: true,
        },
    },
    methods: {
        closePopUp() {
            this.$emit('closePop')
        },
        setFilterColumn(label, index) {
            this.$emit('setFilterColumn', label, this.clickedIndex, index)
        },
    },
}
</script>

<style lang="scss" scoped>

  .popup {
      padding: 55px 30px 50px 30px;
      max-width: 500px;
  }
  
  .crd-sidebar__step-inner {
    margin: 0 10px;
  }

  .popup .entry-content {
      p, h3 {
        text-align: center;
      }
  }

  @include mq(428px) {
      .popup__btn-wrap .btn {
          min-width: 191px;
      }
  }

</style>