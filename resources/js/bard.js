import NexusStatamicBardFootnote from "./NexusStatamicBardFootnote";
import NexusStatamicBardFootnotesMenu from "./NexusStatamicBardFootnotesMenu";

Statamic.$bard.extend(({mark}) => mark(new NexusStatamicBardFootnote()));
Statamic.$bard.buttons((buttons, button) => {
    return {
        name: 'nexusStatamicBardFootnote',
        text: 'Footnote',
        command: 'statamicBardFootnote',
        args: {
            url: "",
            text: "",
        },
        icon: 'footnote',
        label: 'Footnote',
        component: NexusStatamicBardFootnotesMenu
    };
});
