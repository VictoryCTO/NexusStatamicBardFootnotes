import CustomBardClasses from "./CustomBardClasses";
import CustomBardClassesMenu from "./CustomBardClassesMenu.vue";

Statamic.$bard.extend(({mark}) => mark(new CustomBardClasses()));
Statamic.$bard.buttons(() => {
    return {
        name: 'custombardclass',
        text: 'Footnote',
        command: 'classType',
        args: {
            url: "",
            text: ""
        },
        icon: 'book-medical',
        component: CustomBardClassesMenu
    };
});
