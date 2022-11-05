<template>
        <div class="text-center" data-aos="zoom-in" data-aos-delay="200" style="margin-top: 10%;">
            <img src="img/tick.svg" width="300px" height="300px">
            <h3 style="margin-bottom: 30px; margin-top: 30px; font-weight:bold;">Profile Berhasil Di Update</h3>
            <router-link to="/profile" class="btn btn-primary">Lanjutkan</router-link>
        </div>
</template>

<script>

export default{
    name : 'Updated',
    components : {
        
    },
    created(){
        
       let token = localStorage.getItem('token')
        
        if(!token){
            this.$router.push('/login')
        }
    }
}
</script>
