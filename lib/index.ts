import {provide, Provider} from "@angular/core";

export class SafeToken<T> {
    constructor(private name: string){}

    toString() {
        return `Token ${this.name}`
    }
}

export function safeProvide<T>(token:SafeToken<T>) {

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