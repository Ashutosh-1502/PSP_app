// src/hooks/useColorScheme.ts
import { useColorScheme as _useColorScheme } from 'react-native';

export function useColorScheme() {
  const theme = _useColorScheme();
  return theme;
}
