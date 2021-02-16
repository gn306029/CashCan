<template>
    <div class="container-fluid vh-100">
        <div class="row h-75">
            <div class="col-12 col-sm-6 col-md-4 m-auto">
                <div class="h2 font-weight-bold">Cash Can 零錢罐</div>
                <div class="h6 text-secondary">紀錄生活的一點一滴</div>
                <hr/>
                <form id="login-form">
                    <input class="form-control my-2" type="text" maxlength="15" name="member_id" placeholder="輸入帳號" @change="edit_member_id">
                    <input class="form-control my-2" type="password" maxlength="15" name="member_pwd" placeholder="密碼" @change="edit_member_pwd">
                </form>
                <button id="login" class="btn btn-primary col-12" @click="login()">
                    登入
                </button>
                <hr/>
                <div id="google-signin-btn"></div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>

import axios from 'axios';
import Swal from 'sweetalert2'
import Footer from '../common/Footer.vue';
import BasicMixin from '../Mixin/BasicMixin.vue';

export default {
    name: "Login",
    components: {
        Footer
    },
    mixins: [BasicMixin],
    data() {
        return {
            member_id: "",
            member_pwd: ""
        }
    },
    created() {
        this.check_is_login();
        if(this.is_login){
            location.href = "/";
        }
    },
    mounted() {
        this.$gapi.getGapiClient().then((gapi) => {
            if(!gapi.auth2.getAuthInstance().isSignedIn.get()){
                gapi.signin2.render('google-signin-btn', { // this is the button "id"
                    onsuccess: this.onSignIn // note, no "()" here
                });
            }
        });
    },
    methods: {
        login() {

            let form_data = new FormData();
            
            form_data.append("member_id", this.member_id);
            form_data.append("member_pwd", this.member_pwd);

            axios
            .post(`${this.request_url}Login/`, form_data)
            .then((response) => {
                if(response["data"]["status_code"] == "success"){
                    Swal.fire({
                        icon: 'success',
                        title: '登入成功',
                        text: response["status_message"],
                        showConfirmButton: false,
                        timer: 2000,
                        customClass: {
                            title: "swal-custom-title"
                        }
                    }).then(() => {
                        this.$cookie.set('auth_key', response["data"]["auth_key"], 1440);
                        this.$cookie.set('member_id', this.member_id, 1440);
                        this.$cookie.set('member_name', response["data"]["member_name"], 1440);
                        location.href = "/";
                    });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: '帳號/密碼錯誤或不存在',
                        text: response["status_message"],
                        showConfirmButton: false,
                        customClass: {
                            title: "swal-custom-title"
                        }
                    }).then(() => {
                        document.getElementsByName("member_id")[0].value = "";
                        document.getElementsByName("member_pwd")[0].value = "";
                    });
                }
            })
        },
        onSignIn(result) {
            this.member_id = result.getBasicProfile().getEmail();
            this.member_pwd = result.getBasicProfile().getId();

            let form_data = new FormData();
            
            form_data.append("member_id", this.member_id);
            form_data.append("member_pwd", this.member_pwd);
            form_data.append("member_name", result.getBasicProfile().getName());

            result.disconnect();

            axios
            .post(`${this.request_url}SignUp/`, form_data)
            .then((response) => {
                if(response.data.status_code != "error"){
                    this.login();
                    this.$cookie.set('use_google', true);
                }
            });
        },
        edit_member_id(event) {
            this.member_id = event.target.value;
        },
        edit_member_pwd(event) {
            this.member_pwd = event.target.value;
        }
    }
}
</script>

<style>
.vh-100 {
    min-height: 100vh !important;
}

hr {
    opacity: 0.1;
}
</style>