<template>
  <div class="login">
    <div class="container">
        <div class="row" style="justify-content:center">
          <div class="form-container"> 
              <b-card no-body>
                  <b-tabs card>
                      <b-tab title="Sign In" active>
                        <div class="col-md-12">
                            <input v-model="log_uname" type="text" placeholder="UserName">
                        </div>
                        <div class="col-md-12">
                            <input v-model="log_pass" placeholder="Password">
                        </div>
                        <div class="col-md-12">
                            <button @click="login" class="LoginBut">Login</button>
                        </div>
                      </b-tab>
                      <b-tab title="Sign Up">
                        <div class="col-md-12">
                            <input v-model="reg_uname" type="text" placeholder="UserName">
                        </div>
                        <div class="col-md-12">
                            <input v-model="reg_pass" placeholder="Password">
                        </div>
                        <div class="col-md-12">
                            <button @click="signUp" class="LoginBut">Login</button>
                        </div>
                      </b-tab>
                  </b-tabs>
              </b-card>

          </div>
        </div>
    </div>
  </div>

</template>

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js"></script>
<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../assets/main.css'
import * as firebase from '../utils/firebase.js'

/*
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'*/

export default {
    name: 'login',
    props: {
        
    },
    data() {
      return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: [],
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true,
        reg_uname: '',
        reg_pass: '',
        log_uname: '',
        log_pass: '',
      }
    },
    methods:{
      signUp(){
        console.log(firebase);
        console.log(firebase.auth);
        firebase.auth.createUserWithEmailAndPassword(this.reg_uname, this.reg_pass).then(
          user=> {
            alert("Your account has been created");
            $router.push('/main')
          },
          err =>{
            alert("Opps, " + err);
          }
        )
      },
      login(){
          firebase.auth.signInWithEmailAndPassword(this.log_uname, this.log_pass).then(
            user=> {
              alert("You are now connected!")
              this.$router.push('/main');
            }, err => {
              alert("Opps, " + err);
            }
          )
      }


    },

}
</script>