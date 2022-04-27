<template>
    <div class="footnote-wrapper">
        <button
            class="bard-toolbar-button"
            :class="{ 'active': currentKey || showOptions }"
            v-html="button.html"
            v-tooltip="button.text"
            @click="showOptions = !showOptions"
        ></button>
        <div class="footnote-container" v-if="showOptions" v-click-outside="closeFootnoteMenu">
          <div><span class="footnote-label">URL</span><input v-model='url' class="footnote-input" @change="setFootnoteUrl(url)"/></div>
          <div><span class="footnote-label">Text</span><textarea v-model='text' class="footnote-input" @change="setFootnoteText(text)"></textarea></div>
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
            return this.editor.getMarkAttrs('nexusBardFootnote').url;
        },
        currentText() {
            return this.editor.getMarkAttrs('nexusBardFootnote').text;
        }
    },
    data() {
        return {
            showOptions: false
        };
    },
    methods: {
        closeFootnoteMenu() {
            // close the menu
            this.showOptions = false;
        },
        setFootnoteUrl(val) {
            // update the editor
            this.editor.commands.nexusStatamicBardFootnote({
                url: val,
                //text: this.currentText,
            })
        },
        setFootnoteText(val) {
            // update the editor
            this.editor.commands.nexusStatamicBardFootnote({
                //url: this.currentUrl,
                text: val,
            })
        },
    }
};
</script>
<style lang="postcss">
.footnote-wrapper {
    @apply inline-block relative;
}

.footnote-container {
    @apply absolute bg-white border border-gray-300 rounded-sm z-10 divide-y divide-gray-100 shadow-lg;
}

.footnote-button {
    @apply text-left px-3 py-2 w-full hover:bg-gray-100 flex items-center;
}

.footnote-button.active {
    @apply bg-gray-200;
}

.footnote-input {
}

.footnote-label {
    @apply block text-left whitespace-nowrap;
}

.footnote-mark {
    @apply block w-4 h-4 mr-3 flex-none;
}
</style>
