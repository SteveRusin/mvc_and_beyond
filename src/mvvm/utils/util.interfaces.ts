export type EventName = keyof HTMLElementEventMap;
export type HtmlElementKeys = keyof HTMLElement;

export interface ParsedBindedProp {
  element: HTMLElement;
  on: EventName;
  VMprop: string;
  ElProp: HtmlElementKeys;
}

export interface ParsedBindedEvent {
  element: HTMLElement;
  on: EventName;
  VMHandler: string;
}

export interface ParsedLoopTemplate {
  element: HTMLTemplateElement;
  VMProp: string;
}
