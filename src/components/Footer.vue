<template>
     <div class="footer">
        <div class="footer1">
          <div class="container-fluid">
            <div class="row justify-content-md-center">
              <div class="col col-md-3 col-lg-3">
                <p class="fw-bold">Explore</p>
                <ul>
                  <li><router-link to="/">Beranda</router-link></li>
                  <li><router-link to="/kategori">Kategori</router-link></li>
                  <li><router-link to="/profile">Profile</router-link></li>
                </ul>
              </div>
              <div class="col col-md-3 col-lg-3">
                <p class="fw-bold">Inquiries</p>
               <ul>
                 <li><a href="">Bekasi, Indonesia</a></li>
                 <li><a href="">+62 878 7689 7004</a></li>
                 <li><a href="">alkestron@konsen.com</a></li>
                 
               </ul>
              </div>
              <div class="col-md-4 col-lg-3">
                <p class="fw-bold">PT. Konsen Medisia Alkestron</p>
              </div>
            </div>
          </div>
        </div>
        <div class="footer2">
            <center>&#169; 2021 PT Konsen Medisia Alkestron</center>
        </div>
    </div>
   
</template>
<script>
export default {
    name : 'Footer'
}
</script>