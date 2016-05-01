import {provide, OpaqueToken, Provider} from "angular2/core";

export function safeProvide<T>(token:OpaqueToken) {

    return {
        useClass<U extends T>(Klass:{new(...args:any[]):U;}): Provider {
            return provide(token, {useClass: Klass});
        },

        useValue<U extends T>(value:U): Provider {
            return provide(token, {useValue: value});
        },

        useFactory<U extends T>(factory:(...args:any[]) => U): Provider {
            return provide(token, {useFactory: factory});
        }
    };
}