<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js แต้แว้ด App" />
    <button @click="sendboi">hehe</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  mounted() {
    // this.$socket.on("foralert", () => {
    //   alert("sock_connected");
    // });
    this.$socket.on("boi", (data) => {
      alert("Boi " + data.name);
    });
  },
  methods: {
    sendboi() {
      this.$socket.emit("hehe");
    },
  },
};
</script>
