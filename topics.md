
# React Intermediate Mentorship Topics

---

# Component Structure and Abstraction  

## Overview

A guide to organizing and abstracting components in React applications, with scalable patterns that adapt to different project sizes and complexities.

---

## What is Component Abstraction

**Breaking down UI and logic into smaller, reusable, and focused components.**

Component abstraction is the process of separating concerns within a component to improve reusability, readability, and maintainability. It allows developers to isolate responsibilities such as layout, logic, and side effects, making components easier to test and reuse.

---

### Example: Form Abstraction

#### Without abstraction (monolithic form)

```tsx
function UserForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name, email, role });
      }}
    >
      <label>Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <label>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Role</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

#### With abstraction (modular form)

```tsx
// shared/components/FormField.tsx
export function FormField({ label, children }) {
  return (
    <div className="form-field">
      <label>{label}</label>
      {children}
    </div>
  );
}

// features/users/components/UserForm.tsx
import { FormField } from "@/shared/components/FormField";

export function UserForm({ formState, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <FormField label="Name">
        <input value={formState.name} onChange={onChange("name")} />
      </FormField>

      <FormField label="Email">
        <input value={formState.email} onChange={onChange("email")} />
      </FormField>

      <FormField label="Role">
        <select value={formState.role} onChange={onChange("role")}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </FormField>

      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Structuring a React App by Size

**How project structure evolves from simple to complex applications.**

### Small Applications

**Flat structure with minimal separation of concerns.**

```
src/
├── components/
├── pages/
├── App.tsx
└── main.tsx
```

Use this structure for prototypes, learning projects, or apps with fewer than 5 screens.

**Example:** A to-do list app with a single page and a few components.

---

### Medium Applications

**Feature-based structure with shared UI and logic.**

```
src/
├── features/
│   ├── auth/
│   └── posts/
├── shared/
│   ├── components/
│   └── hooks/
├── app/
└── types/
```

Use this structure for MVPs, internal tools, or apps with multiple domains.

**Example:** A blog platform with authentication, post management, and user profiles.

---

### Large Applications

**Modular and scalable architecture for production-grade apps.**

```
src/
├── app/
├── features/
│   └── posts/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── types/
│       └── index.ts
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
├── entities/
├── widgets/
├── processes/
└── types/
```

Use this structure for apps with multiple teams, complex business logic, or long-term maintenance needs.

**Example:** An e-commerce platform with product catalog, checkout, user accounts, and admin dashboard.

---

## Colocation

**Keeping related files close together to improve discoverability.**

Colocation means placing files that change together in the same folder. For example, a component, its styles, tests, and hooks can live in the same directory.

**Example:**

```
features/posts/components/PostCard/
├── PostCard.tsx
├── PostCard.test.tsx
├── PostCard.module.css
└── usePostCard.ts
```

---

## Component Types

**Understanding the roles of different component categories.**

- **Presentational components**: Stateless, focused on UI.

  ```tsx
  export function Button({ children, ...props }) {
    return <button {...props}>{children}</button>;
  }
  ```

- **Container components**: Handle logic, state, and data fetching.

  ```tsx
  export function PostListContainer() {
    const { data: posts } = usePosts();
    return <PostList posts={posts} />;
  }
  ```

- **Layout components**: Define page structure and composition.

  ```tsx
  export function DashboardLayout({ children }) {
    return (
      <div className="dashboard">
        <Sidebar />
        <main>{children}</main>
      </div>
    );
  }
  ```

- **Page components**: Route-level components used in frameworks like Next.js.

  ```tsx
  export default function HomePage() {
    return (
      <DashboardLayout>
        <PostListContainer />
      </DashboardLayout>
    );
  }
  ```

---

## Shared vs Feature-Specific Components

**Deciding where a component belongs based on its scope.**

- If a component is reused across multiple features, place it in `shared/components`.
- If it’s tightly coupled to a domain (e.g., `PostCard`), place it in `features/posts/components`.

**Example:**

- `shared/components/Button.tsx` → used in forms, modals, etc.
- `features/comments/components/CommentCard.tsx` → only used in the comments feature.

---

## Barrel Files (`index.ts`)

**Simplifying imports and improving module boundaries.**

Barrel files re-export modules from a folder to allow cleaner imports:

```ts
// features/posts/index.ts
export * from "./components/PostCard";
export * from "./services/postService";
```

```ts
import { PostCard } from "@/features/posts";
```

---

## Design Patterns in Component Architecture

**Common patterns that improve structure and scalability.**

- **Smart/Dumb Components**: Separate logic (smart) from presentation (dumb).

  ```tsx
  // Smart
  export function PostContainer() {
    const { data } = usePosts();
    return <PostList posts={data} />;
  }

  // Dumb
  export function PostList({ posts }) {
    return posts.map((post) => <PostCard key={post.id} {...post} />);
  }
  ```

- **Compound Components**: Allow flexible composition.

  ```tsx
  <Tabs>
    <Tabs.List>
      <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
      <Tabs.Trigger value="b">Tab B</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="a">Content A</Tabs.Content>
    <Tabs.Content value="b">Content B</Tabs.Content>
  </Tabs>
  ```

- **Provider Pattern**: Share global state or context.

  ```tsx
  <AuthProvider>
    <App />
  </AuthProvider>
  ```

---

## Testing and Maintainability

**How structure affects testability and long-term maintenance.**

- Smaller, focused components are easier to test.
- Colocated tests improve discoverability.
- Abstracted logic (e.g., hooks, services) can be tested independently.

---

# Custom Hooks  

## Overview

Custom hooks allow you to extract and reuse stateful logic across components, promoting cleaner and more maintainable code.

---

## What is a Custom Hook

**Encapsulating reusable logic into a function that follows the rules of hooks.**

A custom hook is a JavaScript function whose name starts with `use` and that may call other hooks. It enables you to share logic between components without repeating code or restructuring your component tree.

```tsx
// shared/hooks/useCounter.ts
import { useState } from "react";

export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  return { count, increment, decrement };
}
```

---

## Why Use Custom Hooks

**Improving code reuse, readability, and separation of concerns.**

Instead of duplicating logic across components, you can abstract it into a hook. This makes your components smaller and easier to test.

```tsx
// components/Counter.tsx
import { useCounter } from "@/shared/hooks/useCounter";

export function Counter() {
  const { count, increment, decrement } = useCounter(5);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

---

## Rules of Custom Hooks

**Custom hooks must follow the same rules as built-in hooks.**

- Only call hooks at the top level.
- Only call hooks from React functions or other custom hooks.
- Always prefix with `use`.

Violating these rules can lead to unpredictable behavior or runtime errors.

---

## Composing Hooks

**Custom hooks can use other hooks to build more complex logic.**

You can compose multiple hooks inside a custom hook to encapsulate more advanced behavior.

```tsx
// shared/hooks/useForm.ts
import { useState } from "react";

export function useForm<T>(initialValues: T) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return { values, handleChange };
}
```

---

## Parameterization and Return Shape

**Designing flexible hooks with clear input and output contracts.**

Custom hooks should accept parameters to configure their behavior and return a consistent, predictable shape (object or tuple).

```tsx
// shared/hooks/useToggle.ts
import { useState } from "react";

export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((v) => !v);
  return [value, toggle] as const;
}
```

---

## Good Practices for Custom Hooks

**Naming, structure, and testing considerations.**

- Prefix with `use` to follow conventions and enable linting.
- Keep them small and focused on a single responsibility.
- Place them in a `shared/hooks` or `features/.../hooks` folder.
- Write unit tests for hooks using libraries like `@testing-library/react-hooks` or `vitest`.

---

## Summary

Custom hooks are a powerful abstraction for sharing logic in React. They help reduce duplication, improve readability, and promote modular design. By following the rules of hooks and designing them with clear contracts, you can build a scalable and maintainable codebase.

---

# useRef  

## Overview

The `useRef` hook provides a way to persist values across renders without causing re-renders, and to access DOM elements directly.

---

## What is useRef

**A hook for storing mutable values that do not trigger re-renders.**

`useRef` returns a mutable object with a `.current` property. Unlike `useState`, updating `.current` does not cause the component to re-render.

```tsx
const countRef = useRef(0);
countRef.current += 1;
```

---

## Accessing DOM Elements

**Referencing DOM nodes directly in functional components.**

You can assign a `ref` to a JSX element to access its DOM node, which is useful for focusing inputs, measuring dimensions, or integrating with non-React libraries.

```tsx
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);

