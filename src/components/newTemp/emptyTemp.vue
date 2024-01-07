<template>
  <view :class="['flex ai-c jc-c transparent-bg', theme]" :style="{ width, height: viewHeight }">
    <view>
      <text :class="['gray-font', fontClass, theme]">{{ msg }}</text>
    </view>
  </view>
</template>

<script>
import themeMixin from '@mixin/themeMixin';
export default {
  mixins: [themeMixin],
  props: {
    msg: {
      type: String,
      default: '暂无相关内容',
    },
    width: {
      type: [String, Number],
      default: '100%',
    },
    height: {
      type: [String, Number],
    },
    fontClass: {
      type: String,
      default: 'g-fs24 lh-36',
    },
    type: {
      type: String,
      default: 'middle',
    },
  },
  computed: {
    viewHeight() {
      if (this.height) {
        return this.height;
      }
      if (this.type === 'large') {
        return '210';
      } else {
        return '72';
      }
    },
  },
};
</script>
