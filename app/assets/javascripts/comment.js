$(function(){
  function buildHTML(comment){
    if (comment.image) {
      let html = 
        `<div class="Main-chat__message">
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
      `<div class="Main-chat__message">
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

  $('.Main-chat__message-form__form-contents').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this)
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(comment){
      let html = buildHTML(comment);
      $('.Main-chat__CommentField').append(html);
      $('.Main-chat__CommentField').animate({scrollTop: $('.Main-chat__CommentField')[0].scrollHeight});
      $('.Main-chat__message-form__form-contents')[0].reset();
      $('.Main-chat__message-form__form-contents__input-text__submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
    })
  })
});