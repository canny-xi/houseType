<style lang="less" scoped src="./index.less" ></style>

<template>
  <div class='house'>
    <div>
      <div class='title' v-if="show">
        <img class='bgImg' src='../../assets/images/bg@2x.png' />
        <img class='x' src='../../assets/images/叉@2x.png' @click='cancel' />
        <img class='logo' src='../../assets/images/43@2x.png' />
        <a href="http://itunes.apple.com/app/id1371978352?mt=8">
          <img class='butoonImg' src='../../assets/images/button@2x.png' /></a>
      </div>
      <div class='houseImg'>
        <div class='imgList'>
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(data,index) in listImg" :key="index" :style="{backgroundImage: 'url(' + base+data +')'}"></div>
            </div>
          </div>
        </div>
        <div class='textBtn'>
          <span class='text' :class="tipActiveIndex==0?'active':''" @click="clickTip(0 , '平面图')">平面图</span>
          <span class='text' :class="tipActiveIndex==1?'active':''" @click="clickTip(1 , '效果图')">效果图</span>
          <span class='text' :class="tipActiveIndex==2?'active':''" @click="clickTip(2 , '3D图')">3D图</span>
          <span class='text' :class="tipActiveIndex==3?'active':''" @click="clickTip(3 , '实景图')">实景图</span>
        </div>
      </div>
      <div class='houseInfo'>
        <div class='text'>{{submitForm.house_type_name}}</div>
        <div class='hui'>建筑面积：{{submitForm.property_area_min + "m"}}
          <sup>2</sup> - {{submitForm.property_area_max+ "m"}}
          <sup>2</sup>
        </div>
        <div class='text'>户型卖点：</div>
        <div class='text'>{{submitForm.sell_point}}</div>
      </div>
    </div>
    <!-- <div>
      <div class='title-text'>本楼盘其他户型</div>
      <div></div>
    </div> -->
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
export default {
  data() {
    return {
      submitForm: {},
      names: [],
      listImg: [],
      show: true,
      tipActiveIndex: 0
    };
  },

  mounted() {
    this.getHouseType();
  },
  methods: {
    swiperLoad() {
      var swiper = new Swiper(".swiper-container", {
        observer: true
      });
    },
    cancel() {
      this.show = false;
    },
    clickTip(index, name) {
      this.tipActiveIndex = index;
      this.listImg = this.submitForm.img_data[name];
      this.$nextTick(() => {
        this.swiperLoad();
      });
    },
    async getHouseType() {
      let res = await this.api.shareHouseType({ house_type_id: this.$route.query.house_type_id });
      if (res.code == 200) {
        this.submitForm = res.data;
        let temp = res.data.img_data["平面图"];
        this.listImg = temp;
        this.$nextTick(() => {
          this.swiperLoad();
        });
      }
    }
  }
};
</script>



