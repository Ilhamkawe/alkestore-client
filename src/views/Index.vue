<template>
    <div class="home">
        <Navbar v-if="!loggedIn"/>
        <div v-else>
            <NavbarLogedin/>
        </div>  
        
          <div class="container konsen-hero"  data-aos="zoom-in" data-aos-delay="200">
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" >
                
                <div class="carousel-inner">
                <template v-for="(banner,index) in banners " >
                    
                    <div class="carousel-item active" v-if="index == 0" :key="banner.id">
                        <img :src="apiUrl+'/storage/' + banner.banner_path" class="img-fluid d-block w-100" style="" alt="...">
                    </div>
                    <div class="carousel-item" v-else :key="banner.id">
                        <img :src="apiUrl+'/storage/' + banner.banner_path" class="img-fluid d-block w-100" alt="...">
                    </div>
                </template>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"  data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"  data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        <NewProduk/>
        <Footer/>
    </div>    
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import NavbarLogedin from '@/components/NavbarLogedin.vue'
import NewProduk from '@/components/NewProduk.vue'
import Footer from '@/components/Footer.vue'
import axios from 'axios'
export default {
    name : "Index",
    components : {
        Navbar,
        NewProduk,
        Footer,
        NavbarLogedin
    },
    data() {
        return {
        loggedIn : false,
        banners : [],
        apiUrl : process.env.VUE_APP_BACKEND_URL
        }
    }, 
    created(){

        Event.$on('login',()=>{
            this.loggedIn = true
        })

        Event.$on('logout',()=>{
            this.loggedIn = false
        })
    
        let token = localStorage.getItem('token')
        
        if(token){
            this.loggedIn = true
        }
    }, mounted(){
        // console.log(process.env.VUE_APP_BACKEND_URL + "/api/banner");
        axios.get(process.env.VUE_APP_BACKEND_URL + "/api/banner").then(res => {
            this.banners = res.data.data
            // console.log(this.banner)
        }).catch(err => console.log(err))
    }
    
}
</script>