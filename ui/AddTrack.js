const { generateId, make_listen } = require('../component/Component')

module.exports = function (opts, protocol) {
    const notify = protocol ? protocol(make_listen({}), generateId('ui-add-track')) : undefined;

    const button = document.createElement("button")
    button.textContent = opts.text ?? "Add Track"

    if (notify) button.onclick = async _ => {
        button.disabled = true
        await notify({ type: 'new-track' })
        button.disabled = false
    }

    return button
}