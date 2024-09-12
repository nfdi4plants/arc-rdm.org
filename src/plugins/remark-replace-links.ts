// src/plugins/remark-replace-links.js
import { getUrlFromEnum } from '../statics';
import type { Root } from 'mdast';
import type { Plugin, Transformer } from 'unified';
import {visit} from 'unist-util-visit'

function extractTextInsideDoubleCurlyBraces(input: string) {
  // Regular expression to match strings starting with '{{' and ending with '}}'
  const regex = /^\{\{(.+?)\}\}$/;

  // Test if the input matches the pattern
  const match = input.match(regex);

  // If there is a match, return the text inside the curly braces, otherwise return null
  return match ? match[1].trim() : null;
}

// https://dev.to/ritek/the-power-of-remark-6h
export function remarkReplaceLinks(): Plugin<[], Root> {
  const transformer: Transformer<Root> = (tree, file) => {

    visit(tree, 'link', (node) => {
      const key = extractTextInsideDoubleCurlyBraces(node.url);
      if (key) {
        let replacedValue = getUrlFromEnum(key)
        if (replacedValue) {
          // console.log(node)
          node.url = replacedValue;
        }
      }
    });
	};

	return function attacher() {
		return transformer;
	};
}