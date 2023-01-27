const { generateId, make_listen } = require('./Component')
const stampit = require('stampit')
const Track = require('./Track')
module.exports = stampit(Component, {
    props: {
        label: '',
        tracks: null,
    },
    init(opts = {}, { args }) {
        if (args[1]) this.notify = args[1](this.listen, generateId('tracks'))
        this.label = opts.label
        this.tracks = new Map()
    },
    methods: {
        listen: make_listen({
            update(msg) {
                Object.assign(this, msg.data)
            },
            'new-track'(msg) {
                Track(msg.data, this.track_protocol)
            },
            'delete-track'(msg) {
                this.tracks.delete(msg.head[1])
            },
            'update-track'(msg) {
                this.tracks.get(msg.head[1]).notify({ type: 'update', data: msg.data })
            }
        }),
        track_protocol: (function () {
            const listen = make_listen({})
            return function (notify, id) {
                this.tracks.set(id, { notify })
                return listen
            }
        })()
    }
})