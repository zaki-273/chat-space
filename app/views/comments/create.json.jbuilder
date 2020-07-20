json.user_name @comment.user.name
json.created_at @comment.created_at.strftime("%Y年%m月%d日 %H時%M分")
json.text @comment.text
json.image @comment.image.url
json.id @comment.id