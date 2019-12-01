<template>
    <div class="p-2 relative overflow-hidden">
        <div class="bg-background cursor-pointer transition hover:scale relative image-card flex" :class="big && 'image-card--big'">
            <img :src="src" alt="" class="bg-image">
            <div class="bg-background p-2 mt-16 self-end relative w-full overflow-hidden">
                <strong class="block text-purple text-shadow-dark">{{ label }}</strong>
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: String,
        src: [String, Object],
        big: Boolean,
    }
}
</script>

<style lang="stylus">
    .image-card
        min-height 5em
        &--big
            min-height 8.5em
</style>
