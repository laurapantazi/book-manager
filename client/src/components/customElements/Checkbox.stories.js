import Checkbox from './Checkbox.vue'

export default {
  title: 'Components/Form/Checkbox',
  parameters: {
    notes: 'My notes',
  },
  component: Checkbox,
  argTypes: {
    checkboxColor: { control: 'color' },
    checkmarkColor: { control: 'color' },
    disabled: {
      control: { type: 'boolean' }
    }
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Checkbox },
  template: `<checkbox v-bind="$props">${args.default || 'Label'}</checkbox>`,
})

export const Checked = Template.bind({})
Checked.args = {
  value: 'Checkbox´s label',
  default: 'Checked green',
  checked: true,
  checkmarkColor: 'green',
  checkboxColor: 'green'
}
export const Disabled = Template.bind({})
Disabled.args = {
  value: 'Checkbox´s label',
  default: 'Disabled',
  disabled: true
}
export const DarkChecked = Template.bind({})
DarkChecked.args = {
  checkmarkColor: 'white',
  checkboxBackground: 'black',
  checkboxColor: 'black',
  labelColor: 'white',
  checked: true,
  default: 'Dark mode checked checkbox'
}