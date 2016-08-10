import Ember from 'ember';
import WithConfigMixin from 'ember-idx-utils/mixin/with-config';
var computed = Ember.computed;

export default Ember.Component.extend(WithConfigMixin, {
  tagName: 'a',
  classNameBindings: ['styleClasses', 'activeClasses'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.wysiwyg.actionClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),
  activeClasses: (function() {
    var _ref;
    if (this.get('active')) {
      return (_ref = this.get('config.wysiwyg.actionActiveClasses')) != null ? _ref.join(" ") : void 0;
    }
  }).property('active'),
  'is-open': false,
  closeDropdown: function() {
    this.set('clickHanlder', !this.get('clickHanlder'));
    if (this.get('clickHanlder')) {
      this.set('is-open', false);
      return this.set('clickHanlder', false);
    }
  },
  click: function() {
    this.set('clickHanlder', true);
    return this.set('is-open', !this.get('is-open'));
  },
  wysiwyg: computed.alias('parentView.wysiwyg'),
  editor: computed.alias('wysiwyg.editor'),
  eventInit: (function() {
    var callFn, self;
    self = this;
    callFn = function() {
      return self.get('closeDropdown').apply(self);
    };
    return document.addEventListener('click', callFn, false);
  }).on('init'),
  actions: {
    heading: function(type) {
      this.get('editor').restoreSelection();
      this.get('editor').$().focus();
      document.execCommand('formatBlock', 0, type);
      this.get('editor').saveSelection();
      return this.get('wysiwyg').trigger('update_actions');
    }
  }
});
