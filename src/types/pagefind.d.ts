declare module '@pagefind/default-ui' {
  export class PagefindUI {
    constructor(options: {
      element: string;
      bundlePath?: string;
      showImages?: boolean;
      showSubResults?: boolean;
      resetStyles?: boolean;
    });
    destroy(): void;
  }
}
