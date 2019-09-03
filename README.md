## Live Demos

https://demo-multi-select-areas-image.herokuapp.com

## Installation

### With npm or yarn 

```bash
yarn add multi-select-areas-image

npm i multi-select-areas-image
```
## For Vue.js 2.0

Use multi-select-areas-image component:

### Typical use:
``` js
// main.js
import MultiSelectAreasImage from 'multi-select-areas-image'
...
Vue.use(MultiSelectAreasImage)
```
.vue file:
``` html
<template>
  <div>
    <multi-select-areas-image :cropUrl="url" :width="500"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }
  }
}
</script>
```

### Props
#### cropUrl
Type: `String`<br>
Required: `true`<br>
Default: `null`

Input Url image into the box

#### width
Type: `Number`<br>
Required: `false`<br>
Default: `1000`

Set width image area

#### opacityOutline
Type: `Number`<br>
Required: `false`<br>
Default: `0.5`

Set opacity outline border box select area

#### opacityOverlay
Type: `Number`<br>
Required: `false`<br>
Default: `0.5`

Set opacity overlay on image

### $emit

``` html
<template>
  <div>
    <multi-select-areas-image v-on:getListAreas="getListAreas" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      areas: []
    }
  },
  methods: {
    getListAreas(value) {
      // console.log(value)
      this.areas = value
    }
  }
}
</script>
```

#### getListAreas
Params: `Null`<br>
Return: `Array`
