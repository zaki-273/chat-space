class Api::CommentsController < ApplicationController
  def index
        group = Group.find(params[:group_id])
        last_comment_id = params[:id]
        @comments = group.comments.includes(:user).where("id > ?", last_comment_id)
  end
end
