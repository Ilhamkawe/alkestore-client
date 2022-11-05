<template>
    <div class="home">
        <Navbar v-if="!loggedIn"/>
        <div v-else>
            <NavbarLogedin/>
        </div>
        
        <div class="container">
            <div class="row" data-aos="zoom-in" data-aos-delay="200">
                <div class="col-md-6 focus-product">
                    <img :src="gambar" class="img-fluid" alt="" width="600" height="500">
            
                        <carousel style="margin-top : 20px" :dots="false" :nav="false">
                            <div class="item" v-for="ss in productDetails.gallery" :key="ss.id" @click="changeImage(apiUrl + '/storage/' + ss.photo_url)">
                                <img :src="apiUrl+'/storage/' + ss.photo_url" class="img-fluid" alt="">
                            </div>
                        </carousel>
                    
                </div>
                <div class="col-md-6 desc">
                    <h2>{{ productDetails.nama }}</h2>
                    <button type="button" style="margin-right : 15px" class="btn btn-outline-secondary btn-kategori">{{ productDetails.jenis_produk.nama }}</button>
                    
                    <p>{{ productDetails.deskripsi }}</p>
                    <h5 style="margin-bottom: 20px;">Stok : {{ productDetails.stok + " " +productDetails.satuan_produk.nama}}</h5>
                    <template v-if="productDetails.get_diskon.length == 1">
                        
                        <h5 class="diskon" style="color:  #a4a4a4"><span type="button" v-if="productDetails.get_diskon.length == 1" style=" background-color: #ff4757; color:white; margin-right: 15px;" class="btn btn-outline-secondary">{{ productDetails.get_diskon[0].diskon }}%</span>Rp. {{ Number(productDetails.harga).toLocaleString() }}</h5>
                        <h3>Rp. {{ Number(productDetails.get_diskon[0].harga_diskon).toLocaleString() }}</h3>
                    </template>
                    <h3 v-else>Rp. {{ Number(productDetails.harga).toLocaleString() }}</h3>
                    
                    <div class="d-grid gap-2 details-keranjang">
                        <button v-if="productDetails.stok < 1" class="btn btn-primary biru-base" type="button" disabled>Masukan Ke Keranjang</button>
                        <button v-else-if="productDetails.get_diskon.length == 1" class="btn btn-primary biru-base" type="button" @click="saveKeranjang(productDetails.id,productDetails.nama,productDetails.get_diskon[0].harga_diskon, productDetails.gallery[0].photo_url,productDetails.satuan_produk.nama,productDetails.berat )">Masukan Ke Keranjang</button>
                        <button v-else class="btn btn-primary biru-base" type="button" @click="saveKeranjang(productDetails.id,productDetails.nama,productDetails.harga, productDetails.gallery[0].photo_url,productDetails.satuan_produk.nama,productDetails.berat )">Masukan Ke Keranjang</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- <Recommended/> -->

        <div class="footer">
        
            <div class="footer2">
                <center>&#169; 2021 PT Konsen Medisia Alkestron</center>
            </div>
            
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
// import Recommended from '@/components/recommended.vue'
import carousel from "vue-owl-carousel"
import axios from "axios"
import NavbarLogedin from '@/components/NavbarLogedin.vue'

export default{
    name : 'Detail',
    components : {
        Navbar,
        NavbarLogedin,
        // Recommended,
        carousel
    },
    data(){
        return {
            gambar : "img/pippet/testalize-me-TxP9AeN-WA0-unsplash.jpg",
            idProduk : this.$route.params.id,
            productDetails : [],
            keranjangUser : [],
            loggedIn : false,
            apiUrl : process.env.VUE_APP_BACKEND_URL
        }
    },
    methods : {
        changeImage(urlImage){
            this.gambar = urlImage;
            //eslint-disable-next-line no-console
            // console.log(this.idProduk);
        },
        SetDataProduk(data){
            this.productDetails = data;

            this.gambar = process.env.VUE_APP_BACKEND_URL+'/storage/' + data.gallery[0].photo_url;
            console.log(this.productDetails)
        },
        saveKeranjang(idProduct, nameProduct, priceProduct, photoProduct, satuanProduk, beratProduk) {

            this.validateLogin()

            var productChart = {
                "id" : idProduct, 
                "nama" : nameProduct,
                "harga" : priceProduct,
                "photo_url" : photoProduct, 
                "qty" : 1 ,
                "satuan" : satuanProduk,
                "berat" : beratProduk
            }
            

            this.keranjangUser.push(productChart);
            const parsed = JSON.stringify(this.keranjangUser);
            localStorage.setItem('KeranjangUser', parsed);

            window.location.reload()
        }, 
        validateLogin(){
            if(!this.loggedIn){
                alert('Login Terlebih Dahulu')
                return false
            }
        }
    },
    mounted(){

        if (localStorage.getItem('KeranjangUser')) {
            try {
                this.keranjangUser = JSON.parse(localStorage.getItem('KeranjangUser'));
            } catch(e) {
                localStorage.removeItem('KeranjangUser');
            }
        }
        
        axios
        .get(process.env.VUE_APP_BACKEND_URL+"/api/produk",{ 
                params: {
                    id: this.$route.params.id
                }
            })
            .then(res => {
                this.SetDataProduk(res.data.data)
            })
            .catch(err => console.log(err));
        
    },
    created(){
        
       let token = localStorage.getItem('token')
        
        if(token){
            this.loggedIn = true
        }
    }
}
</script>
