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
                <TabLink to="/assets/skyboxes">Skyboxes</TabLink>
                <TabLink to="/assets/prefabs">Prefabs</TabLink>
            </div>
        </Tabs>
        <div class="container mx-auto p-8 text-white bg-background w-full">
            <div class="flex ml-2">
                <label>
                    Filter Category
                    <el-cascader
                        v-model="category"
                        :options="cascadeOptions"
                        @input="refresh"
                    />
                </label>
            </div>
            <nuxt-child :images="images" />
        </div>
    </div>
</template>

<script>

const c = (label, children) => ({
    label,
    value: label,
    ...(children ? { children } : {}),
})

import Logo from '~/components/Logo'
import Tabs from '~/components/Tabs'
import TabLink from '~/components/TabLink'
import axios from 'axios'
export default {
    components: { Logo, Tabs, TabLink },
    data: () => ({
        filter: null,
        category: null,
        images: [1,2,3],
        cascadeOptions: [
            c('Material', [
                c('Nature', [
                    c('Sand'),
                    c('Grass, Moss'),
                    c('Snow'),
                    c('Dirt'),
                    c('Rock, Stone'),
                    c('Gravel'),
                    c('Skin, Fur'),
                    c('Cloth'),
                    c('Wood'),
                ]),
                c('Building', [
                    c('Rock'),
                    c('Bricks'),
                    c('Wood'),
                    c('Metal'),
                ])
            ]),
            c('Application', [
                c('Trims'),
                c('Tiles'),
                c('Lights'),
                c('Decoration'),
                c('Liquid'),
            ]),
            c('Pattern',[
                c('Tiles'),
                c('Slab'),
                c('Pebbles'),
                c('Mosaic'),
                c('Ornament'),
                c('Mesh'),
                c('Edge'),
                c('Crushed'),
                c('Bricks'),
            ]),
            c('Color', [
                c('Dark'),
                c('Light'),
                c('Pastell'),
                c('Red'),
                c('Yellow'),
                c('Orange'),
                c('Green'),
                c('Blue'),
                c('Purple'),
            ])
        ]
    }),
    middleware({ redirect, route }) {
        if (route.path == '/assets') redirect('/assets/entities')
    },
    methods: {
        async refresh(categoryPath) {
            const searchTerm = categoryPath.slice(-1)
            const APIKEY = '84d0b7c0ceee8b8a64ffb6125389cc5ef4b140bb6cdeb55c31db9cb87d8f4709'
            const url = `https://api.unsplash.com/search/photos?page=1&query=${searchTerm}&per_page=${Math.random() * 25 | 0}&client_id=${APIKEY}`
            const { data: { results: photos } } = await axios.get(url)
            this.images = photos.map(photo => photo.urls.small)
        }
    }
}
</script>
