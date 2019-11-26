<template>
    <div>
        <img class="bg-image" src="~assets/images/averas.jpg" alt="">
        <div class="relative">
            <nuxt/>
        </div>
    </div>
</template>

<style lang="stylus">
    html, body
        background-color black
    .bg-image
        position fixed
        filter blur(3px)
        object-fit cover
        object-position center
</style>
