<template>
    <nuxt-link :to="to" exact-active-class="tab-link--active" class="tab-link">
        <slot />
    </nuxt-link>
</template>

<script>
export default {
    props: {
        to: String
    }
}
</script>

<style lang="stylus" scoped>
.tab-link
    @apply relative mr-5 bg-purple-darkest-faded py-2 px-4 cursor-pointer no-underline block text-white font-bold transition
    opacity .85
    &:hover
        @apply bg-purple-darker-faded
        &:after
            @apply bg-purple-darker-faded
    &:after
        @apply absolute bg-purple-darkest-faded w-4 pin-t transition
        height calc(100% + .02em)
        clip-path polygon(0 0, 0% 100%, 100% 100%)
        content ""
        left 100%
.tab-link--active
    &:hover
        @apply bg-gray-darkest-faded
        &:after
            @apply bg-gray-darkest-faded
    @apply bg-background
    &:after
        @apply bg-background
</style>
