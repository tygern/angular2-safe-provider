import {safeProvide, SafeToken} from "../lib/index";
import {ReflectiveInjector} from "@angular/core"

describe('saveProvide', () => {

    interface FakeInterface {
        fakeAction():String;
    }

    class FakeClass implements FakeInterface {
        fakeAction():String {
            return "it works";
        }
    }

    it('works with classes', () => {
        let token = new SafeToken<FakeInterface>("FakeInterface");
        var injector = ReflectiveInjector.resolveAndCreate([
            safeProvide(token).useClass(FakeClass)
        ]);

        var injectedValue = injector.get(token);
        expect(FakeClass.prototype.isPrototypeOf(injectedValue)).toEqual(true);
    });

    it('works with values', () => {
        let token = new SafeToken<FakeInterface>("FakeInterface");
        let instance = new FakeClass();

        var injector = ReflectiveInjector.resolveAndCreate([
            safeProvide(token).useValue(instance)
        ]);

        expect(injector.get(token)).toEqual(instance);
    });

    it('works with factories', () => {
        let token = new SafeToken<FakeInterface>("FakeInterface");
        let instance = new FakeClass();

        var injector = ReflectiveInjector.resolveAndCreate([
            safeProvide(token).useFactory(() => { return instance; })
        ]);

        expect(injector.get(token)).toEqual(instance);
    });
});