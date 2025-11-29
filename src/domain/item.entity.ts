export interface UserItem {
  id: number;
  user_id: number;
  item_name?: string | null;
  status?: string | null;
  image_url?: string | null;
  qr_token: string;
  created_by: number;
  updated_by?: number | null;
  createdAt?: Date;
  updatedAt?: Date;

}