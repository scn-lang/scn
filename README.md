# Symbolic Context Notation (◮ SCN) Specification v1.0

[![Spec Version](https://img.shields.io/badge/Spec-v1.0-blue.svg)](https://github.com/scn-lang/scn)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Discussions](https://img.shields.io/badge/Discussions-Join_Here-green.svg)](https://github.com/scn-lang/scn/discussions)

**Symbolic Context Notation (SCN) is a hyper-efficient, language-agnostic format for representing the structural surface, API, and inter-file relationships of a software codebase.** It acts as a compressed blueprint of a project, designed to provide Large Language Models (LLMs) with unparalleled context at a fraction of the token cost of raw source code.

This document is the official specification. It's intended for developers, tool-builders, and anyone interested in the future of AI-assisted software development.

## Table of Contents
1.  [**The Problem: The "Context Chasm"**](#1-the-problem-the-context-chasm)
2.  [**The Solution: SCN Philosophy**](#2-the-solution-scn-philosophy)
3.  [**Comparison with Other Representations (AST, CST)**](#3-comparison-with-other-representations-ast-cst)
4.  [**Before & After: The Power of SCN**](#4-before--after-the-power-of-scn)
    *   [Example 1: A Simple JavaScript Class](#example-1-a-simple-javascript-class)
    *   [Example 2: A React Component with CSS](#example-2-a-react-component-with-css)
    *   [Example 3: A Multi-File Python Application](#example-3-a-multi-file-python-application)
5.  [**The SCN Specification v1.0**](#5-the-scn-specification-v10)
    *   [Core Structure: Files & Entity IDs](#core-structure-files--entity-ids)
    *   [Master Symbol Legend](#master-symbol-legend)
6.  [**Roadmap**](#6-roadmap)
7.  [**Detailed Examples by Paradigm**](#7-detailed-examples-by-paradigm)
    *   [Object-Oriented Programming (OOP)](#object-oriented-programming-oop)
    *   [Functional Programming (FP)](#functional-programming-fp)
    *   [Declarative UI (HTML/CSS)](#declarative-ui-htmlcss)
8.  [**Design Rationale: The "Why" Behind the Symbols**](#8-design-rationale-the-why-behind-the-symbols)
9.  [**Applications & The Broader Vision**](#9-applications--the-broader-vision)
10. [**Tooling & Ecosystem**](#10-tooling--ecosystem)
11. [**How to Contribute**](#11-how-to-contribute)

---

## 1. The Problem: The "Context Chasm"

Large Language Models are powerful, but they operate with a critical handicap: they lack true understanding of a project's architecture. When we paste code into a prompt, we face a trade-off:

*   **Provide Too Little Code:** The LLM hallucinates, inventing functions, misusing APIs, and failing to see connections between files.
*   **Provide Too Much Code:** We hit token limits, incur high costs, and the LLM gets lost in irrelevant implementation details, leading to slower, lower-quality responses.

This is the **Context Chasm**. SCN is the bridge.

## 2. The Solution: SCN Philosophy

SCN bridges the chasm by adhering to four principles:

1.  **Extreme Token Efficiency:** Every symbol is chosen to be a single ASCII character where possible, maximizing the information-to-token ratio.
2.  **Language Agnosticism:** The system abstracts concepts from OOP, FP, and Declarative paradigms into a unified format.
3.  **Structural Representation:** SCN maps the *graph* of a project—which entity uses which, and which is used by which—revealing the true architecture.
4.  **Human Scannability:** While machine-optimized, the format is surprisingly readable, allowing developers to quickly grasp a project's structure.

---

## 3. Comparison with Other Representations (AST, CST)

To understand SCN's unique value, it's essential to compare it with traditional code representations like Concrete Syntax Trees (CSTs) and Abstract Syntax Trees (ASTs).

| Feature               | **Concrete Syntax Tree (CST)**                               | **Abstract Syntax Tree (AST)**                               | **Symbolic Context Notation (SCN)**                          |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Purpose**           | Perfectly represent the source text, including all syntax.   | Represent the abstract semantic structure of the code.       | **Represent the architectural surface & relationships.**     |
| **Detail Level**      | **Hyper-Detailed.** Includes whitespace, comments, parentheses. | **Detailed.** Abstracts away syntax, focuses on structure.   | **Ultra-Concise.** Abstracts away implementation logic.      |
| **Scope**             | Single file.                                                 | Single file.                                                 | **Project-wide.** Natively represents inter-file dependencies. |
| **Language Agnostic?**| No. Highly specific to a language's grammar.                 | Mostly no. Structure is language-specific.                   | **Yes.** Symbolic system unifies concepts across languages.  |
| **Token Cost**        | Extremely High.                                              | Very High.                                                   | **Extremely Low.** Designed for maximum token efficiency.    |
| **Example Node**      | `(`, `function`, `myFunc`, `)`, `{`, `}`                     | `FunctionDeclaration(name: "myFunc", body: BlockStatement)`  | `~ (1.1) myFunc()`                                           |
| **Primary Use Case**  | Parsers, formatters (like Prettier).                         | Compilers, linters, transpilers (like Babel).                | **LLM context, architecture visualization, dependency analysis.** |

**Conclusion:** SCN is not a replacement for ASTs/CSTs. It is a **higher-level abstraction built on top of them**. A tool would first parse source code into an AST and then traverse that AST to generate the even more abstract and relationship-focused SCN map.

---

## 4. Before & After: The Power of SCN

The best way to understand SCN is to see it in action.

### Example 1: A Simple JavaScript Class

#### **Before SCN: Raw Source Code (105 tokens)**
```javascript
// services/auth.js
import { findUserByEmail, hashPassword } from './utils';

/**
 * Manages user authentication.
 */
export class AuthService {
  constructor(database) {
    this.db = database;
  }

  // Tries to log a user in
  async login(email, password) {
    const user = await findUserByEmail(this.db, email);
    if (!user) {
      throw new Error('User not found');
    }

    const hash = hashPassword(password);
    if (user.passwordHash !== hash) {
      throw new Error('Invalid password');
    }
    
    return user;
  }
}
```

#### **After SCN: The Context Map (21 tokens)**
```scn
§ (1) services/auth.js
  -> (utils.js)       // File-level dependency
  ◇ (1.1) AuthService
    + @ db: #(Database)
    + ~ login(email: #, pass: #): #(User) ...!
```
**Result:** A **79% reduction** in tokens. We've thrown away implementation details (`if` statements, internal calls) but preserved the essential API surface: the `AuthService` class has a public `login` method that is `async`, can `throw`, and returns a `User`.

### Example 2: A React Component with CSS

#### **Before SCN: Raw Source Code (HTML, CSS - 131 tokens)**
```jsx
// Button.jsx
import './Button.css';

export function Button({ label, onClick }) {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      {label}
    </button>
  );
}

// Button.css
.btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
}
.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
}
```

#### **After SCN: The Context Map (38 tokens)**
```scn
§ (2) Button.jsx
  -> (3.0)
  ◇ (2.1) Button
    { props: { label:#, onClick:# } }
    ⛶ (2.2) button [ class:.btn .btn-primary ]
      -> (3.1), (3.2)

§ (3) Button.css
  <- (2.0)
  ¶ (3.1) .btn { 📐 ✍ }
  ¶ (3.2) .btn-primary { 💧 }
```
**Result:** A **71% reduction**. The SCN clearly shows that the `Button` component `(2.1)` has a `button` element `(2.2)` which is styled by two separate CSS rules `(3.1, 3.2)`. The LLM now understands the structural link between the JSX and the CSS without seeing a single pixel value.

### Example 3: A Multi-File Python Application

#### **Before SCN: Raw Source Code (118 tokens)**
```python
# services.py
from models import User
from database import db_session

def get_user_profile(user_id: int) -> User:
    user = db_session.query(User).get(user_id)
    return user

# main.py
from services import get_user_profile

def main():
    user = get_user_profile(1)
    if user:
        print(f"Hello, {user.name}")

if __name__ == "__main__":
    main()
```
#### **After SCN: The Context Map (31 tokens)**
```scn
§ (4) models.py
  <- (5.0)
  ◇ (4.1) User
    + @ id: #(int)
    + @ name: #(str)

§ (5) services.py
  -> (4.1), (database.py)
  <- (6.1)
  + ~ (5.1) get_user_profile(user_id: #): #(4.1)

§ (6) main.py
  -> (5.1)
  ~ (6.1) main()
    -> (5.1)
```
**Result:** A **74% reduction**. The SCN creates a complete dependency graph. It shows that `main.py` calls a function in `services.py`, which in turn depends on the `User` model from `models.py`. An LLM can now reason about the entire application flow.

---

## 5. The SCN Specification v1.0

### Core Structure: Files & Entity IDs
An SCN document is a plain text file representing a project's context.

*   **File Declaration (`§`):** Each file is introduced with a `§` symbol, a unique integer ID, and the file path.
    `§ (1) path/to/file.js`
*   **Entity Declaration:** Every significant entity (class, function, etc.) gets a compound ID: `(file_id.entity_id)`.
    `◇ (1.1) MyClass`
*   **Dependency Linking (`->`/`<-`):** Relationships are defined by pointing an entity's `->` (dependency) or `<-` (caller) to another entity's unique ID.
    `~ (1.2) myMethod() -> (2.1)`

### Master Symbol Legend

#### General & Structural
| Symbol | Meaning | Description |
| :---: | :--- | :--- |
| `§` | **File Path** | Declares a new source file context. |
| `->` | **Dependency** | Points to an entity ID that this entity *uses*. |
| `<-` | **Caller** | Points to an entity ID that *uses* this entity. |

#### Code Entities (JS, Python, Go, C#, etc.)
| Symbol | Meaning | Description |
| :---: | :--- | :--- |
| `◇` | **Container** | A Class, Struct, Module, or Namespace. |
| `~` | **Function** | A function, method, or procedure. |
| `@` | **Variable** | A property, field, constant, or state variable. |

#### Type System Definitions & References
| Symbol | Meaning | Description |
| :---: | :--- | :--- |
| `{}` | **Interface/Struct** | Defines a data shape, contract, or complex object type. |
| `☰` | **Enum** | Defines a set of named constant values. |
| `=:` | **Type Alias** | Assigns a new name to an existing type. |
| `#` | **Type Reference** | *References* an existing type in a signature or property. |

#### Markup (HTML) & Style (CSS)
| Symbol | Meaning | Description |
| :---: | :--- | :--- |
| `⛶` | **HTML Element** | Represents an element tag. Indentation denotes hierarchy. |
| `¶` | **CSS Rule** | Represents a selector and its associated style block. |
| `📐` | **Layout Intent** | CSS rule affects geometry (box model, flex, grid, position). |
| `✍` | **Text Intent** | CSS rule affects typography (font, text styles). |
| `💧` | **Appearance Intent**| CSS rule affects appearance (color, background, border, shadow). |

#### Function & Method Qualifiers
| Symbol | Meaning | Description |
| :---: | :--- | :--- |
| `+` / `-` | **Access** | Public (+) or Private (-) visibility. |
| `...` | **Async** | The function is asynchronous (`await`able). |
| `!` | **Throws** | The function can throw an exception or return an error. |
| `o` | **Pure** | The function has no side effects. |

---

## 6. Roadmap

The SCN project is actively developing. Our vision is to create a robust and universal standard for AI-code interaction.

-   [x] **v1.0 (Current):** Stable specification for core code structures, types, and declarative markup (HTML/CSS).
-   [ ] **v1.1 (Upcoming):**
    -   [ ] **Configuration File Support:** Symbols for representing `.json`, `.yaml`, and `.xml` files and their key-value structures.
    -   [ ] **Database Schema Support:** Symbols for representing SQL tables, columns, and relationships.
    -   [ ] **Official SCN Schema:** A JSON Schema definition for validating SCN documents and their parsed object models.
-   [ ] **v1.2 (Future):**
    -   [ ] **Binary SCN Format:** A highly compressed binary representation for even greater efficiency and faster parsing.
    -   [ ] **Standardized Tooling Interface:** A formal API specification for SCN generators and parsers to ensure interoperability.
-   [ ] **Ecosystem Goals:**
    -   [ ] **Official Parsers:** Reference implementations for JavaScript/TypeScript and Python.
    -   [ ] **Tree-sitter Integration:** Create official SCN queries for popular languages to enable high-performance generator tools.
    -   [ ] **IDE Extensions:** Plugins for VS Code and JetBrains IDEs to visualize SCN maps directly in the editor.

---

## 7. Detailed Examples by Paradigm

#### Object-Oriented Programming (OOP)
```scn
§ (10) models/user.ts
  <- (11.1)
  ◇ (10.1) User
    + @ id: #(string)

§ (11) services/auth.ts
  -> (10.1)
  <- (12.1)
  ◇ (11.1) AuthService
    - @ db: #(DB)
    + ~ login(email: #, pass: #): #(10.1) ...!
```
**Shows:** Encapsulation (`- @ db`), dependency injection, and a public method with async/throws qualifiers.

#### Functional Programming (FP)
```scn
§ (20) utils/validators.js
  <- (22.1)
  + ~ (20.1) isEmail(str: #): #(bool) o
  + ~ (20.2) isSecure(pwd: #): #(bool) o

§ (21) api/client.js
  <- (22.1)
  + ~ (21.1) postUser(data: #): #(Promise) ...!

§ (22) pipelines/registration.js
  -> (20.1), (20.2), (21.1)
  + ~ (22.1) register(userData: #): #(Result) ...
```
**Shows:** Pure functions (`o`), composition (one function `(22.1)` depending on three others), and separation of pure/impure logic.

#### Declarative UI (HTML/CSS)
```scn
§ (30) login.html
  -> (31.0)
  ⛶ (30.1) form [ id:#login-form ]
    ⛶ (30.2) input [ class:.input ] -> (31.1)
    ⛶ (30.3) button [ class:.btn ] -> (31.2)

§ (31) login.css
  ¶ (31.1) .input { 📐 ✍ }
  ¶ (31.2) .btn { 📐 ✍ 💧 }
```
**Shows:** HTML hierarchy, `class` attributes linking directly to CSS rules, and CSS intent symbols summarizing the purpose of each rule.

---

## 8. Design Rationale: The "Why" Behind the Symbols

*   **Why single ASCII characters?** Every byte counts. Emojis and multi-character symbols are token-inefficient. A sparse set of ASCII symbols maximizes the information-to-token ratio.
*   **Why the `(file.entity)` ID system?** It's the only way to create unambiguous, project-wide links. A simple name is not enough, as multiple files can have functions or classes with the same name. This system creates a stable "address" for any piece of the codebase.
*   **Why CSS "Intent" symbols (`📐✍💧`)?** Listing every CSS property (`font-size`, `margin`, `color`, etc.) would defeat the purpose of being concise. The intent symbols provide a powerful summary of *what a rule does* without getting lost in the details, which is exactly what an LLM needs to make high-level decisions.
*   **Why separate symbols for Type Definition (`{}`) vs. Reference (`#`)?** This distinction is critical. Defining a type is a rare, high-importance event. Referencing a type is a common, low-importance event. Using different symbols allows a parser to immediately distinguish structure from usage.

---

## 9. Applications & The Broader Vision

SCN is a foundational format for a new generation of development tools:

*   **Smarter LLMs:** The primary use case. Improve debugging, refactoring, and code generation.
*   **Automated Documentation:** Auto-generate architecture diagrams and API docs from `.scn` files.
*   **Architecture Visualization:** Render `.scn` files into interactive IDE graphs.
*   **Advanced Code Analysis:** Detect circular dependencies, unused code, and calculate complexity metrics from the SCN graph.

---

## 10. Tooling & Ecosystem

The SCN format is designed to be the centerpiece of a rich ecosystem.

### Core Packages
*   **[`scn-lang` on npm](https://www.npmjs.com/package/scn-lang):** The official parser and toolkit for the JavaScript/TypeScript ecosystem.
*   **[`scn` on GitHub](https://github.com/scn-lang/scn):** The home of the SCN specification, reference implementations, and community discussions.

### Future Goals
*   **Parsers:** Libraries for other popular languages (Python, Rust, Go) to read and write `.scn` files.
*   **Generators:** Source code analysis tools that automatically generate a `.scn` file from an existing project.
*   **Visualizers:** Applications (web-based or IDE extensions) that render `.scn` files as interactive diagrams.
*   **LLM Integration:** Plugins for IDEs and other tools that automatically generate and inject SCN context into prompts.

---

## 11. How to Contribute

This is an open specification, and we welcome contributions from the community. Your expertise can help make SCN the standard for AI-code interaction.

1.  **Join the Discussion:** The best place to start is by opening a [GitHub Discussion](https://github.com/scn-lang/scn/discussions).
2.  **Propose Changes:** To propose a new symbol, feature, or a change to the specification, please **open an issue** on our [GitHub repository](https://github.com/scn-lang/scn/issues) using the "Specification Proposal" template.
3.  **Contribute to Tooling:** If you are building a tool that uses or generates SCN, let us know! We would love to feature it and link to it. We are actively seeking contributors for the official parsers and IDE extensions.
4.  **Spread the Word:** The success of a standard depends on its adoption. If you find SCN useful, share it with your colleagues, write about it, and show how it improves your AI-assisted workflows.
