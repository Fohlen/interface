<template>
    <div class="h-full">
        <div class="container mx-auto py-8 flex justify-between">
            <nuxt-link to="/" class="no-underline">
                <Logo small flip-font-size label="Editor | Assets Manager" />
            </nuxt-link>
        </div>
        <Tabs class="container mx-auto">
            <div slot="tabs" class="flex">
                <TabLink to="/assets/entities">Entities</TabLink>
                <TabLink to="/assets/models">Models</TabLink>
                <TabLink to="/assets/textures">Textures</TabLink>
                <TabLink to="/assets/maps">Maps</TabLink>
                <TabLink to="/assets/prefabs">Prefabs</TabLink>
            </div>
        </Tabs>
        <div class="container mx-auto p-8 text-white bg-background w-full flex flex-wrap">
            <nuxt-child />
        </div>
    </div>
</template>

<script>
import Logo from '~/components/Logo'
import Tabs from '~/components/Tabs'
import TabLink from '~/components/TabLink'
export default {
    components: { Logo, Tabs, TabLink },
    middleware({ redirect, route }) {
        console.log(route)
        if (route.path == '/assets') redirect('/assets/entities')
    },
}
</script>
