interface TelegramResponse {
  ok: boolean;
  result: Update[];
}

interface Update {
  update_id: number;
  my_chat_member?: MyChatMember;
  message?: Message;
}

interface MyChatMember {
  chat: Chat;
  from: User;
  date: number;
  old_chat_member: ChatMember;
  new_chat_member: ChatMember;
}

interface Message {
  message_id: number;
  from: User;
  chat: Chat;
  date: number;
  photo: Photo[];
}

interface Chat {
  id: number;
  title: string;
  username: string;
  type: string;
}

interface User {
  id: number;
  is_bot: boolean;
  first_name: string;
  username: string;
  language_code?: string;
  last_name?: string;
}

interface ChatMember {
  user: User;
  status: string;
  can_be_edited?: boolean;
  can_manage_chat?: boolean;
  can_change_info?: boolean;
  can_delete_messages?: boolean;
  can_invite_users?: boolean;
  can_restrict_members?: boolean;
  can_pin_messages?: boolean;
  can_manage_topics?: boolean;
  can_promote_members?: boolean;
  can_manage_video_chats?: boolean;
  can_post_stories?: boolean;
  can_edit_stories?: boolean;
  can_delete_stories?: boolean;
  is_anonymous?: boolean;
  can_manage_voice_chats?: boolean;
}

interface Photo {
  file_id: string;
  file_unique_id: string;
  file_size: number;
  width: number;
  height: number;
}
