# ChatSpace DB設計
## usersテーブル
|Column|Type|Option|
|------|----|------|
|name|string|null: false, foreign_key: true|
|email|string|null: false, foreign_key: true|
|password|string|null: false, foreign_key: true|
### Association
- has_many :groups_users
- has_many :comments
- has_many :groups, through: :groups_users

## groupsテーブル
|Column|Type|Option|
|------|----|------|
|name|string|null: false, foreign_key: true|
|member|string|null: false, foreign_key: true|
### Association
- has_many :groups_users
- has_many :comments
- has_many :users, through: :groups_users

## groups_usersテーブル
|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## commentsテーブル
|Column|Type|Option|
|------|----|------|
|text|text|null :false|
|image|string||
|user_id|string|null: false, foreign_key: true|
|group_id|string|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group