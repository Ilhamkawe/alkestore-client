<template>
   <div>
        <!-- As a heading -->
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
                        <router-link to="/register" class="nav-link menu">Daftar</router-link>
                        <!-- <a class="nav-link" href="daftar.html">Daftar</a> -->
                    </li>
                    <li class="nav-item">
                        <router-link to="/login" class="btn biru-base btn-masuk">Masuk</router-link>
                        <!-- <a href="masuk.html" class="btn biru-base btn-masuk">Masuk</a> -->
                    </li>
                </ul>
            </div>
        </nav>
        
    </div>
   </div>
</template>

<script>

export default {
    name : "Navbar",
    
}
</script>