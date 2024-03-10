<script setup>
import Board from "@/components/Board.vue"
import Buttons from "@/components/Buttons.vue"
import {computed} from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6']

const newColor = computed(() => store.state.newColor)
const clicks = computed(() => store.state.clicks)
</script>

<template>
    <h1>klickie buntie</h1>

    <board :colors="colors" :new-color="newColor"/>

    <div class="stats">
        {{ clicks }}
    </div>

    <buttons :colors="colors"/>
</template>

<style scoped>
.stats {
    text-align: center;
    margin: 20px 0;
    font-size: 2rem;
    font-weight: bold;
}

h1 {
    text-align: center;
    margin: 20px 0;
    font-size: 3rem;
    font-weight: bold;
}
</style>