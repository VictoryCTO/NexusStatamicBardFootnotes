<template>
    <div class="footnote-wrapper">
        <button
            class="bard-toolbar-button"
            :class="{
              //'active': currentKey || showOptions
              active: length( currentUrl() ) >=1,
            }"
            v-html="button.html"
            v-tooltip="button.text"
            @click="showOptions = !showOptions"
        ></button>
        <div class="footnote-container" v-if="showOptions" v-click-outside="closeFootnoteMenu()">
          <div class="px-2 py-2 border-b">
            <div class="h-8 mb-2 p-1 border rounded border-grey-50 flex items-center">
              <input type='text' placeholder="URL" v-model='url' class="footnote-input input h-auto text-sm" @change="setFootnoteUrl(url)"/>
            </div>
            <div class="h-8 mb-2 p-1 border rounded border-grey-50 flex items-center">
              <input type='text' placeholder="Text (Optional)" v-model='text' class="footnote-input input h-auto text-sm" @change="setFootnoteUrl(text)"/>
            </div>
          </div>
          <div class="flex items-center justify-end space-x-1 font-normal px-2 py-1.5">
            <button
                aria-label="Set Footnote"
                class="btn btn-sm has-tooltip"
                data-original-title="null"
                @click="closeFootnoteMenu()">
              OK
            </button>
          </div>
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
            return getMarkAttrs('nexusBardFootnote').url;
        },
        currentText() {
            return getMarkAttrs('nexusBardFootnote').text;
        }
    },
    data() {
        return {
            getMarkAttrs: this.editor.getMarkAttrs.bind(this.editor),
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
.fa-bookmark:before {
  content: "\f02e";
}
.fa-footnote:before {
  content: "\f02e";
}
.fa-hashtag:before {
  content: "\f292";
}


/*.footnote-wrapper {
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
}*/
</style>
