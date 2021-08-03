import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async name => {
  try {
    const jsonList = await AsyncStorage.getItem(name);
    const list = jsonList ? JSON.parse(jsonList) : [];

    return list;
  } catch (e) {
    console.log(e);
  }
};

export const addNewData = async (name, element) => {
  try {
    const list = await getData(name);
    const newList = [...list, element];
    await AsyncStorage.setItem(name, JSON.stringify(newList));

    return newList;
  } catch (e) {
    console.log(e);
  }
};

export const editData = async (name, element) => {
  try {
    const list = await getData(name);
    const newList = list.map(item =>
      item.id === element.id ? {...item, ...element} : item,
    );

    await AsyncStorage.setItem(name, JSON.stringify(newList));

    return newList;
  } catch (e) {
    console.log(e);
  }
};

export const deleteData = async (name, id) => {
  try {
    const list = await getData(name);
    const newList = list.filter(item => item.id !== id);

    await AsyncStorage.setItem(name, JSON.stringify(newList));

    return newList;
  } catch (e) {
    console.log(e);
  }
};
