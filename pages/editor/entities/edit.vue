<template>
    <div class="editor">
        <div class="tree-view">
            <Root :highlight_path="cmd" :hidden_depth="2" :tree="entity_types_by_type" name="Root" @set-cmd="cmd = $event" />
        </div>
        <div class="object-view">
            <Root :hidden_depth="2" :path="current_object[0]" :tree="current_object[1]" @set-cmd="cmd = $event" />
        </div>
        <input type="text" v-model="cmd" class="command-line">
    </div>
</template>

<script>
import shortid from 'shortid'
import _get from 'lodash/get'
import _set from 'lodash/set'
import gql from 'graphql-tag'
import Root from '~/components/editor/treeview/Root'


// Parse js object path into pairs where the first item is
// a fully available subpath and the second item is a partial
// attribute name of the lowest subattribute which should be autocompleted.
const FIND_AUTOCOMPLETE_PAIR_REGEXP = /(.*)(?:\.|\[\"?)(\w*)$|(.*)\[\"(\w*)\"?$/gim

function autocomplete_matches(path) {
    let matches = [...path.matchAll(FIND_AUTOCOMPLETE_PAIR_REGEXP)]
    if (!matches[0])
        return [null, null]
    path = matches[0][1] || matches[0][3]
    let autocomplete = matches[0][2] || matches[0][4]
    return [path, autocomplete]
}

function is_no_info_path(path) {
    return [
        ".",
        "[",
        "[\""
    ].includes(path)
}

export default
{
    layout: 'clean',
    components: {
        Root
    },
    apollo: {
        entity_types: gql`
{
  entity_types {
    incoming_relation_types {
      start_type {
        uuid
        name
        attributes {
          uuid
          name
        }
      }
    }
    uuid
    name
    attributes {
      uuid
      name
      datatype
    }
    entity_instances {
      attributes {
        uuid
        value
        type {
          uuid
          datatype
          name
        }
      }
    }
  }
}`
    },
    data: () => ({
        // entities: [ {'test': 0}, {'hey': 1} ],
        cmd: "",
        path: ""
    }),
    computed: {
        entity_types_by_type() {
            if (!this.entity_types) {
                return {}
            }
            let by_type = {}
            for (let type of this.entity_types) {
                if (!by_type[type.name])
                    by_type[type.name] = []
                by_type[type.name].push(type)
            }
            return by_type
        },
        current_object() {
            let c = this.cmd
            let [type, splitter, path] = c.split(/([\[\.])(.*)/, 3)
            if (splitter === "[") {
                path = splitter + path
            }
            let is_type_search = splitter === undefined

            if (!type)
                return [null, null]

            if (is_type_search) {
                let entity_types = this.entity_types.filter(e => e.name.startsWith(type))
                let return_types = {}
                for (let type of entity_types) {
                    if (!return_types[type.name])
                        return_types[type.name] = []
                    return_types[type.name].push(type)
                }
                return [path, return_types]
            }

            let type_objects = this.entity_types.filter(e => e.name === type)

            if (is_no_info_path(path))
                return [type + path, type_objects]

            let objects = _get(type_objects, path)
            if (objects === undefined && path) {
                let [new_path, autocomplete] = autocomplete_matches(path)
                objects = new_path ? _get(type_objects, new_path) : type_objects
                let keys = Object.keys(objects).filter(k => k.indexOf(autocomplete) != -1)
                let return_objects
                if (Array.isArray(objects)) {
                    return [type + new_path, keys.map(x => objects[x])]
                } else {
                    if (keys.length) {
                        return [type + new_path, Object.assign(...keys.map(k => ({[k]: objects[k]})))]
                    }
                }
            }
            return [type + path, objects]
        }
    },
    mounted() {
        // console.log(this.$apollo.provider.defaultClient)
        // this.$apollo.provider.defaultClient.query({ 'query': entity_query })
    },
    methods: {
        setCmd(value) {
            console.log('A', value)
            this.cmd = value
        }
    }
}
</script>

<style lang="stylus">
@import '~assets/css/editor.styl'
</style>
