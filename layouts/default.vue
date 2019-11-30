<template>
    <div class="h-full">
        <img class="bg-image pin-r pin-t absolute" src="~assets/images/averas.jpg" alt="">
        <GlobalEvents @keyup.esc="returnToMainMenu" />
        <div class="relative h-full">
            <nuxt/>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        loggedIn() {
            return false
        }
    },
    methods: {
        returnToMainMenu() {
            this.$router.push('/')
        }
    }
}
</script>

<style lang="stylus">
    html, body
        background-color black
    .bg-image
        @apply fixed h-full w-full
        filter blur(3px)
        object-fit cover
        object-position center
</style>
