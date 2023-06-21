<template>
    <div v-if="isLoading">Loading...</div>

    <div v-else-if="beer">
        <div class="beer-details">
            <div class="beer-details-left">
                <img :src="beer.image_url" alt="Beer Image" />
            </div>
            <div class="beer-details-right">
                <h2>{{ beer.name }}</h2>
                <p>{{ beer.tagline }}</p>
                <p>IBU: {{ beer.ibu }}</p>
                <p>ABV: {{ beer.abv }}</p>
                <p>{{ beer.description }}</p>
                <div class="beer-food-pairing">
                    <h3>Food Pairing:</h3>
                    <ul>
                        <li v-for="food in beer.food_pairing" :key="food">
                            {{ food }}
                        </li>
                    </ul>
                </div>
                <p>Author: {{ getAuthorName(beer.contributed_by) }}</p>
            </div>
        </div>
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
        getAuthorName(contributedBy) {
            if (contributedBy) {
                const parts = contributedBy.split('<')
                if (parts.length > 0) {
                    return parts[0].trim()
                }
            }
            return ''
        },
    },
}
</script>

<style>
.beer-details {
    display: flex;
    align-items: center;
    justify-content: center;
}

.beer-details img {
    width: 200px;
    height: auto;
    margin-right: 20px;
}

.beer-details-right {
    width: 60%;
}

.beer-food-pairing {
    margin-top: 20px;
}

.beer-food-pairing h3 {
    margin-bottom: 10px;
}

.beer-food-pairing ul {
    list-style: none;
    padding-left: 0;
}

.beer-food-pairing li {
    margin-bottom: 5px;
}
</style>
