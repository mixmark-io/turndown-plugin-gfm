// Compile-time check that the type definitions match the public API.
// Run with `tsc --noEmit` (see tsconfig.json).

import TurndownService from "turndown";
import {
  gfm,
  highlightedCodeBlock,
  strikethrough,
  tables,
  taskListItems,
} from "..";

const service = new TurndownService();

// Each export is a TurndownService.Plugin: (service) => void.
service.use(gfm);
service.use(highlightedCodeBlock);
service.use(strikethrough);
service.use(tables);
service.use(taskListItems);

// They can also be applied as an array via `use`.
service.use([highlightedCodeBlock, strikethrough, tables, taskListItems]);

// Direct invocation is allowed too.
gfm(service);
highlightedCodeBlock(service);
strikethrough(service);
tables(service);
taskListItems(service);

// Return type is void.
const result: void = gfm(service);
void result;
