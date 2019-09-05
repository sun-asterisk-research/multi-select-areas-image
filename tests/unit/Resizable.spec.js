import { shallowMount, createLocalVue } from '@vue/test-utils'
import Resizable from '@/components/Resizable'

describe('Component', () => {
  const localVue = createLocalVue()
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Resizable, {
      localVue
    })
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('start Drag', () => {
    wrapper.vm.startDrag()
    expect(wrapper.emitted().startDrag).toEqual([[]])
  })

  test('do Drag', () => {
    let e = {
      pageX: 100,
      pageY: 200
    }
    wrapper.vm.doDrag(e)
    expect(wrapper.emitted().doDrag[0]).toEqual([
      {
        'height': 0,
        'id': 0,
        'resizable': false,
        'width': 0,
        'x': 0,
        'y': 0,
        'z': 0
      },
      null,
      {
        pageX: 100,
        pageY: 200
      }
    ])
  })
})
