/*! 
 * mx.js v0.1.2.0
 * Author Zhangxinyue etc.
 * (c) 2020-2022 ChiziIngin Information Technology Research Institute.
 * Released under the MIT License.
 */

/* declare constant */
const LoginPage = "./login/login.html";
const VersionNumber = "0.1.2.0";


/* Version Info */
console.log("%cmx.js%cv" + VersionNumber, "color: #fff; background-color:#007bff;padding:4px 6px;padding-right:3px;border-top-left-radius:5px;border-bottom-left-radius:5px;", "color: #fff; background-color:#00a826;padding:4px 6px;padding-left:3px;border-top-right-radius:5px;border-bottom-right-radius:5px;");


/* Main Function */
const mx = {
    version:VersionNumber,
    /* System interface function */
    Api: {
        ifjq: function () { if ($) return true; },
        ifvue: function () { if (Vue) return true; },
        GetUserConfig: function () {
            /* Get user information */
            var userconfig = localStorage.getItem("UserConfig");
            console.info("[GetUserConfig]", userconfig);
            if (!userconfig) {
                return null;
            } else {
                return JSON.parse(userconfig);
            }
        },
        OpenLoginAlert: function () {
            if (this.ifjq()) {
                mx.alert("提示","暂不支持该功能！")
            } else {
                throw "Error: This document does not reference jQuery."
            }
        },
        
        getRandomString: function (len) {
            len = len || 32;
            var $chars = 'AmSTnpN5Rz2EcdCKMXZabersYDW4xtwPBFGy36fhHJQijk78'; 
            var maxPos = $chars.length;
            var pwd = '';
            for (i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        },
        GetQueryString(name) {
            var thref1 = window.location.href;
            if (thref1) var thref2 = thref1.split("?")[1];
            if (thref2) var thref3 = thref2.split(name + "=")[1];
            if (thref3) var thref4 = thref3.split("&")[0];
            if (thref4) var thref5 = thref4;
            if (thref4) for (var i = 0; i < thref4.length; i++) { if (thref4) thref5 = thref5.replace('+', '%20'); }
            if (thref5) var href = thref5;
            if (href) return href;
            return null;
        },
        checksSpecialCharator(newName) {
            let regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
              regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
            if (regEn.test(newName) || regCn.test(newName)) {
              return true;
            }
            return false;
        }
        // TimeSortingForList: function(List) {
        //     var List_1 = [];
        //     for(var i = 0;i<List.length;i++){
        //         var k = List[i]
        //         for(var j = 0;j<k.length;j++){
        //             List_1.push(k[j])
        //         }
        //     }
        //     console.log("[Temp][TimeSortingForList][List_1]",List_1);
        //     var List_2 = [];
        //     List_2[0] = List_1[0]
        //     for(var i = 1;i<List_1.length;i++){
        //         if(List_1[i].time > List_2[i-1].time){
        //             var tmp = List_2.length;
        //             for(var j = tmp;j>0;j++){
        //                 List_2[j] = List_2[j-1]
        //             }
        //             List_2[0] = List_1[i];
        //     console.error("[Temp][TimeSortingForList][List_2]",List_2);

        //         }
        //         else{
        //             List_2.push(List_1[i])
        //     console.error("[THemp][TimeSortingForList][List_2]",List_2);

        //         }
        //     console.log("[Temp][TimeSortingForList][List_2]",List_2);

        //     }
        //     console.log("[Temp][TimeSortingForList][List_2]",List_2);
        // }
    },
    /* System basic function */
    system: {
        /* login: This function is used to automatically verify the login status */
        login: function (e) {
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
        security: function (e) {
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
    alert: function (title, body, boolien, e, e2, t1, t2) {
        var ttv = ""
        if (!boolien) {ttv = "onlytrue";}
        if (!title) {title = "提示";console.warn(" Error: NO title of Alert")}
        if (!body) {body = "提示框";console.warn(" Error: NO body of Alert")}
        if (!t1) {t1 = "确认"}
        if (!t2) {t2 = "取消"}
        var str = mx.Api.getRandomString(12)
        $("body").append(
        "<div class='m-modal__wrapper' id='" + str + "'>\
          <div class='m-modal__container " + ttv + "' style='width: 30%; margin-top: 15vh;'>\
            <div class='m-modal__header'>\
              <span class='m-modal__title'>" + title + "</span>\
            <button class='m-modal__headerbtn'><i class='m-modal__close iconfont icon-close'></i></button>\
            </div>\
            <div class='m-modal__body'>\
              <div>"+ body + "</div>\
            </div>\
            <div class='m-modal__footer'>\
              <button class='m-modal-button m-modal--primary'><span>"+t1+"</span></button>\
            </div>\
          </div>\
         </div>");
        if (boolien != false) {
            $("body #" + str + " .m-modal__footer").prepend("<button class='m-modal-button m-modal--default'><span>"+t2+"</span></button>")
        }
        $(document).on("click", "body #" + str + " .m-modal__footer .m-modal--primary", function () {
            $("body #" + str).fadeOut(200)
            setTimeout(function () { $("body #" + str).remove() }, 400)
            if (e) e() 
        })
        $(document).on("click", "body #" + str + " .m-modal__footer .m-modal--default", function () {
            $("body #" + str).fadeOut(200);
            setTimeout(function () { $("body #" + str).remove() }, 400);
            if (e2) e2()
        })
    },
}

/* Login Button */
$(function(){
    if(localStorage.getItem("userinfo") == "fail" || !localStorage.getItem("userinfo")){
        $(".nav #login-button").attr("href",`/login?url=${encodeURI(window.location.href)}`).html(`登录`);
        $("#m-login-button img").removeAttr("src")
        $("#m-login-button").attr("href",`/login?url=${encodeURI(window.location.href)}`)
    }else{
        $(".nav #login-button").attr("href","/user.html").html(`<img class="m-nav-userimg" src="${JSON.parse(localStorage.getItem("userinfo")).uimg}">${JSON.parse(localStorage.getItem("userinfo")).uname}`);
        $(".nav #reg-button").parent().remove()
        $("#m-login-button img").attr("src",`${JSON.parse(localStorage.getItem("userinfo")).uimg}`)
        $("#m-login-button").attr("href",`/user.html`)
    }
})


$(document).on("click","#m-button-more",function(){
    $("#head .nav").addClass("show")
})
$(document).on("click",".m-nav-backgound",function(){
    $("#head .nav").removeClass("show")
})

/* Dark */
$(function(){
    if(localStorage.getItem("dark") == "close" || !localStorage.getItem("dark")){
        
    }else{
        $("html").addClass("dark")
    }
})