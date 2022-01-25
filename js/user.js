$(function () {
  $("#user-logout").click(function () {
    mx.alert("提示", "您确定要退出登录吗？", true, function () {
      localStorage.removeItem("userinfo");
      window.location.href = ""
    })
  })
  $("#user-dark").click(function () {
    if (localStorage.getItem("dark") == "close" || !localStorage.getItem("dark")) {
      mx.alert("提示", "您确定要开启暗色模式<span class=\"badge badge-primary\" style='margin:0 2px'>Beta</span>吗？", true, function () {
        localStorage.setItem("dark", "open");
        window.location.href = ""
      })
    } else {
      mx.alert("提示", "您确定要关闭暗色模式吗？", true, function () {
        localStorage.setItem("dark", "close");
        window.location.href = ""
      })
    }
    
  })
})