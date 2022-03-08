export default class CustomBardClasses {
    name() {
        return "customBardClass";
    }

    schema() {
        return {
            attrs: {
                url: {
                    default: null,
                },
                text: {
                    default: null,
                },
            },
            parseDOM: [
                {
                    tag: "footnote",
                    getAttrs: (dom) => ({
                        url: dom.getAttribute('data-url'),
                        text: dom.getAttribute('data-text'),
                    })
                }
            ],
            toDOM: (mark) => [
                "footnote",
                {
                    'data-url': mark.attrs.url,
                    'data-text': mark.attrs.text
                },
                0,
            ],
        };
    }

    commands({type, updateMark, removeMark}) {
        return attrs => {
            if (attrs.url || attrs.text) {
                return updateMark(type, attrs)
            }

            return removeMark(type)
        }
    }

    inputRules({type}) {
        return [] // Input rules if you want
    }

    plugins() {
        return []
    }

    pasteRules({ type }) {
        return []
        /*return [
            pasteRule(
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b([-a-zA-Z0-9@:%_+.~#?&//=,()!]*)/gi,
                type,
                url => ({ url: url }),
            ),
        ]*/
    }
}
