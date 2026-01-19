# UI Styling & Design Tokens

## Colors

### Primary Palette

- Primary: `#4F46E5` (Indigo)
- Primary Light: `#818CF8`
- Primary Dark: `#3730A3`

### Neutral Palette

- Background: `#FFFFFF`
- Surface: `#F9FAFB`
- Border: `#E5E7EB`
- Text Primary: `#111827`
- Text Secondary: `#6B7280`

### Semantic Colors

- Success: `#10B981`
- Warning: `#F59E0B`
- Error: `#EF4444`
- Info: `#3B82F6`

---

## Typography

### Font Family

```css
--font-sans: 'Inter', 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Font Sizes

| Name | Size | Line Height |
| ---- | ---- | ----------- |
| xs   | 12px | 16px        |
| sm   | 14px | 20px        |
| base | 16px | 24px        |
| lg   | 18px | 28px        |
| xl   | 20px | 28px        |
| 2xl  | 24px | 32px        |
| 3xl  | 30px | 36px        |

---

## Spacing

| Name | Value |
| ---- | ----- |
| 1    | 4px   |
| 2    | 8px   |
| 3    | 12px  |
| 4    | 16px  |
| 5    | 20px  |
| 6    | 24px  |
| 8    | 32px  |
| 10   | 40px  |
| 12   | 48px  |

---

## Components

### Buttons

- Primary: Background `primary`, Text `white`
- Secondary: Background `surface`, Border `border`, Text `text-primary`
- Danger: Background `error`, Text `white`

### Inputs

- Border Radius: `8px`
- Height: `40px`
- Padding: `0 12px`
- Focus Ring: `primary` with `2px` offset

---

## Breakpoints

| Name | Min Width |
| ---- | --------- |
| sm   | 640px     |
| md   | 768px     |
| lg   | 1024px    |
| xl   | 1280px    |
| 2xl  | 1536px    |
