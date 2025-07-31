##  React Intermediate Mentorship Guide

Welcome! This repository contains the resources and activities for the React mentorship program. Follow the steps below to complete each activity.

---

### 📁 Repository Structure

The main repository contains:

- A `main` branch with general content.
- One branch per activity, following the format:

```
activity-<number>-<name>
```

Examples:

- `activity-01-component-architecture`
- `activity-02-custom-hooks`
- `activity-03-useref`
- `activity-04-usecallback`
- `activity-05-usememo`
- `activity-06-lazy-loading`
- `activity-07-redux`
- `activity-08-tanstack-query`
- `activity-09-zustand`
- `activity-10-ssr`

All branches contain the same content; they are separated solely to facilitate review through pull requests. In the event of a merge, the remaining branches will remain fully functional and unaffected.

---

### 🚀 Getting Started

#### 1. Fork the repository

Click the **"Fork"** button in the top-right corner to create your own copy.

#### 2. Clone your fork locally

```bash
git clone https://github.com/your-username/your-forked-repo.git
cd your-forked-repo
```

#### 3. Add mentors as collaborators

This allows them to review your pull requests. Go to **Settings > Collaborators** in your fork and add:

- diego-arroniz
- JenniferNevarez
- Klizz
- DavidEHA

git checkout activity-02-custom-hooks

Continuing with the activity instructions section of the `README.md`:

---

### 🧩 How to Work on an Activity

#### 1. Switch to the activity branch

Each activity has its own branch in the original repository. First, make sure your local copy is up to date:

```bash
git fetch origin
```

Then, check out the branch for the activity you want to work on. For example:

```bash
git checkout activity-02-custom-hooks
```

#### 2. Create your solution branch

Create a new branch from the activity branch using the following format:

```
activity-<number>-<name>-solution
```

Example:

```bash
git checkout -b activity-02-custom-hooks-solution
```

> This keeps your work organized and clearly associated with the activity.

#### 3. Work on your solution

Make your changes, commit regularly, and push your branch to your fork:

```bash
git add .
git commit -m "Implemented useForm custom hook"
git push origin activity-02-custom-hooks-solution
```

#### 4. Open a Pull Request

Go to your fork on GitHub and open a **pull request from your solution branch to the corresponding activity branch** (e.g., from `activity-02-custom-hooks-solution` to `activity-02-custom-hooks`).

- Assign the following mentors as reviewers:

  - diego-arroniz
  - JenniferNevarez
  - Klizz
  - DavidEHA

- Add a clear description of what you implemented and any notes you want the reviewers to consider.

Here’s the final section of the `README.md` with best practices for mentees:

---

### 🔌 Recommended VS Code Extensions

To improve your development experience, we recommend installing the following Visual Studio Code extensions:

| Extension Name            | Description                                                        |
| ------------------------- | ------------------------------------------------------------------ |
| Error Lens                | Enhances visibility of errors and warnings directly in the editor. |
| ES7+ React/Redux Snippets | Provides modern ES7+ snippets for React, Redux, and React Native.  |
| GitHub Copilot            | AI-powered code suggestions and completions.                       |
| Markdown Preview Enhanced | Live preview for Markdown files with extended features.            |
| Prettier - Code Formatter | Automatically formats your code for consistency and readability.   |
| Pretty TypeScript Errors  | Makes TypeScript error messages more readable and user-friendly.   |

> 💡 These extensions help streamline development, improve code quality, and enhance productivity.

---

### ✅ Best Practices

To ensure a smooth and productive mentorship experience, please follow these guidelines:

#### 🧠 Ask for Help

- Don’t hesitate to reach out to your mentors if you’re stuck or unsure about something.
- Use the PR description or comments to ask specific questions.

#### 📌 Branching

- Always create your solution branch from the corresponding activity branch.
- Use the naming convention:
  ```
  activity-<number>-<activity name>-solution
  ```
  Example: `activity-03-custom-hooks-solution`

#### 💬 Commits

- Make frequent commits with clear, descriptive messages.
- Example:
  ```
  git commit -m "Implemented useRef to manage input focus"
  ```

#### 🚫 Do not merge into `main`

- Never work directly on the `main` branch.
- Do not merge your solution branches into `main`.
- Always base your work on the activity branches.

#### 📥 Pull Requests

- Open PRs from your solution branch to the corresponding activity branch.
- Assign the designated reviewers.
- Include a meaningful description of your implementation and any questions or blockers.

#### 🔄 Stay Updated

- If notified of updates in the original repository, follow the syncing instructions to keep your fork up to date.

#### 🧼 Code Quality

- Follow best practices for clean, readable code.
- Use consistent formatting and naming conventions.
- Comment your code where necessary to explain complex logic.
