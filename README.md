#vuefinger
一款基于vue1.0的手势库

#demo
![太阳系][1]
[1]: https://raw.githubusercontent.com/Samlin901211/img/master/vuefinger/vue1.0_demo.png

#使用说明
##1.安装 npm install vuefinger --save
##2.引入
```javascript
  import Vue from 'vue'
  import Vuefinger from 'vuefinger'
  Vue.use(Vuefinger)
```  
##3.在需要绑定手势事件的元素上绑定v-finger:options,需要绑定的回调写在options中
 
例如:
```javascript
 <template>
   <div class="demo" v-finger:options="options">
      <img class="demo_img" src="./demo.jpg">
   </div>
</template>
<script>
  import Vue from 'vue'
  import VueFinger from 'vuefinger'
  Vue.use(VueFinger)
 
  export default {
     data () {
        return {
           options: {
              tap:function() {
                   alert("tap")
              }
            }
         }
      }
  }
```
#事件支持
* 回调函数this指向绑定手势的元素
* 点击 tap
回调值：无
* 长按 longpress
回调值：无
* 双击 doubletap
回调值：无
* 缩放 pinch
回调值：｛scale:"“｝
* 旋转 rotate
回调值：｛rotate:”“｝
* 滑动 swipe
回调值：｛direction:”“｝ //up、down、left、right
* 按住拖动 pressmove
回调值：｛disX:”"，disY｝
* 单指开始回调 singlestartcallback
回调值：无
* 单指结束回调 singleendcallback
回调值：无
* 多指开始回调 multistartcallback
回调值：无
* 多指结束回调 multiendcallback
回调值：无

#其他说明
* 目前暂时不支持vue2.0，因为指令传参发现无法传递函数，故后续会采用新的方案，尽情期待哈
* 使用了transform.js，增强了元素的功能，自动监控元素的transform3D相关属性
rotateX,rotateY,rotateZ
scaleX,scaleY,scaleZ
translateX,translateY,translateZ
例如:
```javascript
<template>
   <div class="demo" v-finger:options="options">
      <img class="demo_img" src="./demo.jpg">
   </div>
</template>
<script>
  import Vue from 'vue'
  import VueFinger from 'vuefinger'
  Vue.use(VueFinger)
 
  export default {
     data () {
        return {
           options: {
               pinch:function(evt) {
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
```