import NexusStatamicBardFootnote from "./NexusStatamicBardFootnote";
import NexusStatamicBardFootnotesMenu from "./NexusStatamicBardFootnotesMenu";

Statamic.$bard.extend(({mark}) => mark(new NexusStatamicBardFootnote()));
Statamic.$bard.buttons((buttons) => {
    return {
        name: 'nexusStatamicBardFootnote',
        text: 'Footnote',
        command: 'statamicBardFootnote',
        args: {
            url: "",
            text: "",
        },
        icon: 'bookmark',
        label: 'Footnote',
        component: NexusStatamicBardFootnotesMenu
    };
});
