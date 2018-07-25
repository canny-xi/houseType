<style lang="less" scoped src='./index.less'>
</style>

<template>
    <div class="mock">
        <div class="layout" @click="getBack">
            <div class="nav">
                <span class="title">动态相册</span>
            </div>
            <div class='houseImg'>
                <div class='imgList'>
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" @click.stop="detail" v-for="(data,index) in listImg" :key="index" :style="{backgroundImage: 'url(' + base+data.img +')'}"></div>
                        </div>
                    </div>
                </div>
                <div class='textBtn'>
                    <div>
                        <!-- <div class="idx">{{name}} {{startIndex}}/{{tmplength}}</div> -->
                        <div class="aidx">全部 {{img}}/{{total}}</div>
                        <span class='text' :class="current.type == tab.name? 'active' : ''" @click.stop="clickTip(index , tab)" v-for='(tab,index) in tabList' :key='index'>{{tab.name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/idangerous.swiper.css";
export default {
  name: "preview",
  data: function() {
    return {
      submitForm: {},
      names: [],
      listImg: [],
      show: true,
      current: {},
      swiper: null,
      tabList: [],
      total: 0,
      img: 1,
      name: "",
      startIndex: 1,
      tmplength: 1
    };
  },
  mounted() {
    this.getHouseType();
  },
  methods: {
    detail(e) {},
    getBack() {
      this.$router.go(-1);
    },
    swiperLoad() {
      this.swiper = new Swiper(".swiper-container", {
        onSlideNext: () => {
          this.current = this.listImg[this.swiper.activeIndex];
          this.img = this.swiper.activeIndex + 1;
        },
        onSlidePrev: () => {
          this.current = this.listImg[this.swiper.activeIndex];
          this.img = this.swiper.activeIndex + 1;
        },
        runCallbacks: true
      });
    },
    clickTip(index, tab) {
      console.log(tab);
      this.swiper.swipeTo(tab.index, 0, false);
      this.current = this.listImg[tab.index];
      this.img = tab.index;
      this.name = tab.name;
      this.startIndex = 1;
      if (this.img == 0) {
        this.img = 1;
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
        this.total = this.listImg.length;

        if (this.total > 0) {
          this.img = 1;
        } else {
          this.img = 0;
        }
        this.$nextTick(() => {
          this.swiperLoad();
        });
      }
    }
  }
};
</script>

