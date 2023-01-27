const Component = require('./Component')
const Counter = require('./Counter')

module.exports = Component('ui-track', {}, function (opts, notify) {
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
    :host {
        display: table-cell;
    }
    input {
        padding-right: 0.5em;

        display: inline-block;
        text-align: center;
    }
    `
}