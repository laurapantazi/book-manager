<template>
  <div>
    <h3>Add New Book</h3>
    <form>
      <div class="form-group">
        <input type="text" v-model="book.title" class="form-control" id="post" aria-describedby="postHelp" placeholder="Enter book title">
      </div>
      <div class="form-group">
        <input type="text" v-model="book.author" class="form-control" id="post" aria-describedby="postHelp" placeholder="Enter author">
      </div>
      <div class="form-group">
        <input type="text" v-model="book.language" class="form-control" id="post" aria-describedby="postHelp" placeholder="Enter language">
      </div>
      <div class="form-group">
        <input type="text" v-model="book.country" class="form-control" id="post" aria-describedby="postHelp" placeholder="Enter country">
      </div>
      <div class="form-group">
        <input type="number" v-model.number="book.pages" class="form-control" id="post" aria-describedby="postHelp" placeholder="Enter pages">
      </div>
      <div class="form-group">
        <input type="number" v-model.number="book.year" class="form-control" id="post" aria-describedby="postHelp" placeholder="Enter year">
      </div>
      <button type="submit" @click.prevent="addBook" class="btn btn-primary">Save</button>
    </form>
  </div>
</template>

<script>
import { ENDPOINT } from '@/config/index'
  export default {
    data: function() {
      return {
        book: {
          book_id: '',
          title: '',
          author: '',
          country: '',
          language: '',
          pages: '',
          year: ''
        }
      }
    },
    methods: {
      addBook(){
        this.$axios.post( ENDPOINT + 'books', this.book)
        .then(response => {
          if (!response.data.error) {
            this.$swal.fire({
              title: 'Success',
              text: 'Book was created successfully',
              type: 'success',
              confirmButtonText: 'Ok'
            })
          }
          this.book = {}
        })
        .catch(error => {
          this.$swal.fire({
            title: 'Error',
            text: error.message,
            type: 'warning',
            confirmButtonText: 'Ok'
          })
        })
      }
    }
  }
</script>