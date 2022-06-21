<template>
  <div id="app">
    <router-view />

    <!-- <div class="navbar">
      <router-link :to="{ path: '/dash-board' }">
        <b-button variant="primary"> DASH BOARD</b-button></router-link
      >
      <router-link :to="{ path: '/create-order' }">
        <b-button variant="primary"> CREATE ORDER</b-button></router-link
      >
    </div> -->
  </div>
</template>

<script>
  export default {};
</script>

<style>
  navbar {
    overflow: hidden;
    background-color: #333;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
