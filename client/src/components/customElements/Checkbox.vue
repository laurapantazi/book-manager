<template>
  <div class="checkbox">
    <input type="checkbox" class="checkbox__input" id="checkbox" name="inputName">
    <label class="checkbox__label" for="checkbox">{{label}}</label>
  </div>
</template>

<script>
import { ENDPOINT } from '../../config/index'
  export default {
    name: 'Checkbox',
    props: {
      label: '',
      inputName: ''
    },
    methods: {
   }
  }
</script>