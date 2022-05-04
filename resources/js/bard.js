import NexusStatamicBardFootnote from "./NexusStatamicBardFootnote";
import NexusStatamicBardFootnotesMenu from "./NexusStatamicBardFootnotesMenu";

Statamic.$bard.extend(({mark}) => mark(new NexusStatamicBardFootnote()));
Statamic.$bard.buttons((buttons, button) => {
    return {
        name: 'footnote',
        text: 'Footnote',
        command: 'nexusStatamicBardFootnote',
        args: {
            url: "",
            text: "",
        },
        icon: 'bookmark',
        component: NexusStatamicBardFootnotesMenu
    };
});
