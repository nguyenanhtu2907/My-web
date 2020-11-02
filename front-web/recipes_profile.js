$(document).ready(function () {

//add comment
$('.btn1').click(function () { 
    if(document.querySelector(".comment_input").value != "")
    var a = '<li class="comment_item">    <img src="./image/tudu.jpg" alt="" class="user_img">    <span class="comment_text">' + $('.comment_input').val() + '</span>    <span><i class="fas fa-times delete_comment"></i></span></li>'
    $('.comment_list').append(a);    
        document.querySelector(".comment_input").value = "";

});

//delete comment
$(this).on("click", ".delete_comment", function(){
    var target = $(this).parent().parent();
      target.remove();
  });




});