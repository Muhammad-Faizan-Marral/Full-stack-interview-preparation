# TypeScript Interview Notes

## What is TypeScript?

**TypeScript** is an open-source programming language developed by Microsoft. It is a superset of JavaScript that adds **static typing**, making code safer, easier to maintain, and easier to debug.

### Features

- Static Typing
- Object-Oriented Programming
- Interfaces
- Generics
- Type Inference
- Better IDE Support
- Compile-time Error Checking

### Example

```typescript
let name: string = "Faizan";
let age: number = 22;
```

---

# Types

Types define what kind of data a variable can store.

### Primitive Types

```typescript
let name: string = "Faizan";
let age: number = 22;
let isActive: boolean = true;
let nothing: null = null;
let value: undefined = undefined;
```

### Arrays

```typescript
let numbers: number[] = [1, 2, 3];
```

### Object

```typescript
let user: {
  name: string;
  age: number;
};
```

### Function

```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

---

# Interface

An **Interface** defines the structure of an object.

### Example

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "Faizan",
  email: "faizan@gmail.com"
};
```

### Advantages

- Better readability
- Reusable
- Extendable

---

# Type Alias

A **Type Alias** creates a custom type.

### Example

```typescript
type User = {
  id: number;
  name: string;
};
```

### Union

```typescript
type ID = number | string;
```

---

# Interface vs Type

| Interface | Type |
|------------|------|
| Used for objects | Used for any type |
| Supports declaration merging | Does not support declaration merging |
| Can extend other interfaces | Can use intersections |

---

# Generics ⭐⭐⭐⭐⭐

Generics allow code to work with multiple data types while maintaining type safety.

### Without Generics

```typescript
function print(value: any) {
  return value;
}
```

### With Generics

```typescript
function print<T>(value: T): T {
  return value;
}
```

### Multiple Generics

```typescript
function pair<T, U>(a: T, b: U) {
  return { a, b };
}
```

### Generic Interface

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
}
```

### Interview Points

- Reusable
- Type-safe
- Avoids using `any`

---

# Utility Types

TypeScript provides built-in utility types.

- Partial
- Required
- Pick
- Omit
- Record
- Readonly

---

# Enums

Enums represent a fixed set of values.

```typescript
enum Role {
  Admin,
  User,
  Guest
}
```

String Enum

```typescript
enum Status {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED"
}
```

---

# Unknown

`unknown` is a safer version of `any`.

```typescript
let value: unknown = "Hello";

if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

---

# Never

`never` represents values that never occur.

```typescript
function error(message: string): never {
  throw new Error(message);
}
```

---

# Any

`any` disables type checking.

```typescript
let data: any = 10;

data = "Hello";
data = true;
```

Avoid using `any` whenever possible.

---

# Type Narrowing

Type Narrowing reduces a broad type into a more specific type.

```typescript
function print(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

---

# Union Types

A variable can hold multiple types.

```typescript
type ID = string | number;

let id: ID = 10;
id = "abc";
```

---

# Intersection Types

Combines multiple types into one.

```typescript
type Person = {
  name: string;
};

type Employee = {
  salary: number;
};

type Staff = Person & Employee;
```

---

# Mapped Types

Mapped Types create new types from existing ones.

```typescript
type User = {
  name: string;
  age: number;
};

type ReadOnlyUser = {
  readonly [K in keyof User]: User[K];
};
```

---

# Conditional Types

Conditional Types return different types based on conditions.

```typescript
type Result<T> = T extends string ? string : number;
```

---

# Declaration Files

Declaration files (`.d.ts`) provide type information for JavaScript libraries.

Example

```typescript
declare function greet(name: string): void;
```

---

# Type Inference

TypeScript automatically detects the type.

```typescript
let name = "Faizan";
```

TypeScript infers:

```typescript
string
```

---

# Readonly

Readonly properties cannot be modified.

```typescript
interface User {
  readonly id: number;
}
```

---

# Optional Properties

Optional properties use `?`.

```typescript
interface User {
  name: string;
  age?: number;
}
```

---

# Pick

Creates a new type by selecting specific properties.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type UserInfo = Pick<User, "name" | "email">;
```

---

# Omit

Creates a type by removing selected properties.

```typescript
type UserWithoutEmail = Omit<User, "email">;
```

---

# Record

Creates an object type with fixed keys and values.

```typescript
type Users = Record<string, number>;

const data: Users = {
  Faizan: 100,
  Ali: 200
};
```

---

# Partial

Makes every property optional.

```typescript
interface User {
  name: string;
  age: number;
}

type UpdateUser = Partial<User>;
```

---

# Required

Makes every property required.

```typescript
interface User {
  name?: string;
  age?: number;
}

type FullUser = Required<User>;
```

---

# Interview Questions

## TypeScript

- What is TypeScript?
- Why should we use TypeScript instead of JavaScript?
- What are the advantages of TypeScript?

## Types

- What are primitive types?
- What is the difference between `any` and `unknown`?

## Interface

- What is an Interface?
- Difference between Interface and Type?

## Type Alias

- When should you use Type instead of Interface?

## Generics ⭐⭐⭐⭐⭐

- What are Generics?
- Why are Generics important?
- What is `<T>`?
- Can Generics have multiple types?
- Where are Generics commonly used?

## Utility Types

- What are Utility Types?
- Name some built-in Utility Types.

## Enum

- Difference between Numeric Enum and String Enum.

## Unknown

- Difference between `unknown` and `any`.

## Never

- What is the `never` type?
- When is it used?

## Type Narrowing

- What is Type Narrowing?
- How do `typeof` and `instanceof` help?

## Union

- What are Union Types?

## Intersection

- What are Intersection Types?

## Mapped Types

- What are Mapped Types?

## Conditional Types

- What are Conditional Types?

## Declaration Files

- What is a `.d.ts` file?

## Type Inference

- What is Type Inference?

## Readonly

- What is the `readonly` keyword?

## Optional

- What is the difference between Optional and Required properties?

## Pick

- What does `Pick` do?

## Omit

- What does `Omit` do?

## Record

- What is `Record<K, T>`?

## Partial

- What is `Partial<T>`?

## Required

- What is `Required<T>`?


