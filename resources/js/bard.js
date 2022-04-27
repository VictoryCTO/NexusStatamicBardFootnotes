import NexusStatamicBardFootnote from "./NexusStatamicBardFootnote";
import NexusStatamicBardFootnotesMenu from "./NexusStatamicBardFootnotesMenu.vue";

Statamic.$bard.extend(({mark}) => mark(new NexusStatamicBardFootnote()));
Statamic.$bard.buttons(() => {
    return {
        name: 'nexusStatamicBardFootnote',
        text: 'Footnote',
        command: 'statamicBardFootnote',
        args: {
            url: "",
            text: "",
        },
        icon: 'bookmark',
        component: NexusStatamicBardFootnotesMenu
    };
});
