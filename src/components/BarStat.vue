<template>
  <div class="movieType">
    <div id="bar" style="width: 100%; height:400px;"></div>
  </div>
</template>

<script>
export default {
  name: "roundStat",
  props: {},
  data() {
    return {
      movieType: [],
      movieTypeNum: {}
    };
  },
  created() {
    this.getType(), this.getTypeNum();
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("bar"));
      // 指定图表的配置项和数据
      let option = {
        backgroundColor: "#2c343c",
        textStyle: {
          color: "white"
        },
        title: {
          text: "豆瓣Top250数据分析",
          textStyle: {
            color: "white"
          }
        },
        tooltip: {},
        legend: {
          data: ["电影类型"],
          textStyle: {
            color: "white"
          }
        },
        xAxis: {
          data: Object.keys(this.movieTypeNum),
          axisLabel: {
            interval: 0
          }
        },
        yAxis: {},
        series: [
          {
            name: "电影类型",
            type: "bar",
            data: Object.values(this.movieTypeNum)
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    getType() {
      var movies = this.$store.state.movies;
      for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        const type = movie.type;
        this.movieType.push(type);
      }
    },
    getTypeNum() {
      const allType = [];
      const types = this.movieType;
      for (let i = 0; i < types.length; i++) {
        var singleMovType = types[i].split(" ");
        for (let j = 0; j < singleMovType.length; j++) {
          allType.push(singleMovType[j]);
        }
      }
      this.analyseTypes(allType);
    },
    analyseTypes(types) {
      var obj = {};
      for (let i = 0; i < types.length; i++) {
        var type = types[i];
        if (obj[type] === undefined) {
          obj[type] = 1;
        } else {
          obj[type] += 1;
        }
      }
      this.objSortByVal(obj);
    },
    objSortByVal(obj) {
      var keyArr = [],
        valArr = [];
      for (var key in obj) {
        keyArr.push(key);
        valArr.push(obj[key]);
      }
      for (var i = 0, len = valArr.length; i < len; i++) {
        for (var j = 0; j < len - i; j++) {
          var keyTemp, valTemp;
          if (valArr[j] < valArr[j + 1]) {
            valTemp = valArr[j];
            valArr[j] = valArr[j + 1];
            valArr[j + 1] = valTemp;
            keyTemp = keyArr[j];
            keyArr[j] = keyArr[j + 1];
            keyArr[j + 1] = keyTemp;
          }
        }
      }
      var newObj = {};
      for (let i = 0; i < valArr.length; i++) {
        newObj[keyArr[i]] = valArr[i];
      }
      this.movieTypeNum = newObj;
    }
  },
  mounted() {
    this.drawChart();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
