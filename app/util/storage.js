import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * @param {string} key
 * @returns {Promise<any>} if not exists = null
 */
export async function getItem(key){
    let getStr = await AsyncStorage.getItem(key);
    return JSON.parse(getStr);
}

/**
 * @param {string} key 
 * @param {any} value 
 * @param {Promise<void>}
 */
export async function setItem(key, value){
    await AsyncStorage.setItem(key, JSON.stringify(value));
}

/**
 * @param {string} key
 * @param {Promise<void>}
 */
export async function removeItem(key){
    await AsyncStorage.removeItem(key);
}