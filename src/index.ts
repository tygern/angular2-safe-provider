import {provide, OpaqueToken, Provider} from "angular2/core";

export function safeProvide<T>(token:OpaqueToken) {

    return {
        useClass<U extends T>(Klass:{new(...args:any[]):U;}):Provider {
            return provide(token, {useClass: Klass});
        }
    };
}