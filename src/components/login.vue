<template>
  <div class="wrapper">
    <div class="container">
        <div class="row" style="justify-content:center">
          <div class="form-container"> 
              <b-card no-body>
                  <b-tabs card>
                      <b-tab title="Sign In" active>
                        <div class="col-md-12">
                            <input class="login-input" v-model="log_uname" type="text" placeholder="Email">
                        </div>
                        <div class="col-md-12">
                            <input class="login-input" v-model="log_pass" placeholder="Password" type="password">
                        </div>
                        <div class="col-md-12">
                            <button class="login-button" @click="login" >Login</button>
                        </div>
                      </b-tab>
                      <b-tab title="Sign Up">
                        <div class="col-md-12">
                            <input class="login-input" v-model="reg_uname" type="text" placeholder="Email">
                        </div>
                        <div class="col-md-12">
                            <input class="login-input" v-model="reg_pass" type="password" placeholder="Password" >
                        </div>
                        <div class="col-md-12">
                            <input class="login-input" v-model="reg_pass2" type="password" placeholder="Repeat Password" >
                        </div>
                        <div class="col-md-12">
                            <button class="login-button" @click="signUp">Sign UP</button>
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
import swal from 'sweetalert';


export default {
    name: 'login',
    props: {
        
    },
    data() {
      return {
        show: true,
        reg_uname: '',
        reg_pass: '',
        reg_pass2: '',
        log_uname: '',
        log_pass: '',
      }
    },
    methods:{
      signUp(){

        let matched = this.checkPasswordMatch();
        console.log
        if (matched === true){
          firebase.auth.createUserWithEmailAndPassword(this.reg_uname, this.reg_pass).then(
            user=> {
              swal("Success", "Your account has been created", "success");
              this.$router.push('/main')
            },
            err =>{
              swal("Error", err.message, "error");      

            }
        )
        }
        else{
            swal("Error", "Passwords not match!", "warning");    
        }

      },
      login(){
          firebase.auth.signInWithEmailAndPassword(this.log_uname, this.log_pass).then(
            user=> {
              alert("You are now connected!")
              this.$router.push('/main');
            }, err => {
            swal("Error", err.message, "error");      
            }
          )
      },

      checkPasswordMatch(){
        if(this.reg_pass !== this.reg_pass2){
          return false;
        }
        else{
          return true;
        }
      }


    },

}
</script>