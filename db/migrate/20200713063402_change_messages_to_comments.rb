class ChangeMessagesToComments < ActiveRecord::Migration[6.0]
  def change
    rename_table :messages, :comments
  end
end
