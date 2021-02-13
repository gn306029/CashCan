<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-light p-2">
        <a class="navbar-brand">{{ title }}</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ml-auto">
                <p v-if="is_login" class="nav-item nav-link active mb-0" id="logout">登出</p>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
      title: String,
      is_login: Boolean
  }
}
</script>

<style>

#logout {
    cursor: pointer;
}

.navbar-default .navbar-collapse,
.navbar-default .navbar-form {
	background-color: white;
	color: black;
}

.navbar-default {
	.navbar-brand,
	.navbar-nav > a {
		color: black;
	}
	.navbar-brand {
		font-weight: 700;
		font-size: 1.25em;
		letter-spacing: 3px;
	}
}

.container-fluid {
	background-color: #fff;
}

.navbar-toggle {
	border: none;
}

.navbar-default .navbar-toggle:focus,
.navbar-default .navbar-toggle:hover {
	background-color: #fff;
}

.navbar-default .navbar-toggle .icon-bar {
	background-color: black;
}
</style>