return <input ref={inputRef} />;
```

---

## Persisting Values Across Renders

**Storing values that survive re-renders without triggering updates.**

`useRef` is ideal for storing values like timers, previous props, or any mutable value that doesn’t need to cause a re-render.

```tsx
const renderCount = useRef(0);
useEffect(() => {
  renderCount.current += 1;
});
```

---

## Avoiding Re-renders

**Using refs to hold values without triggering the component lifecycle.**

Refs are useful when you want to avoid unnecessary re-renders caused by state updates, such as in performance-sensitive components.

```tsx
const timeoutRef = useRef<NodeJS.Timeout | null>(null);

const handleClick = () => {
  if (timeoutRef.current) clearTimeout(timeoutRef.current);
  timeoutRef.current = setTimeout(() => {
    console.log("Delayed action");
  }, 300);
};
```

---

## useRef vs useState

**Choosing the right tool for the right purpose.**

| Feature         | `useRef`                        | `useState`                 |
| --------------- | ------------------------------- | -------------------------- |
| Triggers render | ❌ No                           | ✅ Yes                     |
| Mutable         | ✅ Yes                          | ✅ Yes                     |
| DOM access      | ✅ Yes (via `.current`)         | ❌ No                      |
| Use case        | Timers, DOM refs, cached values | UI state, reactive updates |

---

## Common Pitfalls

**Avoiding misuse and understanding limitations.**

- Do not use `useRef` to store derived state that should trigger UI updates.
- Avoid overusing refs for logic that belongs in state or effects.
- Always check for `null` when accessing DOM elements via refs.

---

## Summary

`useRef` is a versatile hook for managing mutable values and DOM references without triggering re-renders. It’s essential for certain low-level operations and performance optimizations, but should be used with care to avoid bypassing React’s declarative model.

---

# useCallback  

## Overview

The `useCallback` hook memoizes a function definition, preventing unnecessary re-creations on re-renders and helping optimize performance in specific scenarios.

---

## What is useCallback

**A hook that returns a memoized version of a callback function.**

`useCallback` takes a function and a dependency array, and returns a memoized version of that function that only changes if one of the dependencies changes.

```tsx
const memoizedFn = useCallback(() => {
  console.log("This function is memoized");
}, []);
```

---

## Preventing Unnecessary Re-renders

**Avoiding function identity changes that trigger child component updates.**

When passing callbacks to child components, especially memoized ones, `useCallback` ensures the function reference remains stable unless dependencies change.

```tsx
const handleClick = useCallback(() => {
  setCount((c) => c + 1);
}, []);

