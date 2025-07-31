# 📘 React Intermediate - Frontend

## 🧠 Overview

This is a frontend application built with **React** and **TypeScript**, designed to help mentees learn intermediate-level frontend development. It demonstrates real-world practices using modern tools and libraries such as:

- **Vite** – fast development and build tool
- **React Query** – efficient data fetching and caching
- **Redux Toolkit** – simplified state management
- **Material UI (MUI)** – prebuilt UI components
- **React Router** – client-side routing
- **Axios** – HTTP client for API communication

---

## ✅ Requirements

Ensure the following are installed before starting:

- Node.js (v18 or higher)
- npm or yarn
- Visual Studio Code or any code editor

---

## 🚀 Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/DavidEHA/React-Intermediate.git
cd React-Intermediate/frontend
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Start the development server:**

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:5173` to view the app.

---

## 🛠️ Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint checks        |

---

## 📁 Project Structure

```
frontend/
├── assets/                     # Static assets
├── node_modules/               # Dependencies
├── src/
│   ├── api/
│   │   ├── queries/            # React Query hooks
│   │   ├── services/           # Axios service functions
│   │   ├── axios.ts            # Axios instance
│   │   └── react-query-keys.ts # Query keys
│   ├── auth/                   # Redux slice for auth
│   ├── common/                 # Hooks and utilities
│   ├── components/             # UI and layout components
│   ├── context/                # Context providers
│   ├── types/                  # Global TypeScript types
│   ├── App.tsx                 # Root component
│   ├── main.tsx                # Entry point
│   ├── queryClient.ts          # React Query client
│   ├── store.ts                # Redux store
│   ├── theme.ts                # MUI theme
│   └── vite-env.d.ts           # Vite environment types
├── index.html                  # HTML entry point
├── package.json                # Project metadata
├── package-lock.json           # Dependency lock
├── README.md                   # Project documentation
├── tsconfig.*.json             # TypeScript configs
├── vite.config.ts              # Vite config
├── eslint.config.js            # ESLint config
└── .gitignore                  # Git ignore rules
```

---

## 📦 Key Libraries & Documentation

| Library         | Purpose             | Documentation                                                             |
| --------------- | ------------------- | ------------------------------------------------------------------------- |
| React           | UI library          | https://react.dev/                                                        |
| TypeScript      | Typed JavaScript    | https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html |
| Vite            | Build tool          | https://vite.dev/guide/                                                   |
| React Router    | Routing             | https://reactrouter.com/home                                              |
| Redux Toolkit   | State management    | https://redux-toolkit.js.org/introduction/getting-started                 |
| Redux Persist   | Persist Redux state | https://github.com/rt2zz/redux-persist                                    |
| React Query     | Data fetching       | https://tanstack.com/query/v5/docs/framework/react/overview               |
| Axios           | HTTP client         | https://axios-http.com/docs/intro                                         |
| MUI             | UI components       | https://mui.com/                                                          |
| React Hook Form | Form handling       | https://react-hook-form.com/                                              |
| nanoid          | Unique IDs          | https://www.npmjs.com/package/nanoid                                      |

---

## 📚 Learning Resources

### React & TypeScript

- React Docs
- TypeScript Handbook
- React TypeScript Cheatsheet

### State Management

- Redux Toolkit
- React Redux
- Redux Persist

### Data Fetching

- React Query
- Axios

### UI & Styling

- Material UI
- Emotion (CSS-in-JS)

### Forms

- React Hook Form

---

## 🌟 Best Practices

- **Modular architecture**: Organized by feature and responsibility
- **Type safety**: TypeScript ensures clarity and early error detection
- **Reusable components**: UI elements are composable and maintainable
- **State management**: Redux Toolkit simplifies logic and structure
- **Data fetching**: React Query handles caching and background updates
- **Context API**: Used for global state like auth and notifications
- **Linting**: ESLint enforces consistent code style

---

# **React Concepts for Beginners – A Mentorship Guide**


## 1. **Common Patterns, Component & Function Abstraction, and Architecture Design**

### 🧠 Why It Matters:

As your app grows, repeating code becomes hard to manage. Abstraction helps you reuse logic and keep your code clean.

### 🔁 Common Patterns:

- **Presentational vs. Container Components**: Separate UI from logic.
- **Higher-Order Components (HOCs)**: Functions that take a component and return a new one.
- **Render Props**: Share code using a function as a child.

### 🧱 Component Abstraction Example:

```jsx
// Button.js
const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

