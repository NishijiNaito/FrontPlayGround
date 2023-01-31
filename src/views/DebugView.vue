<template>
  <div>
    <pre
      >{{ rooms }}
</pre
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: null,
    };
  },
  created() {
    this.$socket.emit("deb");
  },
  mounted() {
    this.$socket.on("debinfo", (data) => (this.rooms = data));
  },
};
</script>

<style>
</style>