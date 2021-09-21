import multer from "multer";
import fs from "fs/promises";

//  Saves the incoming file to Temp dir with a randomly assigned name, keeping the file extension
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "Temp");
  },
  filename(req, file, callback) {
    console.log(file);
    callback(
      null,
      `temp_${Math.floor(99999 * Math.random())}.${file.originalname.substring(
        file.originalname.lastIndexOf(".") + 1
      )}`
    );
  },
});

export const TempStore = multer({ storage });

//  Permanently save a file to specified dir and with specified name.
//  Preserves the file extension
export const saveMulterFile = async (file, dir, name) => {
  const oldPath = file.path;
  const fileExtension = oldPath.substring(oldPath.lastIndexOf("."));

  //  If no name is specified, default to name generated on first save
  const fileNameNoExt = name
    ? name
    : oldPath.substring(oldPath.lastIndexOf("/"));
  const newPath = `${dir}/${fileNameNoExt}${fileExtension}`;

  await fs.rename(oldPath, newPath);

  return newPath;
};

export default null;
