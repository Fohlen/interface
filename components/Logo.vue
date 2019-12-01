<template>
    <div class="flex items-center text-shadow-dark">
        <img src="~/assets/images/logo.png" :class="small ? 'w-16 mr-4' : 'w-24 mr-8'">
        <div class="text-left flex flex-col uppercase text-white font-bold">
            <span class="tracking-wider" :class="titleFontSize">Inexor</span>
            <small class="text-purple" :class="subtitleFontSize" v-if="label" v-html="label" />
            <slot name="label" />
        </div>
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        small: Boolean,
        flipFontSize: Boolean,
        label: {
            type: String,
            default: () => 'Open Next Generation FPS Sandbox'
        },
    },
    computed: {
        fontSizes() {
            const sizes = this.small ? ['text-xl', 'text-lg'] : ['text-2xl', 'text-lg']
            if (this.flipFontSize) return sizes.reverse()
            return sizes
        },
        titleFontSize() {
            return this.fontSizes[0]
        },
        subtitleFontSize() {
            return this.fontSizes[1]
        }
    }
}
</script>
