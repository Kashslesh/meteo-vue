<template>
  <div class="row p-3 text-center text-light box" v-if="weatherData">
      <h2>{{weatherData.city}}</h2>
      <div class="card col-4 mx-auto h-50 my-2 d-flex justify-content-center align-content-center">
          <h3 class="text-dark fw-bold">{{weatherData.temp}}</h3>
      </div>
      <h2>{{weatherData.weather}}</h2>
  </div>
</template>

<script>
export default {
    props :['weatherData'],

}
</script>
<style lang="scss" scoped>
.card{
  min-height: 10vh;
  opacity: 0.7;
}
.box {
  animation: 1s show ease;
}

@keyframes show {
  from { opacity: 0; }
  to { opacity: 1; }
}

</style>