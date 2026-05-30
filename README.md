# @achmadalimin/ui

Design system styles by [Achmad Alimin](https://achmadalimin.com/design-system) —
CSS design tokens and component classes (`ui-btn`, `ui-modal`, `ui-tabs`, and more).

> **CSS-only today.** This package ships stylesheets you use with plain HTML class
> names. React components (`import { Modal } from "@achmadalimin/ui"`) are planned
> but not yet included.

## Install

```bash
npm install @achmadalimin/ui
```

## Usage

Import the bundled stylesheet once at your app entry point:

```js
import "@achmadalimin/ui/styles.css";
```

Then use the component classes in your markup:

```html
<button class="ui-btn ui-btn--primary">Save</button>

<div class="ui-modal-overlay open">
  <div class="ui-modal" role="dialog" aria-modal="true">
    <p class="ui-modal-title">Modal title</p>
    <p class="ui-modal-body">Modal content goes here.</p>
    <div class="ui-modal-actions">
      <button class="ui-modal-btn ui-modal-btn--cancel">Cancel</button>
      <button class="ui-modal-btn ui-modal-btn--confirm">Confirm</button>
    </div>
  </div>
</div>
```

### Bring your own tokens

If you already define `--color-*` primitives, import only the component layer:

```js
import "@achmadalimin/ui/tokens.css";          // optional — the design primitives
import "@achmadalimin/ui/design-system.css";   // component classes
```

## Theming

Dark mode is the default. Light mode activates via `data-theme="light"` on `<html>`:

```html
<html data-theme="light">
```

All colors, spacing, and radii are CSS custom properties — override them in your
own stylesheet to retheme.

## Components

Accordion · Badge · Banner · Button · Card · Input · Modal · Tabs · Tooltip

See the full reference at **[achmadalimin.com/design-system](https://achmadalimin.com/design-system)**.

## License

MIT © Achmad Alimin
