<template>
  <div>
    <h3>
      <button type="submit" @click.prevent="goBack" class="btn btn-primary">
        <i class="fa fa-arrow-left"></i>
      </button>Edit Book </h3>
    <form>
      <div class="form-group">
        <input type="text" v-model="book.title" class="form-control" id="post" aria-describedby="postHelp" placeholder="Enter book title" />
      </div>
      <div class="form-group">
        <input type="text" v-model="book.author" class="form-control" id="post" aria-describedby="postHelp" placeholder="Enter author" />
      </div>
      <div class="form-group">
        <input type="text" v-model="book.language" class="form-control" id="post" aria-describedby="postHelp" placeholder="Enter language" />
      </div>
      <div class="form-group">
        <input type="text" v-model="book.country" class="form-control" id="post" aria-describedby="postHelp" placeholder="Enter country" />
      </div>
      <div class="form-group">
        <input type="number" v-model.number="book.pages" class="form-control" id="post" aria-describedby="postHelp" placeholder="Enter pages" />
      </div>
      <div class="form-group">
        <input type="number" v-model.number="book.year" class="form-control" id="post" aria-describedby="postHelp" placeholder="Enter year" />
      </div>
      <button type="submit" @click.prevent="editBook" class="btn btn-primary">
        Save
      </button>
    </form>
  </div>
</template>

<script>
import { ENDPOINT } from '@/config/index'
export default {
  data() {
    return {
      book: {
        book_id: '',
        title: '',
        author: '',
        country: '',
        language: '',
        pages: '',
        year: ''
      }}
  },
  mounted () {
    let token = this.$cookie.get('jwt') || ''
    if (token) {
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer=' + token
      this.$axios
        .get(ENDPOINT + `books/${this.$route.params.id}`)
        .then(response => {
          this.book = response.data.book[0];
        })
        .catch(error => {
          this.$swal.fire({
            title: 'Error',
            text: 'Error while retrieving book',
            type: 'warning',
            confirmButtonText: 'Ok'
          })
        })
    }
  },
  methods: {
    goBack () {
      return this.$router.go(-1)
    },
    editBook () {
      this.$axios
        .put(ENDPOINT + `books/${this.$route.params.id}`, this.book)
        .then(response => {
          if (!response.data.error) {
            this.$swal.fire({
              title: 'Success',
              text: 'Book was created successfully',
              type: 'success',
              confirmButtonText: 'Ok'
            })
          }
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

<style scoped lang="scss"></style>