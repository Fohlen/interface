<template>
    <div class="flex items-center">
        <img :class="getSize" class="avatar" :src="user.avatar">
        <div v-if="label" class="ml-2">
            <div class="font-bold text-purple text-shadow-dark">{{ user.username }}</div>
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user: Object,
        label: Boolean,
        small: Boolean,
        big: Boolean,
    },
    computed: {
        getSize() {
            return {
                'h-8 w-8': this.small,
                'h-16 w-16': !this.small && !this.big,
                'h-32 w-32': this.big,
            }
        }
    }
}
</script>
