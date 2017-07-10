import getDependsOnOwnProps from './getDependsOnOwnProps';

export function isSelector(key) {
  const lastIndex = key.lastIndexOf('Selector');
  return lastIndex > 0 && lastIndex === key.length - 'Selector'.length;
}

export function stripSelector(key) {
  return isSelector(key) ? key.slice(0, key.length - 'Selector'.length) : key;
}

export function evaluateSelector(selector, state, ownProps) {
  return getDependsOnOwnProps(selector) ? selector(state, ownProps) : selector(state);
}

export default function selectem(selectorsMap) {
  const allKeys = Object.keys(selectorsMap);
  const someSelectorRequiresOwnProps = allKeys.reduce((carry, key) => {
    const selectorFn = selectorsMap[key];
    return carry || getDependsOnOwnProps(selectorFn);
  }, false);
  const buildMappedSelectors = (state, ownProps) => {
    const ret = {};
    allKeys.forEach((key) => {
      ret[stripSelector(key)] = evaluateSelector(selectorsMap[key], state, ownProps);
    });
    return ret;
  };
  if (someSelectorRequiresOwnProps) {
    return (state, ownProps) => buildMappedSelectors(state, ownProps);
  }
  return state => buildMappedSelectors(state, null);
}
