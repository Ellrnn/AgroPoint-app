import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setItem(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
    return "success";
  } catch (e) {
    return "error";
  }
}

export async function getItem(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    return "error";
  }
}
