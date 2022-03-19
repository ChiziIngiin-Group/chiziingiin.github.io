/*! 
 * mx.js v0.2.0.007
 * Author Zhangxinyue etc.
 * (c) 2020-2022 ChiziIngin Information Technology Research Institute.
 * Released under the MIT License.
 */

/* declare constant */
const LoginPage = "./login/index.html";
const VersionNumber = "0.2.0.007";
var randomlist = [''];

/* Version Info */
console.log(`%cmx.js%cv${VersionNumber}`,`color: #fff; background-color:#007bff;padding:4px 6px;padding-right:3px;border-top-left-radius:5px;border-bottom-left-radius:5px;`, `color: #fff; background-color:#00a826;padding:4px 6px;padding-left:3px;border-top-right-radius:5px;border-bottom-right-radius:5px;`);


/* Main Function */
var mx = {
  data:{
    ifjq:Promise.resolve()
  },
  version:VersionNumber,
  /* System interface function */
  Api: {
    // Temp Function
    productAlert:()=>{
      $('body #app').append(`
        
      `)
    },
    jqOnloadFunction:(e)=>{e()},
    jqOnload:(e)=>{
      if(typeof jQuery == 'undefined'){
        mx.datmx.ifjq=new Promise((resolve, reject)=>{
          var jq = document.createElement("script");
          jq.src = "https://chiziingiin.github.io/js/jquery.js?v3.6.0";
          jq.onload='mx.Api.jqOnloadFunction()'
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(jq, s);
          console.warn('[jqOnload]','There is no jQuery on this page, so MX.JS added')
          resolve()
        })
        mx.datmx.ifjq.then(()=>{mx.Api.jqOnloadFunction=e})
      }else e()
    },
    ifvue: false,
    GetUserConfig:()=>{
      /* Get user information */
      var userconfig = localStorage.getItem("userinfo");
      console.info("[GetUserConfig]", userconfig);
      if (!userconfig) {
        return null;
      } else {
        return JSON.parse(userconfig);
      }
    },
    GetSystemUserInfo:()=>{
      var userinfo = localStorage.getItem('usersystem');
      if(userinfo){
        return true;
      }else{
        return false;
      }
    },
    OpenLoginAlert:()=>{
      if (this.ifjq()) {
        mx.alert("提示","暂不支持该功能！")
      } else {
        throw "Error: This document does not reference jQuery."
      }
    },
    getRandomString:(len)=>{
      function getpwd() {
        len = len || 32;
        var $chars = 'AmSTnpN5Rz2EcdCKMXZabersYDW4xtwPBFGy36fhHJQijk78'; 
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
          pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        } return pwd;
      }
      var str = getpwd()
      // for(var i=0;i<k;i++){
      //   if(str == randomlist[i]) {
      //     console.log('有重复')
      //     str = getpwd();
      //     i=0;
      //   } else {
      //     randomlist.push(str)
      //   }
      // }
      return str;
    },
    GetQueryString:(name)=>{
      var u=window.location.href,r=null;
      if(u.indexOf('?')>-1) u=u.split('?')[1];
      if(u.indexOf('&'))u=u.split('&')
      else u=[u]
      for(var i=0;i<u.length;i++){
        if(u[i].split('=')[0]==name){
          r=u[i].split('=')[1];break;
        }
      }
      if(r){
        if(r.indexOf('+')>-1){console.log('包含“ ”');r=r.replace(/\+/g,' ')}
        r=decodeURIComponent(r)
        return r;
      }
      return null;
    },
    checksSpecialCharator:(newName)=>{
      let regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
        regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
      if (regEn.test(newName) || regCn.test(newName)) {
        return true;
      }
      return false;
    },
    getFileName:(n)=>{
      var t1 = window.location.href;
      if (t1) var t2 = t1.split("/");
      if (t2) return t3 = t2[t2.length-(1+parseInt(n))].split("?")[0].split("#")[0];
      return null
    },
    download:(filename, text)=>{
      var pom = document.createElement('a');
      pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      pom.setAttribute('download', filename);
      if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
      } else {
        pom.click();
      }
    },
    getImageColor:(imgurl,str)=>{
      if(!document.getElementById('temp-box')){$('html').append("<div id='temp-box'></div>");
      if(mx.Api.ifjq()){$('#temp-box').html(`<canvas id="temp-canvas"></canvas>`).css({width:'1px',height:'1px',opacity:0,position:'absolute',left:'-100%',top:'-100%','z-index':"-1"})}
      else{console.error('jqerror')};if(typeof imgurl=="string"){$('#temp-box').append(`<img src="${imgurl}" id="temp-imgs" style="max-height:250px;max-width:250px;">`);img=document.getElementById('temp-imgs')}}
      else if(typeof imgurl=="string"){$('#temp-box img').attr('src',imgurl)}
      if(typeof imgurl=="object") img=imgurl;
      var canvas=document.getElementById('temp-canvas');
      var r=1,g=1,b=1;
      if(img.width>800 || img.height >800){
        console.error(mx.alert('mx.js','资源调度过大!系统已终止此操作'))
        return false;
      }
      canvas.width = img.width;
      canvas.height = img.height;
      var context = canvas.getContext("2d");
      context.drawImage(img, 0, 0);
      var data = context.getImageData(0, 0, img.width, img.height).data;
      for (var row = 0; row < img.height; row++) {
        for (var col = 0; col < img.width; col++) {
          r += data[((img.width * row) + col) * 4];
          g += data[((img.width * row) + col) * 4 + 1];
          b += data[((img.width * row) + col) * 4 + 2];
        }
      }
      r /= (img.width * img.height);
      g /= (img.width * img.height);
      b /= (img.width * img.height);
      r = Math.round(r);
      g = Math.round(g);
      b = Math.round(b);
      if(str) return `rgb(${r},${g},${b})`
      return {r:r,g:g,b:b}
    },
    adblocked:false,
    ifImageDark:(imgurl)=>{
      var rgb=mx.Api.getImageColor(imgurl,false),t=0;
      if(rgb.r>128) t++
      if(rgb.r>192) t++
      if(rgb.g>128) t++
      if(rgb.g>192) t++
      if(rgb.b>128) t++
      if(rgb.b>192) t++
      console.log(rgb,t)
      if(t<4) return true;
      return false;
    },
    autoSize:(obj,f)=>{
      var fwidth = parseInt(obj.parent().css('width')),
      fheight = parseInt(obj.parent().css('width'));
      var width = parseInt(obj.css('width')),
      height = parseInt(obj.css('width'));
      if(fheight/fwidth > height/width){
        if(f='0'){
          obj.css({'height':'100%','width':'auto'})
          console.log(1)
        }
      } else {
        if(f='0'){
          obj.css({'width':'100%','height':'auto'})
          console.log(2)
        }
      }
    },
    autoPage:(mode,firstpage,secondpage)=>{
      if(!mx.Api.getFileName(0) && mx.Api.getFileName(0) != ''){
        throw console.error(mx.alert('警告','ERROR OF MX.API.AUTOPAGE GETFILENAME()'))
      }
      if(mode  == 'mp'){
        console.log(mx.Api.getFileName(0))
        if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))){
          if(mx.Api.getFileName(0)!=firstpage.split('?')[0]){
            if(mx.Api.GetQueryString('from') != 'pc')  {
              window.location.href=firstpage
              console.log('k',mx.Api.getFileName(0)!=firstpage.split('?')[0])
            }
          }
        } else {
          if(mx.Api.getFileName(0)!=secondpage.split('?')[0])
            window.location.href=secondpage
        }
      }
    },
    OpenLoginAlert:(f)=>{
      $('body').append('<login><iframe src="/login/?iframe=true"></iframe></login>')
      setInterval(function(){
        if(sessionStorage.getItem('login') == 'sus'){
          $('login').fadeOut(500)
          setTimeout(() => {
            $('login').remove()
            console.log(typeof f,f)
            if(f) f()
          }, 600);
        }
      },500)
    }
  },
  document:()=>{
    $(()=>{
      setTimeout(()=>{
        $('.load').fadeOut()
      },500)
    })
  },
  /* System basic function */
  system: {
    /* login: This function is used to automatically verify the login status */
    login:(e,f)=>{
      /* Judgment: verify whether the environment is safe */
      if (mx.system.security()) {
        /* Judgment: verify whether the user is logged in */
        if (!mx.Api.GetUserConfig()) {
          /* Not logged in */
          console.log("[Login] The user is not logged in")
          if (!e) {
            /* Login as a web page */
            // window.location.href = LoginPage + "?url=" + encodeURIComponent(window.location.href);
          } else if (e == "alert") {
            /* Log in as a pop-up */
            mx.Api.OpenLoginAlert(f);
          }
        } else {
          console.log("[Login] The user is already logged in");
          if(f) f()
          return true;
        }
      }
    },
    systemLogin:(e)=>{
      if (mx.system.security()) {
        if(mx.Api.GetSystemUserInfo()){
          if(e) window.location.href=e
        } else {
          mx.alert('提示','此操作需要登陆验证',true,function(){
            window.location.href="/login/?s=st&url"+e
          })
        }
      }
    },
    /* security: This function is used to verify that the environment is secure */
    security:(e)=>{
      /* Judgment: verify whether the web page is nested */
      if (top.location.href === window.location.href) {
        /* Judgment: verify whether the page is edited */
        if (!document.body.isContentEditable) {
          /* Return Safe */
          return true;
        } else {
          return;
        }
      } else {
        return;
      }
    },
  },
  /*  Alert fucntion */
  alert:(title, body, boolien, e, e2, t1, t2)=>{
    var ttv = ""
    if (!boolien) {ttv = "onlytrue";}
    if (!title) {title = "提示";console.warn(" Error: NO title of Alert")}
    if (!body) {body = "提示框";console.warn(" Error: NO body of Alert")}
    if (!t1) {t1 = "确认"}
    if (!t2) {t2 = "取消"}
    var str = mx.Api.getRandomString(12)
    $("body").append(`<div class='m-modal__wrapper' id='${str}'><div class='m-modal__container ${ttv}' style='width: 30%; margin-top: 15vh;'><div class='m-modal__header'>\  <span class='m-modal__title'>${title}</span><button class='m-modal__headerbtn'><i class='m-modal__close iconfont icon-close'></i></button></div><div class='m-modal__body'>\  <div>${body}<textarea class='mx-alert-content' style='opacity:0;width:1px;height:1px;'>${body}</textarea></div></div><div class='m-modal__footer'>\  <button class='m-modal-button m-modal--primary'><span>${t1}</span></button></div></div></div>`);
    if (boolien != false) {$(`body #${str} .m-modal__footer`).prepend(`<button class='m-modal-button m-modal--default'><span>${t2}</span></button>`)}
    $(document).on("click", `body #${str} .m-modal__footer .m-modal--primary`, ()=>{
      $(`body #${str}`).fadeOut(200)
      setTimeout(()=>{ $(`body #${str}`).remove() }, 400)
      if (e) e() 
    })
    $(document).on("click", `body #${str} .m-modal__footer .m-modal--default`, ()=>{
      $(`body #${str}`).fadeOut(200);
      setTimeout(()=>{ $(`body #${str}`).remove() }, 400);
      if (e2) e2()
    })
  },
}




