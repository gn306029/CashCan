<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-light p-2">
        <a class="navbar-brand">{{ title }}</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ml-auto">
                <p v-if="isLogin" class="nav-item nav-link active mb-0" id="logout" @click="logout()">登出</p>
            </div>
        </div>
    </nav>
</template>

<script>

import axios from 'axios';
import Swal from 'sweetalert2'
import BasicMixin from '../Mixin/BasicMixin.vue';

export default {
  name: 'Navbar',
  props: {
      title: String,
      isLogin: Boolean
  },
  mixins: [BasicMixin],
  methods: {
      logout() {
          if(this.$cookie.get('auth_key') && this.$cookie.get('member_id')){
                let form_data = new FormData();
                
                form_data.append("auth_key", this.$cookie.get('auth_key'));
                form_data.append("member_id", this.$cookie.get('member_id'));

                axios
                .post(`${this.request_url}Logout/`, form_data)
                .then((response) => {
                    if(response["data"]["status_code"] == "success"){
                        if(this.$cookie.get("use_google")){
                            this.$gapi.getGapiClient().then((gapi) => {
                                let auth2 = gapi.auth2.getAuthInstance();
                                auth2.signOut().then(function () {
                                    auth2.disconnect();
                                    location.href = "/Login";
                                });
                            });
                        }else{
                            location.href = "/Login";
                        }
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: "登出失敗",
                            text: response["status_message"],
                            showConfirmButton: false,
                            customClass: {
                                title: "swal-custom-title"
                            }
                        });
                    }
                })
          }else{
              location.href = "/Login";
          }
      }
  }
}
</script>

<style>

#logout {
    cursor: pointer;
}

.navbar-default .navbar-collapse,
.navbar-default .navbar-form {
	background-color: white;
	color: black;
}

.navbar-default {
	.navbar-brand,
	.navbar-nav > a {
		color: black;
	}
	.navbar-brand {
		font-weight: 700;
		font-size: 1.25em;
		letter-spacing: 3px;
	}
}

.container-fluid {
	background-color: #fff;
}

.navbar-toggle {
	border: none;
}

.navbar-default .navbar-toggle:focus,
.navbar-default .navbar-toggle:hover {
	background-color: #fff;
}

.navbar-default .navbar-toggle .icon-bar {
	background-color: black;
}
</style>