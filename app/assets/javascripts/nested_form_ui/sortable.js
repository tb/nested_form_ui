(function($){

  var defaults = {};

  var NestedFormSortableTabs = function(element, options) {
    var me = this;
    this.container = $(element);
    this.options = $.extend({}, defaults, options);
    this.association = this.container.data('association') || options.association;
    this.countTabs = 0;

    this.init();
  };

  var NestedFormSortableBase = function() {};
  NestedFormSortableBase.prototype = {
    renderTemplate: function(template, params) {
      var param;
      for(param in params) {
        var value = typeof(params[param]) == 'function' ? params[param]() : params[param];
        template = template.split('{{'+param+'}}').join(value)
      }
      return template;
    }
  }

  NestedFormSortableTabs.prototype = $.extend({}, NestedFormSortableBase.prototype, {
    init: function() {
      var me = this;

      // tabs
      this.tabs = this.container.tabs({
        select: function(event, ui) {
          // prevent triggering tab select on tabs actions
          return !$(ui.tab).hasClass('nested-form-action');
        }
      });

      // nestedFormEvents.insertFields
      window.nestedFormEvents.insertFields = function(content, assoc, link) {
        var $newPanel = $(content);
        me.container.append( $newPanel );
        me.addTab( $newPanel );
        return $newPanel;
      }

      this.renderTabs();
      this.sortable();
      this.selectFirst();
    },
    renderTabs: function() {
      var me = this;

      // add tabs/panel in order
      me.container.find(".fields").sort(function(a,b){
        var av = parseInt( $(a).find('input[name$="[position]"]').val(), '10'),
            bv = parseInt( $(b).find('input[name$="[position]"]').val(), '10');

        return av > bv;
      }).each(function(idx,panel){
        me.addTab( $(panel) );
      });
    },
    sortable: function() {
      var me = this;
      this.tabs.find(".ui-tabs-nav").sortable({
        items: 'li.tabs-tab',
        handle: '.nested-form-drag',
        axis: "x",
        stop: function() {
          me.tabs.tabs("refresh");
          me.updateSortOrder();
        }
      });
    },
    updateSortOrder: function() {
      $('.nested-form-nav > li.tabs-tab').each(function(idx,tab){
        var $tab = $(tab);
        $tab.data('panel').find('input[name$="[position]"]').val(idx+1);
      })
    },
    addTab: function($panel) {
      var $tabsUl = this.container.find('ul.nested-form-nav'),
        tabId = this.association + '-' + this.countTabs++;
      tabName = $panel.find('input:first').val(),
        tabTemplateData = $.extend({}, this.options.templates, { id: tabId, text: tabName });
      $tab = $(this.renderTemplate(this.options.templates.tab, tabTemplateData));

      $tab.appendTo($tabsUl);
      $panel.prop('id', tabId );
      $tab.data('panel', $panel)
      $panel.data('tab', $tab)

      this.syncTabNameFrom($panel);
      this.addTabRemove($tab, $panel);
      this.updateSortOrder();
      this.tabs.tabs("refresh");
      this.selectLast();
    },
    syncTabNameFrom: function($panel) {
      $panel.find('input:first').on("input", function(){
        $panel.data('tab').find('a:first').html( $(this).val() );
      });
    },
    addTabRemove: function ($tab, $panel) {
      var me = this;
      $tab.find('.ui-icon-close').on("click", function() {
        $(this).closest("li.tabs-tab").remove().attr("aria-controls");
        me.updateSortOrder();
        me.tabs.tabs("refresh");
        $panel.find('input[name$="[_destroy]"]').val('true');
      });
    },
    selectLast: function() {
      this.tabs.find('li.tabs-tab:last > a').click();
    },
    selectFirst: function() {
      this.tabs.find('li.tabs-tab:first > a').click();
    }
  });

  $.fn.nestedFormSortableTabs = function (options) {
    return this.each(function () {
      if (!$.data(this, 'nestedFormSortableTabs')) {
        $.data(this, 'nestedFormSortableTabs', new NestedFormSortableTabs( this, options ));
      }
    });
  }

  var NestedFormSortable = function(element, options) {
    this.container = $(element);
    this.options = $.extend({}, defaults, options);
    this.association = this.container.data('association') || options.association;
    this.init();
  };

  NestedFormSortable.prototype = $.extend({}, NestedFormSortableBase.prototype, {
    init: function() {
      var me = this;

      this.container.sortable({
        connectWith: ".nested-form-sortable",
        handle: '.nested-form-drag',
        axis: "y",
        stop: function() {
          me.updateSortOrder();
        }
      });

      window.nestedFormEvents.insertFields = function(content, assoc, link) {
        return me.container.append($(content));
      }
    },
    updateSortOrder: function() {
      this.container.find('.fields').each(function(idx,fields){
        $(fields).find('input[name$="[position]"]').val(idx+1);
      })
    }
  });

  $.fn.nestedFormSortable = function (options) {
    return this.each(function () {
      if (!$.data(this, 'nestedFormSortable')) {
        $.data(this, 'nestedFormSortable', new NestedFormSortable( this, options ));
      }
    });
  }

})(jQuery);