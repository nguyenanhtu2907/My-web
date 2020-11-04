$(document).ready(function () {
  //add comment
  document.querySelector('.btn1').onclick = function () {
    //neu chua co "cái gì dó" thì hiện thông báo cần phải đăng nhập gấp




    var data = {
      content: document.querySelector('.comment_input').value,
    };
    fetch(window.location.pathname + '/add-comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        var comment = data.pop();
        document.querySelector('.comment_list').innerHTML += `
          <li class="comment_item">
            <img src="${comment.authorAvatar}" alt="" class="user_img">
            <span class="comment_text">${comment.content}</span>
            <span><i class="fas fa-times delete_comment" onclick="deleteComment(event)"></i></span>
          </li>
          `;
        document.querySelector('.comment_input').value='';
      })
      .catch(error => {});
  };
});

function deleteComment(e) {
  console.log(e.target.parentNode.parentNode)
  fetch(window.location.pathname + '/delete-comment', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      e.target.parentNode.parentNode.remove();
    })
    .catch(error => {
    });
}