return <Button onClick={handleClick} />;
```

---

## useCallback vs useMemo

**Understanding the difference between memoizing functions and values.**

- `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.
- Use `useCallback` when you want to memoize a function.
- Use `useMemo` when you want to memoize a computed value.

```tsx
const memoizedValue = useMemo(() => expensiveComputation(data), [data]);
const memoizedCallback = useCallback(() => doSomething(data), [data]);
```

---

## Common Use Case: Memoized Props

**Stabilizing function props to prevent unnecessary renders in memoized components.**

```tsx
const handleSelect = useCallback((id: number) => {
  setSelectedId(id);
}, []);

return <ItemList onSelect={handleSelect} />;
```

If `ItemList` is wrapped in `React.memo`, this prevents re-renders unless `handleSelect` actually changes.

---

## Dependency Management

**Ensuring correct behavior by managing dependencies properly.**

Always include all external values used inside the callback in the dependency array. Omitting dependencies can lead to stale closures or bugs.

```tsx
const handleSubmit = useCallback(() => {
  console.log(formData); // formData must be in the dependency array
}, [formData]);
```

---

## When Not to Use useCallback

**Avoiding premature optimization and unnecessary complexity.**

- Don’t use `useCallback` unless you’re passing the function to a memoized child or it’s part of a dependency array.
- Memoizing every function can lead to more complexity and worse performance due to extra memory and comparison overhead.

---

## Summary

`useCallback` is a performance optimization tool that helps prevent unnecessary function re-creations. It’s most useful when passing callbacks to memoized components or dependencies in effects. Use it selectively and always manage dependencies carefully.

