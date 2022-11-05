<template>
    <div class="container konsen-nav" data-aos="fade-down" data-aos-delay="200">
        <nav class="navbar navbar-light navbar-expand-md  justify-content-center konsen">
            <a href="/" class="navbar-brand d-flex w-50 mr-auto fw-bold">Konsen Store</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse w-100" id="collapsingNavbar3">
                
                <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link active">Beranda</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/Kategori" class="nav-link menu">Kategori</router-link>
                        <!-- <a class="nav-link menu" href="kategori.html">Kategori</a> -->
                    </li>
                    <li class="nav-item">
                        <router-link to="/cart">
                            <img class="nav-link cart" src="img/shopping-bag.svg" alt="">
                            <span class="num-cart">{{ keranjangUser.length }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item" >
                        <router-link to="/PurchaseHistori"><img src="img/ToyFaces_Colored_BG_29.jpg" class="img-fluid profile" alt=""></router-link>
                    </li>
                </ul>
            </div>
        </nav>
        
    </div>
</template>
<script>
export default {
    name : 'NavbarLogedin',
    data (){
        return {
            keranjangUser : []
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
    }
}
</script>