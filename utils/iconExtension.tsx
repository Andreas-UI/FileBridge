import { FileText, FileImage, FileMusic, FileVideo, FolderArchive, FileCode, File, FileQuestion } from 'lucide-react-native';

export function getFileIconByMimeType(mimeType: string, size: number): React.ReactNode {
  const mimeTypeMap: Record<string, React.ReactNode> = {
    // Text types
    'text/plain': <FileText color={"#535252"} size={size}/>,
    'text/markdown': <FileText color={"#535252"} size={size}/>,
    'application/json': <FileCode color={"#535252"} size={size}/>,
    'text/csv': <FileText color={"#535252"} size={size}/>,
    'text/html': <FileText color={"#535252"} size={size}/>,

    // Document types
    'application/msword': <File color={"#535252"} size={size}/>,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': <File color={"#535252"} size={size}/>,
    'application/pdf': <File color={"#535252"} size={size}/>,
    'application/vnd.ms-powerpoint': <File color={"#535252"} size={size}/>,
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': <File color={"#535252"} size={size}/>,
    'application/vnd.ms-excel': <File color={"#535252"} size={size}/>,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': <File color={"#535252"} size={size}/>,
    'application/epub+zip': <File color={"#535252"} size={size}/>,

    // Image types
    'image/jpeg': <FileImage color={"#535252"} size={size}/>,
    'image/png': <FileImage color={"#535252"} size={size}/>,
    'image/gif': <FileImage color={"#535252"} size={size}/>,
    'image/bmp': <FileImage color={"#535252"} size={size}/>,
    'image/tiff': <FileImage color={"#535252"} size={size}/>,
    'image/svg+xml': <FileImage color={"#535252"} size={size}/>,
    'image/webp': <FileImage color={"#535252"} size={size}/>,
    'image/heic': <FileImage color={"#535252"} size={size}/>,

    // Audio types
    'audio/mpeg': <FileMusic color={"#535252"} size={size}/>,
    'audio/wav': <FileMusic color={"#535252"} size={size}/>,
    'audio/ogg': <FileMusic color={"#535252"} size={size}/>,
    'audio/aac': <FileMusic color={"#535252"} size={size}/>,
    'audio/flac': <FileMusic color={"#535252"} size={size}/>,
    'audio/mp4': <FileMusic color={"#535252"} size={size}/>,

    // Video types
    'video/mp4': <FileVideo color={"#535252"} size={size}/>,
    'video/x-msvideo': <FileVideo color={"#535252"} size={size}/>,
    'video/quicktime': <FileVideo color={"#535252"} size={size}/>,
    'video/x-matroska': <FileVideo color={"#535252"} size={size}/>,
    'video/webm': <FileVideo color={"#535252"} size={size}/>,

    // Compressed types
    'application/zip': <FolderArchive color={"#535252"} size={size}/>,
    'application/x-rar-compressed': <FolderArchive color={"#535252"} size={size}/>,
    'application/x-tar': <FolderArchive color={"#535252"} size={size}/>,
    'application/gzip': <FolderArchive color={"#535252"} size={size}/>,
    'application/x-7z-compressed': <FolderArchive color={"#535252"} size={size}/>,

    // Executable types
    'application/x-msdownload': <File color={"#535252"} size={size}/>,
    'application/x-apple-diskimage': <File color={"#535252"} size={size}/>,
    'application/vnd.android.package-archive': <File color={"#535252"} size={size}/>,

    // Other types
    'application/octet-stream': <File color={"#535252"} size={size}/>,
    'application/sql': <File color={"#535252"} size={size}/>,
    'application/x-sqlite3': <File color={"#535252"} size={size}/>,
  };

  // Return the mapped icon or FileQuestion for unknown MIME types
  return mimeTypeMap[mimeType.toLowerCase()] || <FileQuestion color={"#535252"} size={size}/>;
}
