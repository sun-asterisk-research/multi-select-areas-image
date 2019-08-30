<template>
  <div>
    <div class="image-decorator" ref="image-area">
      <div :style="{positon: 'relative'}">
        <img
            class="original-image"
            :src="url"
            alt="Original Image"
            v-if="url"
            :width="width"
        >
        <div 
            class="select-areas--overlay" 
            :style="{
              opacity: 0.5,
              position: 'absolute',
              width: originImgSize.w+'px',
              height:  originImgSize.h+'px',
              display: 'block'
            }">
        </div>

        <div 
            :style="{
              'background-color': 'rgb(0, 0, 0)',
              opacity: 0,
              position: 'absolute',
              width: originImgSize.w+'px',
              height: originImgSize.h+'px',
              cursor: 'crosshair'
            }"
            @mousedown="mouseDown"
            @mousemove="mouseMove"
        ></div>

        <div v-for="item in areas" :key="item.id">
          <div @mousedown.stop.prevent="startMove(item, $event)" @mousemove="doMove(item, $event)">
            <div
                class="select-areas--outline"
                :style="{
                  opacity: 0.5,
                  position: 'absolute',
                  cursor: 'default',
                  width: item.width+4+'px',
                  height: item.height+4+'px',
                  left: item.x+posImg.left-2+'px',
                  top: item.y+posImg.top-2+'px',
                  'z-index': item.z
                }"
            ></div>
            <div
                class="select-areas--background_area" 
                :style="{
                  background: `#fff url('${url}') -${item.x}px -${item.y}px / ${originImgSize.w}px ${originImgSize.h}px no-repeat`,
                  position: 'absolute',
                  cursor: 'move',
                  width: item.width+'px',
                  height: item.height+'px',
                  left: item.x+posImg.left+'px',
                  top: item.y+posImg.top+'px',
                  'z-index': item.z+2
                }"
                @click="changeResizable(item.id)"
            >
            
            </div>
            <div
                v-if="item.resizable"
                class="delete-area"
                :style="{
                  display: 'block',
                  left: item.x+posImg.left+item.width+'px',
                  top: item.y+posImg.top-25+'px',
                  'z-index': item.z+2
                }"
                @click="deleteSelected(item.id)"
            >
              <div class="select-areas--delete_area"></div>
            </div>
            <!-- resize handler -->
            <Resizable :item="item" :posImg="posImg" @startDrag="startDrag" @doDrag="doDrag" />
          </div>
        </div>

      </div>
      <div class="c-crop--hide_main">
        <img id="c-crop--hide_img" :src="url" alt="" :width="width"/>
      </div>
  </div>
  </div>
</template>
<script>
import Resizable from './Resizable.vue'

