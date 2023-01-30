<template>
  <div class="container">
    <router-view />
  </div>
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

@import url("https://fonts.googleapis.com/css2?family=Sarabun:wght@300&display=swap");

#app {
  --tblr-font-sans-serif: Sarabun, sans-serif !important;
  font-family: Sarabun, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
}
.dropdown-menu.show {
  display: block !important;
}
</style>
