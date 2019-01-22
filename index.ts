import "reflect-metadata";

import { injectable, inject, Container } from "inversify";

interface IFoo {
  foo(): void;
}

interface IBar {
  bar(): string;
}

const TYPES = {
  IFoo: Symbol.for("IFoo"),
  IBar: Symbol.for("IBar"),
};

@injectable()
class Bar implements IBar {

  private _foo: IFoo;
  constructor(@inject(TYPES.IFoo) foo: Foo) { this._foo = foo; console.log('bar constructor'); }

  bar(): string {
    this._foo.foo();
    return "bar";
  }

}

@injectable()
class Foo implements IFoo {
  constructor() { console.log('foo constructor'); }

  foo(): void {
    console.log('foo: void');
  }
}

const myContainer = new Container();
myContainer.bind<Foo>(TYPES.IFoo).to(Foo).inSingletonScope();
myContainer.bind<Bar>(TYPES.IBar).to(Bar);

const bar = myContainer.get<Bar>(TYPES.IBar);

console.log(bar.bar());

const bar2 = myContainer.get<Bar>(TYPES.IBar);
console.log(bar2.bar());

