# Safe provide

A typesafe way to inject implementations for Typescript interfaces in 
Angular 2.

## Why is this needed?

Angular's allows the user to configure how the 
injector will instantiate a token. This is commonly used to inject an
implementation class when a component requires an interface to be 
injected. However, Angular does not check that the implementation
satisfies the given interface. Consider the following example:

    {provide: UserProviderToken, useClass: HttpUserProvider}
    
Interface information is lost after Typescript compilation. This means 
that no check is performed that `HttpUserProvider` implements 
`UserProvider`. The error only shows up in integration tests (or at
runtime if test coverage is poor). 
 
When using `safe-provide`'s `safeProvide` function we get a 
compile-time check that `HttpUserProvider` implements `UserProvider`. 
 
    safeProvide(UserProviderToken).useClass(HttpUserProvider);
    
## Usage

In the following example we configure angular to inject an instance of 
the `HttpUserProvider` class for the `UserProvider` interface. 

1. Install package.
        
        $ npm install safe-provide --save

1. Create a `SafeToken` for your interface.

        // userProvider.ts
        
        import {SafeToken} from "safe-provide";
        
        export const UserProviderToken = new SafeToken<UserProvider>("UserProvider");
        
1. Configure a provider using `safeProvide`.
        
        // main.ts
        
        import {safeProvide, SafeToken} from "safe-provide";
        
        bootstrap(AppComponent, [
            safeProvide(UserProviderToken).useClass(HttpUserProvider)
        ]);
    The `safeProvide` function can be used anywhere angular allows provider 
    configuration. Unlike with the Angular `provide` function, compilation 
    will fail if the `HttpUserProvider` does not implicitly or explicitly 
    implement `UserProvider`. We also have the option of providing a value
    
        safeProvide(UserProviderToken).useValue(new HttpUserProvider())
        
    or a factory function that returns an `HttpUserProvider`.
    
        safeProvide(UserProviderToken).useFactory(userProviderFactory)

1. Inject the `UserProvider` by passing the `SafeToken` to `@Inject`.


        // userComponent.ts
        
        @Component({
            // configuration
        })
        export class UsersComponent {
            constructor(@Inject(UserProviderToken) private userProvider:UserProvider) {
            }
        }
