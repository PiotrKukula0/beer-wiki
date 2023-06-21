<template>
    <div v-if="isLoading">Loading...</div>

    <div v-else-if="beer">
        <h2>{{ beer.name }}</h2>
        <p>{{ beer.tagline }}</p>
        <p>{{ beer.description }}</p>
        <p>First Brewed: {{ beer.first_brewed }}</p>
        <p>ABV: {{ beer.abv }}</p>
        <p>IBU: {{ beer.ibu }}</p>
        <p>Target FG: {{ beer.target_fg }}</p>
        <p>Target OG: {{ beer.target_og }}</p>
        <p>EBC: {{ beer.ebc }}</p>
        <p>SRM: {{ beer.srm }}</p>
        <p>PH: {{ beer.ph }}</p>
        <p>Attenuation Level: {{ beer.attenuation_level }}</p>
        <p>Volume: {{ beer.volume.value }} {{ beer.volume.unit }}</p>
        <p>
            Boil Volume: {{ beer.boil_volume.value }}
            {{ beer.boil_volume.unit }}
        </p>
        <p>Ingredients: {{ beer.ingredients }}</p>
        <p>Food Pairing: {{ beer.food_pairing }}</p>
        <p>Brewers Tips: {{ beer.brewers_tips }}</p>
        <p>Contributed By: {{ beer.contributed_by }}</p>
    </div>

    <div v-else>Beer not found.</div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            beer: null,
            isLoading: true,
        }
    },
    created() {
        const beerId = this.$route.params.id
        this.fetchBeer(beerId)
    },
    methods: {
        async fetchBeer(beerId) {
            try {
                const response = await axios.get(
                    `https://api.punkapi.com/v2/beers/${beerId}`
                )
                this.beer = response.data[0]
            } catch (error) {
                console.error(error)
            } finally {
                this.isLoading = false
            }
        },
    },
}
</script>
