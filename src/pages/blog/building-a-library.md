---
layout: ../../layouts/BlogLayout.astro
title: Building a Component Library
description: As I am building a library at QuestionPro, here are some points i learned along the way.
tags: ["react", "vite", "components"]
time: 10
featured: true
timestamp: 2025-08-18
filename: building-a-library
---

At [QuestionPro](https://questionpro.com/), we are building a component library for all our satellite projects using React. During this process, we learned a lot about setting up a project and publishing it to npm. This is not a step-by-step tutorial but rather a collection of key takeaways that might help you if you’re working on a component library.

## 1. Keep It Simple

A React component can be as simple as an HTML element. Avoid over-engineering components by forcing props for everything. For example, don’t pass text as a `label` prop when you can just use children. We don’t use raw HTML like that, so try to keep the developer experience as close to HTML as possible.

```tsx
// ❌ Don’t
<Button label="A Button" />

// ✅ Do
<Button>A Button</Button>
```

**Why This Matters:**  
Simplicity keeps the API intuitive and reduces developer friction. Your components should feel like a natural extension of HTML.

**Resource:** [React Docs – JSX in Depth](https://react.dev/learn/writing-markup-with-jsx)

## 2. Extend Types from Native Elements

When building components, you don’t need to redefine every prop. Instead, extend from React’s native element types (yes, `div` or `button` in React aren’t “raw” HTML elements). This way, you automatically inherit all supported HTML attributes, including ARIA attributes. You can then layer custom props on top.

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "danger";
}

export const Button: React.FC<ButtonProps> = (props) => {
  return <button {...props}></button>;
};
```

**Why This Matters:**  
It keeps your types aligned with React’s ecosystem, avoids reinventing the wheel, and makes your components more flexible and accessible by default.

**Resource:** [TypeScript Handbook – Extending Types](https://www.typescriptlang.org/docs/handbook/interfaces.html#extending-interfaces)

## 3. Accessibility Matters

Accessibility should not be an afterthought. Use semantic HTML and proper roles. Don’t use a `div` to mimic a button — use a real `<button>`. Every component has its role. For example, an `<input type="number" />` has the role `spinbutton`. Since components will be used in different contexts, make sure accessibility is baked in from the start.

```tsx
// ❌ Don’t
export const Button = () => <div onClick={() => {}}></div>;

// ✅ Do
export const Button = () => <button></button>;
```

**Why This Matters:**  
Accessibility ensures your components can be used by everyone, including users with assistive technologies. It also aligns with legal and industry standards.

**Resource:** [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## 4. Follow Conventional Commits

Conventional Commits provide a consistent way to write commit messages. Instead of vague messages like `button updated` or `misc changes`, use structured messages that can feed into automated changelog generation and versioning.
For example:

- Commit often.
- Keep commits component-scoped.
- Use descriptive prefixes: `feat(Button): add new color`

**Why This Matters:**  
A consistent commit history makes it easier to track changes, automate versioning, and generate clean changelogs.

**Resource:** [Conventional Commits Specification](https://www.conventionalcommits.org/)

---

## 5. Unit Tests Are Essential

For a component library, unit tests are not optional — they’re essential. They ensure that functionality doesn’t break when new features are added. Bugs will inevitably slip in, but tests catch them early. Make sure every piece of functionality has at least basic test coverage. We used **Vitest** and **React Testing Library** for this.

**Why This Matters:**  
Tests protect your consumers. A single regression in your library could break dozens of projects — tests act as your safety net.

**Resources:** [Vitest Docs](https://vitest.dev/), [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)

## 6. Configuration Best Practices

Two common mistakes when building libraries are:

1. **Not making the library tree-shakable.** Your bundler should be able to remove unused components automatically. Example:

   ```ts
   // component/Button/index.ts
   export { Button, type ButtonProps } from "./Button.tsx";

   // index.ts
   export * from "@component/Button";
   ```

2. **Bundling dependencies into your build.** Your library should only include your code, not external dependencies like React. Mark them as `peerDependencies` in `package.json`, and configure your bundler to treat them as external.

```json
// package.json
{
  "peerDependencies": {
    "react": ">=18 <20"
  }
}
```

```ts
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
```

**Why This Matters:**  
Tree-shaking keeps your consumers’ bundles small, and marking dependencies as peers prevents multiple React versions or unnecessary bloat in downstream apps.

**Resources:** [Tree-Shaking in Rollup](https://rollupjs.org/guide/en/#tree-shaking), [Vite Library Mode Guide](https://vitejs.dev/guide/build.html#library-mode)

Building a component library is less about fancy code and more about making it easy and reliable for others to use. Keep it simple, make it accessible, test it well — and you’ll already be ahead.

What lessons have you learned while building your own libraries? I’d love to hear your thoughts!
