<template>
    <div>
        <h2 class="mb-4">Beer Index</h2>

        <div class="filters mb-3">
            <input v-model="searchQuery" placeholder="Search beer by name" class="form-control" />
            <input v-model.number="filterIBU" type="number" placeholder="Filter by IBU" class="form-control" />
            <button @click="filterBeers" class="btn btn-primary">Filter</button>
            <button @click="clearFilters" class="btn btn-secondary">Reset</button>
        </div>

        <div class="beer-list row">
            <template v-if="displayedBeers.length > 0">
                <router-link v-for="beer in displayedBeers" :key="beer.id" :to="`/beers/${beer.id}`"
                    class="beer-item col-md-8">
                    <div class="beer-name">{{ beer.name }}</div>
                    <div class="beer-ibu">IBU: {{ beer.ibu }}</div>
                    <div class="beer-food-pairing">
                        Food Pairing: {{ beer.food_pairing && beer.food_pairing.length }}
                    </div>
                </router-link>
            </template>
            <div v-else>No beers found.</div>
        </div>

        <div v-if="isLoading">Loading...</div>

        <div class="pagination mt-3">
            <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-secondary">Prev</button>
            <span v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }" @click="goToPage(page)"
                class="page-link">{{ page }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-secondary">Next</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import main from '../assets/main.scss';

export default {
    data() {
        return {
            beers: [],
            displayedBeers: [],
            searchQuery: '',
            filterIBU: null,
            currentPage: 1,
            perPage: 25,
            totalPages: 4,
            isLoading: true,
        }
    },
    created() {
        this.fetchBeers()
    },
    methods: {
        async fetchBeers() {
            try {
                const response = await axios.get('https://api.punkapi.com/v2/beers')
                this.beers = response.data
                this.filterBeers()
            } catch (error) {
                console.error(error)
            } finally {
                this.isLoading = false
            }
        },
        filterBeers() {
            let filteredBeers = this.beers

            if (this.searchQuery) {
                filteredBeers = filteredBeers.filter((beer) =>
                    beer.name.toLowerCase().includes(this.searchQuery.toLowerCase())
                )
            }

            if (this.filterIBU !== null) {
                filteredBeers = filteredBeers.filter((beer) => beer.ibu === this.filterIBU)
            }

            this.currentPage = 1
            this.displayedBeers = this.paginate(filteredBeers, this.currentPage, this.perPage)
        },
        paginate(array, page, perPage) {
            const start = (page - 1) * perPage
            const end = start + perPage
            return array.slice(start, end)
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--
                this.displayedBeers = this.paginate(this.beers, this.currentPage, this.perPage)
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++
                this.displayedBeers = this.paginate(this.beers, this.currentPage, this.perPage)
            }
        },
        goToPage(page) {
            this.currentPage = page
            this.displayedBeers = this.paginate(this.beers, this.currentPage, this.perPage)
        },
        clearFilters() {
            this.searchQuery = ''
            this.filterIBU = null
            this.filterBeers()
        },
    },
}
</script>

<style lang="scss">
.beer-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
}

.beer-item {
    border: 1px solid #ccc;
    padding: 20px;
}

.beer-name {
    font-weight: bold;
}

.beer-ibu {
    font-size: 14px;
    margin-bottom: 10px;
}

.beer-food-pairing {
    font-size: 14px;
    margin-bottom: 10px;
}

.filters {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10px;
}

.filters input,
.filters button {
    margin-right: 10px;
}

.pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 10px;
}

.pagination button,
.pagination span {
    margin: 0 5px;
    cursor: pointer;
}

.pagination .active {
    font-weight: bold;
}
</style>
