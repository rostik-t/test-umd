# Add environment variables to the form

Environment variable is a variable of any type \(e.g. Boolean, Function, Subject, etc.\) that can be passed from an application to a form.

```text
import {EnvironmentProvider} from '@ehr-forms/renderer';
import {EMPTY, Observable, of} from 'rxjs';
import { Environment } from '@ehr-forms/renderer';
 
// EnvironmentProvider interface implementation
export class EnvironmentCustomProvider implements EnvironmentProvider {
    public getVariable(config): Observable<any> {
        switch (code) {
            case 'config' : {
                return of({...config});
            }
            default: {
                return EMPTY;
            }
        }
    }
}
 
//.......
Environment.registerProvider(new EnvironmentCustomProvider(config));
```

