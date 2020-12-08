# EHR Forms : Widget editing

This page is under construction

In the **Widget Editor** User can:

/\*&lt;!\[CDATA\[\*/  
div.rbtoc1607432790389 {padding: 0px;}  
div.rbtoc1607432790389 ul {list-style: disc;margin-left: 0px;}  
div.rbtoc1607432790389 li {margin-left: 0px;padding-left: 0px;}  
  
/\*\]\]&gt;\*/

* [Converting Panel into Widget](ehr-forms-widget-editing.md#Widgetediting-ConvertingPanelintoWidget)
* [Adding custom reusable widget ](ehr-forms-widget-editing.md#Widgetediting-Addingcustomreusablewidget)
* [Widget cloning ](ehr-forms-widget-editing.md#Widgetediting-Widgetcloning)
* [Converting Widget into Panel](ehr-forms-widget-editing.md#Widgetediting-ConvertingWidgetintoPanel)

General view

![](.gitbook/assets/34833973.png)

Widget has four main panels in edit mode \(same as form\):

* [Source panel](ehr-forms-source-panel.md) - templates, component libraries, terminologies and environment variables
* [Editor panel](ehr-forms-editor-panel.md) - data representation area where editor itself take place
* [Settings panel](ehr-forms-settings-panel.md) - properties of the selected widget, form structure in tree representation, testing and actions
* [Developer tools panel](ehr-forms-developer-tools-panel.md)- panel with tabs of messages \(like warnings and alerts\), json code and etc.

## Converting Panel into Widget <a id="Widgetediting-ConvertingPanelintoWidget"></a>

User can convert panel into a widget:

* Select **Convert into widget** in the drop-down menu

![](.gitbook/assets/34835329.png)

Do not convert navigation sections into widgets! Try to choose a common slot inside the navigation slot.

Avoid embedding the widget into the widget when creating.

* In the properties of the widget, select the archetype that is responsible for this widget
* Name the widget and make it searchable

![image2019-3-7\_16-0-46.png](.gitbook/assets/19501101.png)

## Adding custom reusable widget  <a id="Widgetediting-Addingcustomreusablewidget"></a>

* Add widget to the component slot in the required section

![image2019-3-7\_16-20-28.png](.gitbook/assets/19501103.png)

* An unbound component "Widget" will appear offering to use available widgets where the necessary custom widget is selected.

![image2019-3-12\_16-59-30.png](.gitbook/assets/19501382.png)On the right in the structure you need to select the appropriate section, otherwise there will be no hint with reusable widgets

* When you select a widget, it becomes available for viewing its version.

![image2019-3-12\_17-1-55.png](.gitbook/assets/19501385.png)

## Widget cloning  <a id="Widgetediting-Widgetcloning"></a>

The widget clone option creates a full copy of it in the place of the selected widget.

The widget name and tags will be from the source, but with "\(Copy\)" in the widget name.

The action should be applied if there is a need to create a different widget, but also reused in the future

![image2019-3-14\_13-8-39.png](.gitbook/assets/19501608.png)

## Converting Widget into Panel <a id="Widgetediting-ConvertingWidgetintoPanel"></a>

The option "convert to panel" removes the "widget" property of the object making it a panel.

The option is necessary for cases when it is necessary to use the widget as the basis of the component, but with significant changes, the new component will not be reused in the future.

Otherwise, it is advisable to use the widget copy option.

![image2019-3-14\_13-11-53.png](.gitbook/assets/19501609.png)

