export function groupBy(array, key) {
  return array.reduce((group, element) => {
    const keyValue = element[key];
    return { ...group, [keyValue]: [...(group[keyValue] ?? []), element] };
  }, {});
}

export const dateConvertor = (dateInMilliSeconds) => {
  let date = new Date(dateInMilliSeconds).toLocaleTimeString().split(':');
  return `${date[0]}:${date[1]}`;
};
