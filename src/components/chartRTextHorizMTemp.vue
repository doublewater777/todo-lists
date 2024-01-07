<template>
  <view
    :class="['card', className, theme, getSizeClassName('u-h248', '', fontLevel)]"
    @click="handleCardClick"
  >
    <tempTitleNew
      :modTitle="modTitle"
      :subTitle="subTitle"
      :right-logo="rightLogo"
      :class-name="titleClass"
      @click="handlerTitleClick"
    ></tempTitleNew>
    <template v-if="isReqSuccess">
      <view class="flex jc-sb ai-c mt-20">
        <view class="flex-1">
          <contentRichText
            v-for="(item, i) in ctnRichTexts"
            :cntRichText="item"
            textLineClamp="1"
          ></contentRichText>
        </view>
        <view class="ml-8 flex-sh-0" :style="{ width: chartWidth }">
          <ex-line-chart
            :option="chartOption"
            :width="chartWidth"
            :height="chartHeight"
          ></ex-line-chart>
        </view>
      </view>
      <view class="mt-12">
        <view class="flex" v-for="(item, index) in bottomTags" :key="index">
          <view v-for="(e, i) in item" :key="i" class="flex ai-c jc-fs">
            <bottomAddtional
              :class="[i !== item.length - 1 ? 'mr-8' : 'mr-0']"
              :type="e.type"
              :text="e.value"
              :text-color="e.color || ''"
              :richText="e.value || []"
            ></bottomAddtional>
          </view>
        </view>
      </view>
    </template>
    <emptyTemp v-else></emptyTemp>
  </view>
</template>

<script>
import bottomAddtional from '@comp/common/newTemp/bottomAddtional.vue';
import tempTitleNew from '@comp/common/newTemp/tempTitleNew.vue';
import contentRichText from '@comp/common/newTemp/contentRichText.vue';
import emptyTemp from '@comp/common/newTemp/emptyTemp.vue';
import { getSizeClassName } from '@/utils/fontLevelUtils';
import themeMixin from '@mixin/themeMixin';

export default {
  components: { tempTitleNew, contentRichText, bottomAddtional, emptyTemp },
  mixins: [themeMixin],
  props: {
    modTitle: Object,
    subTitle: Object,
    titleClass: String,
    rightLogo: Boolean,
    ctnRichTexts: Array,
    chartOption: Object,
    bottomTags: Array,
    isReqSuccess: Boolean,
    className:String
  },
  methods: {
    handleCardClick() {
      this.$emit('cardClick');
    },
    handlerTitleClick() {
      this.$emit('titleClick');
    },
    getSizeClassName,
  },
  computed: {
    chartHeight() {
      // 计算图表高度
      const uiWidth = 750;
      const cHeight = 84;
      return (cHeight / uiWidth) * Hummer.env.deviceWidth;
    },
    chartWidth() {
      // 计算图表宽度
      const uiWidth = 750;
      const cWidth = 112;
      return (cWidth / uiWidth) * Hummer.env.deviceWidth;
    },
  },
};
</script>
