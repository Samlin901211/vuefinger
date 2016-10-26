<template>
  <div id="app">

    <div class="title">tap</div>
    <div class="demo" v-finger:options="tapOptions">
        <img class="demo_img" src="./demo.jpg">
    </div>

    <div class="title">longPress</div>
    <div class="demo" v-finger:options="longpressOptions">
        <img class="demo_img" src="./demo.jpg">  
    </div>
    
    <div class="title">doubletap</div>
    <div class="demo" v-finger:options="doubletapOptions">
        <img class="demo_img" src="./demo.jpg">
    </div>
    
    <div class="title">pintch</div>
    <div class="demo" v-finger:options="pintchOptions">
        <img class="demo_img" src="./demo.jpg">
    </div>

    <div class="title">rotate</div>
    <div class="demo" v-finger:options="rotateOptions">
        <img class="demo_img" src="./demo.jpg">
    </div>

    <div class="title">swipe</div>
    <div class="demo_swipe" v-finger:options="swipeOptions">
        <img src="./logo.png">
    </div>

    <div class="title">pressmove</div>
    <div class="demo demo_pressmove">
        <img class="demo_pressmove_img" style="top:0px;left:0px" src="./demo.jpg" v-finger:options="pressmoveOptions">
    </div>

    <div class="title">rotateAndPintch</div>
    <div class="demo" v-finger:options="rotateAndPintchOptions">
        <img class="demo_img" src="./demo.jpg">
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueFinger from 'vuefinger'
Vue.use(VueFinger)

export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello Vue!',
      tapOptions : {
          tap:function() {
             alert("tap")
          }
      },
      longpressOptions : {
          longpress:function() {
             alert("longpress")
          }
      },
      doubletapOptions : {
        doubletap:function() {
            alert("doubleTap");
        }
      },
      rotateOptions : {
          multistartcallback: function() {
               this.prerotateZ = this.rotateZ;
          },
          rotate:function(evt) {
              this.rotateZ = this.prerotateZ + evt.rotate;
          }
      },
      pintchOptions: {
          multistartcallback: function() {
              this.prescaleX = this.scaleX;
          },
          pinch : function(evt) {
               var scale = evt.scale;
               this.scaleX = this.scaleY = this.prescaleX * scale;
          }
      },
      swipeOptions: {
          swipe : function(evt) {
               alert(evt.direction);
          }
      },
      pressmoveOptions: {
          singlestartcallback: function() {
            console.log(this.style.top)
              this.styleTop = parseInt(this.style.top);
              this.styleLeft = parseInt(this.style.left);
          },
          pressmove : function(evt) {
              var disX = evt.disX;
              var disY = evt.disY;
              this.style.top = this.styleTop + disY + "px";
              this.style.left = this.styleLeft + disX + "px";
          } 
      },
      rotateAndPintchOptions : {
          pinch : function(evt) {
               var scale = evt.scale;
               this.scaleX = this.scaleY = this.prescaleX * scale;
          },
          multistartcallback: function() {
               this.prescaleX = this.scaleX;
               this.prerotateZ = this.rotateZ;
          },
          rotate:function(evt) {
              this.rotateZ = this.prerotateZ + evt.rotate;
          }
      }
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
  text-align:center;
  margin:0;
  padding:0;
}
.title {
  font-size:30px;
  padding:10px;
  background: lightblue;
  color:white;
}
.demo {
  width:100px;
  height:100px;
  margin:30px auto;
}
.demo_swipe {
  margin:30px auto;
}
.demo_pressmove {
  position:relative;
}
.demo_img {
  width:100%;
}
.demo_pressmove_img {
  width:100%;
  position:absolute;
}
</style>
