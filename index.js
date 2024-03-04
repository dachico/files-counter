// Count number of files

const fs = require("fs").promises;
const path = require("path");

const filesCounter = async (folder) => {
  let filesNum = 0;

  const files = await fs.readdir(folder);
  for (let file of files) {
    const filePath = path.join(folder, file);

    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      filesNum += await filesCounter(filePath);
    } else {
      filesNum++;
    }
  }

  return filesNum;
};

const folderPath = "node_modules";

(async () => {
  try {
    const filesCount = await filesCounter(folderPath);
    console.log(`Number of files in ${folderPath}:`, filesCount);
  } catch (error) {
    console.log("Error counting files:", error);
  }
})();
