/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */

/**
 * Первый спринт
 */

export function last(list: unknown[]): unknown {
  if (!Array.isArray(list) || !list.length) {
    return undefined;
  }

  return list[list.length - 1];
}

export function first(list: unknown[]): unknown {
  if (!Array.isArray(list) || !list.length) {
    return undefined;
  }

  return list[0];
}

export function range(start: number, end?: number, step: number = 1): number[] {
  /* eslint-disable no-param-reassign */

  const result: number[] = [];

  if (step < 0) {
    step *= -1;
  }

  if (typeof end !== 'number') {
    end = start;
    start = 0;
  }

  if (end < 0) {
    for (let i = start; i > end; i -= step) {
      result.push(i);
    }
    return result;
  }

  if (step === 0) {
    for (let i = start; i < end; i += 1) {
      result.push(start);
    }
    return result;
  }

  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}

export function rangeRight(start: number, end?: number, step: number = 1): number[] {
  return range(start, end, step).reverse();
}

export function isEmpty(value: any): boolean {
  if (typeof value === 'undefined') return true;
  if (value === null) return true;
  if (typeof value === 'boolean') return true;
  if (value === '') return true;
  if (typeof value === 'number') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && value.size === 0) return true;

  if (typeof value === 'object' && Object.keys(value).length === 0 && typeof value.has !== 'function') {
    return true;
  }

  return false;
}

/**
 * Третий спринт
 */

// eslint-disable-next-line import/prefer-default-export
export function isObject(value: any): boolean {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

export function escapeSpecialChars(chars: string): string {
  const specialChars: string = '[]^$.-|?*+()';

  return chars
    .split('')
    .map((char) => (specialChars.includes(char) ? `\\${char}` : char))
    .join('');
}

// Аналог стандартной функции trim(). Умеет убирать любые символы, а не только пробелы.
export function trim(string: string, chars?: string): string {
  const pattern: string = chars ? `[\\s${escapeSpecialChars(chars)}]+` : '\\s+';

  const regExp = new RegExp(`^${pattern}|${pattern}$`, 'gi');

  return string.replace(regExp, '');
}

// Глубокое слияние объектов
export function merge(target: Record<string, any>, ...sources: any[]) {
  for (const source of sources) {
    for (const k in source) {
      const targetValue: {} = target[k];
      const sourceValue = source[k];
      if (isObject(sourceValue) && isObject(targetValue)) {
        target[k] = merge(targetValue, sourceValue);
        continue;
      }
      target[k] = source[k];
    }
  }
  return target;
}

// Добавление значения в обьект по пути через точечную нотацию.
// Пример: set(obj, 'foo.bar.baz', 1); // {foo: {bar: {baz: 1}}}
export function set(object: {}, path: string, value: unknown) {
  if (!isObject(object)) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const keys: string[] = path.split('.').reverse();

  const tempObj = keys.reduce((acc, key, i) => {
    acc = (i === 0) ? { [key]: value } : { [key]: acc };
    return acc;
  }, {});

  Object.assign(object, tempObj);

  return object;
}

// Глубокое сравнение объектов
export function isEqual<Obj extends Object>(a: Obj, b: Obj): boolean {
  const compares: boolean[] = [];

  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  for (const item in a) {
    if (!isObject(a[item]) && !isObject(b[item])) {
      if (Array.isArray(a[item])) {
        return (a[item] as any[]).toString() === (b[item] as any[]).toString();
      }

      return a[item] === b[item];
    }
    compares.push(isEqual(a[item] as Obj, b[item] as Obj));
  }

  if (compares.find((item: boolean) : boolean => item === false) === false) {
    return false;
  }

  return true;
}

// Глубокое копирование обьекта
export function cloneDeep<T extends object = object>(obj: T) {
  // eslint-disable-next-line max-len
  return (function _cloneDeep(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
    if (item === null || typeof item !== 'object') {
      return item;
    }

    if (item instanceof Date) {
      return new Date(item.valueOf());
    }

    if (item instanceof Array) {
      const copy: any[] = [];

      item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

      return copy;
    }

    if (item instanceof Set) {
      const copy = new Set();

      item.forEach((v) => copy.add(_cloneDeep(v)));

      return copy;
    }

    if (item instanceof Map) {
      const copy = new Map();

      item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

      return copy;
    }

    if (item instanceof Object) {
      const copy: Record<string | symbol, any> = {};

      // * Object.symbol
      // @ts-expect-error item[s]
      Object.getOwnPropertySymbols(item).forEach((s) => (copy[s] = _cloneDeep(item[s])));

      // * Object.name (other)
      // @ts-expect-error item[k]
      Object.keys(item).forEach((k) => (copy[k] = _cloneDeep(item[k])));

      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  }(obj));
}

// Преобразует любые типы данных в строку get-запроса
type StringIndexed = Record<string, any>;
export function queryStringify(data: StringIndexed): string | never {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data); // ?
  return keys.reduce((result, key, index) => {
    const value: keyof StringIndexed = data[key];
    const endLine = index < keys.length - 1 ? '&' : '';

    if (Array.isArray(value)) {
      const arrayValue = value.reduce<StringIndexed>(
        (acc, arrData, i) => ({
          ...acc,
          [`${key}[${i}]`]: arrData,
        }),
        {},
      );

      return `${result}${queryStringify(arrayValue)}${endLine}`;
    }

    if (typeof value === 'object') {
      const objValue = Object.keys(value || {}).reduce<StringIndexed>(
        (acc, k) => ({
          ...acc,
          [`${key}[${k}]`]: value[k],
        }),
        {},
      );

      return `${result}${queryStringify(objValue)}${endLine}`;
    }

    return `${result}${key}=${value}${endLine}`;
  }, '');
}

export function sanitizeString(string: string): string {
  const unsafeChars: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return string.replace(/[&<>"'/]/ig, (match) => (unsafeChars[match]));
}

export function sanitizeUrl(string: string): string {
  const unsafeChars: Record<string, string> = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  };
  return string.replace(/[<>"']/gi, (match) => unsafeChars[match]);
}
