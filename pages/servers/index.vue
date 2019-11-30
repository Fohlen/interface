<template>
    <div>
        <div class="container mx-auto py-8 flex justify-between">
            <nuxt-link to="/" class="no-underline">
                <Logo small label="Multiplayer" />
            </nuxt-link>
        </div>
        <div class="container mx-auto p-8 text-white bg-background w-full">
            test
        </div>
    </div>
</template>

<script>
import Logo from '~/components/Logo'
export default {
    components: { Logo }
}
</script>

<style>

</style>
