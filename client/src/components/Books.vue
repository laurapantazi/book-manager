<style scoped lang="scss">
</style>
<template>
<div class="books__wrapper">
  <section class="navigation-buttons">
    <div class="create-button">
      <router-link :to="{ name: 'AddBook'}">
        <i class="fa fa-2x fa-plus-circle"></i>
      </router-link>
    </div>
    <div class="import-button">
      <router-link :to="{ name: 'ImportBooks'}">
        <i class="fa fa-2x fa-upload" aria-hidden="true"></i>
      </router-link>
    </div>
  </section>

  <section class="search">
    <div :style="{visibility: [showFiltersFlag ? 'visible' : 'hidden']}">
      <form>
        <div class="form-row">
          <div class="form-group col-md-4">
            <input type="text" class="form-control" @input="setSearch()" v-model="search.title" placeholder="Title">
          </div>
          <div class="form-group col-md-3">
            <input type="text" class="form-control" @input="setSearch()" v-model="search.author" placeholder="Author">
          </div>
          <div class="form-group col-md-2">
            <input type="text" class="form-control" @input="setSearch()" v-model="search.country" placeholder="Country">
          </div>
          <div class="form-group col-md-2">
            <input type="text" class="form-control" @input="setSearch()" v-model="search.language" placeholder="Language">
          </div>
        </div>
      </form>
    </div>
  </section>

  <section class="search-options">
    <div class="dropdown" style="padding-top: 4px; padding-bottom: 4px;">
      <span class="dropdown__title">View:</span>
      <select v-if="totalBooks <= 14" name="choice" v-model="resultsPerPage" class="dropdown__select">
        <option v-for="page in totalBooks" :key="page" :value="page" class="dropdown__option">{{page}}</option>
      </select>
    </div>
    <div>
      <button class="btn btn-outline-secondary fa-button btn-sm" style="float: right" @click="showFiltersFlag = !showFiltersFlag">
        <i class="fa fa-filter" aria-hidden="true"></i>Filter
      </button>
    </div> 
  </section>

  <section>
    <div class="table-responsive">
      <table class="table">
        <thead class="table-head">
          <tr>
            <th scope="col">
             <checkbox :inputName="0"></checkbox>
            </th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Country</th>
            <th scope="col">Language</th>
            <th scope="col">Year</th>
            <th scope="col">Pages</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-for="data of books" :key="data.book_id">
            <th scope="col">
              <checkbox :inputName="data.book_id" :key="data.book_id"></checkbox>
            </th>
            <td class="table-body__title">{{data.title}}</td>
            <td>{{data.author}}</td>
            <td>{{data.country}}</td>
            <td>{{data.language}}</td>
            <td>{{data.year}}</td>
            <td>{{data.pages}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="page">
    <div class="page__info">
      <span>Showing {{resultsPerPage}} out of {{totalBooks}}</span>
    </div>
    <div class="page__list">
    <ul class="pagination">
      <li class="page-item page-section__previous"><a class="page-link" @click="changePage(0, 'previous')">Previous</a></li>
      <li class="page-item page-section__number" v-for="page in totalPages" :key="page">
        <a class="page-link" @click="changePage(page, 'random')">{{page}}</a>
      </li>
      <li class="page-item page-section__next"><a class="page-link" @click="changePage(0, 'next')">Next</a></li> 
    </ul>
    </div>
  </section>

</div>
</template>

<script>
  import { ENDPOINT } from '../config/index'
  import {debounce} from 'lodash'
  export default{
    data(){
      return{
        books: {},
        offset: 0,
        limit: 5,
        booksPerPage: 5,
        totalPages: 1,
        totalBooks: 1,
        currentPage: 1,
        pagesFilter:1,
        resultsPerPage: 5,
        search: {},
        showFiltersFlag: false,
        navigationPages: []
      }
  },
  mounted () {
    let token = this.$cookie.get('jwt') || ''
    if (token) {
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer=' + token
      this.$axios.post(ENDPOINT + 'books/paginate/count', {offset: this.offset, limit: this.limit})
      .then(response => {
        this.books = response.data.books
        this.totalBooks = response.data.count
        this.totalPages = Math.ceil(this.totalBooks / this.limit)
        if (this.totalBooks < 5) this.resultsPerPage = this.totalBooks
        else this.resultsPerPage = 5
        if (this.totalPages >= 12) this.pagesFilter = 12
        else this.pagesFilter = this.totalPages
      })
      .catch(error => {
        this.$swal.fire({
          title: 'Error',
          text: 'Error while retrieving books',
          type: 'warning',
          confirmButtonText: 'Ok'
        })
      })
    }
  },
  methods: {
    setSearch: debounce (function() {
      this.searchBooks()
    }, 500),
    searchBooks () {
      this.offset = 0
      this.$axios.post( ENDPOINT + 'books/search/paginate/count', {offset: this.offset, limit: this.limit, search_array: this.search})
        .then(response => {
          this.books = response.data.books
          this.totalBooks = response.data.count
          this.totalPages = Math.ceil(this.totalBooks / this.limit)
          if (this.totalBooks == 0) {
            this.$swal.fire({
              title: 'Book not found',
              type: 'warning',
              confirmButtonText: 'Ok'
            })
          } else if (this.totalBooks < 5) {
            this.resultsPerPage = this.totalBooks
          } else {
            this.resultsPerPage = 5
          }
        })
        .catch(error => {
          this.$swal.fire({
            title: 'Error',
            text: 'Error while retrieving books',
            type: 'warning',
            confirmButtonText: 'Ok'
          })
        })
    },
		changePage (page, action) {
			if (action == 'previous') {
        page = this.currentPage - 1
			} else if (action == 'next') {
        page = this.currentPage + 1
      }
      if ((page < 1) || (page > this.totalPages)) page = this.currentPage
      else {
        this.offset = this.limit * (page - 1)
        this.$axios.post(ENDPOINT + 'books/paginate', {offset: this.offset, limit: this.limit})
        .then(response => {
          this.books = response.data.books
        })
        .catch(error => {
          this.$swal.fire({
            title: 'Error',
            text: 'Error while retrieving books',
            type: 'warning',
            confirmButtonText: 'Ok'
          })
        })
      }
      this.currentPage = page
    }, 
    paginate (offset, limit) {
      this.$axios.post(ENDPOINT + 'books/paginate', {offset, limit})
      .then(response => {
        this.books = response.data.books
      })
      .catch(error => {
        this.$swal.fire({
          title: 'Error',
          text: 'Error while retrieving books',
          type: 'warning',
          confirmButtonText: 'Ok'
        })
      })
    }
  },
  watch: {
    resultsPerPage: {
      handler (number) {
        this.limit = number
        this.offset = 0
        this.paginate(this.offset, this.limit)
        this.totalPages = Math.ceil(this.totalBooks / this.limit)
        if (this.totalPages >= 12) this.pagesFilter = 12
        else this.pagesFilter = this.totalPages
      }
    }
  }
}
</script>
