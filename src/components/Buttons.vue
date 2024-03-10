<script setup>
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
    colors: Array
})

const animateButton = (event, color) => {
    event.target.classList.add('animate')
    event.target.addEventListener('animationend', () => {
        event.target.classList.remove('animate')
    }, { once: true })
    store.commit('changeColor', color)
}
</script>

<template>
    <div id="buttons">
        <button v-for="color in props.colors" :key="color" class="color-button" :class="color" @click="event => animateButton(event, color)">
            &nbsp;
        </button>
    </div>
</template>