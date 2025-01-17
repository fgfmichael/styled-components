import { ExtensibleObject, FlattenerResult, Interpolation, Styles } from '../types';
import { EMPTY_ARRAY } from '../utils/empties';
import flatten from '../utils/flatten';
import interleave from '../utils/interleave';
import isFunction from '../utils/isFunction';
import isPlainObject from '../utils/isPlainObject';

export const cssWithContext =
  (executionContext?: ExtensibleObject) => (
    styles: Styles,
    ...interpolations: Array<Interpolation>
  ): FlattenerResult => {
  if (isFunction(styles) || isPlainObject(styles)) {
    const styleFunctionOrObject = styles as Function | ExtensibleObject;

    return flatten(interleave(EMPTY_ARRAY as string[], [styleFunctionOrObject, ...interpolations]), executionContext);
  }

  const styleStringArray = styles as string[];

  if (
    interpolations.length === 0 &&
    styleStringArray.length === 1 &&
    typeof styleStringArray[0] === 'string'
  ) {
    return styleStringArray;
  }

  return flatten(interleave(styleStringArray, interpolations), executionContext);
}

export default function css(
  styles: Styles,
  ...interpolations: Array<Interpolation>
): FlattenerResult {
  return cssWithContext({})(styles, ...interpolations);
}
