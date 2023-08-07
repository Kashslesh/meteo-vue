<template>
    <div class="py-3">
        <input type="text" v-model="city" class="form-control mx-auto px-2" v-on:input="requestCity"
               placeholder="Choose a city...">
    </div>
    <ul class="m-0 p-0 rounded-3">
        <li v-for="item in listOfCity" class="list-group-item list-group-item-light p-2" :key="item.id">
            <button class="btn w-100 text-start border-0 btn-outline-primary" @click="selectCity" :value="item.city">{{ item.city }}</button>
        </li>
    </ul>
</template>

<script>
import axios from "axios";
import {autocomplete} from "@/requests/autocomplete";

export default {
    emits:['isLoading','citySelected','isError'],
    data() {
        return {
            city: '',
            listOfCity : [],
            isError : false,
        }
    },
    methods: {
        request(city) {
            let self = this
            self.$emit('isLoading', {
                isLoading : true,
                clearWeather : null
            })
            axios(autocomplete(city))
                .then(function (response) {
                    response.data.features.map(function (city){
                        self.listOfCity.push({
                            city : city.properties.city ? city.properties.city : city.properties.address_line1,
                            id: city.properties.place_id
                        })
                    })
                    self.$emit('isLoading', false)
                })
                .catch(function (error) {
                    console.log(error)
                    self.isError = true
                    self.$emit('isError', true)
                    self.$emit('isLoading', false)
                })
        },
        selectCity(event){
            this.listOfCity = []
            this.city = event.target.value
            this.$emit('citySelected', event.target.value)
        }},
    computed: {
        requestCity() {
            this.isError = false
            this.$emit('isLoading', true)
            this.$emit('isError', false)
            this.listOfCity = []
            if (this.city.length <=2 || this.city.length === 0) {
                this.$emit('isLoading', false)
                return false
            }
            return this.request(this.city);
        }
    }
}
</script>