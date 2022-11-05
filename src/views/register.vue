<template>
    <div class="home">
        <Navbar/>
        <div class="container masuk-container" data-aos="zoom-in" data-aos-delay="200">
            <div class="row justify-content-md-center">
            <div class="col-md-6">
                <h3>Ayo Mulai Belanja Alat Kesehatan Lebih Mudah.</h3>
                <form action="" class="masuk" @submit.prevent="register">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Nama Lengkap</label>
                        <input type="text" v-model="userInformation.nama" class="form-control" :class="{'is-invalid':$v.userInformation.nama.$error, 'is-valid':!$v.userInformation.nama.$invalid}"  placeholder="Masukan Nama Lengkap Anda">
                        <div class="valid-feedback">
                            
                        </div>
                        <div class="invalid-feedback">
                            <p v-if="!$v.userInformation.nama.required">Nama Tidak Boleh Kosong</p>
                            <p v-if="!$v.userInformation.nama.minLength">Nama Tidak Boleh Kurang Dari {{ $v.userInformation.nama.$params.minLength.min }} Huruf</p>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email</label>
                        <input type="email" v-model="userInformation.email" class="form-control" :class="{'is-invalid':$v.userInformation.email.$error, 'is-valid':!$v.userInformation.email.$invalid}"  placeholder="Masukan Email Anda">
                        <div class="valid-feedback">
                            
                        </div>
                        <div class="invalid-feedback">
                            <p :if="!$v.userInformation.email.required">Email Tidak Boleh Kosong</p>
                            <p :if="!$v.userInformation.email.email">Masukan Email Dengan Benar</p>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Password</label>
                        <input type="password" v-model="userInformation.password" class="form-control" :class="{'is-invalid':$v.userInformation.password.$error, 'is-valid':!$v.userInformation.password.$invalid}"  placeholder="Masukan Password Anda">
                        <div class="valid-feedback">
                            
                        </div>
                        <div class="invalid-feedback">
                            <p :if="!$v.userInformation.password.required">Password Tidak Boleh Kosong</p>
                            <p :if="!$v.userInformation.password.minLength">Password Tidak Boleh Kurang Dari {{ $v.userInformation.password.$params.minLength.min }} Karakter</p>
                            <p :if="!$v.userInformation.password.maxLength">Password Tidak Boleh lebih Dari {{ $v.userInformation.password.$params.maxLength.max }} Karakter</p>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Ulang Password</label>
                        <input type="password" v-model="userInformation.repeatPassword" class="form-control" :class="{'is-invalid':$v.userInformation.repeatPassword.$error, 'is-valid':!$v.userInformation.repeatPassword.$invalid}"  placeholder="Masukan Ulang Password Anda">
                        <div class="valid-feedback">
                            
                        </div>
                        <div class="invalid-feedback">
                            <p :if="!$v.userInformation.repeatPassword.sameAsPassword">password Tidak Sama</p>
                        </div>
                    </div>
                    <div class="d-grid gap-2 btn-masuk-form">
                        <input class="btn btn-primary" value="Daftar" type="submit">
                        
                        <p>Sudah Punya Akun ? <a href="">Masuk</a></p>
                    </div>
                </form>
            </div>
            <div class="col-md-6 col-img-masuk">
                <img class="img-fluid img-masuk" src="img/jaron-nix-7wWRXewYCH4-unsplash.jpg" alt="" width="50%">
            </div>
            </div>
        </div>
        <div class="footer">
        
            <div class="footer2">
                <center>&#169; 2021 PT Konsen Medisia Alkestron</center>
            </div>
            
        </div>
    </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'
import {required, email, sameAs, minLength, maxLength} from 'vuelidate/lib/validators'

export default{
    name : 'Register',
    components : {
        Navbar
    },
    data(){
        return {
            userInformation : {
                nama : " ", 
                alamat : "", 
                provinsi : "-",
                kota : "-",
                kode_pos : "-",
                no_telp : "",
                email : "",
                password : ""
            },
            submitstatus : null
        } 
    }, 
    methods : {

        validate(){
            this.$v.$touch() 
            if(this.$v.$invalid){
                this.submitstatus = "FAIL"
            }else{
                this.submitstatus = "SUCCESS"
            }
        },
        register(){

            let auth =  {
                "email" : this.userInformation.email, 
                "password" : this.userInformation.password,
                "alamat" : "-", 
                "nama" : this.userInformation.nama,     
                "no_telp" : "-"
            }

            this.validate()

            axios
            .post(process.env.VUE_APP_BACKEND_URL+"/api/register",auth)
            .then(response => console.log(response))
            .catch(err => console.log(err))

        }
    }, 
    validations : {
        userInformation : {
            nama : {
                required, 
                minLength: minLength(4)
            }, 
            email : {
                required, 
                email
            }, 
            password : {
                required, 
                minLength : minLength(8), 
                maxLength : maxLength(16)
            }, 
            repeatPassword : {
                required, 
                sameAsPassword : sameAs('password') 
            }, 
            alamat : {
                required
            }, 
            no_telp : {
                required
            }
        }
    },created(){
        
       let token = localStorage.getItem('token')
        
        if(token){
            this.loggedIn = true
            this.$router.push('/')
        }
    }
}
</script>
