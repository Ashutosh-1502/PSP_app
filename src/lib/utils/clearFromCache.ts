import * as FileSystem from "expo-file-system";

async function clearPdbFilesFromCache() {
  try {
    if (!FileSystem.cacheDirectory) return;

    const files = await FileSystem.readDirectoryAsync(
      FileSystem.cacheDirectory
    );
    for (const file of files) {
      if (file.toLowerCase().endsWith(".pdb")) {
        await FileSystem.deleteAsync(FileSystem.cacheDirectory + file, {
          idempotent: true,
        });
        console.log("Deleted cached .pdb file:", file);
      }
    }
  } catch (err) {
    console.error("Error clearing .pdb cache:", err);
  }
}

export default clearPdbFilesFromCache;