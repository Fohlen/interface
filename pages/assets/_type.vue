<template>
    <div class="flex flex-wrap">
        <DialogFrame v-model="showTextureDialog">
            <div class="flex justify-center">
                <img :src="`https://picsum.photos/id/${selectedTexture}/800/800`" class="responsive w-2/3 border-purple border-2" alt="">
                {{ selectedTexture }}
            </div>
        </DialogFrame>
        <ImageCard
            v-for="texture in textures" :key="texture"
            :src="`https://picsum.photos/id/${texture}/800/800`" :label="`${$route.params.type} ${texture}`"
            big class="sm:w-1/2 md:w-1/3 lg:w-1/5" @click.native="showTexture(texture)"
        >
        https://picsum.photos/id/{{ texture }}/800/800
        </ImageCard>
    </div>
</template>

<script>
import DialogFrame from '~/components/DialogFrame'
import ImageCard from '~/components/ImageCard'
export default {
    components: { DialogFrame, ImageCard },
    data: () => ({
        textures: [...Array(14)].map((i, index) => Math.random() * 400 | 0),
        showTextureDialog: null,
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
.hexagon
    clip-path polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
</style>
