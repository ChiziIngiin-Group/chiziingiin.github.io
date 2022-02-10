const cdn = 'http://munox.gitee.io/cdn'
function getbody(){
  var activeEditor = tinymce.activeEditor;
  var editBody = activeEditor.getBody();
  activeEditor.selection.select(editBody);
  var text = activeEditor.selection.getContent( {'format' : 'text' } );
  return text
}
function getcontent(){
  console.log('[ajax-public.html] ajax start');
  $.ajax({url:"./public.html",success:(result)=>{
    console.log('[ajax-public.html]','success')
    if(result){
      $.ajax({url:"/p/data.json",dataType:'text',success:(e)=>{
        console.log("[获取data.json]",e,typeof e)
        var title = $("#title").val()
        var description = $("#description").val();
        var imgurl = $("#imgurl").val();
        if(!imgurl) imgurl='[]'
        var author = $("#author").val();
        var authorId = $("#authorId").val();
        var before = result.split('${content}')[0]
        var after = result.split('${content}')[1]
        if(title && title!='')title=title
        else title="无标题"
        before=before.replace("${title}",title)
        if(description && description!='')description=description
        else {description=getbody();description=description.substring(0,39).replace(RegExp('\r',"g"),' ').replace(RegExp('\n',"g"),' ').replace(RegExp('  ',"g"),'');}
        before=before.replace("${description}",description)
        var t = mx.Api.getRandomString(10)
        console.log('[新生成文章的内容]',[`${before}${tinyMCE.activeEditor.getContent()}${after}\n`])
        var data = JSON.parse(e);
        data.push({
          "title":title,
          "description":description,
          "pId":t,
          "url":`/p/${t}.html`,
          "author":author,
          "authorId":authorId,
          "read":1,
          "comment":0,
          "img":JSON.parse(imgurl.replace(RegExp('${cdn}','g'),cdn))
        })
        console.log("[载入data]",data)

        mx.Api.download(`${t}.html`,`${before}${tinyMCE.activeEditor.getContent()}${after}`);
        mx.Api.download(`data.json`,`${JSON.stringify(data)}`);
        mx.alert("成功")
        // mx.alert(`文件相关代码`,JSON.stringify({
        //   "title":title,
        //   "description":description,
        //   "pId":t,
        //   "url":`/p/${t}.html`,
        //   "author":author,
        //   "authorId":authorId,
        //   "read":1,
        //   "comment":0,
        //   "img":JSON.parse(imgurl)
        // }),false,function(){},null,"确定")
        // $(".mx-alert-content").select();document.execCommand("copy");
      }})
    } else {
      alert("[ajax][failed - result]")
      alert("[ajax-public.html][failed - result]",result)
    }
  }});
}