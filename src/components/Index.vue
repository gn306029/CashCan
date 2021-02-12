<template>
    <div class="root">
        <Navbar title="Cash Can"></Navbar>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <CanContainer 
                  class="col-12 col-md-7"
                  :request_url = "request_url"
                >
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
  },
  data() {
    return {
      // request_url: "https://cashcan.000webhostapp.com/"
      request_url: "http://localhost:520/cashcan_server/"
    }
  }
}
</script>
