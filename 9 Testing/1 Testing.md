# Testing

## What is Testing?

**Testing** is the process of verifying that your application works correctly and behaves as expected. It helps detect bugs early and ensures your code remains reliable after changes.

### Benefits

- Improves code quality
- Reduces bugs
- Prevents regressions
- Makes refactoring safer
- Increases confidence before deployment

---

# Unit Testing

## What is Unit Testing?

**Unit Testing** tests a single unit of code (such as a function, method, or component) in isolation.

### Characteristics

- Tests one function or component
- Fast execution
- Independent of external services
- Uses mocks for dependencies

### Example (Jest)

```javascript
function add(a, b) {
  return a + b;
}

test("adds two numbers", () => {
  expect(add(2, 3)).toBe(5);
});
```

### Advantages

- Easy to write
- Fast execution
- Easy debugging
- High code reliability

---

# Integration Testing

## What is Integration Testing?

**Integration Testing** verifies that multiple modules or components work correctly together.

### Examples

- API + Database
- Controller + Service
- React Component + API
- Authentication Flow

### Example

```javascript
// Test API + Database

const response = await request(app)
  .post("/users")
  .send({
    name: "Faizan"
  });

expect(response.status).toBe(201);
```

### Advantages

- Detects communication issues
- Tests complete workflows
- Ensures components integrate correctly

---

# Unit Testing vs Integration Testing

| Unit Testing | Integration Testing |
|--------------|---------------------|
| Tests a single unit | Tests multiple modules together |
| Uses mocked dependencies | Uses real integrations when possible |
| Very fast | Slower |
| Easier to debug | More complex |
| Isolated | End-to-end workflow between modules |

---

# Jest

## What is Jest?

**Jest** is a JavaScript testing framework developed by **Meta**. It is commonly used for testing JavaScript, TypeScript, React, and Node.js applications.

### Installation

```bash
npm install --save-dev jest
```

---

## Basic Test

```javascript
function multiply(a, b) {
  return a * b;
}

test("multiplies numbers", () => {
  expect(multiply(4, 5)).toBe(20);
});
```

---

## Common Matchers

```javascript
expect(value).toBe(10);

expect(value).toEqual({
  name: "Faizan"
});

expect(value).toBeTruthy();

expect(value).toBeFalsy();

expect(array).toContain("React");

expect(value).toBeNull();

expect(value).toBeUndefined();
```

---

## Lifecycle Hooks

```javascript
beforeEach(() => {
  // Runs before every test
});

afterEach(() => {
  // Runs after every test
});

beforeAll(() => {
  // Runs once before all tests
});

afterAll(() => {
  // Runs once after all tests
});
```

---

## Snapshot Testing

```javascript
expect(container).toMatchSnapshot();
```

Snapshot testing detects unexpected UI changes.

---

# React Testing Library (RTL)

## What is React Testing Library?

**React Testing Library (RTL)** is a library for testing React components by simulating how users interact with the application.

### Installation

```bash
npm install --save-dev @testing-library/react
```

---

## Render Component

```javascript
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders heading", () => {
  render(<App />);

  expect(
    screen.getByText("Welcome")
  ).toBeInTheDocument();
});
```

---

## User Interaction

```javascript
import userEvent from "@testing-library/user-event";

await userEvent.click(button);

await userEvent.type(input, "Faizan");
```

---

## Query Methods

```javascript
screen.getByText();

screen.getByRole();

screen.getByLabelText();

screen.getByPlaceholderText();

screen.findByText();

screen.queryByText();
```

### Advantages

- Tests from the user's perspective
- Encourages accessible applications
- Integrates seamlessly with Jest

---

# Supertest

## What is Supertest?

**Supertest** is a library for testing HTTP APIs in Node.js and Express applications.

### Installation

```bash
npm install --save-dev supertest
```

---

## GET Request

```javascript
import request from "supertest";
import app from "./app";

test("GET /users", async () => {
  const response = await request(app)
    .get("/users");

  expect(response.status).toBe(200);
});
```

---

## POST Request

```javascript
await request(app)
  .post("/users")
  .send({
    name: "Faizan"
  })
  .expect(201);
```

### Advantages

- Tests REST APIs
- No need to start the server manually
- Works well with Express and Jest

---

# Mocking

## What is Mocking?

**Mocking** replaces real dependencies with fake implementations during testing.

Instead of calling:

- Database
- External APIs
- File System
- Email Service

You use mock objects or functions.

---

## Why Use Mocking?

- Faster tests
- Independent tests
- Predictable results
- No external dependencies

---

## Mock Function

```javascript
const fetchData = jest.fn();

fetchData.mockReturnValue("Success");
```

---

## Mock Module

```javascript
jest.mock("./userService");
```

---

## Mock API

```javascript
jest.mock("axios");
```

```javascript
axios.get.mockResolvedValue({
  data: []
});
```

---

## Mock Timer

```javascript
jest.useFakeTimers();
```

---

# Testing Pyramid

```
             E2E Tests
        -------------------
      Integration Tests
   ------------------------
        Unit Tests
```

### Rule

- Write many Unit Tests.
- Write fewer Integration Tests.
- Write only essential End-to-End Tests.

---

# Best Practices

- Write small, focused tests.
- Test one behavior per test.
- Use descriptive test names.
- Mock external dependencies.
- Avoid testing implementation details.
- Test from the user's perspective.
- Keep tests independent.
- Run tests in CI/CD pipelines.

---

# Interview Questions

## Testing

- What is software testing?
- Why is testing important?
- What are the different types of testing?

## Unit Testing

- What is Unit Testing?
- What are the benefits of Unit Testing?
- When should you use Unit Testing?

## Integration Testing

- What is Integration Testing?
- How is it different from Unit Testing?
- What should Integration Tests verify?

## Jest

- What is Jest?
- What are Jest matchers?
- What is Snapshot Testing?
- What are `beforeEach()` and `afterEach()` used for?
- How do you run Jest tests?

## React Testing Library

- What is React Testing Library?
- Why is it preferred for testing React components?
- What is the purpose of `screen`?
- What is `userEvent`?
- What is the difference between `getByText()` and `queryByText()`?

## Supertest

- What is Supertest?
- Why is Supertest used with Express?
- How do you test GET and POST endpoints?

## Mocking

- What is Mocking?
- Why should you mock external APIs?
- What is `jest.fn()`?
- What is `jest.mock()`?
- When should you use mocks instead of real services?
