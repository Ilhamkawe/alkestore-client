<template>
            <div class="sidebar">
				<div class="sidebar-menu center">
					<div class="profile">
						<img src="img/ToyFaces_Colored_BG_29.jpg" alt="">
						<p>{{userInfo[0].nama}}</p>
					</div>
					<li class="item">
						<router-link to="/Profile" class="menu-btn">
							<i class="fas fa-id-badge"></i><span>Profile</span>
						</router-link>
					</li>
					<li class="item">
						<router-link to="/PurchaseHistori" class="menu-btn">
							<i class="fas fa-luggage-cart"></i><span>Riwayat Transaksi</span>
						</router-link>
					</li>
					<li class="item">
						<a @click="logout()" href="#" class="menu-btn">
							<i class="fas fa-sign-out-alt"></i><span>Logout</span>
						</a>
					</li>
					
				</div>
			</div>
</template>
<script>

export default {
    name : 'SidebarButton',
    components : {
        
    },data(){
        return {
            userInfo :[]
        }
    }, mounted(){
        if(localStorage.getItem('userLog')){
            try{
                this.userInfo = JSON.parse(localStorage.getItem('userLog'))
            }catch(e){
                localStorage.removeItem('userLog')
            }
        }
    }, methods : {
        logout(){
            localStorage.removeItem('KeranjangUser')
            localStorage.removeItem('userLog')
            localStorage.removeItem('token')
            this.$router.push('/')
        }
    }
}
</script>