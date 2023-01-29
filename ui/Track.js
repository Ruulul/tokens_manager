const { make_listen, generateId } = require('../component/Component');
const Counter = require('./Counter')

module.exports = function (opts = {}, protocol) {
    const root = document.createElement("div")

    const name =  generateId('ui-track')
    const notify = protocol ? protocol(make_listen({}), name) : undefined;
    const label = document.createElement("input")
    label.placeholder = 'Track'
    label.textContent = opts.label ?? "Track"

    const counter = Counter()

    const close_btn = document.createElement("button")
    close_btn.textContent = 'X'

    close_btn.onclick = _ => {
        if (notify) notify({ head: [name], type: 'delete' });  
        root.remove()
    }

    root.append(label, ...counter, close_btn)
    
    return [root]
}