<template>
  <form>
    <div class="form-group">
      <label for="firstname">Firstname</label>
      <input type="text" v-model="user.firstname" class="form-control" id="firstname" aria-describedby="emailHelp" placeholder="Enter firstname" required />
    </div>
    <div class="form-group">
      <label for="lastname">Lastname</label>
      <input type="text" v-model="user.lastname" class="form-control" id="lastname" aria-describedby="emailHelp" placeholder="Enter lastname" required />
    </div>
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" v-model="user.username" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter username" required />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" v-model="user.email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" v-model="password" class="form-control" id="password" placeholder="Password" required />
    </div>
    <div class="form-group">
      <label for="password">Confirm Password</label>
      <input type="password" v-model="password2" class="form-control" id="password2" placeholder="Password" required />
    </div>
    <button type="submit" @click.prevent="register" class="btn btn-primary">
      Register
    </button>
  </form>
</template>

<script>
import { ENDPOINT } from '@/config/index'
export default {
  data() {
    return {
      password: '',
      password2: '',
      created: '1',
      modified: '1',
      user: {
        firstname: '',
        lastname: '',
        username: '',
        email: ''
      }
    }
  },
  methods: {
    register() {
      if (this.password === this.password2) {
        this.$store
          .dispatch('auth/register', {
            ...this.user,
            password: this.password,
            created: this.created,
            modified: this.modified
          })
          .then(response => {
            this.user = {}
            this.password = ''
            this.password2 = ''
            this.created = '1'
            this.modified = '1'
            this.$swal.fire({
              title: 'Success',
              text: 'User was created successfully',
              type: 'success',
              confirmButtonText: 'Ok'
            })
            this.$router.push({ name: 'Login' })
          })
          .catch(error => {
            this.$swal.fire({
              title: 'Error',
              text: error.response.data,
              type: 'warning',
              confirmButtonText: 'Ok'
            })
          })
      } else {
        this.$swal.fire({
          title: 'Error',
          text: 'Passwords are not equal',
          type: 'warning',
          confirmButtonText: 'Ok'
        })
      }
    }
  }
}
</script>
