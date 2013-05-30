# NestedFormUI

## Getting Started

Gemfile:

    gem 'nested_form_ui', '~> 0.0.1'

application.js:

    //= require nested_form_ui/sortable

application.scss:

    @import "nested_form_ui/sortable";

## Usage

### nestedFormSortable

    = semantic_nested_form_for @page do |f|

      #parts.nested-form-sortable.inputs-vertical-list{ data: { association: 'parts' } }
        = f.semantic_fields_for :parts do |pf|
          .nested-form-drag.ui-icon.ui-icon-grip-dotted-vertical
          = pf.text_field :name
          = pf.hidden_field :position
          = pf.link_to_remove do
            .ui-icon.ui-icon-close

      = f.link_to_add 'Add part', :parts
      = f.actions

    :javascript
      $(function(){
        $('#parts').nestedFormSortable();
      })

![nestedFormSortable](https://github.com/tb/nested_form_ui/raw/master/img/sortable.png)

### nestedFormSortableTabs

    = semantic_nested_form_for @page do |f|

      #parts.nested-form-sortable{ data: { association: 'parts' } }
        %ul.nested-form-nav.nested-form-tabs
          %li.nested-form-action
            = f.link_to_add 'Add part', :parts

        = f.semantic_fields_for :parts do |pf|
          = pf.inputs do
            = pf.input :name
            = pf.input :body
            = pf.input :position, as: :hidden
            = pf.hidden_field :_destroy

      = f.actions

    :plain
      $(function(){
        $('#parts').nestedFormSortableTabs({
          templates: {
            tab: '<li class="tabs-tab">{{dragIcon}}<a href="\#{{id}}">{{text}}</a>{{removeIcon}}</li>',
            dragIcon: '<span class="nested-form-drag ui-icon ui-icon-grip-dotted-vertical"></span>' ,
            removeIcon: '<span class="nested-form-remove ui-icon ui-icon-close"></span>'
          }
        });
      })

![nestedFormSortableTabs](https://github.com/tb/nested_form_ui/raw/master/img/sortableTabs.png)

# Copyright

This project rocks and uses MIT-LICENSE.