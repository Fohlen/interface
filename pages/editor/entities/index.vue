<template>
    <div class="bg-background text-white p-4 m-auto mt-16 w-3/4">
        <h1>Entity System</h1>
        <div class="flex">
            <div class="block px-4 py-2 bg-blue text-white border-r">
                Entity Types
            </div>
            <div class="block px-4 py-2 bg-blue text-white border-r">
                Entities
            </div>
            <div class="block px-4 py-2 bg-blue text-white border-r">
                Relationship Types
            </div>
            <div class="block px-4 py-2 bg-blue text-white border-r">
                Relationships
            </div>
        </div>
        <div class="flex flex-wrap">
            <div class="w-1/2">
                <h2 class="my-4">Entity Types</h2>
                <button class="button" @click="add('entityTypes', 'EntityType')">Add EntityType</button>
                <div v-for="entityType in entityTypes" :key="entityType.entity_type_uuid" class="my-2">
                    Name:
                    <input v-model="entityType.name" type="text" >
                    <button class="button" @click="remove('entityTypes', entityType.entity_type_uuid, 'entity_type_uuid')">&times;</button>
                    <pre>{{ entityType }}</pre>
                </div>
            </div>

            <div class="w-1/2">
                <h2 class="my-4">Entities</h2>
                <button class="button" @click="add('entities', 'Entity')">Add Entity</button>
                <div v-for="entity in entities" :key="entity.entity_instance_uuid" class="my-2">
                    <ui-select
                        :options="entityTypes.map(t => (t.entity_type_uuid))"
                        v-model="entity.entity_type_uuid"
                        placeholder="Set Entity Type"
                        label="Entity Type"
                        class="bg-white"
                    />
                    <button class="button" @click="remove('entities', entity.entity_instance_uuid, 'entity_instance_uuid')">&times;</button>
                    <pre>{{ entity }}</pre>
                </div>
            </div>

            <div class="w-1/2">
                <h2 class="my-4">Relationship Types</h2>
                <button class="button" @click="add('relationshipTypes', 'RelationshipType')">Add RelationshipType</button>
                <div v-for="relationshipType in relationshipTypes" :key="relationshipType.relationship_type_uuid" class="my-2">
                    Name:
                    <input v-model="relationshipType.name" type="text" >
                    <ui-select
                        :options="entityTypes.map(t => (t.entity_type_uuid))"
                        v-model="relationshipType.start_node_entity_type_uuid"
                        label="Set Start Node Type"
                        class="bg-white"
                    />
                    <ui-select
                        :options="entityTypes.map(t => (t.entity_type_uuid))"
                        v-model="relationshipType.end_node_entity_type_uuid"
                        label="Set End Node Type"
                        class="bg-white"
                    />
                    <button class="button" @click="remove('relationshipTypes', relationshipType.relationship_type_uuid, 'relationship_type_uuid')">&times;</button>
                    <pre>{{ relationshipType }}</pre>
                </div>
            </div>

            <div class="w-1/2">
                <h2 class="my-4">Relationships</h2>
                <button class="button" @click="add('relationships', 'Relationship')">Add Relationship</button>
                <div v-for="relationship in relationships" :key="relationship.relationship_instance_uuid" class="my-2">
                    <ui-select
                        :options="relationshipTypes.map(t => (t.relationship_type_uuid))"
                        v-model="relationship.relationship_type_uuid"
                        label="Set Relationship Type"
                        class="bg-white"
                    />
                    <ui-select
                        :options="entities.map(t => (t.entity_instance_uuid))"
                        v-model="relationship.start_node_entity_instance_uuid"
                        label="Set Startnode"
                        class="bg-white"
                    />
                    <ui-select
                        :options="entities.map(t => (t.entity_instance_uuid))"
                        v-model="relationship.end_node_entity_instance_uuid"
                        label="Set Endnode"
                        class="bg-white"
                    />
                    <button class="button" @click="remove('relationships', relationship.relationship_instance_uuid, 'relationship_instance_uuid')">&times;</button>
                    <pre>{{ relationship }}</pre>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import shortid from 'shortid'

const create = {
    Entity(options) {
        const fields = {
            entity_instance_uuid: shortid.generate(),
            entity_type_uuid: null,
            attributes: []
        }
        return Object.assign({}, fields, options)
    },

    Relationship(options) {
        const fields = {
            relationship_instance_uuid: shortid.generate(),
            relationship_type_uuid: null,
            start_node_entity_instance_uuid: null,
            end_node_entity_instance_uuid: null,
            attributes: []
        }
        return Object.assign({}, fields, options)
    },

    EntityType(options) {
        const fields = {
            entity_type_uuid: shortid.generate(),
            name: '',
            attributes: []
        }
        return Object.assign({}, fields, options)
    },

    RelationshipType(options) {
        const fields = {
            relationship_type_uuid: shortid.generate(),
            name: '',
            start_node_entity_type_uuid: null,
            end_node_entity_type_uuid: null,
            attributes: []
        }
        return Object.assign({}, fields, options)
    },

    Attribute(attribute) {
        const fields = {
            uuid: shortid.generate(),
            name: '',
            datatype: '',
            value: '',
        }
        return Object.assign({}, fields, attribute)
    }
}

export default {
    data: () => ({
        entities: [],
        entityTypes: [],
        relationships: [],
        relationshipTypes: [],
    }),
    methods: {
        add(pool, type) {
            if (!create[type] || !this[pool]) return false
            this[pool].push(create[type]())
        },
        remove(pool, uuid, field) {
            let index = this[pool].findIndex(object => object[field] == uuid)
            this[pool].splice(index, 1)
        },
    }
}
</script>

<style>

</style>
