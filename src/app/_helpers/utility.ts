import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

/**
 * Testa il parametr v passato come argomento per undefine
 * @param v paramentro da testare
 * @return v oppure null
 */
export function testNotNullOrUndefined(v: any) {
  if (isNotNullOrUndefined(v)) {
    return v;
  } else {
    return null;
  }
}
