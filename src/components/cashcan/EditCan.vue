<template>
    <div>
        <div class="modal fade" id="edit_can" tabindex="-1" aria-labelledby="title" aria-hidden="False">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-left" id="title">編輯零錢罐</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close_modal()"></button>
                </div>
                <div class="modal-body">
                    <form id="edit_form">
                        <div class="row mb-3">
                            <label for="can_name" class="col-sm-2 col-form-label">名稱</label>
                            <div class="col-sm-10">
                            <input type="text" class="form-control" id="can_name" placeholder="零錢罐名稱" maxlength="50" :value="can_name" @change="edit_name" required>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" v-if="can_id != 'insert'" class="btn btn-danger" @click="delete_can()">移除</button>
                    <button type="button" class="btn btn-success" @click="save_change()">儲存</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="close_modal()">關閉</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import Swal from 'sweetalert2'
import BasicMixin from '../Mixin/BasicMixin.vue';

export default {
    name: "EditCan",
    props: {
        can_id: [String, Number],
        can_name: String
    },
    mixins: [BasicMixin],
    methods: {
        close_modal() {
            this.$emit("close_edit_modal")
        },
        edit_name(event) {
            this.$emit("edit_can_name",{
                "can_name": event.target.value
            })
        },
        save_change() {

            if(!document.getElementById("edit_form").reportValidity()){
                return;
            }

            let form_data = this.get_basic_form();
            
            form_data.append("can_id", this.can_id);
            form_data.append("can_name", this.can_name);

            axios
            .post(`${this.request_url}Can/edit/`, form_data)
            .then((response) => {
                // 檢查是否有資料變動
                this.close_modal();

                if(response.data.status_code == "success"){
                    Swal.fire({
                        icon: "success",
                        title: "編輯完成",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }else{
                    Swal.fire({
                        icon: "error",
                        title: response.data["status_message"],
                        showConfirmButton: false,
                        timer: 2000
                    });
                }

                this.$emit("reload_can");
            })
        },
        delete_can() {
            const result = confirm(`該零錢罐的相關紀錄也會一併移除，是否仍要移除 ${this.can_name}?`);

            if(result) {
                let form_data = new FormData();
            
                form_data.append("can_id", this.can_id);

                axios
                .post(`${this.request_url}Can/delete/`, form_data)
                .then((response) => {
                    // 檢查是否有資料變動
                    this.close_modal();

                    if(response.data.effect_row > 0){
                        alert("移除完成");
                    }else{
                        alert("移除失敗");
                    }

                    this.$emit("reload_can");
                })
            }
        }
    }
}
</script>