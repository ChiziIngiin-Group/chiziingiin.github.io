function time_f(e) {
  var d = new Date(e);
  var date = (d.getFullYear()) + "-" +
    (d.getMonth() + 1) + "-" +
    (d.getDate()) + " " +
    (d.getHours()) + ":" +
    (d.getMinutes()) + ":" +
    (d.getSeconds());
  return date
}

function history(e) {
  var h = localStorage.getItem("SearchHistory");
  var date = new Date()
  if (h == null || h == "") h = JSON.stringify([]);
  var t = JSON.parse(h);
  t.push({ title: e, time: date.getTime() })
  var f = []
  if (t.length > 50) {
    for (var i = 0; i < 51; i++) {
      f[i] = t[i + 1]
    }
  } else {
    f = t
  }
  localStorage.setItem("SearchHistory", JSON.stringify(f))
}

function debounce(fn,delay){
  let valid = true
  return function() {
    if(!valid){
      return false 
    }
    valid = false
    setTimeout(() => {
        fn()
        valid = true;
    }, delay)
  }
}

function clickHistory(e) {
  console.log('add ClickHs')
  var h = localStorage.getItem("ClickHistory");
  var date = new Date()
  if (h == null || h == "") h = JSON.stringify([]);
  var t = JSON.parse(h);
  t.push({ title: e, time: date.getTime() })
  var f = []
  if (t.length > 50) {
    for (var i = 0; i < 51; i++) {
      f[i] = t[i + 1]
    }
  } else {
    f = t
  }
  localStorage.setItem("ClickHistory", JSON.stringify(f))
}

var GetSearchHistoryList = function () {
  var x = JSON.parse(localStorage.getItem("SearchHistory"));
  for (var i = 0; i < x.length; i++) {
    x[i].time = time_f(x[i].time)
  }
  return x
}

var wd = mx.Api.GetQueryString("wd");
if (wd) {
  var p = wd
  debounce(history(p),1000)
  $('title').text(`${p} - 赤子英金搜索`)
}
else {
  var p = ""
}
console.log("[搜索数据]", p)
$("#search-input").val(p)


