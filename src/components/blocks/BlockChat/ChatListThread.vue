<template>
  <div :class="minimized ? 'chat__thread minimized':'chat__thread'">
    <template v-if="!quoteRoom">
      <template v-for="(room, index) in seenCount.sort">
        <div
          :key="index"
          :class="seenCount.seenCount[room.room_id] !== 0 ? 'chat__thread-element chat__thread-element--has-messages':'chat__thread-element'"
          @click="openChatWithLender(room.index)"
        >
          <div class="chat__thread-element__title">
            <span>{{ room.name }}</span>
            <span
              v-if="seenCount.seenCount[room.room_id] > 1"
              class="chat__thread-element-count"
            >{{ seenCount.seenCount[room.room_id] }} NEW</span>
            <span
              v-else-if="seenCount.seenCount[room.room_id] === 1"
              class="chat__thread-element-count"
            >NEW</span>
          </div>
          <span
            v-if="room.chat_response_time"
            class="chat__thread-response-time"
          >Typically replies within {{ formatResponseTime(room.chat_response_time) }}</span>
        </div>
      </template>
    </template>
    <template v-else>
      <template v-for="(room, index) in seenCount.sort">
        <div
          v-if="quoteRoom === room.room_id"
          :key="index"
          :class="seenCount.seenCount[room.room_id] !== 0 ? 'chat__thread-element chat__thread-element--has-messages':'chat__thread-element'"
          @click="openChatWithLender(room.index)"
        >
          <div class="chat__thread-element__title">
            <span>{{ room.name }}</span>
            <span
              v-if="seenCount.seenCount[room.room_id] > 1"
              class="chat__thread-element-count"
            >{{ seenCount.seenCount[room.room_id] }} NEW</span>
            <span
              v-else-if="seenCount.seenCount[room.room_id] === 1"
              class="chat__thread-element-count"
            >NEW</span>
          </div>
          <span class="chat__thread-response-time">Average response time: 1m</span>
        </div>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: {
            rooms: {
                type: Array,
            },
            openChatWithLenderCurrent: {
                type: Function,
            },
            dealId: {
                required: true,
            },
            minimized: {
                type: Boolean,
            },
            quoteRoom: {
                type: Number,
            },
        },
        computed: {
            seenCount() {
                let obj = {}
                this.rooms.forEach(room => {
                    obj[room.room_id] = 0
                    room.messages.forEach(msg => {
                        if(msg.role === 'lender') {
                            if(!msg.seen)
                                obj[room.room_id] += 1
                        }
                    })
                })
                const sort = Object.entries(obj).sort((a:any ,b: any) => b[1]-a[1])
                const newArr = []

                sort.forEach((arr) => {
                    this.rooms.forEach((room, index) => {
                        if(room.room_id === parseInt(arr[0])) {
                            room.index = index
                            newArr.push(room)
                        }
                    })
                })

                return {seenCount: obj, sort: newArr}
            },
        },
        methods: {
            openChatWithLender(index) {
                const room_id = this.rooms[index].room_id
                const arr = []
                if(this.seenCount.seenCount[room_id] > 0) {
                    this.rooms[index].messages.forEach(msg => {
                        if(msg.role === 'lender') {
                            if(!msg.seen)
                                arr.push(msg.id)
                        }
                    })
                    this.$store.dispatch('seenMessages', {arr: arr, index: index})
                }
                this.$store.dispatch('currentChatId', room_id)
                this.$store.dispatch('seenMessagesDealTableBroker', {id: this.dealId, count: arr.length})
                this.$emit('openChatWithLenderCurrent', index)
          },
          formatResponseTime(totalMinutes) {
              const hours = Math.floor(totalMinutes / 60)
              const minutes = Math.floor(totalMinutes % 60)
              if (hours === 0) {
                return `${this.padToTwoDigits(minutes)} minutes`
              }

            if (hours > 24) {
                const days = Math.floor(hours / 24)
                return `${days} days`
              }

              return `${this.padToTwoDigits(hours)}h ${this.padToTwoDigits(minutes)}m`
          },
          padToTwoDigits(num) {
            return num.toString().padStart(2, '0')
          },
        },
    })
</script>

<style lang="scss" scoped>
    .chat__thread {
        width: 100%;
        height: 100%;
        min-height: 480px;
        padding: 30px;
        overflow: scroll;
        @include scroll-style($blue-chill, transparent, 20px, 0.4vw);

        &.minimized {
            height: 0;
            min-height: 0;
            padding: 0 30px;
            overflow: hidden;

            @include mq(1024px) {
                height: auto;
                min-height: auto;
                flex: 2;
                padding: 15px;
                overflow: scroll;
            }
        }

        @include mq(1024px) {
            height: auto;
            min-height: auto;
            flex: 2;
            padding: 15px;
        }
    }

    .chat__thread-element {
        width: 100%;
        height: 73px;
        background-color: #F5F5F7;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 5px 20px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: $dur $ease;
        margin-bottom: 20px;

        &:hover {
            box-shadow: 5px 5px 10px #0000000D;
        }
    }

    .chat__thread-element__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .chat__thread-response-time {
      font-size: 14px;
      font-weight: 500;
    }

    .chat__thread-element--has-messages {
        background-color: #F0F7F7;
        color: $blue-chill;
    }

    .chat__thread-element-count {
        padding: 3px 14px;
        border-radius: 12px;
        background-color: $blue-chill;
        display: flex;
        align-items: center;
        justify-self: center;
        font-size: 10px;
        color: $white;
        margin-top: 2px;
    }
</style>