// Usage
<Button label="Click Me" onClick={() => alert("Clicked!")} />;
```

### 🧭 Architecture Tips:

- Group by feature, not file type.
- Use folders like `components/`, `hooks/`, `services/`, `pages/`.
- Keep components small and focused.

---

## 2. **Custom Hooks**

### 🧠 Why Use Them:

Custom hooks let you extract and reuse logic that uses React hooks.

### 🧪 Example:

```jsx
// useCounter.js
import { useState } from "react";

function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount((c) => c + 1);
  return { count, increment };
}

// Usage
const Counter = () => {
  const { count, increment } = useCounter();
  return <button onClick={increment}>Count: {count}</button>;
};
```

---

## 3. **useRef**

### 🧠 What It Does:

- Stores a mutable value that doesn’t trigger re-renders.
- Access DOM elements directly.

### 🧪 Example:

```jsx
import { useRef } from "react";

function FocusInput() {
  const inputRef = useRef();

  const focus = () => inputRef.current.focus();

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focus}>Focus Input</button>
    </>
  );
}
```

---

## 4. **useCallback**

### 🧠 Why Use It:

Prevents unnecessary re-creations of functions, especially useful when passing callbacks to child components.

### 🧪 Example:

```jsx
const handleClick = useCallback(() => {
  console.log("Clicked!");
}, []);
```

---

## 5. **useMemo**

### 🧠 Why Use It:

Memoizes expensive calculations to avoid recalculating on every render.

### 🧪 Example:

```jsx
const expensiveValue = useMemo(() => {
  return computeHeavyTask(input);
}, [input]);
```

### Memoizing Components

`useMemo` helps avoid unnecessary re-renders by memoizing the result of a computation or a component.

#### 🧪 Example: Memoizing a Component

```jsx
import React, { useMemo } from "react";

const ExpensiveComponent = ({ data }) => {
  console.log("Rendering ExpensiveComponent");
  return <div>{data}</div>;
};

const Parent = ({ value }) => {
  const memoizedComponent = useMemo(() => {
    return <ExpensiveComponent data={value} />;
  }, [value]);

  return <div>{memoizedComponent}</div>;
};
```

#### ✅ When to Use:

- When rendering a component is expensive (e.g., large lists, complex UI)
- When props rarely change
- To prevent unnecessary re-renders in child components

---

## 6. **Lazy Loading**

### 🧠 Why Use It:

Split your code and load components only when needed, improving performance.

### 🧪 Example:

```jsx
import React, { Suspense, lazy } from "react";

const LazyComponent = lazy(() => import("./MyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

---

## 7. **Redux Toolkit (RTK)**

Redux Toolkit simplifies Redux development by reducing boilerplate and providing powerful utilities.

#### 🔧 Key Features:

- Built-in `createSlice` for reducers and actions
- `configureStore` with sensible defaults
- Supports async logic with `createAsyncThunk`

#### 📦 Basic Example:

```js
// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

```js
// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: { counter: counterReducer },
});
```

```jsx
// CounterComponent.jsx
import { useSelector, useDispatch } from "react-redux";
import { increment } from "./counterSlice";

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(increment())}>Count: {count}</button>;
}
```

---

## 8. **TanStack Query (React Query)**

### 🧠 What It Does:

Handles server state (data fetching, caching, syncing) with ease.

### 🧪 Example:

```jsx
import { useQuery } from "@tanstack/react-query";

function Users() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users").then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## 9. **Zustand**

### 🧠 What It Does:

Manages global state in React apps with a minimal and scalable API—no context, reducers, or boilerplate needed.

### 🧪 Example:

```ts
import { create } from "zustand";

type Store = {
  count: number;
  increment: () => void;
};

const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

```tsx
function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);

  return <button onClick={increment}>Count: {count}</button>;
}
```

---