---

# useMemo  

## Overview

The `useMemo` hook memoizes the result of a computation, preventing unnecessary recalculations on re-renders when dependencies haven’t changed.

---

## What is useMemo

**A hook that returns a memoized value from a function.**

`useMemo` takes a function and a dependency array. It only recomputes the value when one of the dependencies changes, caching the result otherwise.

```tsx
const doubled = useMemo(() => count * 2, [count]);
```

---

## Optimizing Expensive Computations

**Avoiding performance bottlenecks by memoizing costly calculations.**

If a computation is resource-intensive or involves large data processing, `useMemo` ensures it only runs when necessary.

```tsx
const filteredItems = useMemo(() => {
  return items.filter((item) => item.active);
}, [items]);
```

---

## useMemo vs useCallback

**Memoizing values vs memoizing functions.**

- `useMemo` is for values.
- `useCallback` is for functions.
- Both accept a dependency array and return a memoized result.

```tsx
const memoizedValue = useMemo(() => compute(data), [data]);
const memoizedFn = useCallback(() => doSomething(data), [data]);
```

---

## Preventing Unnecessary Renders

**Stabilizing derived values passed as props to memoized components.**

When passing derived values to child components, `useMemo` helps avoid re-renders by keeping the reference stable.

```tsx
const config = useMemo(() => ({ theme: "dark" }), []);
return <SettingsPanel config={config} />;
```

If `SettingsPanel` is wrapped in `React.memo`, this prevents re-renders unless `config` changes.

---

## Dependency Management

**Ensuring correctness by tracking all used values.**

Always include all variables used inside the memoized function in the dependency array. Omitting dependencies can lead to stale or incorrect values.

```tsx
const total = useMemo(() => price * quantity, [price, quantity]);
```

---

## When Not to Use useMemo

**Avoiding premature optimization and unnecessary complexity.**

- Don’t use `useMemo` for simple or cheap computations.
- Overusing it can make code harder to read and maintain.
- Measure performance before optimizing.

---

## Summary

`useMemo` is a valuable tool for optimizing performance by memoizing expensive computations. It helps avoid unnecessary recalculations and re-renders, especially when working with derived values passed to child components. Use it judiciously and always manage dependencies carefully.

---

# useMemo  

## Overview

The `useMemo` hook memoizes the result of a computation, preventing unnecessary recalculations on re-renders when dependencies haven’t changed.

---

## What is useMemo

**A hook that returns a memoized value from a function.**

`useMemo` takes a function and a dependency array. It only recomputes the value when one of the dependencies changes, caching the result otherwise.

```tsx
const doubled = useMemo(() => count * 2, [count]);
```

---

## Optimizing Expensive Computations

**Avoiding performance bottlenecks by memoizing costly calculations.**

If a computation is resource-intensive or involves large data processing, `useMemo` ensures it only runs when necessary.

```tsx
const filteredItems = useMemo(() => {
  return items.filter((item) => item.active);
}, [items]);
```

---

## useMemo vs useCallback

**Memoizing values vs memoizing functions.**

- `useMemo` is for values.
- `useCallback` is for functions.
- Both accept a dependency array and return a memoized result.

```tsx
const memoizedValue = useMemo(() => compute(data), [data]);
const memoizedFn = useCallback(() => doSomething(data), [data]);
```

---

## Preventing Unnecessary Renders

**Stabilizing derived values passed as props to memoized components.**

When passing derived values to child components, `useMemo` helps avoid re-renders by keeping the reference stable.

```tsx
const config = useMemo(() => ({ theme: "dark" }), []);
return <SettingsPanel config={config} />;
```

If `SettingsPanel` is wrapped in `React.memo`, this prevents re-renders unless `config` changes.

---

## Custom Comparison with React.memo

**Using a custom comparison function to deeply compare props.**

When memoizing components that receive complex objects or arrays, you can provide a custom comparison function to `React.memo` to control when re-renders should occur.

```tsx
const areEqual = (prevProps: Props, nextProps: Props) => {
  return deepEqual(prevProps.config, nextProps.config);
};

const MemoizedSettingsPanel = React.memo(SettingsPanel, areEqual);
```

This is useful when `useMemo` is used to stabilize props, but shallow comparison is not enough.

---

