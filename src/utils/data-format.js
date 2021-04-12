export const genTopologyTreeData = (arr1, arr2, arr3, arr4) => {
  const tmp1 = [];
  arr1.forEach((station) => {
    const dis = arr2.filter((el) => el.topology?.station === station['_id']);
    const tmp2 = [];
    dis.forEach((district) => {
      const sch = arr3.filter(
        (el) => el.topology?.district === district['_id']
      );

      const tmp3 = [];
      sch.forEach((school) => {
        const cls = arr4.filter((el) => el.topology?.school === school['_id']);
        tmp3.push({ parent: school, children: cls });
      });
      tmp2.push({ parent: district, children: tmp3 });
    });
    tmp1.push({ parent: station, children: tmp2 });
  });

  return tmp1;
};

export const genLessonTreeData = (arr1, arr2) => {
  const tmpArr1 = [...arr1, ...arr2];

  let nodeObj = {};
  tmpArr1.forEach((el) => {
    nodeObj = {
      ...nodeObj,
      [el['_id']]: el
    };
  });
  return nodeObj;
};

export const isEmptyObject = (value) => {
  if (!value) return false;
  if (!value.isArray) {
    if (typeof value === 'object') {
      if (Object.keys(value).length > 0) return true;
      else return false;
    }

    return false;
  }

  return true;
};
