/*! 
 * mx.js v0.1.2.0
 * Author Zhangxinyue etc.
 * (c) 2020-2022 ChiziIngin Information Technology Research Institute.
 * Released under the MIT License.
 */

/* declare constant */
const LoginPage = "./login/login.html";
const VersionNumber = "0.2.0.007";


/* Version Info */
console.log(`%cmx.js%cv${VersionNumber}`,`color: #fff; background-color:#007bff;padding:4px 6px;padding-right:3px;border-top-left-radius:5px;border-bottom-left-radius:5px;`, `color: #fff; background-color:#00a826;padding:4px 6px;padding-left:3px;border-top-right-radius:5px;border-bottom-right-radius:5px;`);


/* Main Function */
const mx = {
    version:VersionNumber,
    /* System interface function */
    Api: {
        ifjq: ()=>{ if ($) return true; },
        ifvue: ()=>{ if (Vue) return true; },
        GetUserConfig:()=>{
            /* Get user information */
            var userconfig = localStorage.getItem("UserConfig");
            console.info("[GetUserConfig]", userconfig);
            if (!userconfig) {
                return null;
            } else {
                return JSON.parse(userconfig);
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
            len = len || 32;
            var $chars = 'AmSTnpN5Rz2EcdCKMXZabersYDW4xtwPBFGy36fhHJQijk78'; 
            var maxPos = $chars.length;
            var pwd = '';
            for (i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        },
        GetQueryString:(name)=>{
            var t1 = window.location.href;
            if (t1) var t2 = t1.split("?")[1];
            if (t2) var t3 = t2.split(name + "=")[1];
            if (t3) var t4 = t3.split("&")[0];
            if (t4) var t5 = t4;
            if (t4) for (var i = 0; i < t4.length; i++) { if (t4) t5 = t5.replace('+', '%20'); }
            if (t5) return t5;
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
        getFileName:()=>{
            var t1 = window.location.href;
            if (t1) var t2 = t1.split("/");
            if (t2) return t3 = t2[t2.length-1].split("?")[0].split("#")[0];
            return null
        }
    },
    /* System basic function */
    system: {
        /* login: This function is used to automatically verify the login status */
        login:(e)=>{
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
                        mx.Api.OpenLoginAlert();
                    }
                } else {
                    console.log("[Login] The user is already logged in")
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
        $("body").append(`<div class='m-modal__wrapper' id='${str}'><div class='m-modal__container ${ttv}' style='width: 30%; margin-top: 15vh;'><div class='m-modal__header'>\  <span class='m-modal__title'>${title}</span><button class='m-modal__headerbtn'><i class='m-modal__close iconfont icon-close'></i></button></div><div class='m-modal__body'>\  <div>${body}</div></div><div class='m-modal__footer'>\  <button class='m-modal-button m-modal--primary'><span>${t1}</span></button></div></div></div>`);
        if (boolien != false) {
            $(`body #${str} .m-modal__footer`).prepend(`<button class='m-modal-button m-modal--default'><span>${t2}</span></button>`)
        }
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

/* Login Button */
$(()=>{
    if(localStorage.getItem("userinfo") == "fail" || !localStorage.getItem("userinfo")){
        $(".nav #login-button").attr("href",`/login?url=${encodeURI(window.location.href)}`).html(`登录`);
        $("#m-login-button img").removeAttr("src")
        $("#m-login-button").attr("href",`/login?url=${encodeURI(window.location.href)}`)
        $("#cm-login").attr("href",`/login?url=${encodeURI(window.location.href)}`)
    }else{
        $(".nav #login-button").attr("href","/user.html").html(`<img class="m-nav-userimg" src="${JSON.parse(localStorage.getItem("userinfo")).uimg}">${JSON.parse(localStorage.getItem("userinfo")).uname}`);
        $(".nav #reg-button").parent().remove()
        $("#m-login-button img").attr("src",`${JSON.parse(localStorage.getItem("userinfo")).uimg}`)
        $("#cm-login img").attr("src",`${JSON.parse(localStorage.getItem("userinfo")).uimg}`)
        $("#cm-login").attr("href",`/user.html`)
        $("#m-login-button").attr("href",`/user.html`)
    }
})

/* Header Menu */
$(document).on("click","#m-button-more",()=>{
    $("#head .nav").addClass("show")
})
$(document).on("click",".m-nav-backgound,.m-nav-more__button",()=>{
    $("#head .nav").removeClass("show")
})

/* Header Hider */
// $(()=>{
//     $.cookie("top",$(window).scrollTop(),{path:"/"})
//     $(window).scroll(()=>{
//         if($(window).scrollTop() - $.cookie("top") > 30)$(".nav,.m-nav").addClass("tophide")
//         else if ($(window).scrollTop() - $.cookie("top") < -30)$(".nav,.m-nav").removeClass("tophide")
//         $.cookie("top",$(window).scrollTop(),{path:"/"})
//     })
// })

/* Cookie box */
var c = $.cookie("cookie")
if(!c && mx.Api.getFileName() != "cookies.html"){
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
/* 
 相关隐私政策请查看
 赤子英金隐私政策:https://chiziingiin.github.io/p/privacy.html
 百度分析隐私政策:https://chiziingiin.github.io/p/privacy.html
*/