<template>
  <div class="container file">
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="fields">
        <label>Upload File</label>
        <input type="file" ref="file" @change="onSelect" />
      </div>
      <div class="fields">
        <button>Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ENDPOINT } from '../config/index'
  export default {
    methods: {
      onSelect() {

      },
      onSubmit () {
        
      }
    }
  }
</script>