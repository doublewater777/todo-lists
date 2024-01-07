<template>
  <view :class="['flex ai-c', className, theme]">
    <text v-if="type === 'text'" :class="[
      't-overflow',
      textColor ? textColor + '-font' : 'gray-font',
      theme,
      textFontClass,
      textClass,
    ]">{{ showText }}</text>
    <view v-else-if="type === 'tag'" :class="['flex ai-c', getSizeClassName('u-h42', 'foot', fontLevel)]">
      <view :class="[
        'flex ai-c',
        borderColor ? borderColor + '-border lt-soft b-w-num1 pd-0-8 br-4' : '',
        theme,
      ]">
        <text :class="[
          't-overflow max-w-120 g-fs22',
          textColor ? textColor + '-font' : 'gray-font',
          theme,
          textClass,
        ]">
          {{ showText }}
        </text>
      </view>
    </view>
    <view v-else-if="type === 'stock'" :class="['flex jc-fs pd-0 ai-c', theme]">
      <text v-for="(item, index) in stockRichText" :key="index" :richText="delSpacingProperties(item)" :class="[
        stockClassName,
        't-overflow',
        getSizeClassName('g-fs24', 'foot', fontLevel),
        getSizeClassName('u-lh42', 'foot', fontLevel),
        getEllipsisClass(item.priority),
      ]" :style="[recoveredSpacing(item)]">
      </text>
    </view>
    <text v-else :class="[
      textColor ? textColor + '-font' : 'gray-font',
      theme,
      textFontClass,
      textClass,
    ]">
      {{ showText }}
    </text>
  </view>
</template>

<script>
import themeMixin from '@mixin/themeMixin';
import { COLOR_MAP } from '@utils/constant';
import { getSizeClassName, getFontSize } from '@/utils/fontLevelUtils';
import { isInvalid } from '@utils/validate/invalid';
const spacingProperties = [
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'paddingTop',
  'paddingLeft',
  'paddingRight',
  'paddingBottom',
];
export default {
  props: {
    type: String,
    text: String,
    textColor: String,
    textClass: String,
    stockClassName: String,
    textLineClamp: {
      type: [Number, String],
      default: 1,
    },
    richText: Array,
    borderColor: String,
    className: String,
  },
  mixins: [themeMixin],
  computed: {
    textFontClass() {
      return `${getSizeClassName('g-fs28', 'foot', this.fontLevel)} ${getSizeClassName(
        'u-lh42',
        'foot',
        this.fontLevel
      )} break-all`;
    },
    showText() {
      return isInvalid(this.text) ? '----' : this.text;
    },
    stockRichText() {
      const theme = this.theme || 'light';
      const res = this.richText.map(item => ({
        ...item,
        text: isInvalid(item.text) ? '--' : item.text,
        color: isInvalid(item.text)
          ? COLOR_MAP[theme]['gray']
          : COLOR_MAP[theme][item.color] || COLOR_MAP[theme]['black'],
        backgroundColor: item.backgroundColor,
        fontSize: this.getFootFontSize(item.fontSize),
        fontFamily: isInvalid(item.text) ? '' : item.fontFamily,
      }));
      return res;
    },
  },
  methods: {
    getSizeClassName,
    getFootFontSize(fontSize) {
      return (
        getFontSize(fontSize, 'foot', this.fontLevel) || fontSize
      );
    },
    getEllipsisClass(priority) {
      //优先级为1st，不收缩,2nd则可收缩
      switch (priority) {
        case '1st':
          return 'flex-sh-0';
        case '2nd':
          return 'flex-sh-1 flex-gr-0';
        default:
          return '';
      }
    },
    delSpacingProperties(richTextItem) {
      //删去richText里的位置属性，因为会使自身偏移
      const cloneItem = JSON.parse(JSON.stringify(richTextItem));
      spacingProperties.forEach(item => delete cloneItem[item]);
      return cloneItem;
    },
    recoveredSpacing(richTextItem) {
      //把删去的位置属性添加到text标签上
      const spacingStyle = {};
      for (const [key, value] of Object.entries(richTextItem)) {
        if (spacingProperties.includes(key)) {
          spacingStyle[key] = value;
        }
      }
      return spacingStyle;
    },
  },
};
</script>
<style lang="less" scoped>
.red-border {
  border: 1hm solid #ff2436;
}

.gray-border {
  border: 1hm solid rgba(0, 0, 0, 0.4);
}

.gray-border.dark {
  border: 1hm solid rgba(255, 255, 255, 0.4);
}

.green-border {
  border: 1hm solid #07ab4b;
}
</style>
