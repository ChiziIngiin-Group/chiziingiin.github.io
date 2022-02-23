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

var GetSearchHistoryList = function () {
  var x = JSON.parse(localStorage.getItem("SearchHistory"));
  for (var i = 0; i < x.length; i++) {
    x[i].time = time_f(x[i].time)
  }
  return x
}

var wd = mx.Api.GetQueryString("wd");
if (wd) {
  var p = decodeURIComponent(wd)
  $("#search-input").val(p)
  history(p)
}
else {
  var p = ""
}
console.log("[搜索数据]", p)

var pdata = []
$.ajax({
  url: "/p/data.json",
  async: true,
  success: function (res) {
    console.log("[搜索参考列表读取]","Success")
    pdata = res;
    console.log("[搜索参考列表]", pdata);
    var searchlist = [];

    if(p!='' && p!=' '){
      for (var i = 0; i < pdata.length; i++) {
        if(pdata[i].pType=='bk'){
          if (pdata[i].title.indexOf(p) > -1 || pdata[i].description.indexOf(p) > -1) {
            searchlist.push(pdata[i])
          }
          if (pdata[i].searchText){
            for(var j = 0;j<pdata[i].searchText.length;j++){
              if(pdata[i].searchText[j].indexOf(p) > 1){
                searchlist.push(pdata[i])
              }
            }
          }
          console.warn(';!')
        }else{
          console.warn(';;')
        }
      }

      // 搜索数据 : 文章数据
      for (var i = 0; i < pdata.length; i++) {
        if(pdata[i].pType=='psg'){
          if (pdata[i].title.indexOf(p) > -1  || pdata[i].description.indexOf(p) > -1) {
            searchlist.push(pdata[i])
          }
          if (pdata[i].searchText){
            for(var j = 0;j<pdata[i].searchText.length;j++){
              if(pdata[i].searchText[j].indexOf(p) > 1){
                searchlist.push(pdata[i])
              }
            }
          }
          console.warn(';!')
        }else{
          console.warn(';;')
        }
      }
    }

    if(searchlist.length==0){
      $("#cm-news-list").html("没有找到相关结果").css({'margin-top':"20px",'text-align':"center"})
    }else{
      $("#cm-news-list").html("")
    }

    console.log("[搜索数据(0)文章数据搜索完成]",searchlist)
    
    var list = searchlist, 
    glist=['BCGOC','IGBK'],
    zlist=['TTSCLUB'];

    for(var i=0;i<list.length;i++){
      list[i].title=list[i].title.replace(RegExp(p,'g'),`<span class="high">${p}</span>`)
      list[i].description=list[i].description.replace(RegExp(p,'g'),`<span class="high">${p}</span>`)
      if(list[i].img.length>=3){var k=`i3`, j=`<div class="i-box"><i style="background-image:url(${list[i].img[0]});" class="i"></i><i style="background-image:url(${list[i].img[1]});" class="i"></i><i style="background-image:url(${list[i].img[2]});" class="i"></i></div>`}
      else if(list[i].img.length>=1){var k=`i1`, j=`<i style="background-image:url(${list[i].img[0]})" class="i"></i>`}
      else{var j=``,k=`i0`};
      url=list[i].url
      AuthorType="";
      for(var j2=0;j2<glist.length;j2++){if(list[i].authorId==glist[j2]){AuthorType='g';console.log(list[i].authorId,glist[j2])}}
      for(var j3=0;j3<zlist.length;j3++){if(list[i].authorId==zlist[j3]){AuthorType='z'}}
      console.log('[文章代码]',list[i])
      $("#cm-news-list").append(`<li id="${list[i].pId}" url="${url}" class="${k}"><span class="ba">  <span class="t">${list[i].title}</span>  <span class="c">${list[i].description}</span></span>${j}<span class="da">  <span class="a" ${AuthorType} authorId="${list[i].authorId}">${list[i].author}</span>  <span class="d">${list[i].read}阅读 · ${list[i].comment}评论</span></span></li>`)
      $(`#${list[i].pId}`).click(()=>{window.location.href=`${url}`})
    }


    // if (p == "" || (searchlist.length == pdata.length && p.indexOf(" ") > -1)) {
    //   $(".search-list").append("<k style='display:block;height:50px;padding:0px 15px;line-height:50px;text-align:center'>输入关键词开始搜索</k>");
    // }
    // else if (searchlist.length == 0) {
    //   $(".search-list").append("<k style='display:block;height:50px;padding:0px 15px;line-height:50px;text-align:center'>未找到结果</k>");
    // } else {
    //   $(".search-list").append("<ul style=\"margin:0px;\"></ul>");
    //   for (var i = 0; i < searchlist.length; i++) {
    //     var content = ""
    //     if (p !== "") {
    //       var title = searchlist[i].title.replace(new RegExp(p, "g"), "<em>" + p + "</em>")
    //       // var time = searchlist[i].data.date.replace(new RegExp(p, "g"), "<em>" + p + "</em>")
    //       if(searchlist[i].contentText){
    //         var content = searchlist[i].contentText.replace(new RegExp(p, "g"), "<em>" + p + "</em>")
    //       }
    //     } else {
    //       var title = searchlist[i].title
    //       var time = searchlist[i].data.date
    //       if(searchlist[i].contentText){
    //         var content = searchlist[i].contentText.replace(new RegExp(p, "g"), "<em>" + p + "</em>")
    //       }
    //     }
    //     console.log(searchlist[i])
    //     var n="",u="";
    //     if(searchlist[i].imgurl != "" && searchlist[i].imgurl != "#") n="<div class=\"imgbox\"><img alt=\"\" src=\"" + searchlist.imgurl + "\"></div>",u="k"
    //     $(".search-list ul").append("<li url=\"" + searchlist[i].url+searchlist[i].id+ "\"class=\""+u+"\"·>"+n+" <div class=\"textbox\"><p class=\"texttitle\"><span>" + title + "</span></p> <p class=\"textcontent\"><span>" + content + "</span></p> <p class=\"textbar\"><span id=\"date\">" + time + "</span> <span class=\"space\"></span></p></div></li>");
    //   }
    //   $(".search-list li").on("click", function () {
    //     window.open($(this).attr("url"));
    //   })
    // }
    /* 页面滚动 */
    // $(document).scroll(function () {
    //   var scrtop = $(document).scrollTop()
    //   if (scrtop >= 260) {
    //     if ($(".search-box").attr("a") !== "1") {
    //       $(".search-box").addClass("more").attr("a", "1")
    //       $("#temp").html(".search-box.more .search-bar{width:" + $(window).width() + "px}")
    //     }
    //   } else {
    //     $(".search-box").removeClass("more").removeAttr("a")
    //   }
    // });
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