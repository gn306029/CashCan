<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>

html,
body {
    margin: 0;
    width: 100%;
    height: 100%;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#can_detail_container {
    max-height: 250px;
    min-height: 250px;
    overflow-y: scroll;
    overflow-x: scroll;
}

.pointer {
    cursor: pointer;
}

.icon {
    max-width: 15px;
    min-width: 15px;
}

.link {
    color: inherit;
    text-decoration: none;
}

.detail-window {
    min-height: 200px;
    max-height: 200px;
    overflow-y: scroll;
    position: relative;
}

.detail-window:after {
    content: "";
    position: relative;
}

/* 零錢罐明細的寬度設定 */
.detail {
    min-width: 600px;
}

/* scroll bar */
/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

</style>