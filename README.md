# Safe provide

A typesafe way to inject implementations for Typescript interfaces in 
Angular 2.

## Why is this needed?

Angular's `provide` function allows the user to configure how the 
injector will instantiate a token. This is commonly used to inject an
implementation class when a component requires an interface to be 
injected. However, `provide` does not check that the implementation
satisfies the given interface. Consider the following example:

    provide(UserProviderToken, {useClass: HttpUserProvider});
    
Interface information is lost after Typescript compilation. This means 
that no check is performed that `HttpUserProvider` implements 
`UserProvider`. The error only shows up in integration tests (or at
runtime if test coverage is poor). 
 
When using `safe-provide`'s `safeProvide` we get a 
compile-time check that `HttpUserProvider` implements `UserProvider`. 
 
    safeProvide<UserProvider>(UserProviderToken)<HttpUserProvider>(HttpUserProvider);
    
## Usage

1. Install package.
        
        $ npm install safe-provide --save

1. Create an [OpaqueToken](https://angular.io/docs/js/latest/api/core/OpaqueToken-class.html)
for your interface.

        // userProvider.ts
        
        export const UserProviderToken = new OpaqueToken("UserProvider");
        
        export interface UserProvider {
            fetchList():Observable<User[]>
        }

1. Create a safe provider.
        
        // main.ts
        
        import {safeProvide} from "safe-provide";
        
        bootstrap(AppComponent, [
            safeProvide<UserProvider>(UserProviderToken)<HttpUserProvider>(HttpUserProvider)
        ]);
    The `safeProvide` can be used anywhere angular allows providers. 
    Unlike with the Angular `provide` function, Compilation will fail if 
    the `HttpUserProvider` does not implicitly or explicitly implement 
    `UserProvider`. 

1. Inject the `UserProvider` using the `OpaqueToken`.

        // userComponent.ts
        
        @Component({
            // configuration
        })
        export class UsersComponent {
            constructor(@Inject(UserProviderToken) private userProvider:UserProvider) {
            }
        }
 
## More examples

You can see an example project using `safe-provide` 
[here](https://github.com/tygern/mendota).

## Build instructions
```
npm install
typings install
npm run build
```