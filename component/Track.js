const { generateId, make_listen } = require("./Component")

module.exports = function Track(opts = {}, protocol) {
    const name = generateId('track')
    let value = opts.default_value ?? 0
    const listen = make_listen({
        set(msg) {
            value = msg.data.value
        },
        update(msg) {
            value += msg.data.value
        },
        reset() {
            value = opts.default_value ?? 0
        },
        get: notify_value,
    })
    const notify = protocol ? protocol(listen, name) : undefined

    return listen

    function notify_value(msg) {
        if (notify) notify({ head: [name], type: 'get', data: { value } })
    }
}