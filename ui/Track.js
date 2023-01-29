const { make_listen, generateId } = require('../component/Component');
const Component = require('./Component')
const Counter = require('./Counter')

module.exports = Component(function (opts, protocol) {
    const notify = protocol ? protocol(make_listen({}), generateId('ui-track')) : undefined;
    const label = document.createElement("input")
    label.placeholder = 'Track'
    label.textContent = opts.label ?? "Track"

    const style = document.createElement("style")
    style.textContent = opts.theme ?? getTheme()

    const counter = Counter()

    const close_btn = document.createElement("button")
    close_btn.textContent = 'X'

    close_btn.onclick = _ => {
        if (notify) notify({ type: 'delete' })
    }

    return [style, label, counter, close_btn]
})

function getTheme() {
    return `
    input {
        padding-right: 0.5em;
    }
    `
}