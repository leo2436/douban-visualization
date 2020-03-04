<template>
  <div class="country">
    <div id="world" style="width: 100%; height:400px;"></div>
    <div id="pie" style="width: 100%; height:400px;"></div>
  </div>
</template>

<script>
import countryName from "../common/country.json";
export default {
  name: "countryStat",
  data() {
    return {
      movieCountry: [],
      countryNum: [],
      countryName: countryName
    };
  },
  created() {
    this.getCountry();
    this.getCountryNum();
  },
  mounted() {
    this.drawChart();
    this.drawData();
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let chart = this.$echarts.init(document.getElementById("world"));
      // 监听屏幕变化自动缩放图表
      // 绘制图表
      chart.setOption({
        // 图表主标题
        title: {
          text: "世界地图", // 主标题文本，支持使用 \n 换行
          top: 20, // 定位 值: 'top', 'middle', 'bottom' 也可以是具体的值或者百分比
          left: "center", // 值: 'left', 'center', 'right' 同上
          textStyle: {
            // 文本样式
            fontSize: 24,
            fontWeight: 600,
            color: "#fff"
          }
        },
        // 提示框组件
        tooltip: {
          trigger: "item", // 触发类型, 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用
          // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
          // 使用函数模板  传入的数据值 -> value: number | Array
          formatter: function(val) {
            return val.data.name + ": " + val.data.value;
          }
        },
        // 视觉映射组件
        visualMap: {
          type: "continuous", // continuous 类型为连续型  piecewise 类型为分段型
          show: true, // 是否显示 visualMap-continuous 组件 如果设置为 false，不会显示，但是数据映射的功能还存在
          // 指定 visualMapContinuous 组件的允许的最小/大值。'min'/'max' 必须用户指定。
          // [visualMap.min, visualMax.max] 形成了视觉映射的『定义域』
          min: 0,
          max: 1000000,
          // 文本样式
          textStyle: {
            fontSize: 14,
            color: "#fff"
          },
          realtime: false, // 拖拽时，是否实时更新
          calculable: true, // 是否显示拖拽用的手柄
          // 定义 在选中范围中 的视觉元素
          inRange: {
            color: [
              "#9fb5ea",
              "#e6ac53",
              "#74e2ca",
              "#85daef",
              "#9feaa5",
              "#5475f5"
            ] // 图元的颜色
          }
        },
        series: [
          {
            type: "map", // 类型
            // 系列名称，用于tooltip的显示，legend 的图例筛选 在 setOption 更新数据和配置项时用于指定对应的系列
            name: "世界地图",
            mapType: "world", // 地图类型
            // 是否开启鼠标缩放和平移漫游 默认不开启 如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move' 设置成 true 为都开启
            roam: false,
            // 图形上的文本标签
            label: {
              show: false // 是否显示对应地名
            },
            // 地图区域的多边形 图形样式
            itemStyle: {
              areaColor: "lightgray", // 地图区域的颜色 如果设置了visualMap，areaColor属性将不起作用
              borderWidth: 0.5, // 描边线宽 为 0 时无描边
              borderColor: "#000", // 图形的描边颜色 支持的颜色格式同 color，不支持回调函数
              borderType: "solid" // 描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'
            },
            // 高亮状态下的多边形和标签样式
            emphasis: {
              label: {
                show: true, // 是否显示标签
                color: "black" // 文字的颜色 如果设置为 'auto'，则为视觉映射得到的颜色，如系列色
              },
              itemStyle: {
                areaColor: "#FF6347" // 地图区域的颜色
              }
            },
            // 自定义地区的名称映射
            nameMap: this.countryName,
            // 地图系列中的数据内容数组 数组项可以为单个数值
            data: this.countryNum
          }
        ]
      });
    },
    drawData() {
      let myChart = this.$echarts.init(document.getElementById("pie"));
      myChart.setOption({
        backgroundColor: "white",

        legend: {
          data: this.countryNum.name, //这里的legend使用的是数组，在上面动态获取的
          left: "left",
          orient: "vertical",
          textStyle: {
            //图例文字的样式
            color: "#0b2b5e",
            fontSize: 12
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "上榜国家",
            type: "pie",
            radius: "75%",
            center: ["50%", "60%"],
            data: this.countryNum,
            // roseType: "angle",
            itemStyle: {
              label: {
                normal: {
                  show: true,
                  formatter: "{d}",
                  fontSize: 10,
                  fontWeight: 300
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      });
    },
    //取得所有国家
    getCountry() {
      var movies = this.$store.state.movies;
      for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        const country = movie.country;
        this.movieCountry.push(country);
      }
    },
    //放进一个数组
    getCountryNum() {
      const allCountry = [];
      const country = this.movieCountry;
      for (let i = 0; i < country.length; i++) {
        var singleCountry = country[i].split(" ");
        for (let j = 0; j < singleCountry.length; j++) {
          allCountry.push(singleCountry[j]);
        }
      }
      for (let i = 0; i < allCountry.length; i++) {
        if (
          allCountry[i] == "中国台湾" ||
          allCountry[i] == "中国香港" ||
          allCountry[i] == "中国大陆"
        ) {
          allCountry[i] = "中国";
        }
      }
      this.analyseCountry(allCountry);
    },
    //将数组数据转化为对象
    analyseCountry(allCountry) {
      var obj = {};
      for (let i = 0; i < allCountry.length; i++) {
        var country = allCountry[i];
        if (obj[country] === undefined) {
          obj[country] = 1;
        } else {
          obj[country] += 1;
        }
      }
      console.log("obj: ", obj);
      for (let nation in obj) {
        var nationData = {};
        nationData.name = nation;
        nationData.value = obj[nation];
        this.countryNum.push(nationData);
      }
    }
  }
};

// {
//       "name": "阿富汗",
//       "value": 28397.812
//     },
</script>

<style lang="">
</style>