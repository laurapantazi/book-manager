<template>
  <div class="checkbox">
    <input type="checkbox" class="checkbox__input" :id="`checkbox-${idKey}`" name="name" />
    <label class="checkbox__label" :for="`checkbox-${idKey}`">
      {{ value }}
    </label>
  </div>
</template>

<script>
import { ENDPOINT } from '@/config/index'
export default {
  name: 'Checkbox',
  props: {
    name: {
      type: String,
      value: ''
    },
    idKey: {
      type: Number,
      value: 0
    },
    value: {
      type: String,
      value: ''
    }
  }
}
</script>
