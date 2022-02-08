function getbody(){
  var activeEditor = tinymce.activeEditor;
  var editBody = activeEditor.getBody();
  activeEditor.selection.select(editBody);
  var text = activeEditor.selection.getContent( {'format' : 'text' } );
  return text
}
function getcontent(){
  console.log('[ajax-public.html] ajax start');
  $.ajax({url:"./public.html",success:function(result){
    console.log('[ajax-public.html]','success')
    if(result){
      var title = $("#title").val()
      var description = $("#description").val();
      var before = result.split('${content}')[0]
      var after = result.split('${content}')[1]
      if(title && title!='')title=title
      else title="无标题"
      before=before.replace("${title}",title)
      if(description && description!='')description=description
      else {description=getbody();description=description.substring(0,39).replace(RegExp('\r',"g"),' ').replace(RegExp('\n',"g"),' ').replace(RegExp('  ',"g"),'');}
      before=before.replace("${description}",description)
      var t = mx.Api.getRandomString(10)
      console.log(`${before}${tinyMCE.activeEditor.getContent()}${after}\n`)
      mx.Api.download(`${t}.html`,`${before}${tinyMCE.activeEditor.getContent()}${after}`);
      imgurl=""
      mx.alert(`文件相关代码`,`{"title":"${title}","description":"${description}","url":"/p/${t}.html","imgurl":"${imgurl}","date":${(new Date).getTime()}}`,false,function(){},null,"确定")
      $(".mx-alert-content").select();console.log($(".mx-alert-content").text());document.execCommand("copy");
    } else {
      alert("[ajax][failed - result]")
      alert("[ajax-public.html][failed - result]",result)
    }
  }});
}