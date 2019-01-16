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
                <button class="button" @click="addEntityType">Add EntityType</button>
                <div v-for="entityType in entityTypes" :key="entityType.entity_type_uuid" class="my-2">
                    <input v-model="entityType.name" type="text" >
                    <pre>{{ entityType }}</pre>
                </div>
            </div>

            <div class="w-1/2">
                <h2 class="my-4">Entities</h2>
                <button class="button" @click="addEntity">Add Entity</button>
                <div v-for="entity in entities" :key="entity.entity_instance_uuid" class="my-2">
                    <pre>{{ entity }}</pre>
                </div>
            </div>

            <div class="w-1/2">
                <h2 class="my-4">Relationship Types</h2>
                <button class="button" @click="addRelationshipType">Add RelationshipType</button>
                <div v-for="relationshipType in relationshipTypes" :key="relationshipType.relationship_type_uuid" class="my-2">
                    <pre>{{ relationshipType }}</pre>
                </div>
            </div>

            <div class="w-1/2">
                <h2 class="my-4">Relationships</h2>
                <button class="button" @click="addRelationship">Add Relationship</button>
                <div v-for="relationship in relationships" :key="relationship.relationship_instance_uuid" class="my-2">
                    <pre>{{ relationship }}</pre>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import shortid from 'shortid'

function Entity(options) {
    const fields = {
        entity_instance_uuid: shortid.generate(),
        entity_type_uuid: null,
        attributes: []
    }
    return Object.assign({}, fields, options)
}

function Relationship(options) {
    const fields = {
        relationship_instance_uuid: shortid.generate(),
        relationship_type_uuid: null,
        start_node_entity_instance_uuid: null,
        end_node_entity_instance_uuid: null,
        attributes: []
    }
    return Object.assign({}, fields, options)
}

function EntityType(options) {
    const fields = {
        entity_type_uuid: shortid.generate(),
        name: '',
        attributes: []
    }
    return Object.assign({}, fields, options)
}

function RelationshipType(options) {
    const fields = {
        relationship_type_uuid: shortid.generate(),
        name: '',
        start_node_entity_type_uuid: null,
        end_node_entity_type_uuid: null,
        attributes: []
    }
    return Object.assign({}, fields, options)
}

function Attribute(attribute) {
    const fields = {
        uuid: shortid.generate(),
        name: '',
        datatype: '',
        value: '',
    }
    return Object.assign({}, fields, attribute)
}

export default {
    data: () => ({
        entities: [],
        entityTypes: [],
        relationships: [],
        relationshipTypes: [],
    }),
    methods: {
        addEntity() {
            this.entities.push(new Entity)
        },
        addEntityType() {
            this.entityTypes.push(new EntityType)
        },
        addRelationship() {
            this.relationships.push(new Relationship)
        },
        addRelationshipType() {
            this.relationshipTypes.push(new RelationshipType)
        },
    }
}
</script>

<style>

</style>
