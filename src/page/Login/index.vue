<style lang="less" scoped src="./index.less" ></style>

<template>
  <div class='house'>
    <div>
      <div class='title' v-if="show">
        <img class='bgImg' src='../../assets/images/bg@2x.png' />
        <!-- <img class='x' src='../../assets/images/叉@2x.png' @click='cancel' /> -->
        <img class='logo' src='../../assets/images/43@2x.png' />
        <a href="https://a.app.qq.com/o/simple.jsp?pkgname=com.yskj.yunqudao">
          <img class='butoonImg' src='../../assets/images/button@2x.png' /></a>
      </div>
      <div class='house_Info'>户型详情</div>
      <div class='houseImg'>
        <div class='imgList'>
          <div class="swiper-container" @click='showPreview'>
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(data,index) in listImg" :key="index" :style="{backgroundImage: 'url(' + base+data.img +')'}"></div>
            </div>
          </div>
        </div>
        <div class='textBtn'>
          <span class='text' :class="current.type == tab.name? 'active' : ''" @click="clickTip(index , tab)" v-for='(tab,index) in tabList' :key='index'>{{tab.name}}</span>
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
import "swiper/dist/idangerous.swiper.css";
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
    showPreview() {
      this.$router.push({
        name: "preview",
        query: { house_type_id: this.$route.query.house_type_id }
      });
    },
    swiperLoad() {
      this.swiper = new Swiper(".swiper-container", {
        onSlideNext: () => {
          this.current = this.listImg[this.swiper.activeIndex];
        },
        onSlidePrev: () => {
          this.current = this.listImg[this.swiper.activeIndex];
        },
        runCallbacks: true
      });
    },
    cancel() {
      this.show = false;
    },
    clickTip(index, tab) {
      this.swiper.swipeTo(tab.index, 0, false);
      this.current = this.listImg[tab.index];
    },
    async getHouseType() {
      let res = await this.api.shareHouseType({
        house_type_id: this.$route.query.house_type_id
      });
      if (res.code == 200) {
        this.submitForm = res.data;
        let arr = [];
        for (let tab in res.data.img_data) {
          let tabTemp = {};
          let imgs = res.data.img_data[tab];
          tabTemp.name = tab;
          tabTemp.index = arr.length;
          this.tabList.push(tabTemp);
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



