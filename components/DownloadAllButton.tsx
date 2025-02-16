import { Folder } from "@/api/api.types";
import { Button, ButtonSpinner, ButtonText } from "./ui/button";
import { useState } from "react";
import {
  cacheDirectory,
  createDownloadResumable,
  documentDirectory,
  EncodingType,
  makeDirectoryAsync,
  readAsStringAsync,
  StorageAccessFramework,
  writeAsStringAsync,
} from "expo-file-system";
import { Alert, Platform } from "react-native";
import { zip } from "react-native-zip-archive";
import { shareAsync } from "expo-sharing";

export const DownloadAllButton = ({folder}: {folder:Folder}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadedFiles, setDownloadedFiles] = useState(0);

  const downloadFile = async (
    downloadDirectory: string,
    fileName: string,
    url: string
  ) => {
    try {
      const fileUri = `${downloadDirectory}${fileName}`;
      const downloadResumable = createDownloadResumable(
        url,
        fileUri,
        {},
        (progress) => {
          const percent = (
            (progress.totalBytesWritten / progress.totalBytesExpectedToWrite) *
            100
          ).toFixed(0);
          console.log(`Downloading ${fileName}: ${percent}%`);
        }
      );

      const result = await downloadResumable.downloadAsync();
      return { success: true, uri: result?.uri, fileName };
    } catch (error) {
      console.error(error);
      return { success: false, error, fileName };
    }
  };

  const copyFileToSAF = async (
    sourceUri: string,
    targetDirUri: string,
    fileName: string,
    mimeType: string
  ) => {
    console.log(sourceUri);
    console.log(targetDirUri);
    console.log(fileName);
    console.log(mimeType);
    try {
      // Use copyAsync for Android 10+ (more efficient)
      // if (Platform.OS === "android" && Platform.Version >= 29) {
      //   await copyAsync({
      //     from: sourceUri,
      //     to: `${targetDirUri}/${fileName}`,
      //   });
      //   return true;
      // }

      // Fallback for older Android versions
      const content = await readAsStringAsync(sourceUri, {
        encoding: EncodingType.Base64,
      });
      const newFileUri = await StorageAccessFramework.createFileAsync(
        targetDirUri,
        fileName,
        mimeType
      );
      await writeAsStringAsync(newFileUri, content, {
        encoding: EncodingType.Base64,
      });
      return true;
    } catch (error) {
      console.error("Failed to copy file:", error);
      return false;
    }
  };

  const downloadAllFiles = async (folder: Folder) => {
    let androidTargetDir: string | null = null;
    const baseDownloadDir = `${documentDirectory}Downloads/FileBridge/${folder.subject}/`;

    try {
      // Android SAF Setup
      if (Platform.OS === "android") {
        const permissions =
          await StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (!permissions.granted) {
          Alert.alert("Permission denied. Could not download files.");
          return { successes: [], failures: [] };
        }

        // Create subject folder in user-selected directory
        // TODO:: To be removed, expo cannot create files unuder subdirectory on
        //         registered parent
        androidTargetDir = permissions.directoryUri;
        // try {
        //   androidTargetDir = await StorageAccessFramework.makeDirectoryAsync(
        //     permissions.directoryUri,
        //     folder.subject
        //   );
        // } catch (error) {
        //   console.error("Error creating directory:", error);
        //   androidTargetDir = permissions.directoryUri;
        // }
      }

      // Prepare download directory
      await makeDirectoryAsync(baseDownloadDir, { intermediates: true });

      // Download and process files
      setIsDownloading(true);
      const results = await Promise.all(
        folder.files.map(async (file) => {
          const fileName = file.name.replace(`${folder.id}/`, "");
          try {
            // Download to app directory
            const downloadResult = await downloadFile(
              baseDownloadDir,
              fileName,
              file.url
            )
              .then(() => {
                setDownloadedFiles((downloadedFiles) => downloadedFiles + 1);
              })
              .catch(() => {
                throw new Error("Download failed");
              });

            // Android: Copy to final SAF location
            // TODO:: Consider to be removed in the future
            //          Download the files 1-by-1
            // if (Platform.OS === "android" && androidTargetDir) {
            //   const copySuccess = await copyFileToSAF(
            //     downloadResult.uri!,
            //     androidTargetDir,
            //     fileName,
            //     file.mime_type || "application/octet-stream"
            //   );
            //   if (!copySuccess) throw new Error("File copy failed");
            // }

            return { success: true, fileName };
          } catch (error) {
            console.error(`Failed ${fileName}:`, error);
            return { success: false, fileName, error };
          }
        })
      );

      // iOS: Zip and share (works even if you don't test iOS)
      if (Platform.OS) {
        try {
          const zipPath = `${cacheDirectory}${folder.subject}.zip`;
          await zip(baseDownloadDir, zipPath);

          if (Platform.OS === "android" && androidTargetDir) {
            const copySuccess = await copyFileToSAF(
              zipPath,
              androidTargetDir,
              folder.subject,
              "application/zip"
            );
            if (!copySuccess)
              throw new Error("Download Failed. Please Try Again");
          } else {
            await shareAsync(zipPath, {
              dialogTitle: `Share ${folder.subject}`,
              UTI: "public.zip-archive",
            });
          }
        } catch (error) {
          console.log(error);
          Alert.alert("Sharing Error", "Could not share files");
        }
      }

      // Show final results
      const successes = results.filter((r) => r.success);
      const failures = results.filter((r) => !r.success);

      setIsDownloading(false);
      setDownloadedFiles(0);

      Alert.alert("Download Complete", "Please check your local files.");
      return { successes, failures };
    } catch (error) {
      console.error("Global error:", error);
      Alert.alert("Error", "Failed to complete download operation");
      return { successes: [], failures: [] };
    }
  };

  return (
    <Button
      size="lg"
      onPress={() => downloadAllFiles(folder)}
      disabled={isDownloading}
    >
      {isDownloading && <ButtonSpinner />}
      <ButtonText>
        {isDownloading
          ? `Downloading... ${downloadedFiles}/${folder.files.length}`
          : `Download Folder`}
      </ButtonText>
    </Button>
  );
};