export default {
  data () {
    return {
      mousedown: false, // state mouse down event
      originImgSize: { // root size image
        w: 0,
        h: 0,
        r: 0
      },
      url: this.cropUrl,
      posImg: { // position box image in screen
        top: 0,
        left: 0
      },
      scrollLeft: 0,
      scrollTop: 0,
      areas: [
        {
          id: 1,
          x: 100,
          y: 200,
          width: 200,
          height: 100,
          z: 0,
          resizable: false
        }
      ],
      moveTempX: 0,
      moveTempY: 0,
      moveCurrentX: 0,
      moveCurrentY: 0,
      temp: 0,
      dragdown: false, // state mouse event drag,
      move: false
    }
  },
  props: {
    cropUrl: {
      type: String,
      default: 'https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/45585072_925043081015026_6599956628924006400_o.jpg?_nc_cat=108&_nc_oc=AQlJUcFj4S_wGeX016thVhmgINU5wDV4xPBNSCIcYSti9Sm5WEPBDYO_kxK4aRP0Emo&_nc_ht=scontent.fhan2-3.fna&oh=052bb05956a1460d014205754da5a15b&oe=5DCC1053'
    },
    width: {
      type: Number,
      default: 1500
    }
  },
  components: {
    Resizable
  },
  created () {
  },
  watch: {
    cropUrl (val) {
      this.url = val
      setTimeout(() => {
        this.setSize()
      }, 200)
    }
  },
  methods: {
    async setSize () {
      if (!this.url) {
        return
      }
      let imgSize = await this.getSize(this.url)
      this.originImgSize = imgSize
    },
    // Get the size of the src image
    getSize (src) {
      let _this = this
      let img = this.$el.querySelector('#c-crop--hide_img')
      return new Promise(resolve => {
        if (src && img) {
          img.onload = function () {
            // Compatible with unacceptable size
            const size = _this.getSizeImg(img)
            resolve(size)
          }
          img.src = src
        } else {
          resolve({
            w: 0,
            h: 0,
            r: 0
          })
        }
      })
    },
    getSizeImg (img) {
      let w = img.width
      let h = img.height
      let r = w === 0 && h === 0 ? 0 : w / h
      return {
        w: w,
        h: h,
        r: r
      }
    },
    calcPosOfBox() { // set posImg static
      let ref = this.$refs['image-area']
      
      this.scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop
      this.posImg.top = ref.getBoundingClientRect().top + this.scrollTop

      this.posImg.left = ref.getBoundingClientRect().left + this.scrollLeft
    },
    // draw rectangle on image mouseDown mouseMove mouseUp
    mouseDown(e) {
      this.mousedown = true
      if(this.areas.length > 0) {
        let idArea = this.areas.slice(-1).pop().id // get last areas
        if (idArea) {
          this.areas.push({
            id: idArea + 1,
            x: e.pageX - this.posImg.left,
            y: e.pageY - this.posImg.top,
            width: 0,
            height: 0,
            z: 0,
            resizable: false
          })
          this.temp = idArea + 1;
        }
      }
      else {
        this.areas.push({
          id: 1,
          x: e.pageX - this.posImg.left,
          y: e.pageY - this.posImg.top,
          width: 0,
          height: 0,
          z: 0,
          resizable: false
        })
        this.temp = 1;
      }
    },

    mouseMove(e) {
      if (this.mousedown) {
        this.areas.filter(x => x.id == this.temp).map(item => {
          item.width = (e.pageX - item.x - this.posImg.left) - 8
          item.height = (e.pageY - item.y - this.posImg.top) - 8
        });
      }
    },

    mouseUp() {
      this.mousedown = false
      // delete all point width is = 0
      this.areas = this.areas.filter(item => item.width != 0 || item.height != 0)
    },

    // after click rectangle area select active resizable and dragable
    changeResizable(id) {
      this.areas.filter(item => item.id == id).map(item => {
        item.resizable = true
        item.z = 100
      })
      this.areas.filter(item => item.id != id).map(item => {
        item.resizable = false
        item.z = 0
      })
    },

    // delete item area
    deleteSelected(id) {
      this.areas = this.areas.filter(item => item.id != id)
    },

    // drag point around rectangle on image startDrag doDrag endDrag
    startDrag() {
      this.dragdown = true
    },

    doDrag(item, type, e) {
      if (this.dragdown) {
        switch (type) {
          case 'w':
            item.width = item.width + item.x - e.pageX + this.posImg.left
            item.x = e.pageX - this.posImg.left
            if (item.width < 10) {
              item.x = item.x - 10
              item.width = item.width + 10
            }
            break;
          case 'sw':
            item.width = item.width + item.x - e.pageX + this.posImg.left
            item.x = e.pageX - this.posImg.left
            item.height = (e.pageY - this.posImg.top - item.y)
            if (item.width < 10) {
                item.x = item.x - 10
                item.width = item.width + 10
            }
            if (item.height < 10) {
                item.height = item.height + 10
            }
            break;
          case 's':
            item.height = (e.pageY - this.posImg.top - item.y)
            if (item.height < 10) {
                item.height = item.height + 10
            }
            break;
          case 'se':
            item.width = e.pageX - this.posImg.left - item.x
            item.height = (e.pageY - this.posImg.top - item.y)
            if (item.width < 10) {
                item.x = item.x - 10
                item.width = item.width + 10
            }
            if (item.height < 10) {
                item.height = item.height + 10
            }
            break;
          case 'e':
            item.width = e.pageX - this.posImg.left - item.x
            if (item.width < 10) {
                item.x = item.x - 10
                item.width = item.width + 10
            }
            break;
          case 'ne':
            item.width = e.pageX - this.posImg.left - item.x
            item.height = item.height + ((item.y + this.posImg.top) - e.pageY)
            item.y = e.pageY - this.posImg.top
            
            if (item.width < 10) {
                item.x = item.x - 10
                item.width = item.width + 10
            }
            if (item.height < 10) {
                item.height = item.height + 10
            }
            break;
          case 'n':
            item.height = item.height + ((item.y + this.posImg.top) - e.pageY)
            item.y = e.pageY - this.posImg.top

            if (item.height < 10) {
                item.height = item.height + 10
            }
            break;
          case 'nw':
            item.height = item.height + ((item.y + this.posImg.top) - e.pageY)
            item.y = e.pageY - this.posImg.top
            item.width = item.width + item.x - e.pageX + this.posImg.left
            item.x = e.pageX - this.posImg.left
            if (item.width < 10) {
              item.x = item.x - 10
              item.width = item.width + 10
            }
            if (item.height < 10) {
                item.height = item.height + 10
            }
            break;
          default:
            break;
        }
      }
    },

    endDrag() {
      this.dragdown = false
    },

    // move rectangle area startMove doMove endMove
    startMove(item, e) {
      this.move = true
      this.moveTempX = e.clientX
      this.moveTempY = e.clientY
      this.moveCurrentX = item.x
      this.moveCurrentY = item.y
    },

    doMove(item, e) {
      if (this.move) {
        let x = this.moveCurrentX + (e.clientX - this.moveTempX)
        let y = this.moveCurrentY + (e.clientY - this.moveTempY)
        let maxX = this.originImgSize.w - item.width
        let maxY = this.originImgSize.h - item.height
        if (x > 0 && y > 0 && x < maxX && y < maxY) {
          item.x = x
          item.y = y
        }
      }
    },

    endMove() {
      this.move = false
    }

  },
  mounted () {
    this.setSize()
    window.addEventListener('mousemove', this.calcPosOfBox);
    window.addEventListener('scroll', this.calcPosOfBox);
    this.calcPosOfBox()
    window.addEventListener('mouseup', this.mouseUp)
    window.addEventListener('mouseup', this.endMove)
    window.addEventListener('mouseup', this.endDrag)
  }

}

