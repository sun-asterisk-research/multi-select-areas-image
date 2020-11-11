<p align="center">
    <img src="/docs/logo/logo.svg" height="100">
</p>

<h1 align="center">Multi Select Areas Image</h1>

<p align="center">
    <!--codecov-->
    <a href="https://codecov.io/gh/sun-asterisk-research/multi-select-areas-image/">
        <img alt="Codecov Coverage" src="https://img.shields.io/codecov/c/github/sun-asterisk-research/multi-select-areas-image/master.svg?style=flat-square">
    </a>
    <!--contributors-->
    <a href="#contributors">
        <img alt="All Contributors" src="https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square">
    </a>
    <!--downloads-->
    <a href="https://www.npmjs.com/package/multi-select-areas-image">
        <img alt="npm download" src="https://img.shields.io/npm/dt/multi-select-areas-image.svg?maxAge=30">
    </a>
    <!--downloads/month-->
    <a href="https://www.npmjs.com/package/multi-select-areas-image">
        <img alt="npm download per month" src="https://img.shields.io/npm/dm/multi-select-areas-image.svg?">
    </a>    
    <!--open issues-->
    <a href="https://github.com/sun-asterisk-research/multi-select-areas-image/issues">
        <img alt="GitHub open issues" src="https://img.shields.io/github/issues/sun-asterisk-research/multi-select-areas-image">
    </a>
    <!--npm version-->
    <a href="https://www.npmjs.com/package/multi-select-areas-image">
        <img alt="GitHub open issues" src="https://img.shields.io/npm/v/multi-select-areas-image.svg">
    </a>
</p>

<br/>

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

```js
// main.js
import MultiSelectAreasImage from 'multi-select-areas-image'
...
Vue.use(MultiSelectAreasImage)
```

.vue file:

```html
<template>
  <div>
    <multi-select-areas-image :cropUrl="url" :width="500" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        url:
          'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      };
    },
  };
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

#### selectAreas

Type: `Array`<br>
Required: `false`<br>
Default: `[]`

Set opacity overlay on image

### \$emit

```html
<template>
  <div>
    <multi-select-areas-image v-on:getListAreas="getListAreas" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        areas: [],
      };
    },
    methods: {
      getListAreas(value) {
        // console.log(value)
        this.areas = value;
      },
    },
  };
</script>
```

#### getListAreas

Params: `Null`<br>
Return: `Array`

<h2 id="contributors"> Contributors ✨ </h2>

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/quanghung97"><img src="https://avatars0.githubusercontent.com/u/25919519?v=4" width="100px;" alt="quanghung97"/><br /><sub><b>quanghung97</b></sub></a><br /><a href="https://github.com/sun-asterisk-research/multi-select-areas-image/commits?author=quanghung97" title="Code">💻</a> <a href="https://github.com/sun-asterisk-research/multi-select-areas-image/commits?author=quanghung97" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/vunt-0906"><img src="https://avatars3.githubusercontent.com/u/52224331?v=4" width="100px;" alt="vunt-0906"/><br /><sub><b>vunt-0906</b></sub></a><br /><a href="https://github.com/sun-asterisk-research/multi-select-areas-image/commits?author=vunt-0906" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
