export const ninjaArraySort = (array) => {
  const sortedArray = array.sort((a, b) => {
    if (a.level < b.level) {
      return 1;
    }
    if (a.ninjaLevel > b.ninjaLevel) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    if (a.age > b.age) {
      return 1;
    }
    if (a.age < b.age) {
      return -1;
    }
    return 0;
  });
  return sortedArray;
};
  