module.exports = {
    generateId: (_ => {
        let count = 0
        return (component = 'component', id) => `${component}-${id ?? count++}`
    })(),
    handle_handle(handle, type, msg) {
        if (type in handle) handle[type](msg)
        else console.trace("There is no handle for", type, ", emitted by", msg.head[0], "\nFull msg:", JSON.stringify(msg))
    },
    make_listen(handles) {
        return function (msg) {
            const { type } = msg
            Component.handle_handle(handles, type, msg)
        }
    },
    make_protocol(obj_listen, protocol_fn) {
        const listen = Component.make_listen(obj_listen)
        return function protocol(notify, id) {
            if (protocol_fn) protocol_fn(notify, id)
            return listen
        }
    }
}