## Deep Comparison Caveats

**Understanding the trade-offs of deep equality checks.**

- Deep comparisons can be expensive and may negate the performance benefits of memoization.
- Prefer restructuring data or using stable references when possible.
- Use libraries like `lodash.isequal` or `fast-deep-equal` for reliable comparisons.

```tsx
import isEqual from "lodash.isequal";

const areEqual = (prev: Props, next: Props) =>
  isEqual(prev.config, next.config);
```

---

## Dependency Management

**Ensuring correctness by tracking all used values.**

Always include all variables used inside the memoized function in the dependency array. Omitting dependencies can lead to stale or incorrect values.

```tsx
const total = useMemo(() => price * quantity, [price, quantity]);
```

---

## When Not to Use useMemo

**Avoiding premature optimization and unnecessary complexity.**

- Don’t use `useMemo` for simple or cheap computations.
- Overusing it can make code harder to read and maintain.
- Measure performance before optimizing.

---

## Summary

`useMemo` is a valuable tool for optimizing performance by memoizing expensive computations and stabilizing derived values. In combination with `React.memo` and custom comparison functions, it helps prevent unnecessary re-renders in components that receive complex props. Use it judiciously and always manage dependencies and comparisons carefully.

---

# Lazy Loading  

## Overview

Lazy loading is a performance optimization technique that defers the loading of components or resources until they are needed, reducing the initial bundle size and improving load times.

---

## What is Lazy Loading

**Dynamically importing components to reduce initial load time.**

React supports lazy loading components using `React.lazy` and `Suspense`. This allows you to split your codebase and load parts of it on demand.

```tsx
import { lazy, Suspense } from "react";

const LazyComponent = lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

---

## When to Use Lazy Loading

**Improving performance by deferring non-critical components.**

Use lazy loading for:

- Routes that are not immediately visible.
- Components used conditionally (e.g., modals, tabs).
- Feature-rich or third-party components.

```tsx
const Chart = lazy(() => import("./Chart"));

return showChart ? (
  <Suspense fallback={<Spinner />}>
    <Chart />
  </Suspense>
) : null;
```

---

## Lazy Loading with React Router

**Deferring route-based components using dynamic imports.**

React Router supports lazy loading route components using `React.lazy`.

```tsx
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

<BrowserRouter>
  <Suspense fallback={<LoadingScreen />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Suspense>
</BrowserRouter>;
```

---

## Chunk Splitting and Code Splitting

**Breaking the bundle into smaller chunks for better performance.**

Lazy loading enables code splitting, which allows Webpack or other bundlers to generate separate chunks for each lazy-loaded module. This reduces the size of the main bundle and speeds up initial load.

---

## Preloading and Prefetching

**Improving perceived performance by loading resources in advance.**

You can use `import(/* webpackPrefetch: true */)` or `import(/* webpackPreload: true */)` to hint the browser to preload or prefetch lazy-loaded modules.

```tsx
const Settings = lazy(() => import(/* webpackPrefetch: true */ "./Settings"));
```

---

## Lazy Loading with Custom Loaders

**Creating reusable wrappers for lazy-loaded components.**

You can abstract the lazy loading logic into a utility function to standardize fallback behavior.

```tsx
// shared/utils/lazyWithFallback.tsx
export function lazyWithFallback<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  fallback: React.ReactNode
) {
  const Component = lazy(factory);
  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
}
```

---

## Limitations and Considerations

**Understanding trade-offs and avoiding common pitfalls.**

- Lazy components must be rendered inside a `Suspense` boundary.
- Server-side rendering (SSR) requires additional handling (e.g., `next/dynamic` in Next.js).
- Avoid lazy loading critical UI elements that should appear immediately.

---

## Summary

Lazy loading is a powerful technique to improve performance by deferring the loading of non-essential components. It enables code splitting, reduces initial bundle size, and enhances user experience when used strategically with `React.lazy`, `Suspense`, and route-based loading.

---

# Redux  

## Overview

Redux is a predictable state container for JavaScript applications. It helps manage global state in a centralized store, enabling consistent behavior across components and easier debugging.

---

## What is Redux

**A centralized state management library based on actions, reducers, and a global store.**

Redux uses a unidirectional data flow: actions describe what happened, reducers specify how the state changes, and the store holds the application state.

```ts
// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
```

---

## Core Concepts

**Understanding the building blocks of Redux.**

- **Store**: Holds the entire state tree.
- **Action**: A plain object describing a change.
- **Reducer**: A pure function that returns the next state.
- **Dispatch**: Sends an action to the store.
- **Selector**: Extracts data from the state.

```ts
// features/auth/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
```

---

## Connecting Redux to React

**Using hooks to interact with the Redux store.**

React Redux provides hooks like `useSelector` and `useDispatch` to access and update the store.

```tsx
import { useSelector, useDispatch } from "react-redux";
import { login } from "@/features/auth/authSlice";

