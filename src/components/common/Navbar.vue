<template>
    <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">{{ title }}</span>
        </div>
        <div class="collapse navbar-collapse" id="navbarNav">
        </div>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
      title: String
  }
}
</script>