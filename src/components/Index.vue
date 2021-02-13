<template>
    <div class="root">
        <Navbar title="Cash Can"></Navbar>
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

export default {
  name: 'Index',
  components: {
    Navbar,
    CanContainer
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

</style>