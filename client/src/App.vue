<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4 w-auto fa-button">
      <router-link to="/books" class="nav-item nav-link"><i class="fa fa-book"></i>Book Storage</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/books" class="nav-item nav-link">Books</router-link>
        </div>
        <div v-if="!isLoggedIn" class="navbar-nav navbar-right ml-auto">			
          <router-link to="/login" class="nav-item nav-link">Login</router-link>
          <router-link to="/register" class="nav-item nav-link">Register</router-link>
        </div>
        <div v-if="isLoggedIn" class="navbar-nav navbar-right ml-auto">
          <a href="#" class="nav-item nav-link" style="float: right" @click="logout">Logout</a>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>

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
  
  </div>
</template>

<script>
  export default {
    methods: {
      logout() {
        this.$store.dispatch('auth/logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
    computed: {
      isLoggedIn () {
        return this.$store.getters['auth/isLoggedIn']
      }
    }
  }
</script>