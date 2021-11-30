# Working with the form

When the form is rendered, the following options are available:\
1\. Run Actions (see [Execute Actions](http://localhost:3004/#/forms/developer-guide/1-connect-to-app/6-actions)).\
2\. Pass variables to the form (see [Environment Variables](http://localhost:3004/#/forms/developer-guide/1-connect-to-app/5-env-variables)).\
3\. Add data providers (see [External Terminologies](http://localhost:3004/#/forms/developer-guide/1-connect-to-app/4-terminologies)).\
4\. Validate the whole form.\
5\. Navigate through the form errors.\
6\. Save composition.

This topic will cover options 4-6.

### Validate the whole form.

`const messages: Message[] = form.validate(true)`\
This will return all the validation errors in the `Message[]` type from ‘@ehr-forms/renderer’;

### Navigate through the form errors.

```
// Get element ID
const currentMessageElementId = messages[0].element.runtimeId
// Scroll to current error
document.querySelector(`#id-${ currentMessageElementId }`).scrollIntoView()
```

### Save composition.

1\. `composition.save() // this will update JSON in the internal composition object`\
2\. `const structuredComposition = composition.getComposition() // this will return STRUCTURED composition data.`

Always use composition.save() prior to extracting the composition with composition.getComposition()

3\. Convert STRUCTURED composition in XML format if you use openEHR REST API

```
// use api method */api/composition/convert* to get XML representation of composition
const XMLComposition = this.ehrFormsApiService.convertCompositionToXML(structuredComposition); 
```

4\. Save `XMLComposition` in your CDR
