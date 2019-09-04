import { shallowMount } from '@vue/test-utils'
import Resizable from '@/components/Resizable'

describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Resizable)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
