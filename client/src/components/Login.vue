<style scoped lang="scss">
</style>

<template>
  <form>
    <div class="form-group form__row">
      <input type="text" v-model="user.username" class="form-control form__input" id="username" aria-describedby="usernameHelp" placeholder="Username" required>
    </div>
    <div class="form-group form__row">
      <input type="password" v-model="user.password" class="form-control form__input" id="password" placeholder="Password" required>
    </div>
    <button type="submit" class="submit btn btn-primary" v-on:click.prevent="login">Login</button>
  </form>
</template>

<script>
  import { ENDPOINT } from '@/config/index'
  export default{
    data() {
        return {
          user: {
            username: '',
            password: ''
          }
        }
    },
    methods: {
      login(){
        this.$store.dispatch('auth/login', this.user)
          .then(response => {
            if (!response.error && response.auth) {
              this.$cookie.set('jwt', response.token, {expires: 1})
              this.$router.push({name: 'ShowBooks'})
            } else {
              this.$swal.fire({
                title: 'Error',
                text: 'Incorrect username or password',
                type: 'warning',
                confirmButtonText: 'Ok'
              })
            }
          })
          .catch(error => {
            this.$swal.fire({
              title: 'Error',
              text: 'Incorrect username or password',
              type: 'warning',
              confirmButtonText: 'Ok'
            })
          })
      }
    }
  }
</script>
