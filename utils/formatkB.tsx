export const formatkB = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1000; // 1 KB = 1024 Bytes
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const formattedValue = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));

  return `${formattedValue} ${sizes[i]}`;
};
