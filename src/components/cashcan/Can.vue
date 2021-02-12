<template>
    <div>
        <div class="row">
            <div class="col-9 fw-light d-flex">
                {{ can_name }}
            </div>
            <div class="col-2">
                <i class="far fa-list-alt pointer fs-4" title="查看明細" @click="show_can_detail(can_id, can_name)"></i>
            </div>
            <div class="col-1">
                <i class="far fa-edit pointer" title="編輯" @click="edit_can(can_id, can_name)"></i>
            </div>
        </div>
        <hr/>
    </div>
</template>

<script>

import axios from 'axios';
import BasicMixin from '../Mixin/BasicMixin.vue';

export default {
    name: 'Can',
    data() {
        return {
            modal_title: "",
            items: {}
        }
    },
    mixins: [BasicMixin],
    props: {
        can_id: String,
        can_name: String
    },
    methods: {
        show_can_detail(can_id, can_name) {
            axios
            .get(`${this.request_url}CanDetail/${can_id}/`)
            .then((response) => {
                this.modal_title = `${can_name} 明細`
                // 檢查是否有資料
                if(response.data.length > 0){

                    this.items = {};
                    
                    for(let i in response.data){
                        this.items[i] = {
                            "can_id": response.data[i].can_id,
                            "item_id": response.data[i].item_id,
                            "item_name": response.data[i].item_name,
                            "amount": response.data[i].amount,
                            "amount_type": response.data[i].amount_type,
                            "record_time": response.data[i].record_time,
                            "modify_date": response.data[i].modify_date
                        }
                    }

                    this.$emit('render_detail', {
                        items: this.items, 
                        modal_title: this.modal_title
                    });
                }else{
                    this.items = null;
                    this.$emit('render_detail', {
                        items: this.items, 
                        modal_title: this.modal_title
                    });
                }
            })
        },
        edit_can(can_id, can_name){
            this.$emit('edit_can', {
                can_id: can_id, 
                can_name: can_name
            });
        }
    }
}

</script>