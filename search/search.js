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

var hotnews = []
$.ajax({
  url: "./bl.json",
  async: true,
  success: function (res) {
    console.log("[搜索参考列表读取]","Success")
    hotnews = res;
    console.log("[搜索参考列表]", hotnews);
    var searchlist = [];

    // 搜索数据[0] : 文章数据
    for (var i = 0; i < hotnews[0].length; i++) {
      if (hotnews[0][i].title.indexOf(p) > -1 || hotnews[0][i].data.date.indexOf(p) > -1 || hotnews[0][i].contentText.indexOf(p) > -1) {
        searchlist.push(hotnews[0][i])
      }
      if (hotnews[0][i].searchtext.length > 1){
        for(var j = 0;j<hotnews[0][i].searchtext.length;j++){
          if(hotnews[0][i].searchtext[j].indexOf(p) > 1){
            
          }
        }
      }
    }
    console.log("[搜索数据(0)文章数据搜索完成]",searchlist)
    // 搜索数据[1] : 八六数据
    for (var i = 0; i < hotnews[1].length; i++) {
      if (hotnews[1][i].title.indexOf(p) > -1 || hotnews[1][i].contentText.indexOf(p) > -1) {
        searchlist.push(hotnews[1][i])
      }
      if (hotnews[1][i].searchtext.length > 1){
        for(var j = 0;j<hotnews[1][i].searchtext.length;j++){
          if(hotnews[1][i].searchtext[j].indexOf(p) > 1){
            
          }
        }
      }
    }
    console.log("[搜索数据(1)班级数据搜索完成]",searchlist)


    console.log("[搜索查询原始数据]", searchlist)
    if (p == "" || (searchlist.length == hotnews.length && p.indexOf(" ") > -1)) {
      $(".search-list").append("<k style='display:block;height:50px;padding:0px 15px;line-height:50px;text-align:center'>输入关键词开始搜索</k>");
    }
    else if (searchlist.length == 0) {
      $(".search-list").append("<k style='display:block;height:50px;padding:0px 15px;line-height:50px;text-align:center'>未找到结果</k>");
    } else {
      $(".search-list").append("<ul style=\"margin:0px;\"></ul>");
      for (var i = 0; i < searchlist.length; i++) {
        var content = ""
        if (p !== "") {
          var title = searchlist[i].title.replace(new RegExp(p, "g"), "<em>" + p + "</em>")
          var time = searchlist[i].data.date.replace(new RegExp(p, "g"), "<em>" + p + "</em>")
          if(searchlist[i].contentText){
            var content = searchlist[i].contentText.replace(new RegExp(p, "g"), "<em>" + p + "</em>")
          }
        } else {
          var title = searchlist[i].title
          var time = searchlist[i].data.date
          if(searchlist[i].contentText){
            var content = searchlist[i].contentText.replace(new RegExp(p, "g"), "<em>" + p + "</em>")
          }
        }
        console.log(searchlist[i])
        var n="",u="";
        if(searchlist[i].imgurl != "" && searchlist[i].imgurl != "#") n="<div class=\"imgbox\"><img alt=\"\" src=\"" + searchlist.imgurl + "\"></div>",u="k"
        $(".search-list ul").append("<li url=\"" + searchlist[i].url+searchlist[i].id+ "\"class=\""+u+"\"·>"+n+" <div class=\"textbox\"><p class=\"texttitle\"><span>" + title + "</span></p> <p class=\"textcontent\"><span>" + content + "</span></p> <p class=\"textbar\"><span id=\"date\">" + time + "</span> <span class=\"space\"></span></p></div></li>");
      }
      $(".search-list li").on("click", function () {
        window.open($(this).attr("url"));
      })
    }
    /* 页面滚动 */
    $(document).scroll(function () {
      var scrtop = $(document).scrollTop()
      if (scrtop >= 260) {
        if ($(".search-box").attr("a") !== "1") {
          $(".search-box").addClass("more").attr("a", "1")
          $("#temp").html(".search-box.more .search-bar{width:" + $(window).width() + "px}")
        }
      } else {
        $(".search-box").removeClass("more").removeAttr("a")
      }
    });
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