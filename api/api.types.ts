export type Folder = {
  created_at: string;
  description: string | null;
  id: number;
  subject: string;
  user: string | null;
  qrcode_url: string | null;
  is_selected: boolean | null;
};

export type CreateFolder = {
  subject: string;
  description: string | null | undefined;
};
