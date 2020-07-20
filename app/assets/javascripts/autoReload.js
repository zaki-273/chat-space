$(function(){

  function buildHTML(comment){
    if (comment.image) {
      let html = 
        `<div class="Main-chat__message" data-comment-id=${comment.id}>
          <div class="Main-chat__message__info">
            <div class="Main-chat__message__info__name">
              ${comment.user_name}
            </div>
            <div class="Main-chat__message__info__times">
              ${comment.created_at}
            </div>
          </div>
          <div class="Main-chat__message__content">
            <p class="Main-chat__message__text">
              ${comment.text}
            </p>
            <img class="Main-chat__message__image" src="${comment.image}">
          </div>
        </div>`
      return html
    } else {
      let html = 
      `<div class="Main-chat__message" data-comment-id=${comment.id}>
        <div class="Main-chat__message__info">
          <div class="Main-chat__message__info__name">
          ${comment.user_name}
          </div>
          <div class="Main-chat__message__info__times">
          ${comment.created_at}
          </div>
        </div>
        <div class="Main-chat__message__content">
          <p class="Main-chat__message__text">
          ${comment.text}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_comment_id = $('.Main-chat__message:last').data("comment-id") || 0;
    $.ajax({
      url: "api/comments",
      type: 'get',
      dataType: 'json',
      data: {id: last_comment_id}
    })
    .done(function(comments) {
      if (comments.length !== 0) {
        let insertHTML = '';
        $.each(comments, function(i, comment) {
          insertHTML += buildHTML(comment)
        });
        $('.Main-chat__CommentField').append(insertHTML);
        $('.Main-chat__CommentField').animate({ scrollTop: $('.Main-chat__CommentField')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});