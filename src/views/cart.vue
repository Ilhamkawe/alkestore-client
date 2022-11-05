<template>
    <div class="home">
        <NavbarLogedin/>
        <!-- {{ berat }} -->
        <div class="container cart" style="width: 100%;">
            <div class="row" data-aos="zoom-in" data-aos-delay="200">
                <div class="col-md-12">
                    <table class="table table-borderless" >
                        <thead>
                        <tr>
                            <th scope="col">Gambar</th>
                            <th scope="col">Nama Product</th>
                            <th scope="col">Harga/Prdct</th>
                            <th scope="col">Jumlah</th>
                            <th scope="col">Total</th>
                            <th scope="col">Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="keranjang in keranjangUser" :key="keranjang.id">
                            <td width="30%"><img :src="apiUrl + '/storage/'+keranjang.photo_url" class="img-fluid" alt=""></td>
                            <td width="25%"> {{ keranjang.nama }}</td>
                            <td>Rp. {{ Number(keranjang.harga).toLocaleString() }}</td>
                            <td><input type="number" style="width:40px" @change="getOngkir(); changeQty();" v-model="keranjang.qty" min="1"> {{ keranjang.satuan }}</td>
                            <td>Rp. {{ Number(keranjang.harga * keranjang.qty).toLocaleString() }}</td>
                            <td><a @click="removeKeranjang(keranjang.index)" class="btn merah-base btn-hapus">Hapus</a></td>
                        </tr>
                        <div v-if="keranjangUser.length == 0">
                            <tr>
                                <td colspan="5">
                                    <h3 class="text-center">Belum Ada Barang DI Keranjang</h3>
                                </td>
                            </tr>
                        </div>
                        </tbody>
                    </table>
                    <hr width="100%">
                </div>
            </div>
            <div class="row pengiriman">
                <h5 style="font-weight:normal;">Detail Pengiriman</h5>
                <div class="col-md-6 fp">
                    <div class="form-group">
                        <label for="exampleFormControlInput1" class="form-label">Penerima</label>
                        <input type="email" class="form-control"  placeholder="Masukan Nama" v-model="userInfo[0].nama">
                    </div>
                </div>
                <div class="col-md-6 fp">
                    <div class="form-group">
                        <label for="exampleFormControlInput1" class="form-label">No Telepon</label>
                        <input type="email" class="form-control" v-model="userInfo[0].no_telp" placeholder="Isi No Telpon" >
                    </div>
                </div>
                <div class="col-md-8 fp">
                    <div class="form-group">
                        <label for="exampleFormControlInput1" class="form-label">Alamat</label>
                        <input type="text" class="form-control" v-model="userInfo[0].alamat" placeholder="Isi alamat" >
                    </div>
                </div>
                <div class="col-md-4 fp">
                    <div class="form-group">
                        <label for="exampleFormControlInput1" class="form-label">Provinsi</label>
                        <!-- v-model="userInfo[0].provinsi" -->
                        <select type="text" class="form-control" @change="getCitiesDestination" v-model="province_destination" >
                            <option  selected disabled>Pilih Provinsi</option>
                            <option  v-for="province in provinces" :key="province.id" :value="province.province_id">{{province.province}}</option>
                        </select>   
                    </div>
                </div>
                <div class="col-md-4 fp">
                    <div class="form-group">
                        <label for="exampleFormControlInput1" class="form-label" >Kota/Kabupaten</label>
                        <select type="text" class="form-control" v-model="city_destination" @change="getOngkir">
                            <option value="test" selected disabled>Pilih Kota/Kabupaten</option>
                            <option v-for="city in cities" :key="city.id" :value="city.city_id"  >{{city.type + " " +city.city_name}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4 fp">
                    <div class="form-group">
                        <label for="exampleFormControlInput1" class="form-label">Kode Pos</label>
                        <input type="text" class="form-control" v-model="userInfo[0].kode_pos" placeholder="Isi Kode Pos">
                    </div>
                </div>
                <hr width="100%" style="margin-top: 30px;">
            </div>
            <div class="row payment" >
                <h5 style="font-weight:normal;">Informasi Pembayaran</h5>
                
                    <div class="col-4 col-md-2 a">
                        <div class="value">Rp.{{Number(subTotal).toLocaleString()}}</div>
                        <div class="desc">Harga</div>
                    </div>
                    <div class="col-4 col-md-2 a">
                        <div class="value">Rp. {{Number(hargaPajak).toLocaleString()}}</div>
                        <div class="desc">Pajak</div>
                    </div>
                    <div class="col-4 col-md-3 a">
                        <div class="value">Rp. {{ Number(ongkir).toLocaleString() }}</div>
                        <div class="desc">Biaya Pengiriman</div>
                    </div>
                    <div class="col-4 col-md-2 a">
                        <div class="value total">Rp. {{ Number(totalBiaya).toLocaleString() }}</div>
                        <div class="desc">Total Harga</div>
                    </div>
                    <div class="col-8 col-md-3 a">
                        <div class="d-grid gap-2 btn-masuk-form">
                            <input class="btn biru-base" id="btnCO" @click="checkout" type="submit" value="Checkout">
                        </div>
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
import NavbarLogedin from '@/components/NavbarLogedin'
import axios from 'axios'
export default {
    name : 'Cart',
    components : {
        NavbarLogedin
    },
    data(){
        return {
            keranjangUser: [],
            userInfo : [],
            provinces : [],
            cities : [],
            cities_origin : '',
            city_destination : '',
            province_destination : '',
            couriers : [],
            courier : '',
            ongkir : 0,
            apiUrl : process.env.VUE_APP_BACKEND_URL
        }
    },
    methods : {
        changeQty(){
             const parsed = JSON.stringify(this.keranjangUser);
            localStorage.setItem('KeranjangUser', parsed);
        },

        removeKeranjang(idx){

            let keranjangUserStorage = JSON.parse(localStorage.getItem("KeranjangUser"))
            let itemKeranjangUserStorage = keranjangUserStorage.map(itemKeranjangUserStorage => itemKeranjangUserStorage.id)

            let index = itemKeranjangUserStorage.findIndex(id => id == idx)

            this.keranjangUser.splice(index,1);
            const parsed = JSON.stringify(this.keranjangUser);
            localStorage.setItem('KeranjangUser', parsed);
            window.location.reload()
        },

        getCitiesDestination() {
            // console.log("berhasil dipencet")
            axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/kota/${this.province_destination}`)
            .then(response => {
                this.cities = response.data.data
            })
            .catch(error => {
                console.log(error.response.data)
            })

        }, 

        getOngkir(){
            
            const dataOngkir = {
                "origin" : "55",
                "destination" : this.city_destination, 
                "berat" : this.berat,
                "courier" : "jne"
            }

            axios
            .post(process.env.VUE_APP_BACKEND_URL+"/api/ongkir",dataOngkir)
            .then(response => {
                this.ongkir = response.data.data[0].costs[0].cost[0].value
                
            })
            .catch(err => console.log(err))

        }, 

        checkout(){
            document.getElementById('btnCO').disabled = true;
            
            // state stok 
            let id = [];
            let data;
            

            let ProductDetails = this.keranjangUser.map(function(product){
                
                // cek stok 
                axios
                .get(process.env.VUE_APP_BACKEND_URL+"/api/produk",{
                    params : {
                        idBarang :  product.id
                    }
                })
                .then(response => {
                    data = response.data.data;
                    id.push(data[0].stok);
                })
                .catch(error => {
                    console.log(error)
                })

                return [product.id, parseInt(product.qty)]
            })
            
            
            
            

            // console.log(this.userInfo)
            let checkoutData = {
                "customer_id" : this.userInfo[0].id,
                "nama" : this.userInfo[0].nama, 
                "alamat" : this.userInfo[0].alamat +", "+this.province_destination+", "+this.city_destination, 
                "kode_pos" : this.userInfo[0].kode_pos,
                "no_telpon" : this.userInfo[0].no_telp, 
                "ongkir" : this.ongkir, 
                "pajak" : this.hargaPajak,  
                "transaksi_total" : this.totalBiaya, 
                "transaksi_status" : "PENDING", 
                "transaksi_details" : ProductDetails
            }
            // console.log(checkoutData)
            axios
                .post(process.env.VUE_APP_BACKEND_URL+"/api/checkout", checkoutData)
                .then(response =>{
                    localStorage.removeItem('keranjangUser')
                    window.location.href = response.data.data.paymentUrl
                })
                .catch(error => console.log(error))

        }
    },
    mounted(){
        axios
        .get(process.env.VUE_APP_BACKEND_URL+"/api/provinsi")
        .then(response => {
                this.provinces = response.data.data
                // console.log(response.data.data)
            }).catch(error => console.log(error))

        if(localStorage.getItem('KeranjangUser')){
            try{
                this.keranjangUser = JSON.parse(localStorage.getItem('KeranjangUser'))
            }catch(e){
                localStorage.removeItem('keranjangUser')
            }
        }
        if(localStorage.getItem('userLog')){
            try{
                this.userInfo = JSON.parse(localStorage.getItem('userLog'))
            }catch(e){
                localStorage.removeItem('userLog')
            }
        }
    }, 
    computed : {
        
        subTotal(){
            return this.keranjangUser.reduce(function (items, data){
                return items + (data.harga*data.qty);
            },0)
        },
        berat(){
            return this.keranjangUser.reduce(function (items, data){
                return items + (data.berat*data.qty);
            },0)
        },
        hargaPajak(){
            return (this.subTotal * 10) / 100;
        },
        totalBiaya(){
            return this.subTotal + this.hargaPajak + this.ongkir;
        }
    }, 
    created(){  
        
       let token = localStorage.getItem('token')
        
        if(!token){
            this.$router.push('/')
        }
    }
    
}
</script>