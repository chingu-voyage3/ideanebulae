function lsTest() {
  const test = 'test123321';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

const setObject = (key, value) => {
  if (lsTest()) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  return null;
};

const getObject = (key) => {
  if (lsTest()) {
    const value = localStorage.getItem(key);
    return value && JSON.parse(value);
  }
  return null;
};

export default {
  setObject,
  getObject,
};
