<template>
  <view>
    <chartRTextVertTemp
      v-if="tempData.card_size && tempData.card_size === LARGE_CARD_SIZE"
      :modTitle="tempData.card_title"
      :subTitle="subTitle"
      :rightLogo="tempData.card_url"
      :ctnRichTexts="richTexts"
      :chartOption="option"
      :bottomTags="bottomTags"
      :chartTitle="chartTitle"
      :className="className"
      :isReqSuccess="isReqSuccess"
      @cardClick="contentJump(showData)"
      @titleClick="cardTo(tempData)"
    ></chartRTextVertTemp>
    <chartRTextHorizMTemp
      v-else-if="tempData.card_size && tempData.card_size === MIDDLE_CARD_SIZE"
      :modTitle="tempData.card_title"
      :subTitle="subTitle"
      :rightLogo="tempData.card_url"
      :ctnRichTexts="richTexts"
      :chartOption="option"
      :bottomTags="bottomTags"
      :className="className"
      :isReqSuccess="isReqSuccess"
      @cardClick="contentJump(showData)"
      @titleClick="cardTo(tempData)"
    ></chartRTextHorizMTemp>
    <view v-else></view>
  </view>
</template>

<script>
import interfaceMixin from '@mixin/interfaceMixin';
import http from '@api/http';
import stockStrategyOptionL from './stockStrategyOptionL.ts';
import stockStrategyOptionM from './stockStrategyOptionM.ts';
import { formatNumber, getTimeFormat } from '@utils/commonTools.ts';
import mathFormatHandler from '@/utils/mathFormatHandler';
import chartRTextHorizMTemp from '@comp/common/chartRTextHorizMTemp.vue';
import chartRTextVertTemp from '@comp/common/chartRTextVertTemp.vue';
import { isNull, formatFontFamily } from '@utils/commonTools';

const LARGE_CARD_SIZE = 2;
const MIDDLE_CARD_SIZE = 3;
const CONTENT_FONT_SIZE = 16;
const colorMap = {
  [MIDDLE_CARD_SIZE]: {
    light: {
      backgroundColor: '#f5f5f5',
    },
    dark: {
      backgroundColor: '#000000',
    },
  },
  [LARGE_CARD_SIZE]: {
    light: {
      backgroundColor: '#F9F9F9',
      labelColor: '#999999',
    },
    dark: {
      backgroundColor: '#212121',
      labelColor: '#CCCCCC',
    },
  },
};
const colorObj = {
  [LARGE_CARD_SIZE]: {
    red: {
      normal: '#FF2436',
      gradient: 'linear-gradient(180deg #FF243600 #ff243632)',
    },
    green: {
      normal: '#07AB4B',
      gradient: 'linear-gradient(180deg #07AB4B00 #07ab4b32)',
    },
    blue: {
      normal: '#3366FF',
      gradient: 'linear-gradient(180deg #ffffff00 #3366ff4c)',
    },
    yellow: {
      normal: '#FF9500',
      gradient: 'linear-gradient(180deg #ffffff00 #FF950032)',
    },
  },
  [MIDDLE_CARD_SIZE]: {
    red: {
      normal: '#FF2436',
      gradient: 'linear-gradient(180deg #FF243600 #ff243632)',
    },
    green: {
      normal: '#07AB4B',
      gradient: 'linear-gradient(180deg #07AB4B00 #07ab4b32)',
    },
    blue: {
      normal: '#3366FF',
      gradient: 'linear-gradient(180deg #ffffff00 #3366ff4c)',
    },
  },
};
function isMilliseconds(timestamp) {
  const thirteen = 13;
  return timestamp.toString().length === thirteen;
}

