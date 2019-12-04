<template>
    <div class="container mx-auto py-16 text-white flex justify-between">
        <Logo />
        <div class="w-1/2 flex flex-col">
            <nuxt-link class="bg-background no-underline my-2 p-4 text-white transition hover:scale" to="/singleplayer">
                <h3 class="text-lg mb-2">Singleplayer</h3>
            </nuxt-link>
            <nuxt-link class="bg-background no-underline my-2 p-4 text-white transition hover:scale" to="/servers">
                <h3 class="text-lg mb-2">Multiplayer</h3>
                <div class="flex">
                    <ImageCard v-for="server in servers" :key="server.id" :src="server.map.preview" :label="server.map.name" class="w-1/3">
                        <span class="text-xs">({{ server.players }} / {{ server.maxPlayers }})</span> {{ server.name }}
                    </ImageCard>
                    <div class="p-2 relative overflow-hidden flex-grow">
                        <div class="bg-background transition hover:scale relative flex h-full">
                            <div class="bg-background p-2 mt-16 self-end relative w-full">
                                <strong class="block text-purple text-shadow-dark">More servers</strong>
                                <span class="text-xs">21 server online</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="button button--primary button--outline mt-4">
                    Matchmaking
                </button>
            </nuxt-link>
            <!-- <nuxt-link class="bg-background no-underline my-2 p-4 text-white transition hover:scale" to="/editor/entities">
                <h3 class="text-lg mb-2">Entities</h3>
            </nuxt-link> -->
            <nuxt-link class="bg-background no-underline my-2 p-4 text-white transition hover:scale" to="/assets">
                <h3 class="text-lg mb-2">Assets</h3>
                <p>
                    Manage textures, maps and models
                </p>
            </nuxt-link>
            <nuxt-link class="bg-background no-underline my-2 p-4 text-white transition hover:scale" to="/editor">
                <h3 class="text-lg mb-2">Dev Tools</h3>
                <p>
                    Play with entity system
                </p>
            </nuxt-link>
            <nuxt-link class="bg-background no-underline my-2 p-4 text-white transition hover:scale flex" to="/user/login">
                <UserAvatar v-if="loggedIn" :label="true" :user="{ username: 'Misan', avatar: '' }">
                    <div>10 maps created</div>
                </UserAvatar>
                <div v-else>
                    <h3 class="text-lg">User Account</h3>
                    <button class="button button--primary button--outline mt-4">
                        Login
                    </button>
                    <p class="mt-2 text-sm">
                        With an account, you can publish maps, save statistics about matches and more
                    </p>
                </div>
                <!-- <div>
                    Clan
                </div> -->
            </nuxt-link>
        </div>
    </div>
</template>

<script>
import Logo from '~/components/Logo'
import UserAvatar from '~/components/user/UserAvatar'
import ImageCard from '~/components/ImageCard'
export default {
    components: { Logo, ImageCard, UserAvatar },
    computed: {
        loggedIn() {
            return false
        },
        servers() {
            return [
                {
                    id: 1,
                    name: 'Mapping Hell',
                    map: {
                        name: 'Averas',
                        preview: require('~/assets/images/averas.jpg')
                    },
                    players: 5,
                    maxPlayers: 10,
                },
                {
                    id: 2,
                    name: 'Riggatoni',
                    map: {
                        name: 'Flagstone',
                        preview: require('~/assets/images/flagstone.jpg')
                    },
                    players: 17,
                    maxPlayers: 32,
                },
            ]
        }
    }
}
</script>
