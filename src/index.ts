import {provide, OpaqueToken, Provider} from "angular2/core";
export function safeProvider<T>(token:OpaqueToken) {
    return function setClass<U extends T>(Klass:{new(...args:any[]):U;}):Provider {
        return provide(token, {useClass: Klass});
    };
}