export function createElement({ tagName, className, attributes = {} }: 
  {
    tagName: string,
    className?: string,
    attributes?: object
  }) {
  const element = document.createElement(tagName);

  if (className) {
    const classNames = className.split(' ').filter(Boolean);
    element.classList.add(...classNames);
  }

  Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key as keyof object]));

  return element;
}
