import AsyncStorage from '@react-native-async-storage/async-storage';

// Save single or multiple key-value pairs
export const setData = async (
  key: string | Record<string, any>,
  value?: any
): Promise<void> => {
  try {
    if (typeof key === 'string') {
      // Single key-value
      const storedValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
      await AsyncStorage.setItem(key, storedValue);
    } else if (typeof key === 'object') {
      // Multiple key-value pairs
      const entries: [string, string][] = Object.entries(key).map(([k, v]) => [
        k,
        typeof v === 'object' ? JSON.stringify(v) : String(v),
      ]);
      await AsyncStorage.multiSet(entries);
    }
  } catch (error) {
    console.error('Error writing to AsyncStorage:', error);
  }
};


// Read single or multiple keys
export const getData = async (
  keys: string | string[]
): Promise<any> => {
  try {
    if (Array.isArray(keys)) {
      const result = await AsyncStorage.multiGet(keys);
      return Object.fromEntries(
        result.map(([k, v]) => [k, tryParseJSON(v)])
      );
    } else {
      const value = await AsyncStorage.getItem(keys);
      return tryParseJSON(value);
    }
  } catch (error) {
    console.error('Error reading from AsyncStorage:', error);
    return null;
  }
};

// Remove single or multiple keys
export const clearData = async (
  keys: string | string[]
): Promise<void> => {
  try {
    if (Array.isArray(keys)) {
      await AsyncStorage.multiRemove(keys);
    } else {
      await AsyncStorage.removeItem(keys);
    }
  } catch (error) {
    console.error('Error removing from AsyncStorage:', error);
  }
};

// Helper to safely parse JSON
const tryParseJSON = (value: string | null) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return value; // Return as string if not JSON
  }
};
