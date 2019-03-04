<template>
    <div class="bg-background p-2 my-2">
        <div class="flex items-center">
            <v-text-field v-model="value.name" regular dark label="Name" />
            <button class="button ml-4" @click="$emit('remove')">&times;</button>
        </div>
        <div>
            <p>Datatype</p>
            <v-overflow-btn
                :items="dataTypeNames"
                v-model="value.datatype"
                dark
                label="Datatype"
            />
        </div>
        <div v-if="selectedDataType">
            <v-text-field v-if="selectedDataType.type == 'string'" v-model="value.value" type="string" regular dark label="Value" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Object,
            default: () => ({
                attribute_uuid: '',
                name: '',
                datatype: '',
                value: null,
            })
        },
    },
    data: () => ({
        datatypes: [
            {
                name: 'Integer',
            },
            {
                name: 'Float',
            },
            {
                name: 'String',
            },
            {
                name: 'Boolean',
            },
            {
                name: 'Vector 3',
            },
            {
                name: 'Vector 4',
            },
        ]
    }),
    computed: {
        dataTypeNames() {
            return this.datatypes.map(datatype => datatype.name)
        },
        selectedDataType() {
            return this.datatypes.find(datatype => this.value.datatype == datatype.name)
        }
    }

}
</script>
