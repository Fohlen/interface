<template>
    <div class="container mx-auto py-16 text-white flex justify-between">
        <Logo />
        <div class="w-1/2 flex flex-col">
            <nuxt-link class="bg-background no-underline my-2 p-4 text-white transition hover:scale" to="/">
                <h3 class="text-lg mb-2">Singleplayer</h3>
            </nuxt-link>
            <nuxt-link class="bg-background no-underline my-2 p-4 text-white transition hover:scale" to="/">
                <h3 class="text-lg mb-2">Multiplayer</h3>
                <div class="flex">
                    <div v-for="map in 3" :key="map" class="bg-background w/1-3 p-8 mr-4">
                        Xenon
                    </div>
                </div>
            </nuxt-link>
            <nuxt-link class="bg-background no-underline my-2 p-4 text-white transition hover:scale" to="editor/entities">
                <h3 class="text-lg mb-2">Entities</h3>
            </nuxt-link>
            <nuxt-link class="bg-background no-underline my-2 p-4 text-white transition hover:scale" to="assets">
                <h3 class="text-lg mb-2">Assets</h3>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
import Logo from '~/components/Logo'
export default {
    components: { Logo }
}
</script>
