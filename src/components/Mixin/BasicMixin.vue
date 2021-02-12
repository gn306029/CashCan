<script>

import axios from 'axios';

export default {
    data() {
        return {
            //request_url: "https://cashcan.000webhostapp.com/"
            request_url: "http://localhost:520/cashcan_server/"
        }
    },
    created() {
        // 檢查是否已登入過
        if(this.$cookie.get('auth_key') && this.$cookie.get('member_id')){

            let form_data = new FormData();
            
            form_data.append("auth_key", this.$cookie.get('auth_key'));
            form_data.append("member_id", this.$cookie.get('member_id'));

            axios
            .post(`${this.request_url}isLogin/`, form_data)
            .then((response) => {
                if(location.href.split("/").pop() == "Login" ){
                    if(response["data"]["status_code"] == "success"){
                        location.href = "/";
                    }
                }else{
                    if(response["data"]["status_code"] == "error"){
                        location.href = "/Login";
                    }
                }
            })
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