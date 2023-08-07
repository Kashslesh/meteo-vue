<template>
    <div class="container col-md-4 mx-auto h-100 position-relative justify-content-center main">
        <AppInput v-on:isLoading="spinnerShow" v-on:isError="showError" v-on:citySelected="cityValue"/>
        <Spinner v-if="isLoading && !error"/>
        <error v-if="error"/>
        <Weather v-if="weatherData && !error" :weather-data="weatherData"/>
    </div>
</template>

<script>
import AppInput from "@/components/AppInput.vue";
import Spinner from "@/components/Spinner.vue";
import axios from "axios";
import {weather} from "@/requests/weather";
import Weather from "@/components/Weather.vue";
import Error from "@/components/Error.vue";

export default {
    emits: ['isLoading', 'citySelected', 'isError'],
    data() {
        return {
            isLoading: false,
            cityQuery: '',
            weatherData: null,
            error: false
        }
    },
    components: {Error, Weather, Spinner, AppInput},
    methods: {
        spinnerShow(value) {
            this.isLoading = value.isLoading
            this.weatherData = value.clearWeather
        },
        cityValue(value) {
            this.cityQuery = value
            this.request(this.cityQuery)
        },
        request(value) {
            if (!value) {
                return
            }
            let self = this
            self.isLoading = true
            self.isError = false
            self.weatherData = {}
            axios(weather(value))
                .then(function (response) {
                    self.weatherData = {
                        temp: self.convertTemp(response.data.main.temp),
                        city: response.data.name,
                        weather: response.data.weather[0].main
                    }
                    self.isLoading = false
                })
                .catch(function (error) {
                    self.error = true
                })
        },
        convertTemp(temp) {
            return Math.trunc(temp - 273, 15) + '°C'
        },
        showError(error){
            if (error){
                this.error = true
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.main {
  background: linear-gradient(to right, rgb(89, 193, 115), rgb(161, 127, 224), rgb(93, 38, 193));
}
</style>

