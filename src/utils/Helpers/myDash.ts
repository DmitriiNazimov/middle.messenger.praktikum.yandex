/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-continue */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

/**
 * Первый спринт
 */

export function last<T>(list: T[]): T | undefined {
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

export function range(start: number, end?: number, step = 1): number[] {
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

export function rangeRight(start: number, end?: number, step = 1): number[] {
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

export function isObject(value: any): boolean {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

export function escapeSpecialChars(chars: string): string {
  const specialChars = '[]^$.-|?*+()';

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
      const targetValue: Record<string, unknown> = target[k];
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
export function set(object: Record<string, unknown>, path: string, value: unknown) {
  if (!isObject(object)) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const keys: string[] = path.split('.').reverse();

  const tempObj = keys.reduce((acc, key, i) => {
    acc = i === 0 ? { [key]: value } : { [key]: acc };
    return acc;
  }, {});

  Object.assign(object, tempObj);

  return object;
}

// Глубокое сравнение объектов|массивов
// eslint-disable-next-line @typescript-eslint/ban-types
export function isEqual<Obj extends Object>(object1: Obj, object2: Obj) {
  if (typeof object1 !== 'object'
  || typeof object2 !== 'object'
  || object1 === null
  || object2 === null) {
    return false;
  }

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key as keyof Obj];
    const val2 = object2[key as keyof Obj];

    const areObjectsOrArrays = (isObject(val1) && isObject(val2))
    || (Array.isArray(val1) && Array.isArray(val2));

    if ((areObjectsOrArrays && !isEqual(val1 as Obj, val2 as Obj))
    || (!areObjectsOrArrays && val1 !== val2)) {
      return false;
    }
  }
  return true;
}

// Глубокое копирование обьекто-подобной сущности
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
      const copy: unknown[] = [];

      item.forEach((_, i) => {
        copy[i] = _cloneDeep(item[i]);
        return copy[i];
      });

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
      const copy: Record<string | symbol, unknown> = {};

      // * Object.symbol
      Object.getOwnPropertySymbols(item).forEach((s) => {
        // @ts-expect-error item[s]
        copy[s] = _cloneDeep(item[s]);
        return copy[s];
      });

      // * Object.name (other)
      Object.keys(item).forEach((k) => {
        // @ts-expect-error item[k]
        copy[k] = _cloneDeep(item[k]);
        return copy[k];
      });

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

export function sleep(ms = 200) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((r) => setTimeout(r, ms));
}

// Группирует значения из массивов по индексам
export function unzip(...args: number[][]) {
  let longestArg: number[] = [];

  args.forEach((arg) => {
    if (!Array.isArray(arg)) {
      throw new Error(`${arg} is not array`);
    }

    if (longestArg.length < arg.length) {
      longestArg = arg;
    }
  });

  return longestArg.map((_arg, i) => args.map((elem) => elem[i]));
}

// Объединяет имена CSS классов
export function classNames(...args: unknown[]) {
  return args
    .map((arg): string|boolean => {
      if (!arg) {
        return false;
      }

      if (Array.isArray(arg)) {
        return classNames(...arg);
      }

      if (isObject(arg)) {
        const objKeysTruthyVal = Object.keys(arg).map((key) => {
          if (!arg[key as keyof typeof arg]) {
            return false;
          }

          return key;
        });
        return classNames(...objKeysTruthyVal);
      }

      return arg as string;
    })
    .filter((item) => item)
    .join(' ');
}

// Исключает из объекта указанные свойства.
export function omit<T extends object>(obj: T, fields: (keyof T)[]) {
  const omittedObj: Record<string, unknown> = {};

  Object.keys(obj).forEach((key) => {
    if (fields.includes(key as keyof T)) {
      return;
    }

    omittedObj[key] = obj[key as keyof T];
  });

  return omittedObj;
}
