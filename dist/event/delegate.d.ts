declare function delegate(scope: HTMLElement, query: string, cb: (ev: Event, el: HTMLElement) => void): (ev: Event) => void;
export { delegate };
