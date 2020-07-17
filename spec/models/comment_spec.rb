require 'rails_helper'

describe Comment do
  describe '#create' do
    context 'can save' do
      it "is valid with text" do
        expect(build(:comment, image: nil)).to be_valid
      end

      it "is valid with image" do
        expect(build(:comment, text: nil)).to be_valid
      end

      it "is valid with text and image" do
        expect(build(:comment)).to be_valid
      end
    end

    context 'can not save' do
      it "is invalid without text and image" do
        comment = build(:comment, text: nil, image: nil)
        comment.valid?
        expect(comment.errors[:text]).to include("を入力してください")
      end

      it "is invalid without group_id" do
        comment =build(:comment, group_id: nil)
        comment.valid?
        expect(comment.errors[:group]).to include("を入力してください")
      end

      it "is invalid without user_id" do
        comment =build(:comment, user_id: nil)
        comment.valid?
        expect(comment.errors[:user]).to include("を入力してください")
      end
    end
  
  
  end


end