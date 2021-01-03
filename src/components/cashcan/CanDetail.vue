<template>
    <div>
        <div class="modal fade" id="can_detail_modal" tabindex="-1" aria-labelledby="title" aria-hidden="False">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-left" id="title">{{ curr_modal_title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close_modal()"></button>
                </div>
                <div class="modal-body">
                    <div class="detail-window">
                        <div class="row text-center detail">
                            <div class="col-1 m-auto"></div>
                            <div class="col-1 m-auto"></div>
                            <div class="col-1 m-auto"></div>
                            <div class="col-3 m-auto">名稱</div>
                            <div class="col-2 m-auto">金額</div>
                            <div class="col-2 m-auto">時間</div>
                            <div class="col-2 m-auto">分類</div>
                        </div>
                        <div v-if="curr_items" class="detail">
                            <div class="row py-2" v-for="item in curr_items" :key="item.item_id">
                                <div class="col-1" v-if="item.amount_type === '收入'">
                                    <img class="icon" src="../../assets/deposit.svg" alt="收入" title="收入">
                                </div>
                                <div class="col-1" v-else-if="item.amount_type === '支出'">
                                    <img class="icon" src="../../assets/withdrawal.svg" alt="支出" title="支出">
                                </div>
                                <div class="col-1">
                                    <router-link :to="{ name: 'NewItem', params: { can_id:item.can_id, item_id:item.item_id }}" :can_id="item.can_id" :item_id="item.item_id">
                                        <i class="far fa-edit icon pointer" title="編輯"></i>
                                    </router-link>
                                </div>
                                <div class="col-1">
                                    <i class="far fa-trash-alt pointer" title="刪除紀錄" @click="delete_item(item.item_id, item.item_name)"></i>
                                </div>
                                <div class="col-3 m-auto">{{ item.item_name }}</div>
                                <div class="col-2 m-auto">{{ item.amount }}</div>
                                <div class="col-2 m-auto">{{ format_date(item.record_time) }}</div>
                                <div class="col-2 m-auto">{{ item.amount_class_name }}</div>
                            </div>
                        </div>
                        <div class="row py-2" v-else>
                            <div class="col-12">
                                <span>目前還沒有任何紀錄喔 σ`∀´)σ</span>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div class="row">
                        <div class="col-12">收入：{{ income }}</div>
                        <div class="col-12" style="color: red;">支出：{{ expenses }}</div>
                        <div class="col-12" v-bind:style=" total < 0 ? 'color: red;' : 'color: black;' ">總計：{{ total }}</div>
                    </div>
                </div>
                <div class="modal-footer">
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
    name: 'CanDetail',
    props: {
        curr_modal_title: String,
        curr_items: Object
    },
    data() {
        return {
            income: 0,
            expenses: 0,
            total: 0
        }
    },
    mounted() {
        this.caluation_all()
    },
    methods: {
        close_modal() {
            this.$emit("close_modal")
        },
        // 格式化日期
        format_date(value) {
            let date = new Date(value);
            
            return date.toLocaleDateString();
        },
        // 計算總收入、總支出、總計
        caluation_all() {
            let income = 0;
            let expenses = 0;
            let total = 0;
            // 暫時先用 $parent 去 call, 因為資料有正確渲染, 但這裡讀出來的 curr_items 卻是不正確的
            // 目前懷疑是 $ref 的關係 之後再研究
            for(let i in this.$parent.items){
                if(this.$parent.items[i].amount_type == "收入"){
                    income += this.$parent.items[i].amount
                }else if(this.$parent.items[i].amount_type == "支出"){
                    expenses += this.$parent.items[i].amount
                }
            }

            total = income - expenses

            return {
                "income": income,
                "expenses": expenses,
                "total": total
            }
        },
        // 更新收入/支出/總計
        update_all() {
            let result = this.caluation_all();
            this.income = result.income
            this.expenses = result.expenses
            this.total = result.total
        },
        // 重製收入/支出/總計
        reset_all() {
            this.income = 0;
            this.expenses = 0;
            this.total = 0;
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
                    // 檢查是否有資料變動
                    this.close_modal();

                    if(response.data.effect_row > 0){
                        alert("移除完成");
                    }else{
                        alert("移除失敗");
                    }
                })
            }
        }
    }
}
</script>

<style>
.modal-body {
    word-wrap: break-word;
}
</style>