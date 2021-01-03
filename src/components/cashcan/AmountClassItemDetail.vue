<template>
    <div class="root">
        <Navbar title="Cash Can"></Navbar>
        <div class="container-fluid p-4">
            <div class="manager">
                <div class="row text-start">
                    <div class="col-12">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="/">首頁</a></li>
                                <li class="breadcrumb-item"><a href="/amount_class/">管理分類</a></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ amount_class_name }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div class="row text-start">
                    <div class="col-12 col-sm-8 m-auto">
                        <h3 class="m-0">管理分類</h3>
                    </div>
                    <div class="col-12 col-sm-4 mt-2 mt-sm-0 text-end add_class">

                        <button class="btn btn-outline-primary" @click="create_amount_class()">
                            <i class="far fa-file pe-1"></i>新增分類
                        </button>
                    </div>
                </div>
                <hr/>
                <div class="class_container">
                    <div style="min-width:400px;">
                        <div class="row">
                            <div class="col-2 m-auto">
                                <strong>零錢罐</strong>
                            </div>
                            <div class="col-3 m-auto">
                                <strong>名稱</strong>
                            </div>
                            <div class="col-2 m-auto">
                                <strong>金額</strong>
                            </div>
                            <div class="col-2 m-auto">
                                <strong>時間</strong>
                            </div>
                            <div class="col-3">
                            </div>
                        </div>
                        <hr/>
                        <div
                            class="row"
                            v-for="item in items"
                            :key="item.item_id"
                        >
                            <div class="col-2 m-auto">{{ item.can_name }}</div>
                            <div class="col-3 m-auto">{{ item.item_name }}</div>
                            <div class="col-2 m-auto">{{ item.amount }}</div>
                            <div class="col-2 m-auto">{{ item.record_time }}</div>
                            <div class="col-3 m-auto row">
                                <router-link class="col-6 m-auto" :to="{ name: 'NewItem', params: { can_id:item.can_id, item_id:item.item_id }}" :can_id="item.can_id" :item_id="item.item_id">
                                    <i class="far fa-edit icon pointer" title="編輯"></i>
                                </router-link>
                                <div class="col-6 m-auto">
                                    <i class="far fa-trash-alt pointer" title="刪除紀錄" @click="delete_item(item.item_id, item.item_name)"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import Navbar from '../common/Navbar.vue'

export default {
    name: "AmountClass_ItemDetail",
    props: {
        amount_class_id: [String, Number],
        amount_class_name: String
    },
    data() {
        return {
            items: {}
        }
    },
    components: {
        Navbar
    },
    created() {
        this.get_amount_class_item();
    },
    methods: {
        // 取得 amount class 的 item
        get_amount_class_item() {
            axios
            .get(`https://cashcan.000webhostapp.com/AmountClass/item/${this.amount_class_id}/`)
            .then((response) => {
                // 檢查是否有資料
                // 重置
                this.items = {}
                if(response.data.length > 0){
                    for(let i in response.data){
                        this.items[i] = {
                            "can_id": response.data[i].can_id,
                            "can_name": response.data[i].can_name,
                            "item_id": response.data[i].item_id,
                            "item_name": response.data[i].item_name,
                            "amount": response.data[i].amount,
                            "record_time": response.data[i].record_time,
                        }
                    }
                }
            })
        },
        // 移除紀錄
        delete_item(item_id, item_name) {
            const confirm_delete = confirm(`確定移除 ${item_name}?`);
            
            if(confirm_delete){
                let form_data = new FormData();
            
                form_data.append("item_id", item_id);

                axios
                .post('https://cashcan.000webhostapp.com/CanDetail/delete/', form_data)
                .then((response) => {
                    if(response.data.effect_row > 0){
                        alert("移除完成");
                        this.get_amount_class_item();
                    }else{
                        alert("移除失敗");
                    }
                })
            }
        }
    }
}
</script>