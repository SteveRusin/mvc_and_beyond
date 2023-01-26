import {
  EventName,
  HtmlElementKeys,
  ParsedBindedProp,
  ParsedBindedEvent,
  ParsedLoopTemplate,
} from './util.interfaces';

export function bindTemplate(viewModel: any) {
  applyPropertyBindings(viewModel);
  applyEventBindings(viewModel);
  applyLoopsBindings(viewModel);
}

function parsePropertyBindings() {
  const bindedElements = document.querySelectorAll<HTMLElement>('[data-bind]');

  return [...bindedElements].map((element): ParsedBindedProp => {
    const [eventTrigger, VMprop, ElProp] = element.dataset
      .bind!.split(':')
      .map((s) => s.trim());

    return {
      element,
      on: eventTrigger as EventName,
      VMprop,
      ElProp: ElProp as HtmlElementKeys,
    };
  });
}

function applyPropertyBindings(viewModel: any) {
  const elementsWithMetadata = parsePropertyBindings();

  elementsWithMetadata.forEach(({ element, on, VMprop, ElProp }) => {
    const currValue = viewModel[VMprop];

    Object.defineProperty(viewModel, VMprop, {
      get: function () {
        console.log('Getter called');
        return element[ElProp];
      },
      set: function (value) {
        console.log('Setter called');
        (element as any)[ElProp] = value;
      },
    });

    (element as any)[ElProp] = currValue;
    element.addEventListener(on, (el) => {
      const target = el.target as HTMLInputElement;

      viewModel[VMprop] = target.value;
    });
  });
}

// todo use event delegation
function parseEventBindings() {
  const bindedElements = document.querySelectorAll<HTMLElement>('[data-on]');

  return [...bindedElements].map((element): ParsedBindedEvent => {
    const [eventTrigger, VMHandler] = element.dataset
      .on!.split(':')
      .map((s) => s.trim());

    return {
      element,
      on: eventTrigger as EventName,
      VMHandler,
    };
  });
}

function applyEventBindings(viewModel: any) {
  const elementsWithMetadata = parseEventBindings();

  elementsWithMetadata.forEach(({ element, on, VMHandler }) => {
    element.addEventListener(on, () => {
      viewModel[VMHandler]();
    });
  });
}

function parseLoopsBindings() {
  const bindedElements =
    document.querySelectorAll<HTMLTemplateElement>('[data-forEach]');

  return [...bindedElements].map((element): ParsedLoopTemplate => {
    const VMProp = element.dataset.foreach?.trim()!;

    return {
      element,
      VMProp,
    };
  });
}

function applyLoopsBindings(viewModel: any) {
  const elementsWithMetadata = parseLoopsBindings();

  elementsWithMetadata.forEach(({ element, VMProp }) => {
    const templateParent = element.parentElement!;

    // todo redraw when prop changes
    for (const loopItem of viewModel[VMProp]) {
      const cloned = element.content.cloneNode(true);
      templateParent.appendChild(cloned);
    }
    const elementsToBindProps = findElementsByRegex('{.*}', templateParent);
    // todo replace bindings
  });
}

function findElementsByRegex(regexString: string, node: HTMLElement) {
  var elArray = [];
  var tmp = node.querySelectorAll('*');

  var regex = new RegExp(regexString);
  for (var i = 0; i < tmp.length; i++) {
    if (
      !(tmp[i] instanceof HTMLTemplateElement) &&
      regex.test(tmp[i].outerHTML)
    ) {
      elArray.push(tmp[i]);
    }
  }

  return elArray;
}
