# Component Syntax Overview

Component declaration example is:

```text
@Component({
    selector: 'lib-ehr-multiple-extended-combobox',
    templateUrl: './multiple-extended-combobox.component.html',
    styleUrls: ['./multiple-extended-combobox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@AssignModel(MultipleExtendedCombobox)
export class MultipleExtendedComboboxComponent extends ComboboxGroupExtendedComponent<MultipleExtendedCombobox> implements OnInit {
```

Where `@Component(...)` decorator is usual Angular decorator for Angular component. It contains links to html and scss files. 

We recommend to use `ChangeDetectionStrategy.OnPush` always to improve performance. Forms architecture is designed for `OnPush`strategy in all components.

```text
@AssignModel(MultipleExtendedCombobox)
```

is a decorator for binding component and model. Please refer to [Component Architecture Overwiew](component-architecture-overwiew.md) page to read more about model and component separation.



```text
export class MultipleExtendedComboboxComponent extends ComboboxGroupExtendedComponent<MultipleExtendedCombobox> implements OnInit {
```

This is a child class declaraion. A component class should always be inherited from `BasicComponent` class or its descendents.