var pdata = []
$.ajax({
  url: "/p/data.json",
  async: true,
  success: (res)=>{
    console.log("[搜索参考列表读取]","Success")
    pdata = res;
    console.log("[搜索参考列表]", pdata);
    var searchlist = [];

    if(p!='' && p!=' '){
      var ilist={};
      for (var i = 0; i < pdata.length; i++) {
        var r=false,y=false;
        // 添加拼音推荐
        if(!pdata[i].searchText||typeof pdata[i].searchText!='object')pdata[i].searchText=[];
        var f=pdata[i].searchText.length
        for(var j=0;j<f;j++){
          pdata[i].searchText.push(pinyin.getFullChars(pdata[i].searchText[j]).toLowerCase())
          pdata[i].searchText.push(pinyin.getCamelChars(pdata[i].searchText[j]).toLowerCase())
        }
        pdata[i].searchText.push(pinyin.getFullChars(pdata[i].title).toLowerCase())
        pdata[i].searchText.push(pinyin.getFullChars(pdata[i].description).toLowerCase())
        pdata[i].searchText.push(pinyin.getCamelChars(pdata[i].title).toLowerCase())
        pdata[i].searchText.push(pinyin.getCamelChars(pdata[i].description).toLowerCase())
        //

        // 优先级初始化
        if(!pdata[i].KeyNumber)pdata[i].KeyNumber=0;
        if(!pdata[i].titleEnd)pdata[i].titleEnd='';
        // 英金百科
        if(pdata[i].pType=='bk')pdata[i].KeyNumber+=2;
        // 仅搜索列表
        if(pdata[i].onlySearchText){
          for(var j=0;j<pdata[i].searchText.length;j++){
          console.log('命令模式',pdata[i].searchText[j]==p)
          if(pdata[i].searchText[j]==p){
              pdata[i].KeyNumber+=20
              r=true
            }
          }
        } else {
          // 绝对等于 
          if(pdata[i].title == p || pdata[i].description == p) {
            pdata[i].KeyNumber+=20;
            console.log(ilist.key,pdata[i].KeyNumber,(ilist.key < pdata[i].KeyNumber),pdata[i].description)
            if(ilist.key) if(ilist.key < pdata[i].KeyNumber) pdata[ilist.u].titleEnd='',ilist.u=i,ilist.key=pdata[i].KeyNumber,y=1
            else ilist.u=i,ilist.key=pdata[i].KeyNumber,y=1;
            r=true
          }
          else if (pdata[i].title.indexOf(p) > -1 || pdata[i].description.indexOf(p) > -1) r=true
          // 关键词列表
          if (pdata[i].searchText){
            for(var j=0;j<pdata[i].searchText.length;j++){
              if(pdata[i].searchText[j].indexOf(p) > -1){
                y=2,r=true
              }
            }
          }
        }
        // 提交
        if(r){
          searchlist.push(pdata[i])
          if (pdata[i].runFunction) new Function(pdata[i].runFunction)();
        }
        if(y==1) pdata[i].titleEnd='<span class="search-ts">最佳答案</span>'
        else if(y==2) pdata[i].titleEnd+='<span class="search-ts">智能推荐</span>'
      }
      //查询结束
      if(searchlist.length==0){
        $('#news-title').html('没有找到相关结果').css({'text-align':"center"})
      } else {
        $('#news-title').html('搜索结果').css({'text-align':"left"})
      }
    } else {
      $('#news-title').html('输入关键词开始查询').css({'text-align':"center"})
    }
    $("#cm-news-list").html("<!-- 成功加载 -->")
    console.log("[搜索数据 文章数据搜索完成]",searchlist)
    var list = [], tlist = searchlist,
    glist=['BCGOC','IGBK','CZIG'],
    zlist=['TTSCLUB'];

    function compare(property,desc) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        if(desc==true){
          return value1 - value2; //升序
        }else{
          return value2 - value1; //降序
        }
      }
    }
    console.group('搜索信息详情')
    for(var i=0;i<tlist.length;i++){
      tlist[i].KeyNumber+=(tlist[i].title.split(p).length-1)+(tlist[i].description.split(p).length-1)
      var e=tlist[i].title.split(p),w='';for(var j=0;j<e.length;j++){w+=`${e[j]}`;if(j!=e.length-1)w+=`<span class="high">${p}</span>`}tlist[i].title=w
      var e=tlist[i].description.split(p),w='';for(var j=0;j<e.length;j++){w+=`${e[j]}`;if(j!=e.length-1)w+=`<span class="high">${p}</span>`}tlist[i].description=w
      tlist[i].title+=tlist[i].titleEnd || ''
      // var e=tlist[i].description.split(p),w='';for(var j=0;j<e.length;j++) if(j!=e.length-1) w+=`${e[j]}<span class="high">${p}</span>`;tlist[i].description=w
    }
    list=tlist.sort(compare('KeyNumber',false)) // 按照相关度排序
    for(var i=0;i<list.length;i++){
      var j=``,k=`i0`
      if(list[i].img){
       if(list[i].img.length>=3){var k=`i3`, j=`<div class="i-box"><i style="background-image:url(${list[i].img[0]});" class="i"></i><i style="background-image:url(${list[i].img[1]});" class="i"></i><i style="background-image:url(${list[i].img[2]});" class="i"></i></div>`}
       else if(list[i].img.length>=1){var k=`i1`, j=`<i style="background-image:url(${list[i].img[0]})" class="i"></i>`}
      }
      url=list[i].url
      AuthorType="",d='',id=mx.Api.getRandomString(12),that=list[i].pId;
      if(list[i].read && list[i].comment){d=`<span class="d">${list[i].read}阅读 · ${list[i].comment}评论</span>`}
      for(var j2=0;j2<glist.length;j2++){if(list[i].authorId==glist[j2]){AuthorType='g';}}
      for(var j3=0;j3<zlist.length;j3++){if(list[i].authorId==zlist[j3]){AuthorType='z'}}
      console.log('[文章代码]',{str:list[i]},'相关度',list[i].KeyNumber,'作者',list[i].authorId)
      $("#cm-news-list").append(`<a pid="${list[i].pId}" id=${id} purl="${url}" href="${url}" class="${k}"><span class="ba">  <span class="t">${list[i].title}</span>  <span class="c">${list[i].description}</span></span>${j}<span class="da">  <span class="a" ${AuthorType} authorId="${list[i].authorId}">${list[i].author}</span>${d}</span></a>`)
      $(`a#${id}`).on('click',()=>{debounce(clickHistory(that),1000)})
    }
    // $.ajax({
    //   url:`https://baidu.com/sugrec`,
    //   async: true,
    //   type:"jsonp",
    //   success:(e)=>{
    //     console.log(e)
    //   },
    //   fail:(e)=>{
    //     console.error(e)
    //   }
    // })
    $("#cm-news-list").append(`<li class="ts"><span>赤子英金搜索引擎2.0</span></li>`);
    console.groupEnd()//搜索信息详情Group关闭

  },
  fail: function (res) {
    console.warn("[搜索参考列表读取]","Fail")
    mx.alert("提示", "网络连接失败！ <br/> 错误码:0x000000");
    console.error("[搜索参考列表读取错误原因]",res)
  }
})






/* 控制页面样式 */
// $(".search-bar input").keydown(function (e) {
//   if ($(this).val() == "" || e.which == 13) {
//     $(".search-bar").removeClass("active")
//   }
// })
// $(".search-bar input").keyup(function (e) {
//   if ($(this).val() == "" || e.which == 13) {
//     $(".search-bar").removeClass("active")
//   } else {
//     $(".search-bar").addClass("active")
//   }
// })
// $(".search-bar .after").click(function () {
//   $(".search-bar").removeClass("active")
// })
// $(function () {
//   $(".search-bar").removeClass("active")
// })