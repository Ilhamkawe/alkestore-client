<template>
    <div class="home">
        <Navbar v-if="!loggedIn"/>
        <div v-else>
            <NavbarLogedin/>
        </div>  
         <div class="container-fluid">
             <div class="container">
            <div class="row">
                <div class="col-12 col-md-6 kategori" data-aos="zoom-in" data-aos-delay="200" >
                    <div class="d-grid gap-2">
                        <input type="text" v-model="search" class="form-control" id="" style="height:45px; border-radius:15px;" placeholder="Cari Produk">
                    </div>
                </div>
                <div class="col-6 col-md-2 kategori" data-aos="zoom-in" data-aos-delay="200" >
                    <div class="d-grid gap-2">
                        <select class="form-select" v-model="jenis" id="" style="height:45px; border-radius:15px;">
                            <option value="all">Kategori</option>
                            <option v-for="kategori in kategories" :key="kategori.id" :value="kategori.nama">{{kategori.nama}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-6 col-md-2 kategori" data-aos="zoom-in" data-aos-delay="200" >
                    <div class="d-grid gap-2">
                        <select class="form-select" v-model="brand" id="" style="height:45px; border-radius:15px;">
                            <option value="all">Brand</option>
                            <option v-for="brand in brands" :key="brand.id" :value="brand.nama">{{brand.nama}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-12 col-md-2 kategori" data-aos="zoom-in" data-aos-delay="200" >
                    <div class="d-grid gap-2">
                        <input type="button" class="form-control" id="" @click="searchData()" value="Cari" style="height:45px; border-radius:15px; background-color:#1E90FF; color:white;">
                    </div>
                </div>
            </div>
        </div>
         </div>
        
        <template v-if="searchStatus == true">
              <div class="container new-product"  >
                <h3 class="subtitle" data-aos="zoom-in" data-aos-delay="200" style="font-weight : bold;">Hasil Pencarian</h3>
                    <div class="row">
                        <div class="col-6 col-md-4 col-lg-3" data-aos="zoom-in" data-aos-delay="200" v-for="item in sortedProduct" :key="item.id">
                            <router-link class="component-products d-block" :to="'/detail/'+item.id">
                                <div class="products-thumbnail">
                                <div class="products-image" :style="{backgroundImage: 'url('+apiUrl+'/storage/'+item.gallery[0].photo_url+')'}">
                                </div>
                                </div>
                                <div class="products-text">
                                {{ item.nama }}
                                </div>
                                <div class="products-price" v-if="item.get_diskon.length == 1">
                                    <span v-if="item.get_diskon.length == 1" style="margin-right:10px;" class="badge rounded-pill bg-danger">{{item.get_diskon[0].diskon}}%</span>
                                    <span style="color:#a4a4a4;" class="diskon">Rp. {{ Number(item.harga).toLocaleString() }}</span>
                                <br>
                                    {{" Rp."+Number(item.get_diskon[0].harga_diskon).toLocaleString() }}
                                </div>
                                <div class="products-price" v-else>
                                    Rp. {{Number(item.harga).toLocaleString() }}
                                </div>
                            </router-link>
                        </div>
                    </div>
            </div>
        </template>
        <template v-else>
            <NewProduk/>
            <div class="container new-product" v-for="sp in sortedProduct" :key="sp.id" >
                <div v-if="sp.produk.length > 0">
                <h3 class="subtitle" data-aos="zoom-in" data-aos-delay="200" style="font-weight : bold;">Kategori {{ sp.nama }}</h3>
                    <div class="row">
                        <div class="col-6 col-md-4 col-lg-3" data-aos="zoom-in" data-aos-delay="200" v-for="item in sp.produk" :key="item.id">
                            <router-link class="component-products d-block" :to="'/detail/'+item.id">
                                <div class="products-thumbnail">
                                <div class="products-image" :style="{backgroundImage: 'url('+apiUrl+'/storage/'+item.gallery[0].photo_url+')'}">
                                </div>
                                </div>
                                <div class="products-text">
                                    {{ item.nama }}
                                </div>
                                <div class="products-price" v-if="item.get_diskon.length == 1">
                                    <span v-if="item.get_diskon.length == 1" style="margin-right:10px;" class="badge rounded-pill bg-danger">{{item.get_diskon[0].diskon}}%</span>
                                    <span style="color:#a4a4a4" class="diskon">Rp. {{ Number(item.harga).toLocaleString() }}</span>
                                <br>
                                    {{" Rp."+Number(item.get_diskon[0].harga_diskon).toLocaleString() }}
                                </div>
                                <div class="products-price" v-else>
                                    Rp. {{Number(item.harga).toLocaleString() }}
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <Footer/>
    </div>    
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import NewProduk from '@/components/NewProduk.vue'
import Footer from '@/components/Footer.vue'
import NavbarLogedin from '@/components/NavbarLogedin.vue'

import axios from 'axios'
export default {
    name : "Kategori",
    components : {
        Navbar,
        Footer,
        NavbarLogedin,
        NewProduk
    },
    data() {
        return {
        loggedIn : false,
        sortedProduct : [],
        brands:[],
        kategories:[],
        jenis: 'all',
        brand: 'all',
        search : '',
        searchStatus : false,
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
    },
    mounted(){
        axios
        .get(process.env.VUE_APP_BACKEND_URL+"/api/produk",{
            params : {
                jenis : this.jenis, 
                brand : this.brand,
                search : this.search
            }
        })
        .then(response => {
            this.sortedProduct = response.data.data
            console.log(this.sortedProduct)
        } )

        axios
        .get(process.env.VUE_APP_BACKEND_URL+"/api/produk/brand")
        .then(response => {
            this.brands = response.data.data
            // console.log(this.brands)
        } )

        axios
        .get(process.env.VUE_APP_BACKEND_URL+"/api/produk/kategori")
        .then(response => {
            this.kategories = response.data.data
            // console.log(this.kategories)
        } )
    }, methods : {

        searchData(){
            
            if(this.jenis == 'all' && this.brand == 'all' && this.search == ''){
                console.log("search : " + this.search);
                this.searchStatus = false;
                axios
                .get(process.env.VUE_APP_BACKEND_URL+"/api/produk",{
                    params : {
                        jenis : this.jenis, 
                        brand : this.brand,
                        search : this.search
                    }
                })
                .then(response => {
                    this.sortedProduct = response.data.data
                    console.log(this.sortedProduct)
                } )

            }else{
                this.searchStatus = true;
                 axios
                 .get(process.env.VUE_APP_BACKEND_URL+"/api/produk",{
                    params : {
                        jenis : this.jenis, 
                        brand : this.brand,
                        search : this.search
                    }
                })
                    .then(response => {
                        this.sortedProduct = response.data.data;
                        console.log(this.sortedProduct);
                    })
            }
           
        },
        created(){
            this.searchData();
        }

    }
}
</script>