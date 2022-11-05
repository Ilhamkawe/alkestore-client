<template>
    <div class="home">
        <NavbarLogedin/>
        <div class="container cart" style="width: 100%;">
            <div class="row" data-aos="zoom-in" data-aos-delay="200">
                <div class="col-md-12">
                    <table class="table table-borderless" >
                        <thead>
                        <tr>
                            <th scope="col">Gambar</th>
                            <th scope="col">Nama Product</th>
                            <th scope="col">Jumlah</th>
                            <th scope="col">Harga</th>
                            <!-- <th scope="col">Aksi</th> -->
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="detail in detailInfo[0].transaction_detail" :key="detail.id">
                            <td width="25%"><img :src="apiUrl+'/storage/'+detail.produk.gallery[0].photo_url" class="img-fluid" alt=""></td>
                            <td width="35%">{{ detail.produk.nama }}</td>
                            <td>{{ detail.qty + " " +detail.produk.satuan_produk.nama }}</td>
                            <td>Rp. {{ detail.produk.harga * detail.qty }}</td>
                            <!-- <td><a href="masuk.html" class="btn merah-base btn-hapus">Hapus</a></td> -->
                        </tr>
                        </tbody>
                    </table>
                    <hr width="100%">
                </div>
            </div>
    
            <div class="row payment" data-aos="zoom-in" data-aos-delay="200">
                <h5 style="font-weight:normal;">Informasi Pembayaran</h5>
                
                    <div class="col-4 col-md-2 a">
                        <div class="value">Rp. {{detailInfo[0].transaksi_total - detailInfo[0].pajak - detailInfo[0].ongkir}}</div>
                        <div class="desc">Harga</div>
                    </div>
                    <div class="col-4 col-md-2 a">
                        <div class="value">Rp. {{detailInfo[0].pajak}}</div>
                        <div class="desc">Pajak</div>
                    </div>
                    <div class="col-4 col-md-2 a">
                        <div class="value">Rp. {{detailInfo[0].ongkir}}</div>
                        <div class="desc">Biaya Pengiriman</div>
                    </div>
                    <div class="col-4 col-md-2 a">
                        <div class="value total">Rp. {{detailInfo[0].transaksi_total}}</div>
                        <div class="desc">Total Harga</div>
                    </div>
                    <div class="col-4 col-md-2 a">
                        <div class="value">{{detailInfo[0].transaksi_status}}</div>
                        <div class="desc">Status</div>
                    </div>
                    <div class="col-8 col-md-2 a" v-if="detailInfo[0].transaksi_status == 'SUKSES'">
                        <div class="d-grid gap-2 btn-masuk-form">
                            <input class="btn hijau-base" type="submit" value="Download Faktur">
                        </div>
                    </div>
                
            </div>
        </div>
    </div> 
</template>
<script>
import NavbarLogedin from '@/components/NavbarLogedin'
import axios from 'axios'
export default {
    name : 'DetailPurchase',
    components : {
        NavbarLogedin
    }, data(){
        return {
            detailInfo : [],
            userInfo : [],
            apiUrl : process.env.VUE_APP_BACKEND_URL
        }
    }, created(){
        let token = localStorage.getItem('token')

        if(!token){
            this.$router.push('/login')
        }
    }, mounted (){
        if(localStorage.getItem('userLog')){
            try{
                this.userInfo = JSON.parse(localStorage.getItem('userLog'))
            }catch(e){
                localStorage.removeItem('userLog')
            }
        }
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/transaksi/${this.$route.params.id}`, {
            params:{
                customer_id : this.userInfo[0].id
            }
        }).then(res => {
            this.detailInfo = res.data.data
            console.log(this.detailInfo)
            
        })

        
    }
}
</script>