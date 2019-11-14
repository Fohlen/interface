<template>
    <transition name="dialog">
        <div v-if="value" class="dialog-mask" @click.self="close">
            <div class="dialog">
                <slot />
                <div class="dialog__footer">
                    <slot name="footer">
                        <button class="button button--primary button--outline" @click="close">
                            {{ closeButton }}
                        </button>
                    </slot>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        closeButton: {
            type: String,
            default: 'Close'
        }
    },
    data: () => ({
        showDialog: false
    }),
    methods: {
        close(event) {
            this.$emit('input', false)
        }
    },
}
</script>
<style lang="stylus">
.dialog-mask
    @apply bg-gray-darkest-faded
    position fixed
    z-index 10000
    top 0
    left 0
    width 100%
    height 100%
    display flex
    transition opacity .3s ease

.dialog
    @apply shadow bg-white text-black
    align-self center
    margin 0 auto
    max-height 100%
    overflow auto
    padding 1em 2em
    border-radius .25em
    transition all .5s cubic-bezier(.83,1.7,.59,.91)
    transform translateY(0em)

.dialog-enter, .dialog-leave-active
    opacity 0

.dialog-enter .dialog,
.dialog-leave-active .dialog
    transform scale(0.1)

.dialog-leave-active .dialog
    transform scale(1.5)
</style>
