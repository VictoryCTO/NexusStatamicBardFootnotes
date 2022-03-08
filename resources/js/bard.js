import CustomBardClasses from "./CustomBardClasses";
import CustomBardClassesMenu from "./CustomBardClassesMenu.vue";

Statamic.$bard.extend(({mark}) => mark(new CustomBardClasses()));
Statamic.$bard.buttons(() => {
    return {
        name: 'custombardclass',
        text: 'Source Reference',
        command: 'classType',
        args: {
            url: "",
            text: "",
        },
        icon: 'bookmark',
        component: CustomBardClassesMenu
    };
});
