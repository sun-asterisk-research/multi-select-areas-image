import { shallowMount } from '@vue/test-utils'
import MultiSelectAreasImage from '@/components/MultiSelectAreasImage'

describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(MultiSelectAreasImage)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
