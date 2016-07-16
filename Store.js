import { AsyncStorage } from 'react-native';
//数据存储模块 后面在封装list map 层级数据的读写接口
 
function clear() {
  return AsyncStorage.clear();
}
function get(key) {
  return AsyncStorage.getItem(key).then(value => JSON.parse(value));
}
function set(key, value) {
  return AsyncStorage.setItem(key, JSON.stringify(value));
}
function remove(key) {
  return AsyncStorage.removeItem(key);
}
function getBatch(...keys) {
  return AsyncStorage.multiGet([...keys]).then((stores) => {
    let data = {};
    stores.map((result, i, store) => {
      data[store[i][0]] = JSON.parse(store[i][1]);
    });
    return data;
  });
}
export default {
  clear,
  get,
  set,
  remove,
  getBatch,
};
