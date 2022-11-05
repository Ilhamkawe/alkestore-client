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
                        <h3>Riwayat Transaksi</h3>
                        <table class="table table-borderless" >
                            <thead>
                                <th>#</th>
                                <th>Id transaksi</th>
                                <th>Total Harga</th>
                                <th>Tanggal Transaksi</th>
                                <th>Status</th>
                                <th>Detail</th>
                            </thead>
                            <tbody class="histori">
                                <tr v-for="(transaksi,index) in transactionInfo" :key="transaksi.id">
                                    <td>{{ index+1 }}</td>
                                    <td>{{ transaksi.uuid }}</td>
                                    <td>Rp.{{Number(transaksi.transaksi_total).toLocaleString()}}</td>
                                    <td>{{ transaksi.tanggal }}</td>
                                    <td>
                                        <span class="badge bg-success" v-if="transaksi.transaksi_status == 'SUKSES'">{{ transaksi.transaksi_status }}</span>
                                        <span class="badge bg-warning" v-if="transaksi.transaksi_status == 'PENDING'">{{ transaksi.transaksi_status }}</span>
                                        <span class="badge bg-danger" v-if="transaksi.transaksi_status == 'GAGAL'">{{ transaksi.transaksi_status }}</span>    
                                    </td>
                                    <td>
                                        <router-link :to="'/DetailPurchase/'+transaksi.id" class="btn biru-base">Lihat</router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
            transactionInfo : []
        }
    }, mounted(){
        
        if(localStorage.getItem('userLog')){
            try{
                this.userInfo = JSON.parse(localStorage.getItem('userLog'))
            }catch(e){
                localStorage.removeItem('userLog')
            }
        }

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