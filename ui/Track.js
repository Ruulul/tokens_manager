const { make_listen, make_protocol, generateId } = require('../component/Component');
const Track = require('../component/Track');
const Counter = require('./Counter')

module.exports = function (opts = {}, protocol) {
    const root = document.createElement("div")

    const name = generateId('ui-track')
    const notify = protocol ? protocol(undefined, name) : undefined;
    const label = document.createElement("input")
    label.placeholder = 'Track'
    label.textContent = opts.label ?? "Track"

    let counter_notify
    const track = Track(opts, make_protocol({
        get(msg) {
            counter_notify(msg)
        }
    }))
    const counter = Counter({}, make_protocol({
        increment() {
            track({ head: [name], type: 'update', data: { value: 1 } })
        },
        decrement() {
            track({ head: [name], type: 'update', data: { value: -1 } })
        },
        get(msg) {
            track(msg)
        }
    }, notify => counter_notify = notify))

    const close_btn = document.createElement("button")
    close_btn.textContent = 'X'

    close_btn.onclick = _ => {
        if (notify) notify({ head: [name], type: 'delete' });
        root.remove()
    }

    root.append(label, counter, close_btn)

    return root
}