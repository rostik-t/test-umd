# Connect EHR Forms to your application

1. Import these modules in your NgModule:

```text
import { RendererAngularModule } from `ehr-forms/renderer-angular';
import { DefaultLibraryModule } from `ehr-forms/default-library-angular’;  
import { NavigationLibraryModule } from `ehr-forms/navigation-library-angular';
import { LucidusModule } from '`solit/lucidus’;  
…  
RendererAngularModule.forRoot({ locale: 'en' }),  
DefaultLibraryModule,  
NavigationLibraryModule,  
LucidusModule.forRoot(),  
…
```

2. Get Form Description JSON \(you can store it in your storage or use api method `/api/form/{ id }`\)

```text
const formDescription = this.ehrFormsApiService.getFormById(formId);
```

From this step you may use EHR Forms API methods:  
`/api/form/{ id }`  
`/api//template/{ id }`  
`/api/composition/convert`

Please include header with token: X-AUTHENTICATION-TOKEN: \(token should be requested from EHR Forms product owner\)

3. Get Web Template \(use api method `/api/template/{ id }`\)

```text
const webTemplate = this.ehrFormsApiService.getWebTemplate(templateId); 
```

4. Load the form

```text
this.form = FormComponent.open(formDescription); // FormComponent is a @ehr-forms/renderer object
```

5. Get composition and convert it to StructuredJSON format using the converter `/api/composition/convert`

Skip this step if you are creating a new form rather than opening an existing one

```text
const compositionCDR = getCompositionFromCDR(); // this is your own method, you can get an existing composition from your CDR  
// use api method /api/composition/convert to make compositionCDR STRUCTURED if it is in other format  
const structuredComposition = this.ehrFormsApiService.convertCompositionToJSON(compositionCDR);
```

6. Load composition to the form

```text
    // Replace structuredComposition with {} if you create new form
    this.composition = new OpenEhrObjectFactoryImpl(webTemplate).create(structuredComposition).get<Composition>();
    const dataContext = new CompositionDataContext([this.composition]);
    this.form.load(dataContext);
```

7. Pass your `form` object to `ehr-forms` angular component in your HTML

```text
<ehr-form [model]=“form” [locale]=“‘ru’”></ehr-form>
```

Now you can start your application, the form should be rendered properly.  
There are some additional settings that can be used in forms, please refer to the next sections of this guide

