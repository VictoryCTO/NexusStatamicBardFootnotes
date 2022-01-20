import CustomBardClasses from "./CustomBardClasses";
import CustomBardClassesMenu from "./CustomBardClassesMenu.vue";

Statamic.$bard.extend(({mark}) => mark(new CustomBardClasses()));
Statamic.$bard.buttons(() => {
    return {
        name: 'custombardclass',
        text: 'Custom Bard Class',
        command: 'classType',
        args: {
            key: ""
        },
        icon: 'les-mills',
        component: CustomBardClassesMenu
    };
});
