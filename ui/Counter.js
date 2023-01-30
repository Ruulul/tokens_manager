const { make_listen, generateId } = require("../component/Component")

module.exports = function (opts = {}, protocol) {
    let count = opts.value ?? 0
    const name = generateId('ui-counter')
    const notify = protocol ? protocol(make_listen({}), name) : undefined

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

    plus.onclick = _ => {
        notify({head: [name], type: 'increment'})
        display.textContent = notify({head: [name], type: 'get'})
    }
    minus.onclick = _ => {
        notify({head: [name], type: 'decrement'})
        display.textContent = notify({head: [name], type: 'get'})
    }

    root.append(minus, display, plus)
    return root
}