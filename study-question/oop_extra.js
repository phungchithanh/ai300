// Extra OOP questions based on past study topics (OOP in JS/TS & React, SOLID in practice, Python OOP).
PREP_DATA.push(...[
{ cat:"OOP Fundamentals", q:"How does OOP apply in JavaScript/TypeScript and React?",
  a:["JS uses **prototypal inheritance**; `class` syntax is sugar over prototypes",
     "TypeScript adds **interfaces, access modifiers (`private`, `protected`), abstract classes, generics**",
     "Modern React favors **function components + composition** over class inheritance",
     "OOP still applies in **services, API clients, domain models, Angular services**",
     "**Encapsulation** in React = component owns its state; **abstraction** = custom hooks hide complexity; **polymorphism** = components accepting different children/render props"],
  code:`interface Shape { area(): number; }
abstract class Base implements Shape {
  constructor(protected readonly name: string) {}
  abstract area(): number;
  describe() { return this.name + ': ' + this.area().toFixed(2); }
}
class Circle extends Base {
  constructor(private r: number) { super('circle'); }
  area() { return Math.PI * this.r ** 2; }
}` },

{ cat:"SOLID Principles", q:"Give a concrete example of an LSP violation and how to fix it.",
  a:["Classic: **Square extends Rectangle** — setting width also changes height, breaking callers that expect `area = w * h`",
     "Another: `ReadOnlyCollection.Add()` throwing `NotSupportedException` — subtype **can't do what the base promises**",
     "Signs of violation: overrides that **throw**, **do nothing**, **strengthen preconditions** or **weaken postconditions**, `if (x is SubType)` checks",
     "Fix: **redesign the hierarchy** — use a common interface (`IShape`) or split interfaces (`IReadable`, `IWritable`)"],
  code:`// Violation
class Bird { virtual void Fly() { } }
class Penguin : Bird { override void Fly() => throw new NotSupportedException(); }

// Fix: split the abstraction
interface IBird { void Eat(); }
interface IFlyingBird : IBird { void Fly(); }
class Sparrow : IFlyingBird { public void Eat() {} public void Fly() {} }
class Penguin : IBird { public void Eat() {} }` },

{ cat:"SOLID Principles", q:"How do SOLID principles apply to front-end code (Angular/React)?",
  a:["**S** – a component renders UI; data fetching goes into a **service / custom hook**",
     "**O** – extend via **composition, props, content projection, strategy injection** instead of editing the component",
     "**L** – any component implementing an interface (e.g. `ControlValueAccessor`) must work wherever the base is expected",
     "**I** – small, focused props/inputs; don't pass a giant `config` object to every child",
     "**D** – depend on **abstractions**: Angular `InjectionToken`/abstract class; React context providing an interface (easy to mock in tests)"] },

{ cat:"Python OOP", q:"How does Python implement OOP (class, self, __init__, instance vs class attributes)?",
  a:["`class` defines a type; `__init__` is the **initializer** (constructor is `__new__`)",
     "`self` = explicit reference to the **current instance** (like `this`)",
     "**Instance attributes** set on `self`; **class attributes** shared by all instances",
     "Everything is an object; classes are objects too (instances of `type`)",
     "No real access modifiers — conventions instead (`_protected`, `__private`)"],
  code:`class Account:
    bank = "Contoso"                 # class attribute (shared)

    def __init__(self, owner: str, balance: float = 0):
        self.owner = owner           # instance attributes
        self._balance = balance

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount

acc = Account("Ana", 100)
acc.deposit(50)` },

{ cat:"Python OOP", q:"How do encapsulation and properties work in Python (_ , __ name mangling, @property)?",
  a:["`_name` – **convention** for internal/protected; still accessible",
     "`__name` – **name mangling** → becomes `_ClassName__name`; avoids accidental override in subclasses (not true security)",
     "**`@property`** exposes a getter like an attribute; `@x.setter` adds validation",
     "Pythonic style: start with public attributes, switch to `@property` later **without breaking callers**"],
  code:`class Temperature:
    def __init__(self, celsius: float):
        self.celsius = celsius               # goes through the setter

    @property
    def celsius(self) -> float:
        return self._celsius

    @celsius.setter
    def celsius(self, value: float) -> None:
        if value < -273.15:
            raise ValueError("Below absolute zero")
        self._celsius = value

    @property
    def fahrenheit(self) -> float:          # read-only computed property
        return self._celsius * 9 / 5 + 32` },

{ cat:"Python OOP", q:"How do inheritance, super() and MRO work in Python (including multiple inheritance)?",
  a:["Python supports **multiple inheritance**: `class C(A, B)`",
     "**MRO (Method Resolution Order)** uses **C3 linearization**; inspect with `C.__mro__` or `C.mro()`",
     "`super()` calls the **next class in the MRO**, not necessarily the direct parent → enables **cooperative** multiple inheritance",
     "Solves the **diamond problem**: each class appears once in the MRO",
     "**Mixins** = small classes adding behavior (e.g. `JsonMixin`) combined via multiple inheritance"],
  code:`class A:
    def hello(self): return "A"
class B(A):
    def hello(self): return "B>" + super().hello()
class C(A):
    def hello(self): return "C>" + super().hello()
class D(B, C):
    def hello(self): return "D>" + super().hello()

print(D().hello())   # D>B>C>A
print([k.__name__ for k in D.__mro__])  # ['D', 'B', 'C', 'A', 'object']` },

{ cat:"Python OOP", q:"How do you define abstract classes and interfaces in Python (abc, duck typing, Protocol)?",
  a:["**`abc.ABC` + `@abstractmethod`** – cannot instantiate until all abstract methods are implemented",
     "**Duck typing** – 'if it walks like a duck…': Python checks behavior at runtime, not type",
     "**`typing.Protocol`** – **structural typing** (static interface); any class with matching methods satisfies it, no inheritance needed",
     "Use ABC for shared base behavior; Protocol for loose coupling / DIP"],
  code:`from abc import ABC, abstractmethod
from typing import Protocol

class PaymentProvider(ABC):
    @abstractmethod
    def charge(self, amount: float) -> str: ...

class StripeProvider(PaymentProvider):
    def charge(self, amount: float) -> str:
        return f"stripe:{amount}"

class Notifier(Protocol):
    def send(self, msg: str) -> None: ...

class EmailNotifier:                 # no inheritance needed
    def send(self, msg: str) -> None: print("email", msg)

def alert(n: Notifier) -> None: n.send("Hi")` },

{ cat:"Python OOP", q:"What is the difference between @staticmethod, @classmethod and instance methods?",
  a:["**Instance method** – receives `self`; works with instance data",
     "**`@classmethod`** – receives `cls`; used for **alternative constructors / factory methods**, works with subclasses",
     "**`@staticmethod`** – receives nothing implicit; a utility function grouped in the class namespace"],
  code:`class User:
    def __init__(self, name: str, email: str):
        self.name, self.email = name, email

    @classmethod
    def from_csv(cls, line: str) -> "User":       # factory, subclass-friendly
        name, email = line.split(",")
        return cls(name, email)

    @staticmethod
    def is_valid_email(email: str) -> bool:
        return "@" in email

    def greet(self) -> str:
        return f"Hi {self.name}"` },

{ cat:"Python OOP", q:"What are dunder (magic) methods and dataclasses in Python?",
  a:["**Dunder methods** let objects integrate with Python syntax (**operator overloading / polymorphism**)",
     "`__str__` / `__repr__` – string forms; `__eq__` / `__hash__` – equality & dict keys; `__lt__` – sorting",
     "`__len__`, `__getitem__`, `__iter__` – act like a collection; `__enter__`/`__exit__` – `with` context manager; `__call__` – callable object",
     "**`@dataclass`** auto-generates `__init__`, `__repr__`, `__eq__` (and ordering/hash with options); `frozen=True` → immutable"],
  code:`from dataclasses import dataclass, field

@dataclass(frozen=True)
class Money:
    amount: float
    currency: str = "USD"

    def __add__(self, other: "Money") -> "Money":
        if self.currency != other.currency:
            raise ValueError("Currency mismatch")
        return Money(self.amount + other.amount, self.currency)

print(Money(5) + Money(7))   # Money(amount=12, currency='USD')` },
]);
