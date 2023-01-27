const Component = require('./Component')

module.exports = Component('ui-add-track', {}, function (opts, notify) {
    const button = document.createElement("button")
    button.textContent = opts.text ?? "Add Track"

    const style = document.createElement("style")
    style.textContent = opts.theme ?? getTheme()

    if (notify) button.onclick = _ => notify({ type: 'new-track' })

    return [style, button]
})

function getTheme() {
    return `
        button {
            padding: 1em;
            outline: none;
        }
    `
}