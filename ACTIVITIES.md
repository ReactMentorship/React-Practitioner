## Activity 1: Restructure the App for Scalability

### 📄 Description

In this activity, you'll refactor the current project structure to follow a scalable architecture based on the `features` convention. This approach is commonly used in large React applications to improve maintainability, modularity, and team collaboration.

You’ll identify logical domains in the app (such as `auth`, `posts`, `notifications`, etc.) and reorganize related files into self-contained feature folders.

---

### ✅ Goals

- Understand how to structure a React app for long-term scalability.
- Group related logic (components, hooks, services, stores) by feature.
- Reduce coupling between unrelated parts of the app.

---

### 🧩 Hints

- Think in terms of **domains**, not file types.
- Each feature should be able to live in its own folder with minimal dependencies on others.
- Shared logic (like generic UI components or utilities) should live in a `shared/` folder.
- You don’t need to move everything at once—start with the most obvious features.

---

### Current App structure

```
/src
├── api/
│   ├── axios.ts
│   ├── react-query-keys.ts
│   ├── queries/
│   │   ├── auth/
│   │   ├── categories/
│   │   └── posts/
│   └── services/
│       ├── auth/
│       ├── categories/
│       └── posts/
│
├── auth/
│   └── authSlice.ts
│
├── common/
│   ├── hooks/
│   │   ├── useAuth.tsx
│   │   └── useForm.tsx
│   └── utils/
│       ├── getErrorMessage.tsx
│       ├── index.ts
│       ├── inputsValidator.tsx
│       └── shorten.tsx
│
├── components/
│   ├── Page/
│   │   ├── CategoriesPage/
│   │   ├── HomePage/
│   │   ├── LoginPage/
│   │   ├── NotFoundPage/
│   │   ├── PostPage/
│   │   ├── PageLayout.tsx
│   │   └── PrivateRouteLayout.tsx
│   ├── Router/
│   │   ├── index.ts
│   │   └── Router.tsx
│   └── UI/
│       ├── AddCommentForm/
│       ├── Banner/
│       ├── CategoryButtonGroup/
│       ├── CommentCard/
│       ├── Comments/
│       ├── CreatePostButton/
│       ├── EmptyContentPlaceholder/
│       ├── Forms/
│       ├── ImageDialog/
│       ├── LazyWrapper/
│       ├── Loading/
│       ├── NavBar/
│       ├── NotificationPopover/
│       ├── PostList/
│       └── Toast.tsx
│
├── context/
│   └── Auth/
│       ├── AuthContext.ts
│       ├── AuthProvider.tsx
│       ├── UseReducerExample.tsx
│       └── UseStateExample.tsx
│
├── stores/
│   ├── authStore.ts
│   └── notificationStore.ts
│
├── types/
│   └── index.ts
│
├── App.tsx
├── main.tsx
├── queryClient.ts
├── theme.ts
└── vite-env.d.ts
```

---


## Activity 2: Abstract Form Logic into a Custom Hook

### 📄 Description

In this activity, you'll refactor the `PostForm` component to delegate its internal logic to a custom hook. This will help you separate concerns, improve readability, and promote reusability across forms.

You’ll work with a pre-defined hook (`useForm`) and adapt it to fully manage the form state, validation, and submission logic currently handled inside the component.

---

### ✅ Goals

- Learn how to extract and reuse form logic using custom hooks.
- Improve component readability by separating logic from UI.
- Understand how to pass dynamic behavior (like validation and submission) into a hook.

---

### 🧩 Hints

- The `useForm` hook already handles state, change, and submit events—extend it to support validation and error handling.
- Think about how to pass `validator` and `initialState` into the hook.
- You may need to adapt the hook to support error messages per field.
- Keep the UI in `PostForm` mostly unchanged—focus on moving logic out.

---

## Activity 3: Scroll to the Latest Comment with `useRef`

### 📄 Description

In this activity, you'll enhance the `Comments` component by using the `useRef` hook to automatically scroll to the latest comment when a new one is added. This improves the user experience by keeping the most recent interaction in view.

You'll work with the `comments` array and detect when a new comment is added, then scroll to it using a reference.

---

### ✅ Goals

- Learn how to use `useRef` to reference DOM elements.
- Detect changes in a list and respond with side effects.
- Improve UX by automatically focusing on new content.

---

### 🧩 Hints

- Use a `ref` to target the last comment in the list.
- Use `useEffect` to detect when the number of comments increases.
- Compare the previous and current length of the `comments` array.
- Use `scrollIntoView({ behavior: "smooth" })` to animate the scroll.

---


##  Activity 4: Optimize with `useMemo` and `useCallback`

### 📄 Description

In this activity, you'll optimize the rendering behavior of the `PostPage` and `Comments` components by applying `useMemo` and `useCallback`. The goal is to prevent unnecessary re-renders when props like `getSelectedPost` or `comments` haven't changed.

You’ll follow the pattern already used in `PostList`, where `React.memo` and a custom comparison function are used to stabilize rendering.

---

### ✅ Goals

