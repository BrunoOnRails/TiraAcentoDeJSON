
/**
 * Removes diacritics/accents and a set of special characters from a string.
 * Characters removed include: °, ¬, ¢, £, €, ¥, §, ©, ®, ™, ¶
 * @param str The input string.
 * @returns The string without accents and specified special characters.
 */
const removeAccents = (str: string): string => {
  if (!str) return str;
  return str.normalize('NFD').replace(/[\u0300-\u036f°¬¢£€¥§©®™¶]/g, '');
};

/**
 * Recursively traverses an object or array and removes accents from all string values.
 * @param data The input object, array, or primitive.
 * @param processKeys Whether to remove accents from object keys.
 * @returns The processed data structure with accents removed from strings.
 */
export const removeAccentsFromObject = (data: any, processKeys: boolean = true): any => {
  if (Array.isArray(data)) {
    return data.map(item => removeAccentsFromObject(item, processKeys));
  }
  
  if (typeof data === 'object' && data !== null) {
    return Object.keys(data).reduce((acc, key) => {
      const newKey = processKeys ? removeAccents(key) : key;
      acc[newKey] = removeAccentsFromObject(data[key], processKeys);
      return acc;
    }, {} as { [key: string]: any });
  }

  if (typeof data === 'string') {
    return removeAccents(data);
  }

  return data;
};
