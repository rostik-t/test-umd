# Component libraries \(in detail\)

Component management function allows user to upload compiled JS component library developed by third parties. Component libraries allows to extend functionality of EHR Form.

Visual component is not only something simple to be rendered on the screen for input data, it can be a complex application with it’s own backend service.

**Components** tab is available for users with Administrator role and is used to upload and download component libraries. Component libraries are available inside separate teams and not shared between teams except basic set of components.

![](../.gitbook/assets/34833896.png)

                                                                                                                                                  **Components tab**

Components is intended for the following:

/\*&lt;!\[CDATA\[\*/  
div.rbtoc1607432791895 {padding: 0px;}  
div.rbtoc1607432791895 ul {list-style: disc;margin-left: 0px;}  
div.rbtoc1607432791895 li {margin-left: 0px;padding-left: 0px;}  
  
/\*\]\]&gt;\*/

* [Component Library Search](./#Componentlibraries%28indetail%29-ComponentLibrarySearch)
* [Creating component library](./#Componentlibraries%28indetail%29-Creatingcomponentlibrary)
* [Adding component library ](./#Componentlibraries%28indetail%29-Addingcomponentlibrary)
* [Editing component library](./#Componentlibraries%28indetail%29-Editingcomponentlibrary)

## EHR Form model description <a id="Componentlibraries(indetail)-EHRFormmodeldescription"></a>

In **EHR Forms** context **openEHR Template** is a composition of **openEHR Archetypes** represented as a single **OPT file** converted to JSON \(simplified template\).

**Form** can be associated with one or multiple openEHR **templates**, this feature allows user to create single form with multiple **Compositions** or dynamic forms like messengers with templates can be loaded at runtime.

**Widget** is a reusable part of a form which is associated with single archetype or a composition of archetypes.

Widgets and archetypes are associated with **Widget class** representation. **Widget class** is a projection of archetypes and archetype slots. **Widget classes** allow to implement a search algorithm which is used to find widgets for a selected archetype and reuse widgets in a form building process.

**Components** are small bricks which are used by form modelers to create a form. The result of form building process is stored as a Form Description data object in JSON format.

**Components** are grouped into **Component library**. Component library is a JS library created by software developers.

![](../.gitbook/assets/34833829.png)

## EHR Forms Component model <a id="Componentlibraries(indetail)-EHRFormsComponentmodel"></a>

**Element** is a base class for all other classes. **Component** class is derived from **Element**;

**Component** is a brick with a portion of UI that can be added to a form from the toolbar;

**Container** is a special type of component which contains a collection of slots;

**Slot** is a place to add child component of any type;

**Containers** is an element that allows to create forms with complex structure;

**WidgetRef** is a component with a reference to a widget reusable on the form;

There is an example with **StackPanel** **container** and **StackPanel slots**. There are other default containers like Table, Repeater, Tabs, etc.

![](../.gitbook/assets/34833832.png)

#### Component Library Search <a id="Componentlibraries(indetail)-ComponentLibrarySearch"></a>

User may search component library by several properties and their combinations.

![](../.gitbook/assets/34835252.png)

* By name or URL - search starts after one symbol;
* By state - form may be active or inactive, so it is possible to view forms in any state or all at once.

All searches work by "and" operator.

"Clear" button clears all currently applied filters.

#### Creating component library <a id="Componentlibraries(indetail)-Creatingcomponentlibrary"></a>

The EHR Forms tool allows third-party developers to create their own component libraries, which can then be dynamically connected to the designer and used in the created forms.

Instructions for creating a new component library **\(relevant for the version of Angular 7.x\)** you can find on the page [Creating Component Library](ehr-forms-creating-component-library.md)

#### Adding component library  <a id="Componentlibraries(indetail)-Addingcomponentlibrary"></a>

To add new component library user needs to click ![](../.gitbook/assets/34833900.png)

* In the **Library Name**, type the name for new component library
* In the **Internal code**, type internal path for new component library
* In the **Library description**, type description for new component library \(if necessary\)
* In the **Version** type the version for new component library
* Use toggle switch to activate new component library
* Click ![](../.gitbook/assets/34833906.png) ****to set dependencies 

User also can add a library from a File using ![](../.gitbook/assets/34833904.png)

If the library was successfully uploaded to the system there would be displayed the list of components in the Components field

![](../.gitbook/assets/34833901.png)

#### Editing component library <a id="Componentlibraries(indetail)-Editingcomponentlibrary"></a>

1\) To start editing library User should click ![](../.gitbook/assets/34835233.png)opposite to desirable item in the list 

![](../.gitbook/assets/34835231.png)

2\) Next, the component library editing panel will open, where User can edit the following:

* **Library file** - component library file \*.tgz format
* **Library name** - name of the component library
* **Internal code** - code name of the component library
* **Library description** - description for the component library
* **Version** - version of the component library
* **State** - can be active or inactive, User can activate new component library using toggle switch 
* **Dependencies** - list of component library dependencies

To add new dependency User should do the following:

* click  ![](../.gitbook/assets/34835244.png) and fill the new loaded fields **Name** and **Bundle URL**
* click ![](../.gitbook/assets/34835246.png)

![](../.gitbook/assets/34835245.png)

* **Components** - list of components of the component library

4\) To save all performed changes User should click ![](../.gitbook/assets/34835254.png)

![](../.gitbook/assets/34835236.png)

### Library contains <a id="Componentlibraries(indetail)-Librarycontains"></a>

| [Accordion](/display/EHR/Accordion) | [Button](/display/EHR/Button) | [Checkbox](/display/EHR/Checkbox) | [Checkbox group](/display/EHR/Checkbox+group) | [Combobox](/display/EHR/Combobox) | [Copy a section](/display/EHR/Copy+a+section) | [Copy value](/display/EHR/Copy+value) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| [Date field](/display/EHR/Date+field) | [Date interval](/display/EHR/Date+interval) | [Depth Stack](/display/EHR/Depth+Stack) | [Dropdown list](/display/EHR/Dropdown+list) | [Extended multiple combobox](/display/EHR/Extended+multiple+combobox) | [Extended radio button](/display/EHR/Extended+radio+button) | [Horizontal stack](/display/EHR/Horizontal+stack) |
| [Information panel](/display/EHR/Information+panel) | [Messenger](/display/EHR/Messenger) | [Modal dialog](/display/EHR/Modal+dialog) | [Multiple combobox](/display/EHR/Multiple+combobox) | [Multiple dropdown list](/display/EHR/Multiple+dropdown+list) | [Multiple number field](/display/EHR/Multiple+number+field) | [Multiple text area](/display/EHR/Multiple+text+area) |
| [Multiple text field](/display/EHR/Multiple+text+field) | [Navigation hidable section](/display/EHR/Navigation+hidable+section) | [Navigation section](/display/EHR/Navigation+section) | [Number field](/display/EHR/Number+field) | [Panel](/display/EHR/Panel) | [Radio button](/display/EHR/Radio+button) | [Range](/display/EHR/Range) |
| [Repeater](/display/EHR/Repeater) | [Searchable dropdown](/display/EHR/Searchable+dropdown) | [Segment switch](/display/EHR/Segment+switch) | [Segment switch group](/display/EHR/Segment+switch+group) | [Slider number](/display/EHR/Slider+number) | [Spinner number](/display/EHR/Spinner+number) | [Switch](/display/EHR/Switch) |
| [Tabs](/display/EHR/Tabs) | [Text area](/display/EHR/Text+area) | [Text field](/display/EHR/Text+field) | [Title](/display/EHR/Title) | [Validation](/display/EHR/Validation) | [Variable](/display/EHR/Variable) | [Vertical stack](/display/EHR/Vertical+stack) |

