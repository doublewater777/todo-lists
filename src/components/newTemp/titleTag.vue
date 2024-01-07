<template>
  <view :class="tagClass">
    <text v-if="type === 'text'" :class="itemClass">{{ showText }}</text>
  </view>
</template>

<script>
import themeMixin from '@mixin/themeMixin';
import { isInvalid } from '@utils/validate/invalid';
export default {
  mixins: [themeMixin],
  props: {
    type: {
      type: String,
      default: 'text',
    },
    background: String,
    color: String,
    value: String,
  },
  computed: {
    itemClass() {
      const classArr = ['t-overflow ta-c max-w-130 flex ai-c flex-sh-1 g-fs22'];
      if (this.color === 'gray' || !this.color || isInvalid(this.value)) {
        classArr.push('gray-font');
      } else {
        classArr.push(`${this.color}-font`);
      }
      classArr.push(this.theme);
      return classArr;
    },
    tagClass() {
      const classArr = ['flex ai-c'];
      if (this.background && this.background === 'orange') {
        classArr.push('orange-bg color-tag h-32 pd-0-8 br-4');
      }
      classArr.push(this.theme);
      return classArr;
    },
    showText() {
      if (this.background && this.background === 'orange') {
        return isInvalid(this.value) ? '--' : this.value;
      } else {
        return this.value;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.color-tag {
  min-width: 46hm;
}
</style>
