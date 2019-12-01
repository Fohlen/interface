<template>
    <div class="flex flex-wrap">
        <DialogFrame v-model="showTextureDialog">
            <img :src="`https://picsum.photos/id/${selectedTexture}/800/800`" class="responsive" alt="">
        </DialogFrame>
        <div v-for="texture in textures" :key="texture" class="w-1/5">
            <div class="bg-gray-darkest cursor-pointer p-2 transition hover:scale m-4 rounded relative" @click="showTexture(texture)">
                <div class="overflow-hidden relative">
                    <img :src="`https://picsum.photos/id/${texture}/800/800`" class="responsive" alt="">
                    <div class="bg-background absolute pin-b pin-l p-2 w-full">
                        Texture {{ texture }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DialogFrame from '~/components/DialogFrame'
export default {
    components: { DialogFrame },
    data: () => ({
        textures: [
            2,3,4,5,6
        ],
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

<style>

</style>
