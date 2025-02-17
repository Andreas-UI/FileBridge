export type File = {
  created_at: string;
  folder: number;
  id: number;
  mime_type: string | null;
  name: string;
  size_kb: number | null;
  user: string | null;
  url: string;
};

export type Folder = {
  created_at: string;
  description: string | null;
  id: number;
  subject: string;
  user: string | null;
  qrcode_url: string;

  file_count: number;
  files: File[];
};

export type CreateFile = {
  folder_id: Folder["id"];
  files: any;
};

export type DeleteFiles = {
  folder_id: Folder["id"];
  file_ids: File["id"][];
};

export type CreateFolder = {
  subject: string;
  description: string | null | undefined;
};
