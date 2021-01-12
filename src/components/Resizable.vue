<template>
    <div class="handler">
        <!-- resize handler -->
        <div
            v-if="item.resizable"
            class="select-areas-resize-handler w"
            :style="{
                opacity: 0.5,
                position: 'absolute',
                cursor: 'w-resize',
                display: 'block',
                left: (displayPosX(item)-6)+'px',
                top: (displayPosY(item)+item.height/2-4)+'px',
                'z-index': item.z+10
            }"
            @mousedown.stop.prevent="startDrag(item, 'w')"
        >
        </div>
        <div
            v-if="item.resizable"
            class="select-areas-resize-handler sw"
            :style="{
                opacity: 0.5,
                position: 'absolute',
                cursor: 'sw-resize',
                display: 'block',
                left: (displayPosX(item)-4)+'px',
                top: (displayPosY(item)+item.height-6)+'px',
                'z-index': item.z+10
            }"
            @mousedown.stop.prevent="startDrag(item, 'sw')"
        >
        </div>
        <div
            v-if="item.resizable"
            class="select-areas-resize-handler s"
            :style="{
                opacity: 0.5,
                position: 'absolute',
                cursor: 's-resize',
                display: 'block',
                left: (displayPosX(item)+item.width/2-4)+'px',
                top: (displayPosY(item)+item.height-6)+'px',
                'z-index': item.z+10
            }"
            @mousedown.stop.prevent="startDrag(item, 's')"
        >
        </div>
        <div
            v-if="item.resizable"
            class="select-areas-resize-handler se"
            :style="{
                opacity: 0.5,
                position: 'absolute',
                cursor: 'se-resize',
                display: 'block',
                left: (displayPosX(item)+item.width-6)+'px',
                top: (displayPosY(item)+item.height-6)+'px',
                'z-index': item.z+10
            }"
            @mousedown.stop.prevent="startDrag(item, 'se')"
        >
        </div>
        <div
            v-if="item.resizable"
            class="select-areas-resize-handler e"
            :style="{
                opacity: 0.5,
                position: 'absolute',
                cursor: 'e-resize',
                display: 'block',
                left: (displayPosX(item)+item.width-6)+'px',
                top: (displayPosY(item)+item.height/2-6)+'px',
                'z-index': item.z+10
            }"
            @mousedown.stop.prevent="startDrag(item, 'e')"
        >
        </div>
        <div
            v-if="item.resizable"
            class="select-areas-resize-handler ne"
            :style="{
                opacity: 0.5,
                position: 'absolute',
                cursor: 'ne-resize',
                display: 'block',
                left: (displayPosX(item)+item.width-6)+'px',
                top: (displayPosY(item)-4)+'px',
                'z-index': item.z+10
            }"
            @mousedown.stop.prevent="startDrag(item, 'ne')"
        >
        </div>
        <div
            v-if="item.resizable"
            class="select-areas-resize-handler n"
            :style="{
                opacity: 0.5,
                position: 'absolute',
                cursor: 'n-resize',
                display: 'block',
                left: (displayPosX(item)+item.width/2-4)+'px',
                top: (displayPosY(item)-4)+'px',
                'z-index': item.z+10
            }"
            @mousedown.stop.prevent="startDrag(item, 'n')"
        >
        </div>
        <div
            v-if="item.resizable"
            class="select-areas-resize-handler nw"
            :style="{
                opacity: 0.5,
                position: 'absolute',
                cursor: 'nw-resize',
                display: 'block',
                left: (displayPosX(item)-4)+'px',
                top: (displayPosY(item)-4)+'px',
                'z-index': item.z+10
            }"
            @mousedown.stop.prevent="startDrag(item, 'nw')"
        >
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      pos: null
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          id: 0,
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          z: 0,
          resizable: false
        }
      }
    },
    posCorrection: {
      type: Boolean,
      default: true
    },
    posImg: {
      type: Object,
      default: null
    }
  },
  methods: {
    displayPosX (item) {
      return item.x + (this.posCorrection ? this.posImg.left : 0)
    },
    displayPosY (item) {
      return item.y + (this.posCorrection ? this.posImg.top : 0)
    },
    startDrag (item, type) {
      this.pos = type
      document.addEventListener('mousemove', this.doDrag)
      this.$emit('startDrag')
    },
    doDrag (e) {
      this.$emit('doDrag', this.item, this.pos, e)
    }
  },
  updated () {
    if (this.item.resizable === false) {
      window.addEventListener('mouseup', document.removeEventListener('mousemove', this.doDrag))
    }
  }
}
</script>
<style lang="scss" scoped>
.select-areas-resize-handler {
    background-color: #000;
    border: 1px #fff solid;
    height: 8px;
    width: 8px;
    overflow: hidden;
}
</style>
