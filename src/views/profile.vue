<template>
    <!--wrapper start-->
		<div class="wrapper">
			<!--header menu start-->
            <div class="header">
				<NavbarLogedin/>
			</div>
			<!--header menu end-->
			<!--sidebar start-->
			<SidebarButton/>
			<!--sidebar end-->
			<!--main container start-->
			<div class="main-container">
                <div class="home">   
                    <div class="container" data-aos="zoom-in" data-aos-delay="200">
                        <h3 style="font-weight: bold;" >Ubah Data Profile</h3>
                        <p style="width: 35%; margin-bottom: 40px;">Masukan Data yang valid agar proses belanja menjadi lebih mudah.</p>
                           <form @submit.prevent ="updateProfile">
                                <div class="mb-3">
                                    <label for="" class="form-label">Nama</label>
                                    <input type="text" class="form-control"  placeholder="Masukan Nama Anda" v-model="userInfo[0].nama" required>
                                </div>
                                <div class="mb-3">
                                    <label for="" class="form-label">Nomer Telephone</label>
                                    <input type="text" class="form-control"  placeholder="Masukan Nomer Telephone Anda" v-model="userInfo[0].no_telp">
                                </div>
                                <div class="mb-3">
                                    <label for="" class="form-label">Alamat</label>
                                    <input type="text" class="form-control"  placeholder="Masukan Alamat Anda" v-model="userInfo[0].alamat">
                                </div>
                                <div class="mb-3">
                                    <label for="" class="form-label">Provinsi</label>
                                    <!-- <input type="text" class="form-control"  placeholder="Masukan Provinsi Anda"> -->
                                    <select name="" id="" class="form-control" @change="ubahProvinsi($event) " >
                                        <option :selected="userInfo[0].provinsi === '-'" disabled>Pilih Provinsi</option>
                                        <option v-for="province in provinces" :key="province.id" :value="[province.province_id,province.province]" :selected="province.province === userInfo[0].provinsi">{{province.province}}</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="" class="form-label">Kota/Kabupaten</label>
                                    <!-- <input type="text" class="form-control"  placeholder="Masukan Kota/Kabupaten Anda"> -->
                                    <select name="" id="" class="form-control" @change="ubahKota($event)">
                                        <option :selected="userInfo[0].kota === '-'" disabled>Pilih Kota/Kabupaten</option>
                                         <option v-for="city in cities" :key="city.id" :value="city.type+' '+city.city_name" :selected="userInfo[0].kota === city.type + ' ' +city.city_name">{{city.type + " " + city.city_name}}</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="" class="form-label">Kode Pos</label>
                                    <input type="text" class="form-control"  placeholder="Masukan Kode Pos Anda" v-model="userInfo[0].kode_pos">
                                </div>
                                <div class="d-grid gap-2 btn-masuk-form">
                                    <input class="btn btn-primary" type="submit" value="Update" >
                                    <p style="margin-top: 30px;">Ganti Password ? <router-link to="/profile/password">Klik Disini</router-link></p>
                                </div>
                           </form>
                        
                    </div>
            </div> 
			</div>
			<!--main container end-->
             <div class="footer">
        
                <div class="footer2">
                    <center>&#169; 2021 PT Konsen Medisia Alkestron</center>
                </div>
            
            </div>
		</div>

		<!--wrapper end-->
</template>
<script>
import NavbarLogedin from '@/components/NavbarLogedin'
import SidebarButton from '@/components/SidebarButton'
import axios from 'axios'
export default {
    name : 'PurchaseHistori',
    components : {
        NavbarLogedin,
        SidebarButton
    },data(){
        return {
            userInfo :[],
            transactionInfo : [],
            cities : [],
            provinces : [],
            provinsi : '',
            provStr : '',
            cityStr : '',
            
        }
    },
    methods :{
        
        updateProfile(){

            let data = {
                "nama" : this.userInfo[0].nama,
                "no_telp" : this.userInfo[0].no_telp,
                "alamat" : this.userInfo[0].alamat,
                "provinsi" : this.userInfo[0].provinsi,
                "kota" : this.userInfo[0].kota,
                "kode_pos" : this.userInfo[0].kode_pos,  
                "prov_index" :this.provinsi 
            }

            this.userInfo[0].prov_index = parseInt(this.provinsi)

            axios.put(`${process.env.VUE_APP_BACKEND_URL}/api/update/${this.userInfo[0].id}/user`,data)
            .then(() => {
                // replace localstorage userLog
                // hapus userlog
                localStorage.removeItem('userLog');
                // tambah userlog
                localStorage.setItem('userLog',JSON.stringify(this.userInfo))
                // redirect ke page sukses 
                this.$router.push('/profile/updated')

            })
            .catch(error => {
                console.log(error)
            })
        },
        ubahProvinsi(event){
            let dataProv = event.target.value.split(",")
            // console.log(dataProv[0])
            this.provinsi = dataProv[0];
            this.userInfo[0].provinsi = dataProv[1];
            this.getCity();
        },
        ubahKota(event){
            this.userInfo[0].kota = event.target.value
        },
        getCity() {
            // console.log("berhasil dipencet")
            axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/kota/${this.provinsi}`)
            .then(response => {
                this.cities = response.data.data
                // console.log(this.cities)
            })
            .catch(error => {
                console.log(error.response.data)
            })
        },
    }, mounted(){
        
        if(localStorage.getItem('userLog')){
            try{
                this.userInfo = JSON.parse(localStorage.getItem('userLog'))
                this.provinsi = this.userInfo[0].prov_index
            }catch(e){
                localStorage.removeItem('userLog')
            }
        }

        

        axios
        .get(process.env.VUE_APP_BACKEND_URL+"/api/provinsi")
        .then(response => {
                this.provinces = response.data.data
                
                // console.log(response.data.data)
        }).catch(error => console.log(error))

         axios
         .get(`${process.env.VUE_APP_BACKEND_URL}/api/kota/${this.provinsi}`)
            .then(response => {
                this.cities = response.data.data
                // console.log(this.cities)
                // console.log(response.data.data)
            })
            .catch(error => {
                console.log(error.response.data)
            })

        

        axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/transaksi/${this.userInfo[0].id}/all`)
        .then(res => this.transactionInfo = res.data.data)

    }, 
    created(){
        
       let token = localStorage.getItem('token')
        
        if(!token){
            this.$router.push('/login')
        }
    }
}
</script>