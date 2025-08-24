export const isArrayOfObjects = (arr: any[]): boolean => {
  return (
    Array.isArray(arr) &&
    arr.every(
      (obj) => typeof obj === "object" && obj !== null && !Array.isArray(obj)
    )
  );
};

export const mergeArrays = (
  a: any[],
  b: any[],
  keyToLookUpA: string,
  keyToLookUpB: string
): any[] => {
  // Create a map for quick lookup by sectionId from array b
  const bMap = new Map(b.map((item) => [item?.[keyToLookUpB], item]));

  // Merge the arrays
  const merged = a.map((itemA) => {
    const itemB = bMap.get(itemA?.[keyToLookUpA]);
    if (itemB) {
      return { ...itemA, ...itemB }; // Merge properties, itemB properties overwrite itemA
    }
    return itemA; // No corresponding item in b, keep itemA as is
  });

  // Add items from b that are not in a
  b.forEach((itemB) => {
    if (
      !merged.some((item) => item?.[keyToLookUpA] === itemB?.[keyToLookUpB])
    ) {
      merged.push(itemB);
    }
  });

  return merged;
};
