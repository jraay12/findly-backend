export interface CreateUserItemDTO {
  item_name?: string;
  status?: string;
  image_url?: string | null;
  user_id: number;
  qr_token: string;
  created_by: number;
  item_description: string | null
}
