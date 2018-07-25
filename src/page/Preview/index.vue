<template>
    <div id="mock">
        <div class="layout" @click="getBack">
            <div class="nav">
                <span class="title">动态相册</span>
            </div>
            <div class="swiper-container">
                <div class="swiper-wrapper" ref="mySwiper">
                    <div class="swiper-slide" @click.stop="detail" v-for="(img,index) in listImg" :key="index" :style="{backgroundImage:'url(' + 'http://120.78.69.178:2902/' + img + ')'}"></div>
                </div>
            </div>
            <div class="tags">
                <div class="idx">{{name}} {{startIndex}}/{{tmplength}}</div>
                <div class="aidx">全部{{aidx}}/{{total}}</div>
                <ul class="flx">
                    <li v-for="(item,index) in items" :key="index" class="tag" @click.stop="changeIndex(item,index)" :class="{active: item.start < idx && idx <=item.end}">{{item.name}}</li>
                </ul>
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
      listImgs: [],
      listImg: [],
      activeIndex: 0,
      tags: [],
      current: {},
      idx: 1,
      tagName: "",
      total: 0,
      items: [],
      name: "",
      tmplength: 1,
      startIndex: 1,
      swiper: null
    };
  },
  computed: {
    aidx: function() {
      return this.idx;
    }
  },
  methods: {
    detail(e) {},
    changeIndex() {},
    getBack() {
      this.$router.go(-1);
    }
  },
  mounted() {}
};
</script>

<style scoped>
.layout {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 1);
}

.swiper-container {
  transition-timing-function: cubic-bezier(0, 0, 1, 1);
  position: absolute;
  top: 50%;
  /* left: 50%; */
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  width: 100%;
  height: 4.96rem;
}
.slide-wrapper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
}
.swiper-slide img {
  width: 100%;
  height: 100%;
}

.nav {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1rem;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}

.back {
  position: absolute;
  right: 0.5rem;
  top: 0;
  width: 1rem;
  padding-left: 10px;
  color: aliceblue;
  font-size: 32px;
}
.back img {
  width: 100%;
}

.title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: aliceblue;
  font-size: 14px;
}
.tags {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 1rem;
}
.flx {
  display: flex;
  display: -webkit-flex;
  width: 100%;
  /* background-color: aliceblue; */
  font-size: 12px;
}
.tag {
  padding: 0.1rem;
  background-color: white;
  border: 1px solid #40a9ff;
  margin-right: 5px;
  border-radius: 1px;
  width: 45px;
}
.idx {
  position: absolute;
  left: 0;
  top: -50%;
  font-size: 12px;
  transform: translate(0, -50%);
  margin-right: 0.2rem;
  color: aliceblue;
}
.aidx {
  position: absolute;
  right: 0;
  top: -50%;
  font-size: 12px;
  transform: translate(0, -50%);
  margin-right: 0.2rem;
  color: aliceblue;
}

.active {
  background-color: #40a9ff;
  color: white;
}
</style>
