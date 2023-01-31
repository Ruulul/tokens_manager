const { make_listen, generateId } = require("../component/Component")

module.exports = function (opts = {}, protocol) {
    let count = opts.value ?? 0
    const name = generateId('ui-counter')

    const root = document.createElement("div")
    root.style.display = 'inline-block'
    root.style.margin = '0.5em'

    const plus = document.createElement("button")
    plus.textContent = '+'
    const minus = document.createElement("button")
    minus.textContent = '-'
    const display = document.createElement("span")
    display.textContent = count
    display.style.margin = '0.5em'

    const notify = protocol ? protocol(make_listen({
        get(msg) {
            display.textContent = msg.data.value
        }
    }), name) : undefined

    plus.onclick = do_and_get('increment')
    minus.onclick = do_and_get('decrement')

    root.append(minus, display, plus)
    return root

    function do_and_get(type) {
        return async _ => {
            if (notify) {
                await notify({ head: [name], type })
                await notify({ head: [name], type: 'get' })
            }
        }
    }
}