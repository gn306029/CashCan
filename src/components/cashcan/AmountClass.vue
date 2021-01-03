<template>
    <div>
        <div class="row my-2">
            <div class="col-4 fw-light text-center">
                {{ amount_class_name }}
            </div>
            <div class="col-4 text-center">
                {{ item_count }}
            </div>
            <div class="col-4 row">
                <div class="col-6 text-end">
                    <router-link :to="{ name: 'AmountClassItemDetail', params: { amount_class_id:amount_class_id, amount_class_name:amount_class_name }}" class="link" title="查看項目">
                        <i class="far fa-list-alt pointer fs-4" ></i>
                    </router-link>
                </div>
                <div class="col-6 text-end">
                    <i class="far fa-edit pointer" title="編輯" @click="show_edit_modal()"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'AmountClass',
    props: {
        amount_class_id: [String, Number],
        amount_class_name: String,
        item_count: [String, Number]
    },
    methods: {
        show_edit_modal() {
            this.$emit("show_edit_modal",{
                "amount_class_id": this.amount_class_id,
                "amount_class_name": this.amount_class_name
            })
        }
    }
}

</script>