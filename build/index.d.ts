import { OpaqueToken, Provider } from "angular2/core";
export declare function safeProvider<T>(token: OpaqueToken): <U extends T>(Klass: new (...args: any[]) => U) => Provider;
