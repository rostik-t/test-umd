# EHR Forms : General Description

EHR Forms is a tool to create openEHR based UI forms. It is designed to simplify and speed up development of any kind of applications using openEHR as a foundation. Primary goal is to get rid of openEHR template and archetype complicity when creating UI and to bring as much reusability and versatility in the process as possible.  The Tool provide execution of the following functions:

![](../.gitbook/assets/34833745.png)

&#x20;                                                      **EHR Forms main page (also Forms tab)**

## Tool description <a href="#generaldescription-tooldescription" id="generaldescription-tooldescription"></a>

### Authentication <a href="#generaldescription-authentication" id="generaldescription-authentication"></a>

To log into the system User should enter username and password and press **Login** button.

![](../.gitbook/assets/34833744.png)

### Forms <a href="#generaldescription-forms" id="generaldescription-forms"></a>

In **EHR Forms** context **openEHR Template** is a composition of **openEHR Archetypes** represented as a single **OPT file** converted to JSON (simplified template).

**Form** can be associated with one or multiple openEHR **templates**, this feature allows user to create multiple **Compositions** (or multiple exemplars of the same composition) with use of form or dynamic forms like messengers with templates can be loaded at runtime.

Forms tab (see picture above) allows User to view and manage team's account forms. From this page, User can:

* [Form creation](ehr-forms-forms-in-detail/ehr-forms-form-creation.md)
* [Form editing](ehr-forms-forms-in-detail/ehr-forms-form-editing/)
  * [Source panel](ehr-forms-forms-in-detail/ehr-forms-form-editing/ehr-forms-source-panel.md)
  * [Editor panel](ehr-forms-forms-in-detail/ehr-forms-form-editing/ehr-forms-editor-panel.md)
  * [Settings panel](ehr-forms-forms-in-detail/ehr-forms-form-editing/ehr-forms-settings-panel.md)
  * [Developer tools panel](ehr-forms-forms-in-detail/ehr-forms-form-editing/ehr-forms-developer-tools-panel.md)
* [Form export and import](ehr-forms-forms-in-detail/ehr-forms-form-export-and-import.md)

### Widgets <a href="#generaldescription-widgets" id="generaldescription-widgets"></a>

**Widget** is a reusable part of a form which is associated with single archetype or a composition of archetypes.

Widgets and archetypes are associated with **Widget class** representation. **Widget class** is a projection of archetypes and archetype slots. **Widget classes** allow to implement a search algorithm which is used to find widgets for a selected archetype and reuse widgets in a form building process.

![](../.gitbook/assets/34833757.png)

Widgets page is intended for the following:

* [Widget creation](ehr-forms-widgets-in-detail/ehr-forms-widget-creation.md)
* [Widget editing](ehr-forms-widgets-in-detail/ehr-forms-widget-editing.md)
* [Widget export and import](ehr-forms-widgets-in-detail/ehr-forms-widget-export-and-import.md)
* [Widget version control](ehr-forms-widgets-in-detail/ehr-forms-widget-version-control.md)

### Components <a href="#generaldescription-components" id="generaldescription-components"></a>

**Components** are small bricks which are used by form modelers to create a form. The result of form building process is stored as a Form Description data object in JSON format.

**Components** are grouped into **Component library**. Component library is a JS library created by software developers.

This tab is available for users with Administrator role and is used to upload and export component libraries. Component libraries are available inside separate teams and not shared between teams except basic set of components.

![](../.gitbook/assets/34833894.png)

For more details see [Component libraries](ehr-forms-component-libraries-in-detail/)

### Templates <a href="#generaldescription-templates" id="generaldescription-templates"></a>

In **EHR Forms** context **openEHR Template** is a composition of **openEHR Archetypes** represented as a single **OPT file** converted to JSON (simplified template).

**Form** can be associated with one or multiple openEHR **templates**, this feature allows user to create multiple **Compositions** (or multiple exemplars of the same composition) with use of form or dynamic forms like messengers with templates can be loaded at runtime.

The tab is intended for viewing the list of templates available within the team, searching, viewing the structure of the template, importing opt templates and viewing the list of forms connected with the template.

![](../.gitbook/assets/34833759.png)

On this page User can manually upload templates:

* [Template import](ehr-forms-templates-user-uploaded-in-detail/ehr-forms-template-import.md)

### Terminologies <a href="#generaldescription-terminologies" id="generaldescription-terminologies"></a>

The openEHR terminology is an adjunct to the openEHR reference and archetype models, and provides code sets and vocabularies needed by the models which are language independent. It is not a "real-world" ontology of any kind - i.e. it does not contain representation of facts in areas such as diseases or biochemistry - this is the job of much larger terminologies such as ICDx, ICPC and so on.

![](../.gitbook/assets/34833754.png)

Terminologies page is intended for the following:

* [Add terminology service](ehr-forms-terminologies-in-detail/ehr-forms-add-terminology-service.md)

### My drafts <a href="#generaldescription-mydrafts" id="generaldescription-mydrafts"></a>

Drafts allows User to create drafts of forms or widgets before publishing them as a new version. Every published form or widget has a set of versions, it's not allowed to\
publish one version multiple times, new version is always created when user does publish it.

Single user list of drafts available inside separate teams and not shared between teams.

Tip!

Drafts are shareble inside team between users. User can open draft via link.

![](../.gitbook/assets/34833761.png)

For more details see [My drafts](ehr-forms-my-drafts-in-detail.md)

### Releases <a href="#generaldescription-releases" id="generaldescription-releases"></a>

In Releases section User can see all product releases that are using existing forms.

In release description User can see the list of forms and their versions that have become the part of the release.

To see this section User must have the Administrator role.&#x20;

Realeses have team property, so they are for current team only.

![](../.gitbook/assets/34833763.png)

Releases page is intended for the following:

* [Release creation](ehr-forms-releases-in-detail/ehr-forms-release-creation.md)
* [Release editing](ehr-forms-releases-in-detail/ehr-forms-release-editing.md)
* [Release import](ehr-forms-releases-in-detail/ehr-forms-release-import.md)

For more details see [Releases](ehr-forms-releases-in-detail/)

### Users <a href="#generaldescription-users" id="generaldescription-users"></a>

This section is used for managing user accounts.&#x20;

To see this section User must have the Administrator role.&#x20;

![image2020-2-13\_15-26-57.png](../.gitbook/assets/34833838.png)

For more details see [Users](https://wiki.solit-clouds.ru/pages/viewpage.action?pageId=34832660)

### Teams <a href="#generaldescription-teams" id="generaldescription-teams"></a>

Teams section is available for super team and is used to manage user groups and content for them.

Team members can view and publish content only within their team, such as:

* Forms
* Widgets
* Templates
* Drafts
* Releases
* Component libraries

![](../.gitbook/assets/34839194.png)

For more details see [Teams](ehr-forms-teams-in-detail.md)

### Settings <a href="#generaldescription-settings" id="generaldescription-settings"></a>

Settings section is used for establishing connection with Clinical Data Repository (CDR).

To see this section User must have the Administrator role.&#x20;

![](../.gitbook/assets/34839101.png)

For more details see [Settings](ehr-forms-settings-in-detail.md)
