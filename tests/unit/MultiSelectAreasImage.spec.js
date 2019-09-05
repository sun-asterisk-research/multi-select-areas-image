import { shallowMount, createLocalVue } from '@vue/test-utils'
import MultiSelectAreasImage from '@/components/MultiSelectAreasImage'
import Vue from 'vue'

describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(MultiSelectAreasImage)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})

describe('propsData', () => {
  const localVue = createLocalVue()
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(MultiSelectAreasImage, {
      localVue
    })
  })

  test('have props data', () => {
    const url = 'https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/45585072_925043081015026_6599956628924006400_o.jpg?_nc_cat=108&_nc_oc=AQlJUcFj4S_wGeX016thVhmgINU5wDV4xPBNSCIcYSti9Sm5WEPBDYO_kxK4aRP0Emo&_nc_ht=scontent.fhan2-3.fna&oh=052bb05956a1460d014205754da5a15b&oe=5DCC1053'

    expect(wrapper.props('cropUrl')).toBe(url)
    expect(wrapper.props('width')).toBe(1500)
    expect(wrapper.props('opacityOutline')).toBe(0.5)
    expect(wrapper.props('opacityOverlay')).toBe(0.5)
  })
})

describe('Mounted', () => {
  const localVue = createLocalVue()
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(MultiSelectAreasImage, {
      localVue
    })
  })

  test('have call function', () => {
    const vm = new Vue(MultiSelectAreasImage).$mount()

    const img = vm.$el.querySelector('#c-crop--hide_img')
    expect(wrapper.vm.getSizeImg(img)).toEqual({
      w: 1500, h: 0, r: Infinity
    })
  })

  test('get size of the src image', async () => {
    // moke function getSize
    const getSize = jest.fn()
    // set value getSize
    getSize.mockReturnValue({
      w: 1500,
      h: 1000,
      r: 0
    })
    // set function getSize to mock
    wrapper.vm.getSize = getSize

    // function setSize call getSize ependency injection
    await wrapper.vm.setSize()

    expect(wrapper.vm.$data.originImgSize).toEqual({
      w: 1500,
      h: 1000,
      r: 0
    })
  })

  test('set position Image static', () => {
    wrapper.vm.calcPosOfBox()
    expect(wrapper.vm.$data.posImg).toEqual({
      top: 0,
      left: 0
    })
  })
})

describe('watch', async () => {
  const localVue = createLocalVue()
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(MultiSelectAreasImage, {
      localVue,
      propsData: {
        cropUrl: 'bar'
      }
    })
  })

  test('cropUrl change', () => {
    const setSize = jest.fn()
    setSize.mockReturnValue({
      w: 1500,
      h: 1000,
      r: 0
    })

    expect(wrapper.vm.$data.url).toEqual('bar')
  })
})

describe('mouse', async () => {
  const localVue = createLocalVue()
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(MultiSelectAreasImage, {
      localVue
    })
  })

  test('mouseDown with have one value in areas', () => {
    const e = jest.fn()
    e.mockReturnValue({
      pageX: 100,
      pageY: 100
    })
    wrapper.vm.mouseDown(e)
    expect(wrapper.vm.$data.areas.length).toEqual(2)
  })

  test('mouseDown with no value in areas', () => {
    wrapper.vm.$data.areas = []

    const e = jest.fn()
    e.mockReturnValue({
      pageX: 100,
      pageY: 100
    })
    wrapper.vm.mouseDown(e)
    expect(wrapper.vm.$data.areas.length).toEqual(1)
  })

  test('mouseMove right to left', () => {
    const temp = jest.fn()
    temp.mockReturnValue(1)

    const e = {
      pageX: 10,
      pageY: 20
    }

    wrapper.vm.$data.areas = [
      {
        id: 1,
        x: 100,
        y: 200,
        width: 0,
        height: 0,
        z: 0,
        resizable: false
      }
    ]

    // mousedown()
    wrapper.vm.$data.mousedown = true
    // temp()
    wrapper.vm.$data.temp = 1
    wrapper.vm.mouseMove(e)
    expect(wrapper.vm.$data.areas).toEqual([
      {
        'height': 50,
        'id': 1,
        'resizable': false,
        'width': 50,
        'x': 100,
        'y': 200,
        'z': 0
      }
    ])
  })

  test('mouseMove left to right', () => {
    const e = {
      pageX: 200,
      pageY: 300
    }

    wrapper.vm.$data.areas = [
      {
        id: 1,
        x: 100,
        y: 200,
        width: 0,
        height: 0,
        z: 0,
        resizable: false
      }
    ]

    wrapper.vm.$data.mousedown = true
    wrapper.vm.$data.temp = 1
    wrapper.vm.mouseMove(e)
    expect(wrapper.vm.$data.areas).toEqual([
      {
        'height': 92,
        'id': 1,
        'resizable': false,
        'width': 92,
        'x': 100,
        'y': 200,
        'z': 0
      }
    ])
  })

  test('mouse Up', () => {
    wrapper.vm.$data.areas = [
      {
        id: 1,
        x: 100,
        y: 200,
        width: 0,
        height: 0,
        z: 0,
        resizable: false
      }
    ]
    wrapper.vm.mouseUp()
    expect(wrapper.vm.$data.areas).toEqual([])
  })
})

