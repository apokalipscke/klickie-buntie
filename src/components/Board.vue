<script setup>
import {ref, watch, onMounted, computed} from "vue";
import { useStore } from 'vuex';
import confetti from 'canvas-confetti'

const store = useStore()
const newColor = computed(() => store.state.newColor)

const props = defineProps({
    colors: Array
})

const getRandomColor = () => {
    return props.colors[Math.floor(Math.random() * props.colors.length)]
}

const board = ref(
    Array.from({length: 13}, () => Array.from({length: 13}, () => getRandomColor()))
)

onMounted(() => {
    watch(() => newColor.value, (newColor) => {
        fill4(6, 6, getPixel(6, 6), newColor)
    })
})

const fill4 = (x, y, oldColor, newColor) => {
    if (getPixel(x, y) === oldColor) {
        setPixel(x, y, newColor)
        fill4(x, y + 1, oldColor, newColor)
        fill4(x, y - 1, oldColor, newColor)
        fill4(x + 1, y, oldColor, newColor)
        fill4(x - 1, y, oldColor, newColor)
    }
}

const getPixel = (x, y) => {
    if (x < 0 || x >= 13 || y < 0 || y >= 13) {
        return null
    }
    return board.value[y][x]
}

const setPixel = (x, y, color) => {
    if (x < 0 || x >= 13 || y < 0 || y >= 13) {
        return
    }
    board.value[y][x] = color
}

const isGameWon = computed(() => {
    const allCells = board.value.flat()
    const gameWon = allCells.every(cell => cell === newColor.value)
    if (gameWon) {
        confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 }
        })
    }
    return gameWon
})
</script>

<template>
    <div id="board">
        <div class="board-row" v-for="(row, rowIndex) in board" :key="rowIndex">
            <div class="board-cell"
                 v-for="(color, colorIndex) in row"
                 :class="[color, {'center-piece': rowIndex === 6 && colorIndex === 6}]"
                 :key="colorIndex"
            >&nbsp;</div>
        </div>
    </div>

    <div v-if="isGameWon" class="winner-message">
        Congratulations, you have won the game!
    </div>
</template>

<style scoped>
.center-piece {
    border: 3px solid white;
}

.winner-message {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin: 20px 0;
}
</style>