<template>
    <div />
</template>

<script>
import Rete from 'rete'
import ConnectionPlugin from 'rete-connection-plugin'
import VueRenderPlugin from 'rete-vue-render-plugin'
export default {
    created() {
        const numSocket = new Rete.Socket('Number value')
        class NumComponent extends Rete.Component {
            constructor() {
                super('Number');
            }

            builder(node) {
                let out = new Rete.Output('num', 'Number', numSocket);

                node.addOutput(out);
            }

            worker(node, inputs, outputs) {
                outputs['num'] = node.data.num;
            }
        }
        new Rete.NodeEditor('test', this.$el)
        editor.use(VueRenderPlugin)
        editor.use(ConnectionPlugin)
        const numComponent = new NumComponent()
        editor.register(numComponent)

        // editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
        //     await engine.abort();
        //     await engine.process(editor.toJSON());
        // });
    }
}
</script>
