<template>
    <div class="flex items-center text-shadow-dark">
        <img src="~/assets/images/logo.png" :class="small ? 'w-16 mr-4' : 'w-24 mr-8'">
        <div class="text-left flex flex-col uppercase text-white font-bold">
            <span class="tracking-wider" :class="small ? 'text-xl' : 'text-2xl'">Inexor</span>
            <small class="text-lg text-purple" v-if="label" v-html="label" />
            <slot name="label" />
        </div>
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        small: Boolean,
        label: {
            type: String,
            default: () => 'Open Next Generation FPS Sandbox'
        },
    }
}
</script>
