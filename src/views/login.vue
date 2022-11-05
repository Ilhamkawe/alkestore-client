<template>
    <div class="home">
        <Navbar/>
            <div class="container masuk-container" data-aos="zoom-in" data-aos-delay="200">
                <div class="row justify-content-md-center">
                <div class="col-md-6">
                    <div class="" :class="{'alert alert-danger':this.err!=''}" role="alert">
                        {{ this.err }}
                    </div>
                    <form action="" class="masuk" @submit.prevent ="login">
                        <div class="mb-3">
                            <label for="" class="form-label">Email</label>
                            <input type="text" v-model="userInformation.email" class="form-control"  placeholder="Masukan Email Anda">
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Password</label>
                            <input type="password" v-model="userInformation.password" class="form-control"  placeholder="Masukan Password Anda">
                        </div>
                        <div class="d-grid gap-2 btn-masuk-form">
                            <input class="btn btn-primary" type="submit" value="Masuk">
                            <p>Belum Punya Akun ? <router-link to="/register">Daftar Sekarang</router-link></p>
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

export default{
    name : 'Login',
    components : {
        Navbar
    },
    data(){
        return {
            userInformation : {
                email : "",
                password : ""
            },
            err : "",
            loggedin: false,
            userLog: []
        }
    },
    methods : {
        login(){
            let auth = {
                "email" : this.userInformation.email, 
                "password" : this.userInformation.password
            }
            
            axios
                .post(process.env.VUE_APP_BACKEND_URL+"/api/login", auth)
                .then(response => {
                    console.log(response.data.data.prov_index)
                    let api_token = response.data.data.api_token
                    
                    let userLog = {
                        "id" : response.data.data.id,
                        "nama" : response.data.data.Nama,
                        "alamat": response.data.data.alamat, 
                        "provinsi" : response.data.data.provinsi,
                        "kota" : response.data.data.kota,
                        "kode_pos" : response.data.data.kode_pos,
                        "email" : response.data.data.email,
                        "no_telp" : response.data.data.no_telp,
                        "transaksi" : response.data.data.transaksi,
                        "prov_index" : response.data.data.prov_index
                    }
                    
                    this.userLog.push(userLog)
                    const parsed = JSON.stringify(this.userLog);

                    localStorage.setItem('token', api_token)
                    localStorage.setItem('userLog',parsed)
                   
                    this.$emit('login')
                    this.$router.push('/')
                })
                .catch(()=> {
                    this.err = "Email atau Password Salah"
                });
        }
    }, 
    created(){
        
       let token = localStorage.getItem('token')
        
        if(token){
            this.loggedIn = true
            this.$router.push('/')
        }
    }
}
</script>
