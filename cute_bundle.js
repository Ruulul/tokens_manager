(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Component = {
    generateId: (_ => {
        let count = 0
        return (component = 'component', id) => `${component}-${id ?? count++}`
    })(),
    handle_handle(handle, type, msg) {
        if (type in handle) handle[type].call(this, msg)
        else console.trace("There is no handle for", type, ", emitted by", msg.head[0])
    },
    make_listen(handles) {
        return function (msg) {
            const { type } = msg
            Component.handle_handle.call(this, handles, type, msg)
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
module.exports = Component
},{}],2:[function(require,module,exports){
const Tracks = require("./ui/Tracks")

const root = document.body
root.append(Tracks({}))
},{"./ui/Tracks":7}],3:[function(require,module,exports){
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
},{"./Component":4}],4:[function(require,module,exports){
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
},{"../component/Component":1}],5:[function(require,module,exports){
const Component = require('./Component')

module.exports = Component('ui-counter', {}, function (opts = {}) {
    let count = opts.value ?? 0

    const plus = document.createElement("button")
    plus.textContent = '+'
    const minus = document.createElement("button")
    minus.textContent = '-'
    const display = document.createElement("span")
    display.textContent = count

    plus.onclick = _ => {
        display.textContent = ++count
    }
    minus.onclick = _ => {
        display.textContent = --count
    }

    const theme = document.createElement("style")
    theme.textContent = opts.theme ?? getTheme()

    return [theme, minus, display, plus]
})

function getTheme() {
    return `
    :host {
        display: inline-block;
        outline: red;
        margin: 0.5em;
    }
    span {
        margin: 0.5em;
    }
    `
}
},{"./Component":4}],6:[function(require,module,exports){
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
},{"./Component":4,"./Counter":5}],7:[function(require,module,exports){
const { make_protocol } = require('../component/Component')
const Component = require('./Component')
const Track = require('./Track')
const AddTrack = require('./AddTrack')

module.exports = Component('ui-tracks', {}, function (opts) {
    const list = document.createElement("ul")
    const tracks_id = []

    const track_protocol = make_protocol({
        delete(msg) {
            const index = tracks_id.findIndex(id => id === msg.head[0])
            list.children[index].remove()
            tracks_id.splice(index, 1)
        }
    }, (_, id) => tracks_id.push(id))

    const add_track_protocol = make_protocol({
        'new-track'(msg) {
            const li = document.createElement("li")
            li.append(Track(msg.data, track_protocol))
            list.append(li)
        }
    })

    const add_track = AddTrack({}, add_track_protocol)

    const style = document.createElement("style")
    style.textContent = opts.theme ?? getTheme()

    return [style, add_track, list]
})

function getTheme() {
    return `
        button {
            padding: 1em;
            outline: none;
        }
    `
}
},{"../component/Component":1,"./AddTrack":3,"./Component":4,"./Track":6}]},{},[2]);
