<template>
    <div class="h-full">
        <DialogFrame v-model="showTextureDialog">
            <img :src="`https://picsum.photos/id/${selectedTexture}/800/800`" class="responsive" alt="">
        </DialogFrame>
        <div class="container mx-auto py-8 flex justify-between">
            <nuxt-link to="/" class="no-underline">
                <Logo small label="Editor | Assets Manager" />
            </nuxt-link>
        </div>
        <Tabs class="container mx-auto">
            <div slot="tabs" class="flex">
                <TabLink to="/">Entities</TabLink>
                <TabLink to="/">Models</TabLink>
                <TabLink to="/">Textures</TabLink>
                <TabLink to="/">Maps</TabLink>
                <TabLink to="/">Prefabs</TabLink>
            </div>
        </Tabs>
        <div class="container mx-auto p-8 text-white bg-background w-full flex flex-wrap">
            <div v-for="texture in 6" :key="texture" class="w-1/5">
                <div class="bg-gray-darkest cursor-pointer p-2 m-4 rounded relative" @click="showTexture(texture)">
                    <div class="overflow-hidden relative">
                        <img :src="`https://picsum.photos/id/${texture}/800/800`" class="responsive" alt="">
                        <div class="bg-gray-darkest-faded absolute pin-b pin-l p-2 w-full">
                            Texture {{ texture }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DialogFrame from '~/components/DialogFrame'
import Logo from '~/components/Logo'
import Tabs from '~/components/Tabs'
import TabLink from '~/components/TabLink'
export default {
    components: { DialogFrame, Logo, Tabs, TabLink },
    data: () => ({
        showTextureDialog: false,
        selectedTexture: null,
    }),
    methods: {
        showTexture(texture) {
            this.showTextureDialog = true
            this.selectedTexture = texture
        }
    }
}
</script>

<style lang="stylus">



</style>
