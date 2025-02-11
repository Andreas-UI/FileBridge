export type File = {
  created_at: string;
  folder: number | null;
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

export type CreateFolder = {
  subject: string;
  description: string | null | undefined;
};
