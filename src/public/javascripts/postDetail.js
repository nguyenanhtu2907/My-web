$(document).ready(function () {
  //add comment
  document.querySelector('.btn1').onclick = function () {
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
            <div class="flex-1">
                <a class="comment_link" href=""><img src="${comment.authorAvatar}" alt=""
                        class="user_img">${comment.authorName}</a>
                <br>
                <p class="comment_text" style="margin-left: 43px;">${comment.content}</p>
            </div>
            <span><i class="fas fa-times delete_comment" onclick="deleteComment(event)"></i></span>
          </li>
          `;
        document.querySelector('.comment_input').value = '';
        document.querySelector('.more-post').style.top = document.querySelector('.recipes_profile').offsetHeight +90+'px';
      })
      .catch(error => { });
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
      document.querySelector('.more-post').style.top = document.querySelector('.recipes_profile').offsetHeight +90+'px';
    })
    .catch(error => {
    });
}

document.querySelector('.more-post').style.top = document.querySelector('.recipes_profile').offsetHeight +90+'px';