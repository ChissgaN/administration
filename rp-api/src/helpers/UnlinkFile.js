import fs from "fs";

export function unlinkFile(path) {
  if (!path) {
    return;
  }

  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File has been removed");
  });
}

export default unlinkFile;
