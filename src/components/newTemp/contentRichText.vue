<template>
  <view class="flex jc-fs ai-c">
    <template v-if="isTHSMoney">
      <text
        v-for="(item, index) in richText"
        :key="index"
        :richText="delSpacingProperties(item)"
        :class="[
          className,
          textLineClampClass,
          getEllipsisClass(item.priority)
        ]"
        :style="[richTextStyle, recoveredSpacing(item)]"
      >
      </text>
    </template>
    <text
      v-else
      :class="[className, textLineClampClass]"
      :style="richTextStyle"
      :richText="richText"
    >
    </text>
  </view>
</template>

<script>
import { COLOR_MAP } from '@utils/constant';
import themeMixin from '@mixin/themeMixin';
import { isInvalid } from '@utils/validate/invalid';
import { getFontSize } from '@/utils/fontLevelUtils';

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
  name: 'contentRichText',
  mixins: [themeMixin],
  props: {
    textLineClamp: {
      type: [Number, String],
      default: 2,
    },
    cntRichText: {
      type: Array,
      default: () => [],
    },
    className: {
      type: String,
    },
  },
  computed: {
    lineHeight() {
      switch (this.fontLevel) {
        case '0':
        case '1':
          return '21';
        case '2':
        case '3':
        case '4':
          return '24';
        default:
          return '21';
      }
    },
    richText() {
      const theme = this.theme || 'light';
      return this.cntRichText.map(item => ({
        ...item,
        text: isInvalid(item.text) ? '----' : item.text,
        color: isInvalid(item.text)
          ? COLOR_MAP[theme]['gray']
          : COLOR_MAP[theme][item.color] || COLOR_MAP[theme]['black'],
        backgroundColor: item.backgroundColor,
        fontSize: this.getCtnFontSize(item.fontSize),
        fontFamily: isInvalid(item.text) ? 'THSJinRongTi-Regular' : item.fontFamily,
      }));
    },
    richTextStyle() {
      return {
        height: parseFloat(this.textLineClamp) * parseFloat(this.lineHeight),
        lineHeight: parseFloat(this.lineHeight),
        textVerticalAlign: 'center',
      };
    },
    textLineClampClass() {
      return `t-overflow${this.textLineClamp}`;
    },
    isTHSMoney() {
      return this.cntRichText.some(item => item.ths_font_money === true);
    },
  },
  methods: {
    delSpacingProperties(richTextItem) {
      //删去richText里的位置属性，因为会使自身偏移
      const cloneItem = JSON.parse(JSON.stringify(richTextItem));
      spacingProperties.forEach(item => delete cloneItem[item]);
      return cloneItem;
    },
    recoveredSpacing(richTextItem) {
      const spacingStyle = {};
      for (const [key, value] of Object.entries(richTextItem)) {
        if (spacingProperties.includes(key)) {
          spacingStyle[key] = value;
        }
      }
      return spacingStyle;
    },
    getCtnFontSize(fontSize) {
      return getFontSize(fontSize, 'ctn', this.fontLevel)||fontSize;
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
  },
};
</script>
