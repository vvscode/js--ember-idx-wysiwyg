import Em from 'ember';
import WithConfigMixin from 'ember-idx-utils/mixin/with-config';

/**
 * WYSIWYG component
 *
 * @class Wysiwyg
 */

export default Em.Component.extend(WithConfigMixin, {
  classNameBindings: ['styleClasses'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.wysiwyg.classes')) != null ? _ref.join(" ") : void 0;
  }).property(),

  /**
   * A list of {{#crossLink "Toolbar"}}toolbar{{/crossLink}} instances.
   */
  toolbars: void 0,

  /**
   * The editor view
   */
  editor: void 0,
  initToolbars: (function() {
    return this.set('toolbars', Em.ArrayProxy.create({
      content: []
    }));
  }).on('init'),

  initEditorContent: (function() {
    if (this.get('editor')) {
      return Em.run.once(this, (function() {
        return this.get('editor').$().html(this.get('as_html'));
      }));
    }
  }).observes('editor'),

  /**
   * Add the given `Toolbar` instance.
   */
  addToolbar: function(toolbar) {
    return this.get('toolbars').addObject(toolbar);
  },

  /**
   * Remove the given `Toolbar` instance.
   */
  removeToolbar: function(toolbar) {
    return this.get('toolbars').removeObject(toolbar);
  },

  /**
   * Set the editor instance
   */
  setEditor: function(editor) {
    if (editor && editor.element) {
      editor.element.addEventListener('paste', () => Em.run.scheduleOnce('afterRender', this, this.asHtmlUpdater));
    }
    return this.set('editor', editor);
  },
  asHtmlUpdater: (function() {
    return this.set('as_html', this.get('editor').$().html().replace(/(<br>|\s|<div><br><\/div>|&nbsp;)*$/, ''));
  }).on('update_actions')
});
