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

        if(text==='a') {
          console.log('we only selected "a"...nothing to do');
        } else {
          console.log('selected: "'+text+'"...jumping ahead');
          const { view, state, props } = this.editor;
          const endPos = props.getPos() + props.node.nodeSize;
          props.editor.commands.focus('start')

          props.editor
              .chain()
              .insertContentAt(endPos, {
                type: "paragraph"
              })
              .focus(endPos)
              .run()


          const transaction = state.tr.insertText('hey!')
          view.dispatch(transaction);

          /*const { view, state } = this.editor;
          const { from, to, $from, $to } = state.selection;

          const before = $from.nodeBefore.textContent
          const after = $to.nodeAfter.textContent
          const previousLine = before.slice(before.lastIndexOf('\n') + 1)

          if (previousLine.match(/^[-+*]/g)) {
            this.$nextTick(_ => {
              $from.pos += 2
              $to.pos += 1
              this.editor.setContent(`<pre><code>${before}\n- \n${after.slice(1)}</code></pre>`)
              this.setSelectionAtPos(editorView, state.selection)
            });
          }

          //const startPos = state.doc.resolve(from);
          //const endPos = state.doc.resolve(to);
          //updateSelection( new TextSelection(startPos, endPos));
          //this.editor.commands.focus();setTextSelection( new TextSelection($to));
          //view.dispatch(state.tr.setSelection( new TextSelection($to)));
          //this.editor.state. setTextSelection(10).run()

          //this.editor.commands.setSelection( new TextSelection(startPos, endPos));
          this.getTextSelection();*/
        }
        return true;



        /*const { view, state } = this.editor;
        const currentSelection = state.selection;
        console.log('currentSelection from:'+currentSelection.from+' to:'+currentSelection.to);
        console.log('currentSelection anchor:'+currentSelection.anchor);
        //const text = state.doc.textBetween(currentSelection.from, currentSelection.to, '')
        console.log('currentSelection textBetween:'+text);
        //return true;

        this.setSelectionAtPosition(view, currentSelection);
        //is the selection empty or is the selection just the hashtag
        if( currentSelection.empty || this.getTextSelection()==='#' ) {
          console.log('this is just a hashtag')
          return true;
        //otherwise move the cursor to the end of the selection
        } else {
          const endPos = state.doc.resolve(currentSelection.to);
          //const endPos = props.getPos() + props.node.nodeSize

// I focus the start of the editor because
// when the cursor is at the end of the node below which
// we want to add a block, it doesn't focus the next block
          //this.editor.commands.focus('start')

          this.editor.chainCommands().insertTextAfter() insertContentAt(endPos, {type: "footnote"});

          //return true;
          //const endPos = currentSelection.to;
          //const endPos = state.doc.resolve(currentSelection.to);

          //const markPos = this.editor.commands.getMarkPos();
          //this.editor.commands.getMarkRange(markPos, this.editor.view.state.schema.marks.nexusStatamicBardFootnote)
          this.editor.commands.setSelection( new TextSelection(endPos, endPos+1));
          //this.editor.chain().focus().setTextSelection(10).run()
          return true;
        }*/
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
