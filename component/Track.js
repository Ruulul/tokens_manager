const { generateId, make_listen } = require('./Component')
const stampit = require('stampit')
module.exports = stampit({
    props: {
        label: '',
        kind: '',
        value: 0,
    },
    init(opts = {}, { args }) {
        if (args[1]) this.notify = args[1](this.listen, generateId('track'))
        this.label = opts.label
        this.kind = opts.kind
        this.value = opts.value ?? this.value
    },
    methods: {
        listen: make_listen({
            update(msg) {
                this.value += msg.data.value
            },
            set(msg) {
                Object.assign(this, msg.data)
            },
        })
    }
})