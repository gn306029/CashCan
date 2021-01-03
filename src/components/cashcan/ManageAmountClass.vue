<template>
    <div class="root">
        <Navbar title="Cash Can"></Navbar>
        <div class="container-fluid p-4">
            <div class="manager">
                <!--<div class="row text-start">
                    <div class="col-12">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="/">首頁</a></li>
                                <li class="breadcrumb-item active" aria-current="page">管理分類</li>
                            </ol>
                        </nav>
                    </div>
                </div>-->
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
                    <div class="row">
                        <div class="col-4">
                            <strong>名稱</strong>
                        </div>
                        <div class="col-4">
                            <strong>
                                項目總計
                                <i 
                                    class="far fa-question-circle"
                                    title="目前所有零錢罐中使用該分類的項目總計"
                                ></i>
                            </strong>
                        </div>
                        <div class="col-4 row"></div>
                    </div>
                    <hr/>
                    <div v-for="class_obj in amount_class" :key="class_obj.amount_class_id">
                        <AmountClass 
                            :amount_class_id="class_obj.amount_class_id"
                            :amount_class_name="class_obj.amount_class_name"
                            :item_count="class_obj.item_count"
                            v-on:show_edit_modal="show_edit_modal"
                        >
                        </AmountClass>
                    </div>
                    <EditAmountClass
                        :amount_class_id = "select_amount_class_id"
                        :amount_class_name = "select_amount_class_name"
                        v-on:close_edit_modal="close_edit_modal"
                        v-on:edit_amount_class_name="edit_amount_class_name"
                        v-on:reload_amount_class="reload_amount_class"
                    >
                    </EditAmountClass>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import Navbar from '../common/Navbar.vue'
import AmountClass from '../cashcan/AmountClass.vue'
import EditAmountClass from '../cashcan/EditAmountClass.vue'
import * as bootstrap from 'bootstrap'

export default {
    name: 'ManageAmountClass',
    components: {
        Navbar,
        AmountClass,
        EditAmountClass
    },
    data() {
        return {
            amount_class: {},
            select_amount_class_id: '',
            select_amount_class_name: ''
        }
    },
    created() {
        this.get_all_amount_class();
    },
    mounted (){
        this.edit_modal = new bootstrap.Modal(document.getElementById('edit_amount_class'));
    },
    methods: {
        close_edit_modal() {
            this.edit_modal.hide();
        },
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
                            "item_count": response.data[i].item_count,
                        }
                    }
                }
            })
        },
        show_edit_modal(event){
            this.select_amount_class_id = event.amount_class_id;
            this.select_amount_class_name = event.amount_class_name;

            this.edit_modal.show();
        },
        edit_amount_class_name(event) {
            this.select_amount_class_name = event.amount_class_name;
        },
        reload_amount_class() {
            this.get_all_amount_class();
        },
        create_amount_class() {
            this.show_edit_modal({
                amount_class_id: "insert",
                amount_class_name: ""
            });
        }
    }
}
</script>

<style>

.manager {
    max-width: 600px;
    margin: auto;
}

.class_container {
    min-height: 400px;
    max-height: 400px;
    border-bottom: solid 1px #c3c3c3;
    padding: 1rem;
    overflow-y: scroll;
    word-break: break-word;
}

@media (max-width: 575px) {
    .add_class { 
        text-align: left !important;
    }
}

</style>