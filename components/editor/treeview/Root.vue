<template>
    <div class="treeview-item" :class="{'indented': !is_root, 'highlight-path': highlight_path.startsWith(path)}">
        <div v-if="tree && typeof tree == 'object'">
            <p v-if="!is_root">
                <button class="extender" @click="local_is_hidden = !is_hidden" v-html="is_hidden ? '[+]' : '[-]'" />
                {{ name }}
                <button v-if="!is_root" @click="$emit('set-cmd', path)">&#9166;</button>
            </p>
            <div v-if="!is_hidden">
                <div v-for="[key, object] of Object.entries(tree)" :key="key" class="treeview-items">
                    <Root :highlight_path="highlight_path" :hidden_depth="hidden_depth" @set-cmd="set_cmd" :is_root="false" :depth="depth+1" :name="key" :tree="object" :path="create_path(tree, path, key)" />
                </div>
            </div>
        </div>
        <div v-else>
            <p v-if="typeof tree == 'string'">
                {{ name }}
                <button v-if="!is_root" @click="$emit('set-cmd', path)">&#9166;</button>
                = "{{ tree }}"
            </p>
            <p v-else-if="name && name.length">
                {{ name }}
                <button v-if="!is_root" @click="$emit('set-cmd', path)">&#9166;</button>
                = {{ tree }}
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Root',
    props: {
        name: String,
        tree: null,
        highlight_path: {
            type: String,
            default: ""
        },
        hidden_depth: {
            type: Number,
            default: 1
        },
        depth: {
            type: Number,
            default: 0
        },
        path: {
            type: String,
            default: ""
        },
        is_root: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        local_is_hidden: null
    }),
    computed: {
        is_hidden() {
            return this.local_is_hidden === null ? this.hidden_depth <= this.depth :
                this.local_is_hidden
        }
    },
    methods: {
        set_cmd($event) {
            this.$emit('set-cmd', $event)
        },
        create_path(tree, path, key) {
            if (Array.isArray(tree)) {
                return path + "[" + key + "]"
            }
            return (path.length ? path + '.' : '') + key
        }
    }
}
</script>
<style lang="stylus">
</style>
