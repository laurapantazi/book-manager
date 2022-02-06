import { addParameters } from '@storybook/vue'

addParameters({
  options: {
    storySort: (aArray, bArray) => {
      const a = aArray[1];
      const b = bArray[1];
      return a.name > b.name ? 1 : -1;
    }
  }
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}
