export function addRowId(val,list) {
  if (val.length) {
    let data = [];
    for (let i = 0; i < val.length; i++) {
      let a = val[i].id;
      data.push(a)
    }
    list = data;
  }
  else {
    list = [];
  }

}
