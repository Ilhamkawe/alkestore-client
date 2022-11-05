<template>
    <div class="container new-product" data-aos="zoom-in" data-aos-delay="200">
        <center><h3 class="subtitle">Product Disarankan</h3></center>
        <div class="row">
          <div class="col-6 col-md-4 col-lg-3" data-aos="zoom-in" data-aos-delay="200">
            <a class="component-products d-block" href="detail.html">
              <div class="products-thumbnail">
                <div class="products-image" style="background-image: url('img/stetoskop/markus-frieauff-IJ0KiXl4uys-unsplash.jpg');">
                </div>
              </div>
              <div class="products-text">
                Stetoskop
              </div>
              <div class="products-price">
                Rp. 200.000
              </div>
            </a>
            </div>
            <div class="col-6 col-md-4 col-lg-3" data-aos="zoom-in" data-aos-delay="200" >
            <a class="component-products d-block" href="detail.html">
              <div class="products-thumbnail">
                <div class="products-image" style="background-image: url('img/masker/naipo-de-H6Ohg4PUx2Q-unsplash.jpg');">
                </div>
              </div>
              <div class="products-text">
                Masker
              </div>
              <div class="products-price">
                Rp. 100.000
              </div>
            </a>
            </div>
            <div class="col-6 col-md-4 col-lg-3" data-aos="zoom-in" data-aos-delay="200" >
            <a class="component-products d-block" href="detail.html">
              <div class="products-thumbnail">
                <div class="products-image" style="background-image: url('img/pippet/testalize-me-TxP9AeN-WA0-unsplash.jpg');">
                </div>
              </div>
              <div class="products-text">
                Pippet
              </div>
              <div class="products-price">
                Rp. 10.000
              </div>
            </a>
            </div>
            <div class="col-6 col-md-4 col-lg-3" data-aos="zoom-in" data-aos-delay="200">
            <a class="component-products d-block" href="detail.html">
              <div class="products-thumbnail">
                <div class="products-image" style="background-image: url('img/lancet/diabetesmagazijn-nl-7pomsk3sj6w-unsplash.jpg');">
                </div>
              </div>
              <div class="products-text">
                Lancet
              </div>
              <div class="products-price">
                Rp. 50.000
              </div>
            </a>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
export default {
    name : 'Recommended',
    data(){
      return {
        keranjangUser : [],
        loggedin : false
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

      // axios.get("").then()
    }, 
    created(){

      let token = localStorage.getItem('token')
      if(token){
        this.loggedin = true
      }

    }
}
</script>