describe('Resizable', () => {
  const localVue = createLocalVue()
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(MultiSelectAreasImage, {
      localVue
    })
  })

  test('is active', () => {
    wrapper.vm.$data.areas = [
      {
        id: 1,
        x: 100,
        y: 200,
        width: 10,
        height: 20,
        z: 0,
        resizable: false
      }
    ]
    wrapper.vm.changeResizable(1)
    expect(wrapper.vm.$data.areas).toEqual([
      {
        id: 1,
        x: 100,
        y: 200,
        width: 10,
        height: 20,
        z: 100,
        resizable: true
      }
    ])
  })

  test('is not active', () => {
    wrapper.vm.$data.areas = [
      {
        id: 1,
        x: 100,
        y: 200,
        width: 10,
        height: 20,
        z: 100,
        resizable: true
      }
    ]
    wrapper.vm.changeResizable(2)
    expect(wrapper.vm.$data.areas).toEqual([
      {
        id: 1,
        x: 100,
        y: 200,
        width: 10,
        height: 20,
        z: 0,
        resizable: false
      }
    ])
  })
})

describe('delete selected area', () => {
  const localVue = createLocalVue()
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(MultiSelectAreasImage, {
      localVue
    })
  })
  test('deleteSelected', () => {
    wrapper.vm.$data.areas = [
      {
        id: 1,
        x: 100,
        y: 200,
        width: 10,
        height: 20,
        z: 100,
        resizable: true
      }
    ]
    wrapper.vm.deleteSelected(1)
    expect(wrapper.vm.$data.areas).toEqual([])
  })
})

describe('Drag', () => {
  const localVue = createLocalVue()
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(MultiSelectAreasImage, {
      localVue
    })
  })
  test('start Drag', () => {
    wrapper.vm.startDrag()
    expect(wrapper.vm.$data.dragdown).toEqual(true)
  })

  test('do Drag', () => {
    wrapper.vm.dragdown = true

    let item = {
      id: 1,
      x: 100,
      y: 200,
      width: 10,
      height: 20,
      z: 100,
      resizable: true
    }

    let item2 = {
      id: 1,
      x: 100,
      y: 200,
      width: 9,
      height: 9,
      z: 100,
      resizable: true
    }

    let type = ['w', 'sw', 's', 'se', 'e', 'ne', 'n', 'nw']
    let e = [
      {
        pageX: 100,
        pageY: 200
      },
      {
        pageX: -1,
        pageY: -2
      }
    ]
    type.forEach(element => {
      e.forEach(event => {
        wrapper.vm.doDrag(item, element, event)
        wrapper.vm.doDrag(item2, element, event)
      })
    })
  })

  test('end Drag', () => {
    wrapper.vm.endDrag()
    expect(wrapper.vm.$data.dragdown).toEqual(false)
  })
})

describe('Move object image', () => {
  const localVue = createLocalVue()
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(MultiSelectAreasImage, {
      localVue
    })
  })
  test('start Move', () => {
    const item = {
      x: 10,
      y: 20
    }

    const e = {
      clientX: 100,
      clientY: 200
    }
    wrapper.vm.startMove(item, e)
    expect(wrapper.vm.$data.move).toEqual(true)
    expect(wrapper.vm.$data.moveTempX).toEqual(100)
    expect(wrapper.vm.$data.moveTempY).toEqual(200)
    expect(wrapper.vm.$data.moveCurrentX).toEqual(10)
    expect(wrapper.vm.$data.moveCurrentY).toEqual(20)
  })

  test('do Move', () => {
    wrapper.vm.move = true
    let item = {
      width: 100,
      height: 200,
      x: 10,
      y: 20
    }

    const e = {
      clientX: 100,
      clientY: 200
    }

    wrapper.vm.$data.originImgSize = {
      w: 1000,
      h: 500,
      r: 0
    }
    wrapper.vm.doMove(item, e)

    expect(item).toEqual({ width: 100, height: 200, x: 100, y: 200 })
  })

  test('end Move', () => {
    wrapper.vm.endMove()
    expect(wrapper.vm.$data.move).toEqual(false)
  })

  test('get list area', () => {
    wrapper.vm.getListAreas()
    expect(wrapper.emitted().getListAreas[0][0][0]).toEqual({
      id: 1,
      x: 100,
      y: 200,
      width: 200,
      height: 100,
      z: 0,
      resizable: false
    })
  })
})
