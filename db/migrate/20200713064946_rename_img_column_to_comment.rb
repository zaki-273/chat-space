class RenameImgColumnToComment < ActiveRecord::Migration[6.0]
  def change
    rename_column :comments, :img, :image
  end
end
