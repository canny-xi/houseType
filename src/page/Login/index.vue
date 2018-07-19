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
      <div class='house_Info'>户型详情</div>
      <div class='houseImg'>
        <div class='imgList'>
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(data,index) in listImg" :key="index" :style="{backgroundImage: 'url(' + base+data.img +')'}"></div>
            </div>
          </div>
        </div>
        <div class='textBtn'>
          <span class='text' :class="current.type == tab ? 'active' : ''" @click="clickTip(index , tab)" v-for='(tab,index) in tabList'>{{tab}}</span>
          <!-- <span class='text' :class="current.type == '平面图' ? 'active' : ''" @click="clickTip(0 , '平面图')">平面图</span>
          <span class='text' :class="current.type == '效果图' ? 'active' : ''" @click="clickTip(1 , '效果图')">效果图</span>
          <span class='text' :class="current.type == '3D图' ? 'active' : ''" @click="clickTip(2 , '3D图')">3D图</span>
          <span class='text' :class="current.type == '实景图' ? 'active' : ''" @click="clickTip(3 , '实景图')">实景图</span> -->
        </div>
      </div>
      <div class='houseInfo'>
        <div class='text'>{{submitForm.house_type_name}}</div>
        <div class='hui'>建筑面积：{{submitForm.property_area_min + "m"}}
          <sup>2</sup> - {{submitForm.property_area_max+ "m"}}
          <sup>2</sup>
        </div>
        <div class='text'>户型卖点</div>
        <div>{{submitForm.sell_point}}</div>
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
      current: {},
      swiper: null,
      tabList: []
    };
  },

  mounted() {
    this.getHouseType();
  },
  methods: {
    swiperLoad() {
      this.swiper = new Swiper(".swiper-container", {
        on: {
          slideChange: () => {
            this.current = this.listImg[this.swiper.activeIndex]; //总图滑动 跳下tip
          }
        },
        observer: true
      });
    },
    cancel() {
      this.show = false;
    },
    clickTip(index, name) {
      let t1 = this.submitForm.img_data["平面图"].length;
      let t2 = this.submitForm.img_data["效果图"].length;
      let t3 = this.submitForm.img_data["3D图"].length;
      let t4 = this.submitForm.img_data["实景图"].length;
      if (index == 0) {
        this.swiper.slideTo(0, 0, false);
      }
      if (index == 1) {
        this.swiper.slideTo(t1, 0, false);
      }
      if (index == 2) {
        this.swiper.slideTo(t1 + t2, 0, false);
      }
      if (index == 3) {
        this.swiper.slideTo(t1 + t2 + t3, 0, false);
      }
    },
    async getHouseType() {
      let res = await this.api.shareHouseType({
        house_type_id: this.$route.query.house_type_id
      });
      if (res.code == 200) {
        this.submitForm = res.data;
        let arr = [];
        for (let tab in res.data.img_data) {
          this.tabList.push(tab);
          let imgs = res.data.img_data[tab];
          for (let img of imgs) {
            let temp = {};
            temp.type = tab;
            temp.img = img;
            arr.push(temp);
          }
        }
        this.listImg = arr;
        this.current = this.listImg[0];

        this.$nextTick(() => {
          this.swiperLoad();
        });
      }
    }
  }
};
</script>



