<script>

import axios from 'axios';

export default {
    data() {
        return {
            //request_url: "https://cashcan.000webhostapp.com/"
            request_url: "http://localhost:520/cashcan_server/",
            is_login: false
        }
    },
    methods: {
        // 確認是否需要導到登入頁
        async check_is_login(){
            if(this.$cookie.get('auth_key') && this.$cookie.get('member_id')){

                let form_data = new FormData();
                
                form_data.append("auth_key", this.$cookie.get('auth_key'));
                form_data.append("member_id", this.$cookie.get('member_id'));

                return axios
                .post(`${this.request_url}isLogin/`, form_data)
                .then((response) => {
                    if(response["data"]["status_code"] == "success"){
                        this.is_login = true;
                    }else{
                        this.is_login = false;
                    }
                })
            }else{
                this.is_login = false;
            }
        }
    }
}
</script>

<style>
/* sweet alert 2 */
.swal-custom-title {
  font-size: 1rem;
}
</style>