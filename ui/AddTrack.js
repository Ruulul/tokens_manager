const { generateId, make_listen } = require('../component/Component')
const Component = require('./Component')

module.exports = Component(function (opts, protocol) {
    const notify = protocol ? protocol(make_listen({}), generateId('ui-add-track')) : undefined;

    const button = document.createElement("button")
    button.textContent = opts.text ?? "Add Track"

    const style = document.createElement("style")
    style.textContent = opts.theme ?? getTheme()

    if (notify) button.onclick = async _ => {
        button.disabled = true
        await notify({ type: 'new-track' })
        button.disabled = false
    }

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