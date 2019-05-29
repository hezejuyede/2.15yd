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

export function disableHistory (url) {
  //防止页面后退
  history.pushState(null, null, url);
  window.addEventListener('popstate', function () {
    history.pushState(null, null, url);
  })
}


export function getNowTime() {
  let time = new Date().getTime();
  let date = new Date(time);
  let HG = '-';
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let days = date.getDate();



  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (days >= 0 && days <= 9) {
    days = "0" + days;
  }

  let NowDate = year + HG + month + HG + days;
  return NowDate;
}



export function getYTime() {
  let time = new Date().getTime()-24*60*60*1000;
  let date = new Date(time);
  let HG = '-';
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let days = date.getDate();



  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (days >= 0 && days <= 9) {
    days = "0" + days;
  }

  let NowDate = year + HG + month + HG + days;
  return NowDate;
}
