<template>
    <div class="root">
        <Navbar title="Cash Can"></Navbar>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-8">
                    <form id="edit_form" class="row p-3 g-2">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="/">首頁</a></li>
                                <li class="breadcrumb-item active" aria-current="page">編輯項目</li>
                            </ol>
                        </nav>
                        <h3 class="text-start">編輯零錢罐紀錄</h3>
                        <hr/>
                        <div class="col-12 text-start">
                            <label for="exist_can" class="form-label">零錢罐</label>
                            <select id="exist_can" class="form-select" @change="edit_can" required>
                                <option 
                                    v-for="can in can_items" 
                                    :key="can.can_id" 
                                    :value="can.can_id"
                                    :selected="can.can_id == data.save_can_id"
                                >
                                    {{ can.can_name }}
                                </option>
                            </select>
                        </div>
                        <div class="col-12 text-start">
                            <label for="item_name" class="form-label">名稱</label>
                            <input type="text" class="form-control" id="item_name" placeholder="項目名稱" :value="data.item_name" @change="edit_item_name" required maxlength="50">
                        </div>
                        <fieldset class="row my-3">
                            <div class="col-4 col-sm-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="amount_type" id="income" value="收入" :checked="data.amount_type == '收入'" @change="edit_amount_type">
                                    <label class="form-check-label" for="income">
                                    收入
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="amount_type" id="expenses" value="支出" :checked="data.amount_type == '支出'" @change="edit_amount_type">
                                    <label class="form-check-label" for="expenses">
                                    支出
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                        <div class="col-12 text-start">
                            <label for="amount" class="form-label">金額</label>
                            <input type="number" class="form-control" id="amount" placeholder="金額" step="1" :value="data.amount" @change="edit_amount" required>
                        </div>
                        <div class="col-12 text-start">
                            <label for="amount_class" class="form-label">分類</label>
                            <select id="amount_class" class="form-select" @change="edit_amount_class">
                                <option 
                                    v-for="class_obj in amount_class" 
                                    :key="class_obj.amount_class_id" 
                                    :value="class_obj.amount_class_id"
                                    :selected="class_obj.amount_class_id == data.amount_class_id"
                                >
                                    {{ class_obj.amount_class_name }}
                                </option>
                            </select>
                        </div>
                        <div class="col-12 text-start">
                            <label for="record_time" class="form-label">日期</label>
                            <input type="date" class="form-control" id="record_time" placeholder="選擇日期時間" :value="format_local_date(data.record_time)" @change="edit_record_date" :max="(new Date()).toJSON().substr(0,10)" required>
                        </div>
                        <div class="col-12">
                            <hr/>
                        </div>
                        <div class="col-12">
                            <button type="button" class="btn btn-outline-success me-2" @click="save_edit_data()">儲存</button>
                            <button type="button" class="btn btn-outline-secondary">
                                <router-link to="/" class="link">取消</router-link>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Navbar from '../common/Navbar.vue'

import axios from 'axios';

export default {
    name: 'EditItem',
    components: {
        Navbar
    },
    props: {
        can_id: [Number, String],
        item_id: [Number, String]
    },
    data() {
        return {
            can_items: {},
            amount_class: {},
            data: {
                save_can_id: 1,
                item_name: "",
                amount: 0,
                amount_type: "收入",
                amount_class_id: 1,
                record_time: this.format_local_date(new Date())
            }
        }
    },
    created() {
        // 判斷是否要撈既有的紀錄出來
        if(this.item_id && this.can_id){
            this.get_exist_record(this.can_id, this.item_id);
        }

        this.get_all_exist_can();
        this.get_all_amount_class();
    },
    mounted() {
        // 移除殘留的 modal 背景
        let modal_bg = document.getElementsByClassName("modal-backdrop");
        if(modal_bg.length > 0){
            modal_bg[0].remove();
        }
        document.getElementsByTagName("body")[0].classList.remove("modal-open");
    },
    methods: {
        // 取得所有既有的零錢罐
        get_all_exist_can() {
            axios
            .get('https://cashcan.000webhostapp.com/Can/')
            .then((response) => {
                // 檢查是否有資料
                // 重置
                this.can_items = {}
                if(response.data.length > 0){
                    for(let i in response.data){
                        this.can_items[i] = {
                            "can_id": response.data[i].can_id,
                            "can_name": response.data[i].can_name,
                        }
                    }
                }
            })
        },
        // 取得所有既有的項目分類
        get_all_amount_class() {
            axios
            .get('https://cashcan.000webhostapp.com/AmountClass/')
            .then((response) => {
                // 檢查是否有資料
                // 重置
                this.amount_class = {}
                if(response.data.length > 0){
                    for(let i in response.data){
                        this.amount_class[i] = {
                            "amount_class_id": response.data[i].amount_class_id,
                            "amount_class_name": response.data[i].amount_class_name,
                        }
                    }
                }
            })
        },
        // 取得既有的紀錄
        get_exist_record(can_id, item_id){
            axios
            .get(`https://cashcan.000webhostapp.com/CanDetail/${can_id}/${item_id}/`)
            .then((response) => {
                this.data.save_can_id = response.data.can_id;
                this.data.item_id = response.data.item_id;
                this.data.item_name = response.data.item_name;
                this.data.amount_class_id = response.data.amount_class_id;
                this.data.amount_type = response.data.amount_type;
                this.data.amount = response.data.amount;
                this.data.record_time = response.data.record_time;
            })
        },
        // 格式化日期(塞入日期輸入框中的)
        format_local_date(value) {
            let date = new Date(value);
            
            return `${date.getFullYear()}-${(date.getMonth() + 1 + "").padStart(2,0)}-${(date.getDate() + "").padStart(2,0)}`;
        },
        // 儲存編輯後的資料
        save_edit_data() {

            if(!document.getElementById("edit_form").reportValidity()){
                return;
            }

            // 確保送出的值與選擇的值是一樣的
            if(this.data.save_can_id != document.getElementById("exist_can").value){
                this.data.save_can_id = document.getElementById("exist_can").value;
            }

            if(this.data.save_can_id != document.getElementById("amount_class").value){
                this.data.amount_class_id = document.getElementById("amount_class").value;
            }

            let form_data = new FormData();
            
            form_data.append("can_id", this.data.save_can_id);
            form_data.append("item_name", this.data.item_name);
            form_data.append("amount", this.data.amount);
            form_data.append("item_id", this.item_id ? this.item_id : "NULL");
            form_data.append("amount_type", this.data.amount_type);
            form_data.append("amount_class_id", this.data.amount_class_id);
            form_data.append("record_time", this.data.record_time);

            axios
            //.post('http://localhost:520/cashcan_server/CanDetail/edit/', form_data)
            .post('https://cashcan.000webhostapp.com/CanDetail/edit/', form_data)
            .then((response) => {

                if(response.data.effect_row > 0){
                    alert("編輯完成");
                }else{
                    alert("編輯失敗");
                }

                window.location.href = "/";
            })

        },
        // 更新日期
        edit_record_date(event) {
            this.data.record_time = event.target.value;
        },
        // 更新分類
        edit_amount_class(event) {
            this.data.amount_class_id = event.target.value;
        },
        // 更新金額
        edit_amount(event) {
            this.data.amount = event.target.value;
        },
        // 更新收入/支出
        edit_amount_type(event){
            this.data.amount_type = event.target.value;
        },
        // 更新名稱
        edit_item_name(event){
            this.data.item_name = event.target.value;
        },
        // 更新紀錄的零錢罐
        edit_can(event){
            this.data.save_can_id = event.target.value;
        }
    }
}
</script>