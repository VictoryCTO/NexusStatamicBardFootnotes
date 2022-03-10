<template>
    <div class="class-type-wrapper">
        <button
            class="bard-toolbar-button"
            :class="{ 'active': currentUrl || currentText || showOptions }"
            v-html="button.html"
            v-tooltip="button.text"
            @click="showOptions = !showOptions"
        ></button>
        <div class="class-type-container" v-if="showOptions" v-click-outside="closeClassTypeMenu">
          <div><span class="class-type-label">URL</span><input v-model='url' class="class-type-input" @change="setClassUrl(url)"></div>
          <div><span class="class-type-label">Text</span><textarea v-model='text' class="class-type-input" @change="setClassText(text)"></textarea></div>
        </div>
    </div>
</template>
<script>
import vClickOutside from 'v-click-outside'

export default {
    directives: {
        clickOutside: vClickOutside.directive
    },
    mixins: [BardToolbarButton],
    computed: {
        currentUrl() {
            return this.editor.getMarkAttrs('customBardClass').url;
        },
        currentText() {
            return this.editor.getMarkAttrs('customBardClass').text;
        }
    },
    data() {
        return {
            showOptions: false
        };
    },
    methods: {
        closeClassTypeMenu() {
            // close the menu
            this.showOptions = false;
        },
        setClassUrl(classTypeVal) {
            // update the editor
            this.editor.commands.customBardClass({
                url: classTypeVal,
                text: this.currentText,
            })
        },
        setClassText(classTypeVal) {
            // update the editor
            this.editor.commands.customBardClass({
                url: this.currentUrl,
                text: classTypeVal,
            })
        },
    }
};
</script>
<style lang="postcss">
.class-type-wrapper {
    @apply inline-block relative;
}

.class-type-container {
    @apply absolute bg-white border border-gray-300 rounded-sm z-10 divide-y divide-gray-100 shadow-lg;
}

.class-type-button {
    @apply text-left px-3 py-2 w-full hover:bg-gray-100 flex items-center;
}

.class-type-button.active {
    @apply bg-gray-200;
}

.class-type-input {
}

.class-type-label {
    @apply block text-left whitespace-nowrap;
}

.class-type-mark {
    @apply block w-4 h-4 mr-3 flex-none;
}
</style>
