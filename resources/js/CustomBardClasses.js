//import { Plugin } from 'tiptap';
const { core: tiptap, commands, utils } = Statamic.$bard.tiptap;

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
            inclusive: false,
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

    plugins({tiptap, getMarkAttrs}) {
        return [
            new tiptap.Plugin({
                props: {
                    handleClick: (view, pos, event) => {
                        const { schema } = view.state
                        const attrs = getMarkAttrs(view.state, schema.marks.customBardClass)

                        if (attrs.url && event.target instanceof HTMLUnknownElement) {
                            event.stopPropagation()
                            window.open(attrs.url, attrs.text)
                        }
                    },
                },
            }),
        ]
    }

    pasteRules({ type, pasteRule }) {
        return [
            pasteRule(
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b([-a-zA-Z0-9@:%_+.~#?&//=,()!]*)/gi,
                type,
                url => ({ url: url }),
            ),
        ]
    }
}
