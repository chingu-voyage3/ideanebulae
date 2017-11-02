function lsTest(){
    var test = 'test123321';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

const setObject = function(key, value) {
  if(lsTest()){
    localStorage.setItem(key, JSON.stringify(value));
  }
}

const getObject = function(key) {
    var value = localStorage.getItem(key);
    return value && JSON.parse(value);
}

export default {
  setObject,
  getObject,
}