const LoginButton = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <button onClick={() => dispatch(login({ name: "David" }))}>
      {user ? `Welcome, ${user.name}` : "Login"}
    </button>
  );
};
```

---

Redux Toolkit  
**A modern, opinionated approach to writing Redux logic.**

Redux Toolkit simplifies Redux with utilities like `createSlice`, `createAsyncThunk`, and `configureStore`, reducing boilerplate and enforcing best practices.

```ts
// features/posts/postsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  const res = await fetch("/api/posts");
  return res.json();
});

const postsSlice = createSlice({
  name: "posts",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});
```

---

## Memoization with Selectors

**Avoiding unnecessary re-renders using memoized selectors.**

Use `createSelector` from `reselect` to memoize derived data and prevent recomputation unless inputs change.

```ts
import { createSelector } from "reselect";

const selectPosts = (state) => state.posts.items;

export const selectPublishedPosts = createSelector([selectPosts], (posts) =>
  posts.filter((p) => p.published)
);
```

---

## Custom Comparison in useSelector

**Improving performance by customizing equality checks.**

By default, `useSelector` uses strict equality (`===`). For complex objects, you can pass a custom comparison function to avoid unnecessary re-renders.

```tsx
import isEqual from "lodash.isequal";

const user = useSelector((state) => state.auth.user, isEqual);
```

This is useful when selecting nested objects or arrays that may be structurally equal but not referentially equal.

---

## Middleware and Side Effects

**Handling async logic and side effects with middleware.**

Redux supports middleware like `redux-thunk` or `redux-saga` to handle asynchronous actions and side effects.

```ts
// Using createAsyncThunk (Redux Toolkit)
export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const res = await fetch("/api/user");
  return res.json();
});
```

---

## Summary

Redux provides a robust and scalable way to manage global state in React applications. With Redux Toolkit, it becomes easier to write clean, maintainable logic. Features like memoized selectors and custom comparison functions help optimize performance, especially when working with complex or deeply nested state.

---

# Redux  

## Overview

Redux is a predictable state container for JavaScript applications. It helps manage global state in a centralized store, enabling consistent behavior across components and easier debugging.

---

## What is Redux

**A centralized state management library based on actions, reducers, and a global store.**

Redux uses a unidirectional data flow: actions describe what happened, reducers specify how the state changes, and the store holds the application state.

```ts
// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
```

---

## Core Concepts

**Understanding the building blocks of Redux.**

- **Store**: Holds the entire state tree.
- **Action**: A plain object describing a change.
- **Reducer**: A pure function that returns the next state.
- **Dispatch**: Sends an action to the store.
- **Selector**: Extracts data from the state.

```ts
// features/auth/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
```

---

## Connecting Redux to React

**Using hooks to interact with the Redux store.**

React Redux provides hooks like `useSelector` and `useDispatch` to access and update the store.

```tsx
import { useSelector, useDispatch } from "react-redux";
import { login } from "@/features/auth/authSlice";

const LoginButton = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <button onClick={() => dispatch(login({ name: "David" }))}>
      {user ? `Welcome, ${user.name}` : "Login"}
    </button>
  );
};
```

---

## Redux Toolkit

**A modern, opinionated approach to writing Redux logic.**

Redux Toolkit simplifies Redux with utilities like `createSlice`, `createAsyncThunk`, and `configureStore`, reducing boilerplate and enforcing best practices.

```ts
// features/posts/postsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  const res = await fetch("/api/posts");
  return res.json();
});

const postsSlice = createSlice({
  name: "posts",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});
