
/**
 * Removes diacritics/accents and a set of special characters from a string.
 * Characters removed include: °, ¬, ¢, £, €, ¥, §, ©, ®, ™, ¶
 * @param str The input string.
 * @returns The string without accents and specified special characters.
 */
const removeAccents = (str: string): string => {
  // The first part of the regex [\u0300-\u036f] handles diacritics/accents after normalization.
  // The second part handles specific special characters.
  return str.normalize('NFD').replace(/[\u0300-\u036f°¬¢£€¥§©®™¶]/g, '');
};

/**
 * Recursively traverses an object or array and removes accents from all string values.
 * @param data The input object, array, or primitive.
 * @returns The processed data structure with accents removed from strings.
 */
export const removeAccentsFromObject = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(item => removeAccentsFromObject(item));
  }
  
  if (typeof data === 'object' && data !== null) {
    return Object.keys(data).reduce((acc, key) => {
      const newKey = removeAccents(key); // Also remove accents from keys
      acc[newKey] = removeAccentsFromObject(data[key]);
      return acc;
    }, {} as { [key: string]: any });
  }

  if (typeof data === 'string') {
    return removeAccents(data);
  }

  return data; // Return numbers, booleans, null, etc. as is
};
