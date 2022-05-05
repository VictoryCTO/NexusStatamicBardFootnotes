<template>
    <div class="footnote-wrapper">
        <button
            class="bard-toolbar-button"
            :class="{
              'active': currentUrl || showOptions,
            }"
            v-html="button.html"
            v-tooltip="button.text"
            @click="updateShowOptions"
        ></button>
        <div class="footnote-container" v-if="showOptions" v-click-outside="closeFootnoteMenu">
          <div class="px-2 py-2 border-b">
            <div class="h-8 mb-2 p-1 border rounded border-grey-50 flex items-center">
              <input type='text' id="url" v-model.lazy='url' placeholder="URL" class="footnote-input input h-auto text-sm"/>
            </div>
            <div class="h-8 mb-2 p-1 border rounded border-grey-50 flex items-center">
              <input type='text' name="text" v-model.lazy='text' placeholder="Text (Optional)" class="footnote-input input h-auto text-sm"/>
            </div>
          </div>
          <div class="flex items-center justify-end space-x-1 font-normal px-2 py-1.5">
            <button
                aria-label="Set Footnote"
                class="btn btn-sm has-tooltip"
                data-original-title="null"
                @click="closeFootnoteMenu">
              OK
            </button>
          </div>
        </div>
    </div>
</template>
<script>
import vClickOutside from 'v-click-outside';

export default {
    directives: {
        clickOutside: vClickOutside.directive
    },
    mixins: [BardToolbarButton],
    computed: {
      currentUrl() {
        return this.editor.getMarkAttrs('nexusStatamicBardFootnote').url || '' ;
      },
      currentText() {
        return this.editor.getMarkAttrs('nexusStatamicBardFootnote').text || '' ;
      }
    },
    data() {
        return {
            showOptions: false
        };
    },
    methods: {
        updateShowOptions() {
            this.showOptions = !this.showOptions;
            this.url = this.currentUrl;
            this.text = this.currentText;
        },
        closeFootnoteMenu() {
            //make sure data is saved
            this.setFootnote();
            // close the menu
            this.showOptions = false;
        },
        setFootnote() {
            // update the editor
            this.editor.commands.nexusStatamicBardFootnote({
                url: this.url,
                text: this.text,
            })
        },
    }
};
</script>
<style lang="postcss">
/*.fa-bookmark:before,
.fa-hashtag:before,
.fa-footnote:before {
  font-family: "Font Awesome 6 Free"!important;
  font-weight: 900!important;
}
.fa-bookmark:before {
  content: '\f02e';
}
.fa-footnote:before {
  content: '\F12B'!important;
}
.fa-hashtag:before {
  content: '\f292';
}
*/

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
