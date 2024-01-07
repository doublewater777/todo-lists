<template>
  <view
    :class="['card card-lg', className, theme, getSizeClassName('u-h508', '', fontLevel)]"
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
      <view class="flex jc-sb ai-c mt-20  w-full">
        <view class="flex-d-c flex-1">
          <contentRichText
            v-for="(item, i) in ctnRichTexts"
            :cntRichText="item"
            textLineClamp="1"
          ></contentRichText>
        </view>
      </view>
      <!-- 卡片底部标签 -->
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
      <!-- 底部图 -->
      <view :class="['mt-24 chart', theme]">
        <view class="flex ai-c h-28 mb-20">
          <view v-for="(item, index) in chartTitle" :key="index" class="flex ai-c mr-24">
            <view class="line mr-4" :style="{ background: item.lineColor }"></view>
            <text :class="[item.color + '-font', 'g-fs20', theme]">{{ item.text }}</text>
          </view>
        </view>
        <ex-line-chart
          :option="chartOption"
          :width="chartWidth"
          :height="chartHeight"
        ></ex-line-chart>
      </view>
    </template>
    <emptyTemp type="large" v-else></emptyTemp>
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
    subTitle: Array,
    titleClass: String,
    rightLogo: Boolean,
    ctnRichTexts: Array,
    chartOption: Object,
    chartTitle: Array,
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
      const lHeight = 160;
      return (lHeight / uiWidth) * Hummer.env.deviceWidth;
    },
    chartWidth() {
      // 计算图表宽度
      const uiWidth = 750;
      const lWidth = 280;
      return (lWidth / uiWidth) * Hummer.env.deviceWidth;
    },
  },
};
</script>
<style lang="less">
.chart {
  background: #f9f9f9;
  padding: 16hm 20hm 16hm 16hm;
  border-radius: 12hm;
}
.chart.dark {
  background: #212121;
}
.line {
  width: 16hm;
  height: 2hm;
}
.h-28 {
  height: 28hm;
}
</style>
