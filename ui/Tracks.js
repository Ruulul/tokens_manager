const { make_protocol } = require('../component/Component')
const { wrap_dom } = require('./Component')
const Track = require('./Track')
const AddTrack = require('./AddTrack')

const track_protocol = self => make_protocol({
    delete(msg) {
        const index = self.tracks_id.findIndex(id => id === msg.head[0])
        self.list.children[index].remove()
        self.tracks_id.splice(index, 1)
    }
}, (_, id) => self.tracks_id.push(id))

const add_track_protocol = self => make_protocol({
    'new-track'(msg) {
        const li = document.createElement("li")
        li.append(Track(msg.data, track_protocol(self)))
        self.list.append(li)
    }
})

module.exports = function () {
    const list = document.createElement("ul")
    const tracks_id = []
    const self = { list, tracks_id }

    const add_track = AddTrack({}, add_track_protocol(self))

    return wrap_dom(add_track, list)
}