const fs = require("fs");
const path = require("path");



let lastFileName;   //2

const AudiofilePath = async (filename) => {
  const folderPath = path.join(process.cwd(), `assets/audio-files`);

  let files = fs.readdirSync(folderPath, {
    encoding: "utf8",
  });

  const pathNames = files.map((myfile) => {
    let originalPath = myfile.split(".");
    return originalPath[0];
  });

  if (pathNames.includes(filename)) {
    lastFileName = filename;
    return JSON.stringify(filename);
  } else {
    console.log('lastplayer',lastFileName)
    if (lastFileName) {
      return JSON.stringify(lastFileName);
    } else {
      return JSON.stringify(0);
    }
  }
};


const allAudios = async () => {
  const folderPath = path.join(process.cwd(), `assets/audio-files`);

  let files = fs.readdirSync(folderPath, {
    encoding: "utf8",
  });

  const pathNames = files.map((myfile) => {
    let originalPath = myfile.split(".");
    return originalPath[0];
  });

  return JSON.stringify(pathNames);
};

module.exports = {
  AudiofilePath,
  allAudios
};
