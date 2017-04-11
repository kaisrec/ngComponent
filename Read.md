#
# Components in Angular 1.5.x

Since the 1.5 version was released, components have become first class citizens just like in Angular 2, Ember 2, React, etc. On the other hand, components aren&#39;t so revolutionary. We have already known them for a long time as directives, but we never used them like this. Generally, we would only use directives for manipulating the DOM directly or, in some cases, to build reusable parts.

The components in Angular 1.5 are a special kind of directive with a few more restrictions and a simpler configuration. The main differences between directives and components are:

- Components are restricted to elements. You can&#39;t write a component as an attribute.
- Components always have an isolated scope. This enforces a clearer dataflow. No longer will we have code that will change data on shared scopes.
- No more link functions. Only a well-defined API on the controller.
- A component is defined by an object and no longer by a function call.

## **Well-defined Lifecycle**

Components have a well-defined lifecycle:

**$onInit** : This callback is called on each controller after all controllers for the element are constructed, and their bindings initialized. In this callback, you are also sure that all the controllers you require are initialized and can be used. (Since Angular 1.5.0).

**$onChanges** : This callback is called each time the one-way bindings are updated.  The callback provides an object containing the changed bindings with their current and previous value. Initially, this callback is called before the $onInit with the original values of the bindings at initialization time. This is why this is the ideal place for cloning your objects passed through the bindings to ensure modifications will only affect the inner state.

Please be aware that the changes callback on the one-way bindings for objects will only be triggered if the object references changes. If a property inside the object changes, the changes callback won&#39;t be called. This avoids adding a watch to monitor the changes made in the parent scope. (Works correctly since Angular 1.5.5)

**$postLink** : This is called once all child elements are linked. This is similar to the (post) link function inside directives. Setting up DOM handlers or direct DOM manipulation can be done here. (Since Angular 1.5.3)

**$onDestroy** : This is the equivalent of the $destroy event emitted by the scope of a directive/controller. The ideal place to clean up external references and avoid memory leaks. (Since Angular 1.5.3)

## **Well-defined structure**

Components also have a clean structure. They exist out of 3 parts:

- A view which can be a template or an external file.
- A controller which describes the behaviour of the component.
- Bindings, the inputs and outputs of the component. The inputs will receive the data from a parent component, and, by using callbacks, will inform the parent component of any changes made to the component.

## **Bindings**

Because components should only be allowed to modify their internal state and should never modify any data directly outside its component and scope. We should no longer make use of the commonly used two-way binding **(bindings: { twoWay: &quot;=&quot; } ).**Instead, since Angular 1.5 we now have a one-way binding for expressions **(bindings: { oneWay: &quot;&lt;&quot; } )**

The main difference with the two-way binding is the fact that the bound properties won&#39;t be watched inside the component. So if you assign a new value to the property, it won&#39;t affect the object on the parent. But be careful, this doesn&#39;t apply in the fields of the property, which is why you always should clone the objects passed through the bindings if you want to change them. A good way to do this is working with named bindings, this way you can reuse the name of the bound property inside the component without affecting the object in the parent scope.

 
    module.component("component",{
      template: "<div>{{$ctrl.item}}</div>",
      bindings: {inputItem: "<item"},
      controller: function(){
          var $ctrl = this;
          this.$onChanges = function(changeObj){
              if(changeObj.inputItem){
                  this.item =
                      angular.clone(changeObj.inputItem.currentValue);
              }
          }
      }
    })
 Another way to pass data is by using the &quot;@&quot; binding. This can be used if the value you are passing is a string value. The last way is using a &quot;&amp;&quot; binding or a callback to retrieve data through a function call on the parent. This can be useful if you want to provide an autocomplete component with search results data.

 For exposing the changes inside the component we can only make use of the &quot;&amp;&quot; binding. Calling a callback in the parent scope is the only way that we can and should pass data to the parent scope/component.

 Let&#39;s rephrase a little:

**&quot;=&quot; binding** (two-way) should no longer be used to avoid unwanted changes in the parent&#39;s scope.

**&quot;&lt;&quot; binding** (one-way) should be used to retrieve data from the parent scope passed as an expression.

**&quot;@&quot; binding** (string) should be used to retrieve string values from the parent scope.

**&quot;&amp;&quot; binding** (callback) can be used to either retrieve data from the parent scope, or be used as the only way to pass data to the parent scope.
