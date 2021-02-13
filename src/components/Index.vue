<template>
    <div class="root">
        <Navbar title="Cash Can" :is_login=is_login></Navbar>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <CanContainer class="col-12 col-md-7">
                </CanContainer>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from './common/Navbar.vue'
import CanContainer from './cashcan/CanContainer.vue'
import BasicMixin from './Mixin/BasicMixin.vue';

export default {
  name: 'Index',
  components: {
    Navbar,
    CanContainer
  },
  mixins: [BasicMixin],
  async created() {
    await this.check_is_login();
    
    if(!this.is_login){
      location.href = "/Login";
    }
  }
}
</script>

<style>

@font-face {
    font-family: "Montserrat";
    src: url("../assets/font/Montserrat-Light.ttf");
}

* {
  font-family: "Montserrat";
}

.mr-auto {
  margin-right: auto !important;
}

.ml-auto {
  margin-left: auto !important;
}

</style>