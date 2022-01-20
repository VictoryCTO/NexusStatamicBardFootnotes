export default class CustomBardClasses {
    name() {
        return "customBardClass";
    }

    schema() {
        return {
            attrs: {
                key: '',
            },
            parseDOM: [
                {
                    tag: "span.bard-class",
                    getAttrs: (dom) => ({
                        key: dom.getAttribute('data-class')
                    })
                }
            ],
            toDOM: (mark) => [
                "span",
                {
                    'class': 'bard-class ' + mark.attrs.key,
                    'data-class': mark.attrs.key
                },
                0,
            ],
        };
    }

    commands({type, updateMark, removeMark}) {
        return attrs => {
            if (attrs.key) {
                return updateMark(type, attrs)
            }

            return removeMark(type)
        }
    }

    pasteRules({type}) {
        return [];
    }

    plugins() {
        return [];
    }
}
