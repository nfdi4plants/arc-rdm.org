import assert from 'node:assert/strict';

/** Verify the initial disclosure state from the rendered links and their nesting. */
export function checkNavigationBranches(html, path) {
  const stack = [];
  const branches = [];
  for (const [, closing, tag, attributes] of html.matchAll(/<(\/?)(details|a)\b([^>]*)>/g)) {
    if (tag === 'details') {
      if (closing) stack.pop();
      else {
        const branch = /class="[^"]*\bnavigation-branch\b/.test(attributes)
          ? { open: /(?:^|\s)open(?:\s|=|$)/.test(attributes), selected: false }
          : undefined;
        stack.push(branch);
        if (branch) branches.push(branch);
      }
    } else if (!closing && /aria-current="page"/.test(attributes)) {
      for (const branch of stack) if (branch) branch.selected = true;
    }
  }
  for (const branch of branches) {
    assert.equal(branch.open, branch.selected, `Only the selected navigation branch and its ancestors should start open: ${path}`);
  }
}
