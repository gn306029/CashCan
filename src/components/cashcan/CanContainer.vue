<template>
    <div class="can_detail rounded my-4 p-2">
        <div class="row">
            <div class="col-12 mb-4 row">
                <div class="col-12 col-md-4 text-start mb-2 mb-sx-0">
                    <button class="btn btn-outline-primary me-3" @click="create_can()">
                        <i class="far fa-file pe-1"></i>新增零錢罐
                    </button>
                </div>
                <div class="col-12 col-md-4 text-start mb-2 mb-sx-0">
                    <button class="btn btn-outline-info me-3">
                        <router-link to="/add_item/" class="link"><i class="far fa-edit pe-1"></i>新增紀錄</router-link>
                    </button>
                </div>
            </div>
        </div>
        <div class="p-3">
            <div class="row">
                <div class="col-9 fw-bold d-flex">
                    名稱
                </div>
            </div>
            <hr/>
            <div id="can_detail_container">
                <div v-for="detail in can_detail" :key="detail.can_id">
                    <Can 
                        :can_id="detail.can_id"
                        :can_name="detail.can_name"
                        :request_url="request_url"
                        v-on:render_detail="update_modal"
                        v-on:edit_can="edit_can"
                    >
                    </Can>
                </div>
            </div>
        </div>
        <CanDetail 
            :curr_items="this.items" 
            :curr_modal_title="this.modal_title"
            :request_url="request_url"
            v-on:close_modal="close_modal"
            ref="CanDetail"
        >
        </CanDetail>
        <EditCan 
            :can_id=select_can_id
            :can_name=select_can_name
            :request_url=request_url
            v-on:close_edit_modal="close_edit_modal"
            v-on:edit_can_name="edit_can_name"
            v-on:reload_can="reload_can"
        >
        
        </EditCan>
    </div>
</template>

<script>

import axios from 'axios';
import Can from './Can.vue';
import CanDetail from './CanDetail.vue';
import EditCan from './EditCan.vue';
import BasicMixin from '../Mixin/BasicMixin.vue';
import * as bootstrap from 'bootstrap'

export default {
    name: 'CanContainer',
    components: {
        Can,
        CanDetail,
        EditCan
    },
    mixins: [BasicMixin],
    props: {
        request_url: String
    },
    data () {
        return {
            modal_title: "",
            items: {},
            can_detail: {
                1: {
                    "can_id": "1",
                    "can_name": "還沒有建立任何零錢罐 _(:3 」∠ )_"
                }
            },
            modal: null,
            select_can_id: null,
            select_can_name: null
        }
    },
    created () {
        this.fetchData()
    },
    mounted (){
        this.modal = new bootstrap.Modal(document.getElementById('can_detail_modal'));
        this.edit_modal = new bootstrap.Modal(document.getElementById('edit_can'));
        this.items = {};
    },
    watch: {
        // call again the method if the route changes
        '$route': 'fetchData'
    },
    methods: {
        fetchData () {
            axios
            .get(`${this.request_url}Can/`)
            .then((response) => {
                // 檢查是否有資料
                this.can_detail = {}
                
                if(response.data.length > 0){
                    for(let i in response.data){
                        this.can_detail[i] = {
                            "can_id": response.data[i].can_id,
                            "can_name": response.data[i].can_name,
                        }
                    }
                }
            })
        },
        update_modal(event) {
            
            this.$refs.CanDetail.reset_all();
            this.items = {};

            this.modal_title = event.modal_title;
            // 檢查 items 是否為 null
            if(event.items){
                for(let i in event.items){
                    this.items[i] = event.items[i];
                }

                this.$refs.CanDetail.update_all();
            }else{
                this.items = null;
            }

            this.modal.show();
        },
        close_modal() {
            this.modal.hide();
        },
        close_edit_modal(){
            this.edit_modal.hide();
        },
        edit_can(event) {
            this.select_can_id = event.can_id;
            this.select_can_name = event.can_name;
            
            this.edit_modal.show();
        },
        edit_can_name(event){
            this.select_can_name = event.can_name;
        },
        reload_can(){
            this.fetchData();
        },
        create_can(){
            this.edit_can({
                can_id: "insert",
                can_name: ""
            })

            this.edit_modal.show();
        }
    }
}
</script>