# dsa-js

## কেন আমার TypeScript project-এ "Cannot redeclare block-scoped variable" error আসছিল, আর কিভাবে আমি সেটা fix করলাম?

### TypeScript-এ “module detection” মানে কী?

- TypeScript প্রতিটা .ts বা .js ফাইলকে দুইভাবে classify করে 👇

1. Script file (global mode) —

   - কোনো import বা export নেই
   - → file টা global scope-এ থাকে
   - → variable name clash হতে পারে (তোমার আগের Cannot redeclare variable error টার মত)

2. Module file (isolated mode) —
   - যদি file-এ import/export থাকে,
   - → TypeScript এটাকে module ভাবে
   - → নিজের আলাদা scope থাকে
   - → কোনো global variable conflict হয় না ✅

### ⚙️ moduleDetection কী করে?

TypeScript 5.0 থেকে introduce হয়েছে এই setting:

```json
{
  "compilerOptions": {
    "moduleDetection": "force" // "legacy" | "auto" | "force"
  }
}
```

#### Mode Description

| Mode                          | Description                                                                                                     |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `"legacy"`                    | পুরনো behavior — file কে শুধুমাত্র তখনই module ধরা হবে যখন `import` বা `export` আছে। (TypeScript 4.x এর মতো)    |
| `"auto"` _(default in TS ≥5)_ | কিছু smart heuristic apply করে: যেমন `"type": "module"` থাকলে `.js` file গুলোকে module ধরে।                     |
| `"force"`                     | 🔥 সব `.ts` এবং `.js` file-কে **module হিসেবে force করে ধরে নেয়**, এমনকি যদি কোনো `import` বা `export` না থাকে। |

### ✅ তাই তোমার error কেন চলে গেছে

- তুমি moduleDetection: "force" সেট করায়, TypeScript এখন প্রতিটা .ts file কে module হিসেবে treat করছে।

- তাই আর কোনো ফাইলের variable আরেক ফাইলের সাথে global scope শেয়ার করছে না,
  ফলে —
- ❌ Cannot redeclare block-scoped variable 'sIdx'
  এই error আর আসে না।

### ⚠️ তবে কিছু বিষয় খেয়াল রাখো

- "force" দিলে প্রতিটা file module হিসেবে behave করে, তাই যদি তোমার কোনো truly global script থাকে (যেটা browser-এ <script> দিয়ে চালাতে হবে), সেটা তখন কাজ নাও করতে পারে।

- কিন্তু Node.js / backend project, বা modern TypeScript project (যেমন তোমারটা) এর জন্য —
  এটা actually একটা clean এবং safe default।

| Setting    | Behavior                                      | Typical Use                                  |
| ---------- | --------------------------------------------- | -------------------------------------------- |
| `"legacy"` | শুধুমাত্র `import/export` থাকলে module ধরা হয় | পুরনো project                                |
| `"auto"`   | context অনুযায়ী detect করে                    | default (recommended for mixed projects)     |
| `"force"`  | সব file module ধরে                            | ✅ ideal for Node / pure TypeScript projects |

### 👉 তোমার ক্ষেত্রে (Node + TypeScript project):

"moduleDetection": "force" দারুন কাজ করবে —
এটা basically TypeScript কে বলে:

    - “সব ফাইলকে আলাদা module হিসেবে ধর, global script হিসেবে নয়।”

তাই variable clash gone ✔️
আরও predictable scope ✔️

// 164. Maximum Gap
// Maximum sum Rectangle
// 76. Minimum Window Substring
