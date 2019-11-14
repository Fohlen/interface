<template>
    <div>
        <DialogFrame v-model="showTextureDialog">
            <img :src="`https://picsum.photos/id/${selectedTexture}/800/800`" class="responsive" alt="">
        </DialogFrame>
        <div class="flex flex-wrap">
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
export default {
    components: { DialogFrame },
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
