const truncate = (text, value) => {
  if (text.length < value - 3) {
    return text;
  }
  return `${text.substring(0, value - 3)}...`;
};

export default {
  truncate,
};