</script>
<style  lang="scss" scoped>
.c-crop {
  display: inline-block;
  *{
    box-sizing: border-box;
  }
  img {
    pointer-events: none;
  }
  .c-crop--hide_main{
      width: 0;
      height: 0;
      overflow: hidden;
    }
}

.original-image {
  position: absolute;
}

.select-areas {
  &--overlay {
    background-color: #000;
    overflow: hidden;
    position: absolute;
  }

  &--outline {
    background: #fff url(data:image/gif;base64,R0lGODlhCAAIAJEAAKqqqv///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAAACwAAAAACAAIAAACDZQFCadrzVRMB9FZ5SwAIfkECQoAAAAsAAAAAAgACAAAAg+ELqCYaudeW9ChyOyltQAAIfkECQoAAAAsAAAAAAgACAAAAg8EhGKXm+rQYtC0WGl9oAAAIfkECQoAAAAsAAAAAAgACAAAAg+EhWKQernaYmjCWLF7qAAAIfkECQoAAAAsAAAAAAgACAAAAg2EISmna81UTAfRWeUsACH5BAkKAAAALAAAAAAIAAgAAAIPFA6imGrnXlvQocjspbUAACH5BAkKAAAALAAAAAAIAAgAAAIPlIBgl5vq0GLQtFhpfaIAACH5BAUKAAAALAAAAAAIAAgAAAIPlIFgknq52mJowlixe6gAADs=);
    overflow: hidden;
  }

  &--delete_area {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfjCB0SCQuXtRLQAAABRklEQVQoz4XRMUiUcQCG8V//O6MhuuEwI4VDDg9ubDCC+ILzIgcFySEnP2wOkqDRMffAa+3wpqDBSRAPp6MlC+yTFsnS0EzBursp8ECHS3AIetYXXnjfhy5B2SuJlpZPKkaEbnAJDJh33w/v7SLntpvq5uz5G69IPFWUlZGRVTQrsaK/W74o8UiftHPS+kxJVIWUkucWLHvilkO/kfdY5K2OaR+DSQfqjrWNmzFkyIxxbcdWHZpMi7xzpGNJxl29KGhY0nFk3b0gZ0cH22q2lJVtqdnGiW9ywX8Idg3qQV6sYM2aglgePQbtpDXc0avpoUhDDbFIy0vXDWuk/BH76avIpje++OW7lGs+mzBqnqAqMfWPoza9FlJOfVAy5kTTqcuuuCpnwqx9z7S7svq98MDBBVk31M3Zv7hmRMWGpqYNC0rnus8AXqJjvC9MrWIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDgtMjlUMTY6MDk6MTErMDI6MDDV30hTAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTA4LTI5VDE2OjA5OjExKzAyOjAwpILw7wAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=);
    cursor: pointer;
    height: 16px;
    width: 16px;
  }
}

.delete-area {
    position: absolute;
    cursor: pointer;
    padding: 5px;
}
</style>