export default {
  name: 'stockStrategy',
  mixins: [interfaceMixin],
  components: { chartRTextHorizMTemp, chartRTextVertTemp },
  data() {
    return {
      option: null,
      resData: '',
      isReqSuccess: true,
      LARGE_CARD_SIZE,
      MIDDLE_CARD_SIZE,
      cardOption: {
        3: stockStrategyOptionM,
        2: stockStrategyOptionL,
      },
    };
  },
  computed: {
    subTitle() {
      const header = this.showData?.header || this.tempData?.header || [];

      const processTimeItem = item => ({
        ...item,
        type: 'text',
        value: isMilliseconds(item.value) ? getTimeFormat(item.value, item.format) : '',
      });

      const processTextItem = item => ({
        ...item,
        color: item.color === 'gray' || item.color === 'orange' ? item.color : 'gray',
      });

      return header.map(item => {
        if (item.type === 'time') {
          return processTimeItem(item);
        } else if (item.type === 'text') {
          return processTextItem(item);
        } else {
          return { ...item };
        }
      });
    },
    richTexts() {
      // 处理富文本数据
      const arr = [];
      const defaultArray = [
        {
          text: null,
          fontSize: CONTENT_FONT_SIZE,
        },
      ];
      let titleRText = defaultArray;
      let contentRText = defaultArray;
      if (
        this.showData?.title &&
        Array.isArray(this.showData?.title) &&
        this.showData?.title.length > 0
      ) {
        titleRText = this.showData?.title?.flatMap((item, index) =>
          this.processData(item, true, index)
        );
      }
      if (
        this.showData?.content &&
        Array.isArray(this.showData?.content) &&
        this.showData?.content.length > 0
      ) {
        contentRText = this.showData?.content?.flatMap((item, index) =>
          this.processData(item, false, index)
        );
      }
      arr.push(titleRText);
      arr.push(contentRText);
      return arr;
    },
    bottomTags() {
      const MAX_TAG_LENGTH = 2;
      // 处理底部标签数据
      if (
        this.showData?.tags &&
        Array.isArray(this.showData?.tags) &&
        this.showData.tags.length !== 0
      ) {
        return this.showData.tags.map(item =>
          item.slice(0, MAX_TAG_LENGTH).map(i => this.processTagData(i))
        );
      } else {
        return [
          [
            {
              type: 'text',
              value: '',
            },
          ],
        ];
      }
    },
    chartOption() {
      // 根据卡片大小选择不同的图表选项
      return this.tempData.card_size ? this.cardOption[this.tempData.card_size] : null;
    },
    chartTitle() {
      // 处理图表标题数据
      const markLine = this.showData?.chart_config?.mark_line || [];
      return markLine.map(item => ({
        text: item.name || '----',
        lineColor: colorObj[this.tempData.card_size][this.getLineColor(item)].normal,
        color: 'light-gray',
      }));
    },
  },
  methods: {
    init() {
      if (isNull(this.chartOption)) {
        return;
      }
      const option = JSON.parse(JSON.stringify(this.chartOption));
      if (!option) {
        return;
      }
      option.data[0].originData = this.showData?.chart_config?.chart_data;
      if (this.tempData.card_size === LARGE_CARD_SIZE) {
        option.grid[0].background.style.fill =
          colorMap[LARGE_CARD_SIZE][this.theme || 'light'].backgroundColor;
        option.axis[1].labelLine.style.color =
          colorMap[LARGE_CARD_SIZE][this.theme || 'light']['labelColor'];
      }
      this.showData?.chart_config?.mark_line?.forEach((item, index) => {
        const lineColor = this.getLineColor(item);
        const series = option.series[index];
        if (series) {
          series.line.style.normal.stroke = colorObj[this.tempData.card_size][lineColor].normal;
          series.area.color = colorObj[this.tempData.card_size][lineColor].gradient;
        }
      });
      if (option.data[0].originData) {
        this.option = option;
      }
    },
    async getData(params, methods, header) {
      try {
        const res = await http(methods, this.cardData.url, params, {
          'Content-Type': 'application/json',
          ...header,
        });
        if (res.data && res.data.list && Array.isArray(res.data.list) && res.data.list[0]) {
          this.isReqSuccess = true;
          this.resData = res.data.list[0];
          this.storeData(this.resData);
        } else {
          this.resData = {};
        }
        this.updateStatObj('success');
      } catch (err) {
        this.resData = {};
        this.isReqSuccess = false;
        this.updateStatObj('fail');
      }
    },
    getLineColor(item) {
      const chgNum = formatNumber(parseFloat(item.value)).num;
      let lineColor = '';
      if (item.is_red_green) {
        if (chgNum < 0) {
          lineColor = 'green';
        } else if (chgNum > 0) {
          lineColor = 'red';
        } else {
          lineColor = 'blue';
        }
      } else {
        if (colorObj[this.tempData.card_size][item.color]) {
          lineColor = item.color;
        } else {
          lineColor = 'blue';
        }
      }
      return lineColor;
    },

    processData(data, bold, index) {
      //处理title和content数组里的数据
      const fontFamily = formatFontFamily(data.ths_font_money, bold);
      return {
        color: data.is_red_green ? formatNumber(data.value).colorClass : data.color,
        fontFamily,
        fontSize: CONTENT_FONT_SIZE,
        fontWeight: !data.ths_font_money && bold ? 'bold' : 'normal',
        text: data.text_format
          ? mathFormatHandler({
              format: data.text_format,
              value: formatNumber(data.value).num,
            })
          : data.value,
        priority: data.ths_font_money ? '1st' : '2nd',
        marginLeft: index !== 0 && data.ths_font_money ? '4hm' : 0,
      };
    },
    processTagData(tag) {
      //处理底部辅助信息
      if (tag.type === 'stock') {
        return this.processStockTag(tag);
      } else if (tag.type === 'tag') {
        return this.processTag(tag);
      } else {
        return tag;
      }
    },
    processTag(tag) {
      const specificColors = ['red', 'green', 'gray'];
      if (!tag.color || specificColors.indexOf(tag.color) === -1) {
        tag.color = 'gray';
      }
      return {
        ...tag,
        borderColor: tag.color,
      };
    },
    processStockTag(tag) {
      const stockFontSize = 14;
      const arr = [];
      this.addStockSub({
        stockCode: tag.stock_code,
        marketId: tag.market,
      });
      const stock = this.hqData[tag.stock_code];
      const stockText = {
        text: stock.name === '--' ? null : stock.name,
        color: 'gray',
        fontFamily: 'THSJinRongTi-Regular',
        fontSize: stockFontSize,
        priority:'1st',
      };
      const chgText = {
        text: formatNumber(stock.chg).signStr === '--' ? null : formatNumber(stock.chg).signStr,
        color:
          formatNumber(stock.chg).signStr !== '--' ? formatNumber(stock.chg).colorClass : 'gray',
        fontFamily: 'THSJinRongTi-Medium',
        marginLeft: '8hm',
        fontSize: stockFontSize,
        priority:'2nd'
      };
      arr.push(stockText);
      arr.push(chgText);
      const res = {
        type: tag.type,
        value: arr,
      };
      return res;
    },
  },
  watch: {
    showData: {
      handler(a) {
        if (a) {
          this.init();
        }
      },
      deep: true,
      immediate: true,
    },
    theme() {
      this.init();
    },
  },
};
</script>
