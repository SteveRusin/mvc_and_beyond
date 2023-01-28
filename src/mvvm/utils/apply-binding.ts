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
        return element[ElProp];
      },
      set: function (value) {
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

  elementsWithMetadata.forEach(({ VMProp }) => {
    let originalValue = viewModel[VMProp];
    Object.defineProperty(viewModel, VMProp, {
      get: function () {
        return originalValue;
      },
      set: function (value) {
        originalValue = value;
        applyLoopTemplateBindings(viewModel, elementsWithMetadata);
      },
    });
  });

  applyLoopTemplateBindings(viewModel, elementsWithMetadata);
}

function applyLoopTemplateBindings(
  viewModel: any,
  elementsWithMetadata: ParsedLoopTemplate[]
) {
  elementsWithMetadata.forEach(({ element, VMProp }) => {
    const templateParent = element.parentElement!;
    while (templateParent.children.length > 1) {
      templateParent.removeChild(templateParent.children[1]);
    }
    const iterable: any[] = viewModel[VMProp];

    for (const loopItem of iterable) {
      const clonedTemplate = element.content.cloneNode(
        true
      ) as DocumentFragment;
      const clonedElements = [...clonedTemplate.children] as HTMLElement[];
      templateParent.appendChild(clonedTemplate);

      clonedElements.forEach((clonedElement) => {
        const newHtml = clonedElement.outerHTML.replaceAll(
          /{.*?}/g,
          (match) => {
            const key = match.substring(1, match.length - 1);
            return loopItem[key];
          }
        );

        if (newHtml !== clonedElement.outerHTML) {
          clonedElement.outerHTML = newHtml;
        }

        const eventBinding = clonedElement.dataset.on
          ?.split(':')
          .map((s) => s.trim());

        if (!eventBinding) {
          return;
        }

        const [eventTrigger, VMHandler] = eventBinding;

        clonedElement.addEventListener(eventTrigger, () =>
          viewModel[VMHandler](loopItem)
        );
      });
    }
  });
}
