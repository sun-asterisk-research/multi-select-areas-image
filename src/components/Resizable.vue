<template>
    <div>
        <!-- resize handler -->
        <div 
            v-if="item.resizable"
            class="select-areas-resize-handler w"
            :style="{
                opacity: 0.5,
                position: 'absolute',
                cursor: 'w-resize',
                display: 'block',
                left: (item.x+posImg.left-6)+'px',
                top: (item.y+posImg.top+item.height/2-4)+'px',
                'z-index': item.z+10
            }"
            @mousedown.stop.prevent="startDrag(item ,$event)"
            @mousemove="doDrag(item, 'w', $event)"
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
                left: (item.x+posImg.left-4)+'px',
                top: (item.y+posImg.top+item.height-6)+'px',
                'z-index': item.z+10
            }"
            @mousedown.stop.prevent="startDrag(item ,$event)"
            @mousemove="doDrag(item, 'sw', $event)"
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
                left: (item.x+posImg.left+item.width/2-4)+'px',
                top: (item.y+posImg.top+item.height-6)+'px',
                'z-index': item.z+10
            }"
            @mousedown.stop.prevent="startDrag(item ,$event)"
            @mousemove="doDrag(item, 's', $event)"
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
                left: (item.x+posImg.left+item.width-6)+'px',
                top: (item.y+posImg.top+item.height-6)+'px',
                'z-index': item.z+10
            }"
            @mousedown.stop.prevent="startDrag(item ,$event)"
            @mousemove="doDrag(item, 'se', $event)"
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
                left: (item.x+posImg.left+item.width-6)+'px',
                top: (item.y+posImg.top+item.height/2-6)+'px',
                'z-index': item.z+10
            }"
            @mousedown.stop.prevent="startDrag(item ,$event)"
            @mousemove="doDrag(item, 'e', $event)"
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
                left: (item.x+posImg.left+item.width-6)+'px',
                top: (item.y+posImg.top-4)+'px',
                'z-index': item.z+10
            }"
            @mousedown.stop.prevent="startDrag(item ,$event)"
            @mousemove="doDrag(item, 'ne', $event)"
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
                left: (item.x+posImg.left+item.width/2-4)+'px',
                top: (item.y+posImg.top-4)+'px',
                'z-index': item.z+10
            }"
            @mousedown.stop.prevent="startDrag(item ,$event)"
            @mousemove="doDrag(item, 'n', $event)"
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
                left: (item.x+posImg.left-4)+'px',
                top: (item.y+posImg.top-4)+'px',
                'z-index': item.z+10
            }"
            @mousedown.stop.prevent="startDrag(item ,$event)"
            @mousemove="doDrag(item, 'nw', $event)"
        >
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    item: {
      type: Object,
      default: null
    },
    posImg: {
      type: Object,
      default: null
    }
  },
  methods: {
    startDrag(item, e) {
        this.$emit('startDrag', item, e)
    },
    doDrag(item, type, e) {
        this.$emit('doDrag', item, type, e)
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
