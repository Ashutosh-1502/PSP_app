import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Get data from AsyncStorage
 * @param key The key to retrieve
*/
export const getData = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error('Error reading from AsyncStorage:', error);
    return null;
  }
};

/**
 * Set or update data in AsyncStorage
 * @param key The key to store
 * @param value The value to store
*/
export const setData = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error writing to AsyncStorage:', error);
  }
};

/**
 * Remove data from AsyncStorage
 * @param key The key to remove
*/
export const clearData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from AsyncStorage:', error);
  }
};
