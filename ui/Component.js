const { generateId, make_listen } = require("../component/Component")

module.exports = function (_name, obj_listen, makeChild) {
    const listen = make_listen(obj_listen)
    return function (opts = {}, protocol) {
        const el = document.createElement("div")
        const shadow = el.attachShadow({ mode: "closed" })
        const name = generateId(_name)

        const notify = protocol ? protocol(listen, name) : undefined

        shadow.append(...makeChild(opts, notify ? msg => notify(Object.assign(msg, { head: [name] })) : undefined))

        return el
    }
}