- Learn how to use `useCallback` to memoize functions passed as props.
- Use `useMemo` to avoid recalculating derived values unnecessarily.
- Apply `React.memo` to prevent re-renders when props haven't changed.

---

### 🧩 Hints

- Use `useCallback` to memoize `getSelectedPost` in `PostPage`.
- Consider wrapping `Comments` with `React.memo` and passing only stable props.
- If needed, use `useMemo` to memoize derived data like filtered or sorted comments.
- Compare with how `PostList` uses `React.memo` and `areEqual`.


---


## 🧠 Activity 5: Implement Lazy Loading for `CategoriesPage`

### 📄 Description

In this activity, you'll optimize the routing configuration by applying lazy loading to the `CategoriesPage` component. This helps reduce the initial bundle size and improves performance by loading components only when needed.

You’ll follow the same pattern already used for `HomePage`, using `React.lazy` and the `LazyWrapper` component to handle suspense boundaries.

---

### ✅ Goals

- Learn how to implement lazy loading with `React.lazy`.
- Improve performance by deferring the loading of non-critical routes.
- Apply consistent patterns for route-level code splitting.

---

### 🧩 Hints

- Use `React.lazy(() => import(...))` to dynamically import the `CategoriesPage`.
- Wrap the lazy-loaded component with `LazyWrapper` to handle loading states.
- Replace the direct import of `CategoriesPage` in the router with the lazy-loaded version.
- You can use the `HomePage` route as a reference.

---

## 🏷️ **Activity 6: Update the Auth Slice and Integrate the Full Auth Flow**

### 📝 **Description**

In this activity, you'll implement and connect the complete authentication flow in the app using Redux. This includes login, registration, and logout, along with proper state management, error handling, and UI integration.

---

### 🎯 **Goals**

- Extend the Redux slice to support login, signup, and logout.
- Connect the slice with the login page and navbar.
- Handle session expiration globally using an Axios interceptor.

---

### 🛠️ **Tasks**

1. **Update the Redux auth slice**
   - Add async thunks for login and signup.
   - Add reducers to handle loading, success, and error states.
   - Implement the `logout` reducer to clear user state.

2. **Create or update auth services**
   - `loginUser`, `createUser`, and `logout` should call the backend and trigger Redux actions.
   - Ensure `fetchUser` is called after successful login/signup to populate the user state.

3. **Update the Axios interceptor**
   - Detect `401 Unauthorized` responses.
   - Trigger the `logout` action and redirect to `/login` if the user is not already there.

4. **Connect the login page**
   - Use the Redux `dispatch` to call `fetchUser` after login/signup.
   - Show loading and error messages using Zustand notifications.

5. **Update the navbar**
   - Conditionally render login/logout buttons based on the Redux auth state.
   - Call the logout service and clear the session when the user logs out.

---

### ✅ **Acceptance Criteria**

- The user can log in, register, and log out successfully.
- The Redux store reflects the correct authentication state.
- The navbar updates dynamically based on the user's session.
- The Axios interceptor handles expired sessions and redirects to login.

---


## 🧠 Activity 7: Create TanStack Query Hooks for Categories

### 📄 Description

In this activity, you'll create custom React Query hooks to manage categories using TanStack Query. These hooks will wrap the existing service functions and provide a consistent, declarative way to fetch, create, update, and delete categories across the app.

You’ll follow the same structure already used for posts, and update the components that currently use imperative logic to instead rely on these new hooks.

---

### ✅ Goals

- Create reusable hooks for fetching and mutating categories using TanStack Query.
- Ensure proper cache invalidation after mutations.
- Refactor components to use the new hooks instead of direct service calls.

---

### 🧩 Hints

- Implement hooks for the following services:
  - `getCategories.ts`
  - `createCategory.ts`
  - `updateCategory.ts`
  - `deleteCategory.ts`
- Use `useQuery` for fetching and `useMutation` for the rest.
- Use `queryClient.invalidateQueries` to refresh the category list after a mutation.
- Follow the pattern used in `Posts`.
- Update `HomePage` and any other components that fetch or mutate categories manually.


---

## 🧠 Activity 9: Manage Notification History with Zustand

### 📄 Description

In this activity, you'll enhance the notification system by implementing two new actions in the Zustand store: one to **remove a single notification** and another to **remove all notifications**. These actions will be consumed by the `NotificationPopover` component, allowing users to manage their notification history interactively.

This will reinforce your understanding of Zustand state management, shallow comparison, and UI integration with Material UI components.

---

### ✅ Goals

- Add a `removeNotification(id: string)` function to the Zustand store.
- Add a `removeAllNotifications()` function to the Zustand store.
- Update the `NotificationPopover` component to:
  - Use the Zustand store instead of hardcoded notifications.
  - Call `removeNotification(id)` when clicking the close icon on a notification.
  - Call `removeAllNotifications()` when clicking the "Hide All" button.
- Ensure the UI updates immediately after removing notifications.

---

### 🧩 Hints

- Use `useNotificationStore` with a selector to avoid unnecessary re-renders.
- `removeNotification` should filter out the notification by ID.
- `removeAllNotifications` should clear the entire array.

---
