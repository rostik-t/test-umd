# Component Architecture Overwiew

A proper designed component consists of model and component classes. Model should contain all business logic and does not know anything about specific framework \(e.g. Angular\). Component should contain only view implementation and no business logic or calculations are permitted there.

### Model

This is a class which describes component's business logic. It should be derived from BindableComponent or its descendents. 

This class contains:

* title and icon declaration
* properties declaration
* validation logic
* any other business logic or calculations to be performed

There are a few methods that may be overrided to implement component's specific logic. Please refer to the Component Model API \(to be done\) to view full list of methods available for overriding.

### Component

Component is an Angular component which contains html, \(s\)css and ts classes. Typescript class should be derived from Basic component or its descendents. 

This class contains:

* Angular web hooks
* Angular links to HTML structures \(e.g. @ViewChild\)
* Any view logic that is framework-specific and cannot be extracted to model

There is a specific method 

```text
onModelUpdated()
```

that can be overriden in a derived class. This method is fired anytime the component or its nested components have changed. Therefore, this method can be used to update the view or recalculate smth if needed.

