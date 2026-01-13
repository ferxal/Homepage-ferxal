# 组件系统使用文档 (Component System Documentation)

## 1. 架构设计 (Architecture)

项目采用原子化组件架构：
- **Micro Components (原子组件)**: 最小功能单元，如 `CardTitle`, `CardButton`, `CardContainer`。位于 `src/components/micro/`。
- **Macro Components (宏观组件)**: 完整的卡片布局单元，由原子组件组合而成。位于 `src/components/macro/`。

## 2. 组件库 (Component Library)

所有宏观组件通过 `src/components/library.ts` 统一管理。

### 分类索引：
- **尺寸 (Size)**:
  - `Small`: `MacroCard2x1` (2x1 窄条)
  - `Medium`: `MacroCard2x2` (2x2 方块)
  - `Tall`: `MacroCard2x3` (2x3 竖长)
  - `Large`: `MacroCard4x2` (4x2 横大)
  - `Full`: `MacroCard8x1` (8x1 全宽)
- **功能 (Functional)**:
  - `Display`: 展示型 (`8x1`, `2x3`)
  - `Interactive`: 交互型 (`2x1`, `2x2`, `4x2`)

## 3. 使用示例 (Usage Example)

```astro
---
import { MacroCard4x2 } from "../components/library";
const myInfo = {
  title: "我的项目",
  desc: "项目描述",
  url: "https://example.com",
  btnText: "查看更多",
  bgStyle: "bg-blue-500"
};
---
<MacroCard4x2 info={myInfo} />
```

## 4. 文本定制 (I18n)

所有组件的默认文本均通过 `src/data/locales/zh.ts` 中的 `components` 命名空间管理。

## 5. 性能与兼容性

- **性能**: 所有组件均作为 Astro 静态组件渲染，0 客户端 JS 负担（除非明确标记 `is:inline`）。
- **兼容性**: 保持了与旧版 `card_*.astro` 组件相同的 Props 接口，确保无缝迁移。
