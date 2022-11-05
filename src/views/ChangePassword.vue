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
                        <h3 style="font-weight: bold;">Ubah Password</h3>
                        <p style="width: 35%; margin-bottom: 40px;">Masukan Data yang valid agar proses belanja menjadi lebih mudah.</p>
                           <form @submit.prevent ="changePassword">
                                <div class="mb-3">
                                    <label for="" class="form-label">Masukan Password Lama</label>
                                    <input type="password" class="form-control" v-model="password.pwLama"  placeholder="Masukan Password Lama Anda" :class="{'is-invalid':$v.password.pwLama.$error, 'is-valid':!$v.password.pwLama.$invalid}" >
                                    <div class="valid-feedback">
                            
                                    </div>
                                    <div class="invalid-feedback">
                                        <p v-if="!$v.password.pwLama.required">Password Lama Tidak Boleh Kosong</p>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="" class="form-label">Masukan Password Baru</label>
                                    <input type="password" class="form-control" v-model="password.pwBaru" placeholder="Masukan Password Baru" :class="{'is-invalid':$v.password.pwBaru.$error, 'is-valid':!$v.password.pwBaru.$invalid}">
                                    <div class="valid-feedback">
                            
                                    </div>
                                    <div class="invalid-feedback">
                                        <p v-if="!$v.password.pwBaru.required">Password baru Tidak Boleh Kosong</p>
                                        <p v-if="!$v.password.pwBaru.minLength">Password Tidak Boleh Kurang Dari {{ $v.password.$params.minLength.min }} Karakter</p>
                                        <p v-if="!$v.password.pwBaru.maxLength">Password Tidak Boleh lebih Dari {{ $v.password.$params.maxLength.max }} Karakter</p>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="" class="form-label">Ulang Password Baru</label>
                                    <input type="password" class="form-control"  v-model="password.ulangPwBaru" placeholder="Masukan Ulang Password Baru" :class="{'is-invalid':$v.password.ulangPwBaru.$error, 'is-valid':!$v.password.ulangPwBaru.$invalid}">
                                    <div class="valid-feedback">
                            
                                    </div>
                                    <div class="invalid-feedback">
                                        <p v-if="!$v.password.ulangPwBaru.required">Password baru Tidak Boleh Kosong</p>
                                        <p v-if="!$v.password.ulangPwBaru.sameAspwBaru">Password Tidak sama</p>
                                    </div>
                                </div>
                                <div class="d-grid gap-2 btn-masuk-form">
                                    <input class="btn btn-primary" type="submit" value="Update">
                                </div>
                           </form>
                        <!-- <p v-if="!$v.password.ulangPwBaru.sameAspwbaru">Password Tidak sama</p> -->
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
import {required, sameAs, minLength, maxLength} from 'vuelidate/lib/validators'
import axios from 'axios'
// import axios from 'axios'
export default {
    name : 'PurchaseHistori',
    components : {
        NavbarLogedin,
        SidebarButton
    },data(){
        return {
            userInfo : [],
            password :{
                pwLama : '',
                pwBaru : '', 
                ulangPwBaru : ''
            },
            
        }
    },
    validations: {
        password : {
            pwLama : {
                required, 
            }, 
            pwBaru : {
                required,
                minLength : minLength(8),
                maxLength : maxLength(16)
            }, 
            ulangPwBaru : {
                required,
                sameAspwBaru : sameAs('pwBaru')
            }
        }
    },
    methods :{
        validate(){
            this.$v.$touch() 
            if(this.$v.$invalid){
                this.submitstatus = "FAIL"
            }else{
                this.submitstatus = "SUCCESS"
            }
        },
        changePassword(){

            this.validate()

            axios.put(`${process.env.VUE_APP_BACKEND_URL}/api/update/${this.userInfo[0].id}/password`, {
                "pwLama" : this.password.pwLama , 
                "pwBaru" : this.password.pwBaru
            }).then(
                this.$router.push('/profile/updated')
            ).catch(err => console.log(err))

        }

    }, mounted(){


        
        if(localStorage.getItem('userLog')){
            try{
                this.userInfo = JSON.parse(localStorage.getItem('userLog'))
            }catch(e){
                localStorage.removeItem('userLog')
            }
        }

    }, 
    created(){
        
       let token = localStorage.getItem('token')
        
        if(!token){
            this.$router.push('/login')
        }
    }
}
</script>