```

> ⚠️ `createAsyncThunk` is **not a middleware**, but it **relies on the `redux-thunk` middleware** (included by default in Redux Toolkit) to handle asynchronous logic. It generates thunk actions that dispatch lifecycle actions (`pending`, `fulfilled`, `rejected`) and manages async flow internally.

---

## Memoization with Selectors

**Avoiding unnecessary re-renders using memoized selectors.**

Use `createSelector` from `reselect` to memoize derived data and prevent recomputation unless inputs change.

```ts
import { createSelector } from "reselect";

const selectPosts = (state) => state.posts.items;

export const selectPublishedPosts = createSelector([selectPosts], (posts) =>
  posts.filter((p) => p.published)
);
```

---

## Custom Comparison in useSelector

**Improving performance by customizing equality checks.**

By default, `useSelector` uses strict equality (`===`). For complex objects, you can pass a custom comparison function to avoid unnecessary re-renders.

```tsx
import isEqual from "lodash.isequal";

const user = useSelector((state) => state.auth.user, isEqual);
```

This is useful when selecting nested objects or arrays that may be structurally equal but not referentially equal.

---

## Middleware and Side Effects

**Handling async logic and side effects with middleware.**

Redux supports middleware like:

- `redux-thunk`: Allows dispatching functions (thunks) for async logic.
- `redux-saga`: Uses generator functions for complex side effects.
- `redux-logger`: Logs actions and state changes for debugging.

```ts
// Example with redux-thunk (manual thunk)
const fetchUser = () => async (dispatch) => {
  const res = await fetch("/api/user");
  const data = await res.json();
  dispatch(setUser(data));
};
```

---

## Summary

Redux provides a robust and scalable way to manage global state in React applications. With Redux Toolkit, it becomes easier to write clean, maintainable logic. Features like memoized selectors and custom comparison functions help optimize performance, especially when working with complex or deeply nested state. Middleware like `redux-thunk` enables asynchronous flows, and `createAsyncThunk` builds on top of it to simplify async logic.

---

# TanStack Query

**Efficient data fetching, caching, and synchronization for modern React applications.**

---

## Overview

TanStack Query (formerly React Query) is a powerful data-fetching library for React that simplifies the management of asynchronous server state. It provides a declarative API for fetching, caching, synchronizing, and updating data, reducing the need for manual state management and side effects.

---

## Queries

**Declarative data fetching with automatic caching and background updates.**

Queries are used to fetch and cache data from a server. They are defined using the `useQuery` hook.

```tsx
import { useQuery } from "@tanstack/react-query";

function Posts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch("/api/posts").then((res) => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

---

## Query Keys

**Unique identifiers for caching and refetching control.**

Query keys are used to uniquely identify and manage queries in the cache.

```tsx
useQuery({
  queryKey: ["post", postId],
  queryFn: () => fetch(`/api/posts/${postId}`).then((res) => res.json()),
});
```

- Use arrays to represent hierarchical or parameterized data.
- Enables fine-grained cache control and invalidation.

---

## Mutations

**Performing create, update, and delete operations with side effects.**

Mutations are used for operations that modify server-side data.

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CreatePostForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) =>
      fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // ...
}
```

---

## QueryClient

**Centralized configuration and cache management.**

The `QueryClient` is the core of TanStack Query. It is configured once and provided to the app via context.

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}
```

---

## Query States

**Built-in status indicators for loading, error, and success.**

TanStack Query provides several state flags:

- `isLoading`: the query is loading for the first time.
- `isError`: an error occurred during fetching.
- `isSuccess`: data was fetched successfully.
- `isFetching`: the query is being refetched in the background.

```tsx
const { isLoading, isError, isFetching } = useQuery({ ... });
```

---

## Data Transformation

**Shaping server data before it reaches the UI.**

Use the `select` option to transform data before it reaches the component.

```tsx
useQuery({
  queryKey: ["posts"],
  queryFn: fetchPosts,
  select: (data) => data.slice(0, 5),
});
```

---

## Invalidation and Refetching

**Keeping data fresh and consistent across the app.**

Invalidate queries to trigger a refetch:

```tsx
queryClient.invalidateQueries({ queryKey: ["posts"] });
```

You can also configure:

- `staleTime`: how long data is considered fresh.
- `refetchOnWindowFocus`: automatically refetch on tab focus.
- `enabled`: conditionally run a query.

