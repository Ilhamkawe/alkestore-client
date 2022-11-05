<template>
    <div class="container new-product" >
       <h3 class="subtitle" data-aos="zoom-in" data-aos-delay="200" style="font-weight : bold;">Produk Baru</h3>
       <div class="row">
          <div class="col-6 col-md-4 col-lg-3" data-aos="zoom-in" data-aos-delay="200" v-for="item in products" :key="item.id">
          <div >
            <!-- <a class="component-products d-block" href="detail.html"> -->
            <router-link class="component-products d-block" :to="'/detail/'+item.id" > 
            <div class="products-thumbnail">
              <div class="products-image" :style="{backgroundImage: 'url('+ apiUrl +'/storage/'+item.gallery[0].photo_url+')'}">
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
            <!-- </a> -->
            </router-link>
          </div>
          </div>
       </div>
   </div>
</template>

<script>
import axios from 'axios'
export default {
    name : 'NewProduk',
    data(){
        return {
            products:[],
            keranjangUser:[],
            apiUrl : process.env.VUE_APP_BACKEND_URL
        }
    },
    methods : {
      // saveKeranjang(idProduk, namaProduk, hargaProduk, photoProduk){

      //   var produk = {
      //     "id" : idProduk, 
      //     "nama" : namaProduk, 
      //     "harga" : hargaProduk,
      //     "photo" : photoProduk 
      //   }

      // }



    }
    ,
    mounted(){

        axios.get(process.env.VUE_APP_BACKEND_URL+"/api/produk")
        .then(response =>  {
          this.products = response.data.data.data
          console.log(this.products)
          })
    }
}
</script>