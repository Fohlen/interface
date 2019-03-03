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
                value: '',
            })
        },
    },
    data: () => ({
        dataTypes: [
            {
                name: 'Integer',
                type: 'number'
            },
            {
                name: 'Float',
                type: 'number'
            },
            {
                name: 'String',
                type: 'text'
            },
            {
                name: 'Boolean',
                type: 'checkbox'
            },
            {
                name: 'Vector 3',
                type: 'number'
            },
            {
                name: 'Vector 4',
                type: 'number'
            },
        ]
    }),
    computed: {
        dataTypeNames() {
            return this.dataTypes.map(dataType => dataType.name)
        },
        selectedDataType() {
            return this.dataTypes.find(dataType => this.value.dataType == dataType.name)
        }
    }

}
</script>
