<template>
    <div class="p-2 relative overflow-hidden">
        <div class="bg-background transition hover:scale relative map flex">
            <img :src="map.preview" alt="" class="absolute pin-t pin-l w-full h-full">
            <div class="bg-background p-2 mt-16 self-end relative w-full">
                <strong class="block text-purple text-shadow-dark">{{ map.name }}</strong>
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        map: {
            type: Object,
            default: () => ({
                name: '',
            })
        },
    }
}
</script>

<style lang="stylus">
    .map
        min-height 5em
</style>