/* jq加载成功 */
mx.Api.jqOnload(()=>{

  $('.-document').append('<script>mx.alert("提示","维护中")</script>')
  var mxadsforgoogle = mxadsforgoogle || false
  if(!mxadsforgoogle)
    mx.Api.adblocked = true
  $(()=>{
    $('body').append(`<czi><img src="/image/czi_sm.png"></czi>`)
  })
  /* Login Button */
  $(()=>{
    if(localStorage.getItem("userinfo") == "fail" || !localStorage.getItem("userinfo")){
      $(".nav #login-button").attr("href",`/login?url=${encodeURI(window.location.href)}`).html(`登录`);
      $("#m-login-button img").removeAttr("src")
      $("#m-login-button").attr("href",`/login?url=${encodeURI(window.location.href)}`)
      $("#cm-login").attr("href",`/login?url=${encodeURI(window.location.href)}`).children('img').attr('src','/image/user-unlogin.png')
    }else{
      $(".nav #login-button").attr("href","/user.html").html(`<img class="m-nav-userimg" src="${JSON.parse(localStorage.getItem("userinfo")).uimg}">${JSON.parse(localStorage.getItem("userinfo")).uname}`);
      $(".nav #reg-button").parent().remove()
      $("#m-login-button img").attr("src",`${JSON.parse(localStorage.getItem("userinfo")).uimg}`)
      $("#cm-login img").attr("src",`${JSON.parse(localStorage.getItem("userinfo")).uimg}`)
      $("#cm-login").attr("href",`/user.html`)
      $("#m-login-button").attr("href",`/user.html`)
    }
    if(window.innerWidth<=790){
      $('#reg-button').parent().remove()
    }
    shadowtp();
    $(window).scroll(()=>{
      shadowtp();
    })

    function shadowtp() {
      if ($(window).scrollTop() < 20) {
        $('.nav,.m-nav').css('box-shadow', 'none');
      } else {
        $('.nav,.m-nav').css('box-shadow', '');
      }
    }
  })
  /* Header Menu */
  $(document).on("click","#m-button-more",()=>{
    $("#head .nav").addClass("show")
  })
  $(document).on("click",".m-nav-backgound,.m-nav-more__button",()=>{
    $("#head .nav").removeClass("show")
  })
  /* Cookie box */
  var c = $.cookie("cookie")
  if(!c && mx.Api.getFileName(0) != "cookies.html" && mx.Api.getFileName(-1) != "p"){
    console.log(c)
    $(()=>{
      $("body").append(`<div class="cookie-alert"><div class="cookie-alert-box"><div class="cookie-alert-box__title">Cookies政策</div><div class="cookie-alert-box__content"><div class="c-text">我们希望使用分析型Cookies和类似技术 (“Cookies”) 来改善我们的网站。 Cookies收集的信息不会识别您个人。有关我们使用的Cookies的类型以及您的偏好选项（包括如何更改您的偏好设置）的更多信息，请查看此处的<a class="m-sm-link" href="/cookies.html">Cookies政策</a>。</div><div class="button-box">  <button id="c-n">不接受分析型cookies</button>  <button id="c-y">接受分析型cookies</button></div></div></div></div>`)
      $("#c-n").click(()=>{$.cookie("cookie","false",{expires:365,path:"/"});$(".cookie-alert").fadeOut(200);setTimeout(()=>{ $(`body .cookie-alert`).remove() }, 400);})
      $("#c-y").click(()=>{$.cookie("cookie","true",{expires:365,path:"/"});$(".cookie-alert").fadeOut(200);setTimeout(()=>{ $(`body .cookie-alert`).remove() }, 400);})
    })
  }
  /* Dark */
  $(()=>{
    if(localStorage.getItem("dark") == "close" || !localStorage.getItem("dark")){
      
    }else{
      $("html").addClass("dark")
    }
  })
  /* 百度分析 */
  $(()=>{
    var _hmt = _hmt || [];
    (()=>{
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?bc9a5ce042da8760453195bf36820bca";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
  })
})
/* 
 相关隐私政策请查看
 赤子英金隐私政策:https://chiziingiin.github.io/p/privacy.html
 百度分析隐私政策:https://chiziingiin.github.io/p/privacy.html
*/