require 'rails_helper'

describe CommentsController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do
    context 'login' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end
      it "assigns @comment" do
        expect(assigns(:comment)).to be_a_new(Comment)
      end

      it "assigns @group" do
        expect(assigns(:group)).to eq group
      end

      it "renders index" do
        expect(response).to render_template :index
      end
    end

    context 'not login' do
      before do
        get :index, params: { group_id: group.id }
      end
      it "redirects to new_user_session_path" do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, comment: attributes_for(:comment) } }
    context 'login' do
      before do
        login user
      end

      context 'can save' do
        subject {
          post :create,
          params: params
        }

        it 'count up comment' do
          expect{ subject }.to change(Comment, :count).by(1)
        end

        it 'redirect to group_comments_path' do
          subject
          expect(response).to redirect_to(group_comments_path(group))
        end
      end

      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, comment: attributes_for(:comment, text: nil, image: nil) } }

         subject{
           post :create,
           params: invalid_params
         }
        
         it 'does not count up' do
           expect{ subject }.not_to change(Comment, :count)
         end


      end
    end
    
    context 'not login' do
      before do
        get :create, params: params
      end

      it 'redirect to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end