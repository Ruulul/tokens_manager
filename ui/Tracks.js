const { make_protocol } = require('../component/Component')
const Component = require('./Component')
const Track = require('./Track')
const AddTrack = require('./AddTrack')

module.exports = Component('ui-tracks', {}, function (opts) {
    const list = document.createElement("ul")
    const tracks_id = []

    const track_protocol = make_protocol({
        delete(msg) {
            const index = tracks_id.findIndex(id => id === msg.head[0])
            list.children[index].remove()
            tracks_id.splice(index, 1)
        }
    }, (_, id) => tracks_id.push(id))

    const add_track_protocol = make_protocol({
        'new-track'(msg) {
            const li = document.createElement("li")
            li.append(Track(msg.data, track_protocol))
            list.append(li)
        }
    })

    const add_track = AddTrack({}, add_track_protocol)

    const style = document.createElement("style")
    style.textContent = opts.theme ?? getTheme()

    return [style, add_track, list]
})

function getTheme() {
    return `
        button {
            padding: 1em;
            outline: none;
        }
    `
}