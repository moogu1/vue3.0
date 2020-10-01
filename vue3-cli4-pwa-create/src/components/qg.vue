<template>
  <div class="qgdetail" id="qgdetail">
    <div class="m-b-20">
      <template v-if="nick">
        玩家：
        <span class="c-r left">{{ nick }}</span>
      </template>
      订单号：
      <span class="c-r left">{{ gameId}}</span>

      <template v-if="gameType">
        战绩详情：
        <span class="c-r left">{{ GAME_TYPE[gameType] }}</span>
      </template>
      
    </div>

    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="list"
      style="width: 100%"
      :header-cell-style="{'coloer':'#fff'}"
      :row-class-name="getCurrentRow"
    >
      <el-table-column prop="position" align="center" label="位置" sortable></el-table-column>

      <el-table-column label="玩家类型" align="center">
        <template slot-scope="scope">
          <span
            :class="{'isBanker' : scope.row.bankerFlag}"
          >{{ getPlayerType(scope.row.bankerFlag) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nick" align="center" label="玩家昵称"></el-table-column>

      <el-table-column v-if="isShowBetAmount"  label="庄\闲" align="center">
          <template slot-scope="scope"><span>{{scope.row.bankerFlag==true?'庄':'闲'}}</span></template>
      </el-table-column>


      <el-table-column label="投注金额" align="center" v-if="isShowBetAmount">
        <template slot-scope="scope">
          <div>
            <span>{{ scope.row.betAmount }}</span>
          </div>
        </template>
      </el-table-column>

       <el-table-column label="抢包金额" align="center" v-if="true">
        <template slot-scope="scope">
          <div class="bonus-bg">
            <span> {{ scope.row.grabAmount }} </span>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="牌型" v-if="true">
        <template slot-scope="scope">
          <div>
            <span> {{ scope.row.paiType }} </span>
          </div>
        </template>
      </el-table-column>

      <el-table-column v-if="gameType == 1 || gameType == 3" align="center" label="胜数">
         <template slot-scope="scope">
          <div :class="{'isBoom' : scope.row.winLoss != '未中雷' }">
            <div>
              <span v-if=" scope.row.winLoss == '未中雷'">{{ scope.row.winLoss }}</span>
            </div>
          </div>
        </template>
      </el-table-column>

      <!-- <el-table-column v-else prop="winLoss" align="center" label="胜数"></el-table-column> -->

      <el-table-column prop="rate" align="center" label="赔率"></el-table-column>
      <el-table-column  align="center" label="结果">
         <template slot-scope="scope">
            <span :class="getResultClass(scope.row.result)">{{ scope.row.result }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="isShowBetAmount"  align="center" label="佣金">
         <template slot-scope="scope">
            <span >{{ scope.row.commission }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import qs from "qs";
import { DATA, GAME_TYPE } from "./data";
export default {
  name: "qgdetail",
  data() {
    return {
      list: [],
      loading: true,
      query: {},
      param: {},
      GAME_TYPE,
      isShowBetAmount: false,
    };
  },
  computed: {
    nick() {
      return this.param.nick;
    },
    gameId() {
      return this.param.gameId;
    },
    gameType() {
      return this.param.gameType;
    },
    // isShowBetAmount(){
    //   return 
    //   // return this.gameType != 2 || this.gameType != 4 || this.gameType != 5;
    // }
  },
  mounted() {
    // console.log(this.$route.query.query);
    this.getData();
  },
  methods: {
    getData() {
      // setTimeout(() => {
      // this.list = DATA.data;
        // this.loading = false;
      // }, 2000);
      //  return;
      // const innerParam = JSON.stringify({
      //   gameId: "1",
      //   gameType: 4,
      //   orderBySort: "desc",
      //   startTime: "2020-01-22 00:00:00",
      //   page: 1,
      //   endTime: "2020-01-22 23:59:59",
      //   rows: 10,
      //   playerId: "40164"
      // });
      // let queryString = {
      //   param: innerParam,
      //   agentcode: "1",
      //   num: "14307154",
      //   sign: "eaedb3f6bea1ca4f3f5763d83fff5d18",
      //   time: "1580447582450",
      //   tenant: "QGDEV",
      //   rootKey: "QG"
      // };

      this.query = this.$route.query.query ? JSON.parse(decodeURIComponent(this.$route.query.query)) : {};
      this.param = this.query.param ? JSON.parse(this.query.param) : {};

      const { tenant } = this.query;
      // const params = qs.stringify(queryString);
      const params = qs.stringify(this.query);

      if(JSON.stringify(decodeURIComponent(this.$route.query.query)) == localStorage.getItem('key')){
        this.list = JSON.parse(localStorage.getItem('value'));
        const obj = this.list[0] || {};
        this.isShowBetAmount = obj.templateType == 2;
        this.loading = false;
        this.list  = [...this.list ];
        console.log(this.list);
        setTimeout(() => {
          this.$forceUpdate()
        }, 300);
        return;
      }
      //  this.list = DATA.data;
      //  return;
      this.$axios
        .post(`/openapi/playerDataStats/gameDetail`, params, {
          headers: {
            tenant,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          if (res.data.code == "200") {
            this.list = res.data.data;
            console.log(this.list);
            const obj = this.list[0] || {};
            this.isShowBetAmount = obj.templateType == 2;
            localStorage.setItem('key', JSON.stringify(decodeURIComponent(this.$route.query.query)));
            localStorage.setItem('value',JSON.stringify(res.data.data));
            this.list  = [...this.list ];
            setTimeout(() => {
              this.$forceUpdate()
            }, 300);
            // console.log(this.list);
          }
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    getPlayerType(bool) {
      // console.log(bool);
      return bool ? "庄家" : "玩家";
    },
    getResultClass(result){
      if(Number(result) > 0){
        return  'green';
      }else if(Number(result < 0)){
        return 'red';
      }
      return ''
    },
    getCurrentRow({row, rowIndex}){
      let className = '';
      if (row.nick == this.nick) {
        className = 'current-user';
      }
      if(rowIndex % 2 != 0){
        className += ' ' + 'stripe-class';
      }
      return className;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.qgdetail {
  margin: 20px 20px 0 20px;
}
.c-r {
  color: red;
}
.left {
  display: inline-block;
  margin-right: 30px;
}
.m-b-20 {
  margin-bottom: 20px;
}
.bonus-bg {
  width: 44px;
  height: 54px;
  background: url("./imgs/hb.png") no-repeat center / cover;
  color: #fff;
  margin: 0 auto;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bonus-bg > span {
  margin-bottom: -15px;
}
.isBanker {
  color: orange;
}
.red {
  color: red;
}
.green {
  color: green;
}
 .current-user td .cell{
  color:  red;
}
 .current-user td .cell .bonus-bg{
  color: yellow;
}

 .el-table td{
  padding: 5px 0;
}
 .el-table .stripe-class{
  background: #ececec;
}

.isBoom{
  width: 56px;
  height: 50px;
  background: url('./imgs/lei.png') no-repeat center /cover;
  margin: 0 auto;
}
</style>



// WEBPACK FOOTER //
// src/components/qgdetail.vue