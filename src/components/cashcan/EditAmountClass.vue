<template>
    <div>
        <div class="modal fade" id="edit_amount_class" tabindex="-1" aria-labelledby="title" aria-hidden="False">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-left" id="title">編輯分類</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close_modal()"></button>
                </div>
                <div class="modal-body">
                    <form id="edit_form">
                        <div class="row mb-3">
                            <label for="can_name" class="col-sm-2 col-form-label">名稱</label>
                            <div class="col-sm-10">
                            <input type="text" class="form-control" id="can_name" placeholder="分類名稱" maxlength="50" :value="amount_class_name" @change="edit_name" required>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" v-if="amount_class_id != 'insert'" class="btn btn-danger" @click="delete_class()">移除</button>
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

export default {
    name: "EditAmountClass",
    props: {
        amount_class_id: String,
        amount_class_name: String
    },
    methods: {
        close_modal() {
            this.$emit("close_edit_modal")
        },
        edit_name(event) {
            this.$emit("edit_amount_class_name",{
                "amount_class_name": event.target.value
            })
        },
        save_change() {
            
            if(!document.getElementById("edit_form").reportValidity()){
                return;
            }

            let form_data = new FormData();
            
            form_data.append("amount_class_id", this.amount_class_id);
            form_data.append("amount_class_name", this.amount_class_name);

            axios
            .post('https://cashcan.000webhostapp.com/AmountClass/edit/', form_data)
            .then((response) => {
                // 檢查是否有資料變動
                this.close_modal();

                if(response.data.effect_row > 0){
                    alert("編輯完成");
                }else{
                    alert("編輯失敗");
                }

                this.$emit("reload_amount_class");
            })
        },
        delete_class() {
            const result = confirm(`是否要移除 ${this.amount_class_name}?`);

            if(result) {
                let form_data = new FormData();
            
                form_data.append("amount_class_id", this.amount_class_id);

                axios
                .post('https://cashcan.000webhostapp.com/AmountClass/delete/', form_data)
                .then((response) => {
                    this.close_modal();

                    if(response.data.effect_row > 0){
                        alert("移除完成");
                    }else if(response.data.effect_row == -2){
                        alert("無法刪除，目前仍有項目使用該分類，請確定無項目使用該分類後再刪除");
                    }else{
                        alert("移除失敗");
                    }

                    this.$emit("reload_amount_class");
                })
            }
        }
    }
}
</script>