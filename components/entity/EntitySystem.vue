<template>
    <div class="bg-background text-white p-4 m-auto mt-16 mb-16 w-3/4">
        <h1 class="p-2">Entity System</h1>
        <div class="flex flex-wrap">
            <div class="w-1/2 p-2">
                <h2 class="my-4 flex items-center">
                    Entity Types
                    <button class="button ml-2" @click="add('entityTypes', 'EntityType')">+</button>
                </h2>
                <div v-for="entityType in entityTypes" :key="entityType.entity_type_uuid" class="my-2 bg-gray-darkest-faded rounded shadow p-2">
                    <div class="flex justify-between items-center">
                        <v-text-field v-model="entityType.name" regular dark label="Name"/>
                        <button class="button ml-4" @click="remove('entityTypes', entityType.entity_type_uuid, 'entity_type_uuid')">&times;</button>
                    </div>
                    <button class="button" @click="addAttribute(entityType)">Add Attribute</button>
                    <EntityAttribute v-for="attribute in entityType.attributes" :key="attribute.uuid" :value="attribute" @input="attribute = $event" @remove="removeAttribute(entityType, attribute)" />
                    <pre>{{ entityType }}</pre>
                </div>
            </div>

            <div class="w-1/2 p-2">
                <h2 class="my-4 flex items-center">
                    Entities
                    <button class="button ml-2" @click="add('entities', 'Entity')">+</button>
                </h2>
                <div v-for="entity in entities" :key="entity.entity_instance_uuid" class="my-2 bg-gray-darkest-faded rounded shadow p-2">
                    <div class="flex justift-between items-center">
                        <v-autocomplete
                            v-model="entity.entity_type_uuid"
                            :items="entityTypes"
                            dark
                            item-text="name"
                            item-value="entity_type_uuid"
                            label="Type"
                        />
                        <button class="button ml-4" @click="remove('entities', entity.entity_instance_uuid, 'entity_instance_uuid')">&times;</button>
                    </div>
                    <button class="button" @click="addAttribute(entity)">Add Attribute</button>
                    <EntityAttribute v-for="attribute in entity.attributes" :key="attribute.uuid" @remove="removeAttribute(entity, attribute)" />
                    <pre>{{ entity }}</pre>
                </div>
            </div>

            <div class="w-1/2 p-2">
                <h2 class="my-4 flex items-center">
                    Relationship Types
                    <button class="button ml-2" @click="add('relationshipTypes', 'RelationshipType')">+</button>
                </h2>
                <div v-for="relationshipType in relationshipTypes" :key="relationshipType.relationship_type_uuid" class="my-2 bg-gray-darkest-faded rounded shadow p-2">
                    <v-text-field v-model="relationshipType.name" regular dark label="Name"/>
                    <button class="button" @click="remove('relationshipTypes', relationshipType.relationship_type_uuid, 'relationship_type_uuid')">&times;</button>
                    <v-autocomplete
                        v-model="relationshipType.start_node_entity_type_uuid"
                        :items="entityTypes"
                        dark
                        item-text="name"
                        item-value="entity_type_uuid"
                        label="Start Node Type"
                    />
                    <v-autocomplete
                        v-model="relationshipType.end_node_entity_type_uuid"
                        :items="entityTypes"
                        dark
                        item-text="name"
                        item-value="entity_type_uuid"
                        label="End Node Type"
                    />
                    <button class="button" @click="addAttribute(relationshipType)">Add Attribute</button>
                    <EntityAttribute v-for="attribute in relationshipType.attributes" :key="attribute.uuid" @remove="removeAttribute(relationshipType, attribute)" />
                    <pre>{{ relationshipType }}</pre>
                </div>
            </div>

            <div class="w-1/2 p-2">
                <h2 class="my-4 flex items-center">
                    Relationships
                    <button class="button ml-2" @click="add('relationships', 'Relationship')">+</button>
                </h2>
                <div v-for="relationship in relationships" :key="relationship.relationship_instance_uuid" class="my-2 bg-gray-darkest-faded rounded shadow p-2">
                    <button class="button" @click="remove('relationships', relationship.relationship_instance_uuid, 'relationship_instance_uuid')">&times;</button>
                    <v-autocomplete
                        v-model="relationship.relationship_type_uuid"
                        :items="relationshipTypes"
                        dark
                        item-text="name"
                        item-value="relationship_type_uuid"
                        label="Relationship Type"
                    />
                    <div v-if="relationship.relationship_type_uuid">
                        <v-autocomplete
                            v-model="relationship.start_node_entity_instance_uuid"
                            :items="entities.filter(entity => availableRelationStartEntities(entity, relationship))"
                            dark
                            item-text="entity_instance_uuid"
                            item-value="entity_instance_uuid"
                            label="Start Entity"
                        />
                        <v-autocomplete
                            v-model="relationship.end_node_entity_instance_uuid"
                            :items="entities.filter(entity => availableRelationEndEntities(entity, relationship))"
                            dark
                            item-text="entity_instance_uuid"
                            item-value="entity_instance_uuid"
                            label="End Entity"
                        />
                    </div>
                    <button class="button" @click="addAttribute(relationship)">Add Attribute</button>
                    <EntityAttribute v-for="attribute in relationship.attributes" :key="attribute.uuid" @remove="removeAttribute(relationship, attribute)" />
                    <pre>{{ relationship }}</pre>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import EntityAttribute from './EntityAttribute'
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
    components: { EntityAttribute },
    data: () => ({
        entities: [],
        entityTypes: [],
        relationships: [],
        relationshipTypes: [],
    }),
    created() {
        this.entityTypes.push(create.EntityType({name: 'Teleport'}))
        this.entityTypes.push(create.EntityType({name: 'Teledest'}))
        // this.entities.push(create.Entity({name: 'Teledest'}))
    },
    methods: {
        availableRelationStartEntities(entity, relationship) {
            const relationshipType = this.findRelationshipTypeByUUID(relationship.relationship_type_uuid)
            const checkEntityType = this.findEntityTypeByUUID(entity.entity_type_uuid)
            return checkEntityType.entity_type_uuid == relationshipType.start_node_entity_type_uuid
        },
        availableRelationEndEntities(entity, relationship) {
            const relationshipType = this.findRelationshipTypeByUUID(relationship.relationship_type_uuid)
            const checkEntityType = this.findEntityTypeByUUID(entity.entity_type_uuid)
            return checkEntityType.entity_type_uuid == relationshipType.end_node_entity_type_uuid
        },
        findEntityTypeByUUID(uuid) { return this.entityTypes.find(type => type.entity_type_uuid == uuid) },
        findEntityByUUID(uuid) { return this.entities.find(entity => entity.entity_instance_uuid == uuid) },
        findRelationshipByUUID(uuid) { return this.relationships.find(relationship => relationship.relationship_instance_uuid == uuid) },
        findRelationshipTypeByUUID(uuid) { return this.relationshipTypes.find(relationshipType => relationshipType.relationship_type_uuid == uuid) },
        add(pool, type) {
            if (!create[type] || !this[pool]) return false
            this[pool].push(create[type]())
        },
        addAttribute(pool) {
            pool.attributes.push(create.Attribute())
        },
        remove(pool, uuid, field) {
            let index = this[pool].findIndex(object => object[field] == uuid)
            this[pool].splice(index, 1)
        },
        removeAttribute(pool, { uuid }) {
            let index = pool.attributes.findIndex(attribute => attribute.uuid == uuid)
            pool.attributes.splice(index, 1)
        }
    }
}
</script>

<style>

</style>