---

## Prefetching and Hydration

**Optimizing performance with preloaded and server-rendered data.**

Prefetch data before navigation or during SSR:

```tsx
await queryClient.prefetchQuery({
  queryKey: ["posts"],
  queryFn: fetchPosts,
});
```

For SSR:

```tsx
import { dehydrate } from "@tanstack/react-query";

const dehydratedState = dehydrate(queryClient);
```

---

## Custom Hooks

**Encapsulate query logic for reuse and separation of concerns.**

Custom hooks help abstract query logic and improve code reuse.

```tsx
// hooks/usePosts.ts
import { useQuery } from "@tanstack/react-query";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch("/api/posts").then((res) => res.json()),
  });
}
```

```tsx
// components/PostsList.tsx
import { usePosts } from "@/hooks/usePosts";

function PostsList() {
  const { data, isLoading } = usePosts();

  if (isLoading) return <p>Loading...</p>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

---

## Devtools

**Inspecting and debugging queries in real time.**

TanStack Query includes Devtools for development.

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

<ReactQueryDevtools initialIsOpen={false} />;
```

---

## Good Practices

- Use descriptive and consistent `queryKey`s.
- Use `useQuery` for reads and `useMutation` for writes.
- Use `select` to transform data before rendering.
- Invalidate queries after mutations to keep data in sync.
- Encapsulate logic in custom hooks for reusability and clarity.

---

## Summary

TanStack Query provides a robust and declarative approach to managing server state in React. By abstracting data fetching, caching, and synchronization, it simplifies application logic and improves performance and maintainability.

---

# Zustand

**A minimalistic, scalable state management library for React applications.**

---

## Overview

Zustand is a small, fast, and flexible state management library for React. It provides a simple API to create global stores using hooks, without the need for reducers, actions, or boilerplate. Zustand is ideal for managing shared state across components while maintaining performance and scalability.

---

## Creating a Store

**Define global state using a simple and composable API.**

A Zustand store is created using the `create` function, which returns a hook to access and update the state.

```tsx
// stores/useCounterStore.ts
import { create } from "zustand";

type CounterState = {
  count: number;
  increment: () => void;
  reset: () => void;
};

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));
```

---

## Consuming State in Components

**Access and update global state using hooks.**

Components can read and update the store using the hook returned by `create`.

```tsx
import { useCounterStore } from "@/stores/useCounterStore";

function Counter() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

---

## Selectors and Shallow Comparison

**Optimize re-renders by selecting only the needed state.**

Zustand allows selecting specific slices of state to avoid unnecessary re-renders.

```tsx
import { useShallow } from "zustand/react/shallow";

const { count, reset } = useCounterStore(
  useShallow((state) => ({
    count: state.count,
    reset: state.reset,
  }))
);
```

---

## Zustand with TypeScript

**Strongly typed stores for better DX and maintainability.**

Zustand supports full TypeScript integration, allowing you to define types for state and actions.

```tsx
type AuthState = {
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

---

## Zustand with Middleware

**Enhance store behavior with logging, persistence, and more.**

Zustand supports middleware for features like persistence, devtools, and logging.

```tsx
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    { name: "theme-storage" }
  )
);
```

---

## Custom Hooks

**Encapsulate store access and logic for reuse and clarity.**

You can create custom hooks to abstract store logic and improve separation of concerns.

```tsx
// hooks/useUser.ts
import { useAuthStore } from "@/stores/useAuthStore";

export function useUser() {
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  return { user, login, logout };
}
```

```tsx
// components/UserInfo.tsx
import { useUser } from "@/hooks/useUser";

function UserInfo() {
  const { user, logout } = useUser();

  return (
    <div>
      <p>Welcome, {user}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## Good Practices

- Use selectors and `useShallow` to minimize re-renders.
- Split state into multiple stores by domain when appropriate.
- Avoid using Zustand for local form state or ephemeral UI state.
- Use middleware like `persist` or `devtools` only when necessary.
- Encapsulate store logic in custom hooks for better modularity.

---

## Summary

Zustand offers a lightweight and intuitive approach to global state management in React. Its hook-based API, TypeScript support, and middleware capabilities make it a strong choice for scalable and maintainable applications.
