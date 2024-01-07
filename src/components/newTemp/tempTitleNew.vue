<template>
  <view class="flex jc-sb ai-c">
    <view class="flex ai-c jc-fs flex-sh-1">
      <image
        :class="['w-120', getSizeClassName('u-h42', '', fontLevel)]"
        resize="contain"
        v-if="modTitle.type === 'image'"
        :src="theme ? modTitle.night_image : modTitle.day_image"
        alt="标题"
      />
      <text
        v-else-if="modTitle.type === 'text'"
        :class="[
          'black-font family-m t-overflow flex-1 max-w-150',
          className,
          theme,
          isIos ? '' : 'fw-bold',
          getSizeClassName('g-fs28', 'tit', fontLevel),
          getSizeClassName('u-lh42', 'tit', fontLevel),
        ]"
      >
        {{ showTitle }}
      </text>
      <text
        v-else
        :class="[
          'black-font family-m t-overflow flex-1 max-w-150',
          className,
          theme,
          isIos ? '' : 'fw-bold',
          getSizeClassName('g-fs28', 'tit', fontLevel),
          getSizeClassName('u-lh42', 'tit', fontLevel),
        ]"
      >
        {{ showTitle }}
      </text>
      <view class="flex ai-c jc-fs" v-show="headerArr.length > 0">
        <title-tag
          :class="['ml-8']"
          v-for="(headItem, i) in headerArr"
          :key="i"
          :type="headItem.type"
          :value="headItem.value"
          :background="headItem.background"
          :color="headItem.color"
        ></title-tag>
      </view>
    </view>
    <image
      :src="theme ? rightDark : right"
      v-if="rightLogo"
      :class="['w-24 h-24']"
    ></image>
  </view>
</template>

<script>
import themeMixin from '@mixin/themeMixin';
import right from '@img/right.png';
import rightDark from '@img/right_dark.png';
import { getSizeClassName } from '@/utils/fontLevelUtils';
import titleTag from './titleTag.vue';
import { isInvalid } from '@utils/validate/invalid';

export default {
  mixins: [themeMixin],
  props: {
    modTitle: {
      type: Object,
      default: () => ({
        value: '卡片标题',
        type: 'text',
      }),
    },
    subTitle: {
      required: false,
      type: Array,
    },
    className: {
      type: String,
      default: '',
    },
    rightLogo: {
      type: [String, Boolean],
      default: false,
    },
  },
  data() {
    return {
      right,
      rightDark,
      isIos: __GLOBAL__.isIos,
    };
  },
  components: {
    titleTag,
  },
  methods: {
    getSizeClassName,
  },
  computed: {
    headerArr() {
      if (this.subTitle && Array.isArray(this.subTitle)) {
        return this.subTitle;
      }
      return [];
    },
    showTitle() {
      return isInvalid(this.modTitle?.value) ? '----' : this.modTitle.value;
    },
  },
};
</script>
