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
              <input type='text' v-model.lazy='url' placeholder="URL" class="footnote-input input h-auto text-sm"/>
            </div>
            <div class="h-8 mb-2 p-1 border rounded border-grey-50 flex items-center">
              <input type='text' v-model.lazy='text' placeholder="Text (Optional)" class="footnote-input input h-auto text-sm"/>
            </div>
          </div>
          <div class="flex items-center justify-end space-x-1 font-normal px-2 py-1.5">
            <button
                aria-label="Cancel Changes"
                class="btn btn-sm has-tooltip"
                data-original-title="null"
                @click="cancelChanges">
              Cancel
            </button>
            <button
                aria-label="Save Changes"
                class="btn btn-sm has-tooltip"
                data-original-title="null"
                @click="saveChanges">
              Save
            </button>
          </div>
        </div>
    </div>
</template>
<script>
import vClickOutside from 'v-click-outside';
import { TextSelection } from 'prosemirror-state';
import { selectClickedNode, updateSelection } from 'prosemirror-view';

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
      cancelChanges() {
        // close the menu
        this.closeFootnoteMenu();
      },
      closeFootnoteMenu() {
        // close the menu
        this.showOptions = false;
      },
      getTextSelection() {
        //get the current selection
        const { view, state } = this.editor;
        const { from, to } = view.state.selection;
        const text = state.doc.textBetween(from, to, '');
        console.log('currentSelection from:'+from+' to:'+to);
        console.log('currentSelection text:'+text);
        return text;
      },
      manipulateSelection() {
        //get the current selection
        const text = this.getTextSelection();

        if(text==='#') {
          console.log('we selected a current footnote...nothing to do');
        } else {
          console.log('selected: "'+text+'"...adding footnote after');
          const { view, state, props } = this.editor;
          const { from, to, $from, $to } = state.selection;

          const { tr: transaction } = view.state;
          let mark = '<footnote>#</footnote>';
          transaction.insertText(mark, $to.pos);
          transaction.setSelection(TextSelection.create(state.apply(transaction).doc, to, to + mark.length));
          view.dispatch(transaction.scrollIntoView());

          this.getTextSelection();
        }
      },
      saveChanges() {
        //make sure data is saved
        this.setFootnote();
        // close the menu
        this.closeFootnoteMenu();
      },
      setFootnote() {
        // update the editor
        this.editor.commands.nexusStatamicBardFootnote({
          url: this.url,
          text: this.text,
        })
      },
      updateShowOptions() {
        this.showOptions = !this.showOptions;
        this.url = this.currentUrl;
        this.text = this.currentText;
        //make sure this is either an empty selection or just a '#' or move the selection to the end
        this.manipulateSelection();
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
