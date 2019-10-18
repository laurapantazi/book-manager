<template>
  <div class="checkbox">
    <input type="checkbox" class="checkbox__input" :id="`checkbox-${keyId}`" name="name">
    <label class="checkbox__label" :for="`checkbox-${keyId}`">{{value}}</label>
  </div>
</template>

<script>
import { ENDPOINT } from '../../config/index'
  export default {
    name: 'Checkbox',
    props: {
      name: '',
      keyId: '',
      value: ''
    },
    data () {
      return {
        value: this.checked
      }
    },
  }
</script>