// Type definitions for turndown-plugin-gfm
// Project: https://github.com/mixmark-io/turndown-plugin-gfm
//
// Each export is a Turndown plugin: a function that registers rules on a
// TurndownService instance. They are compatible with Turndown's `Plugin`
// type (see `@types/turndown`).

import type TurndownService from "turndown";

/**
 * Combined GFM plugin. Applies `highlightedCodeBlock`, `strikethrough`,
 * `tables`, and `taskListItems` in one call via `turndownService.use([...])`.
 */
export function gfm(turndownService: TurndownService): void;

/**
 * Converts `<div class="highlight-source-*">` / `highlight-text-*` blocks
 * (used by older GitHub HTML) into fenced code blocks with a language hint.
 */
export function highlightedCodeBlock(turndownService: TurndownService): void;

/**
 * Converts `<del>`, `<s>`, and `<strike>` elements to `~text~`.
 */
export function strikethrough(turndownService: TurndownService): void;

/**
 * Converts HTML tables to GFM pipe tables. Tables without a heading row
 * are preserved as raw HTML via `TurndownService#keep`.
 */
export function tables(turndownService: TurndownService): void;

/**
 * Converts checkbox inputs nested inside `<li>` elements to GFM task list
 * markers (`[ ]` / `[x]`).
 */
export function taskListItems(turndownService: TurndownService): void;
