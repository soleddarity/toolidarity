import { IncomingForm } from "formidable";
//@ts-ignore
import { promises as fs } from "fs";

var mv = require("mv");

export const config = {
  api: {
    bodyParser: false,
  },
};
//@ts-ignore
export default async (req, res) => {
  //@ts-ignore
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      console.log(fields, files);
      //@ts-ignore
      console.log(files.file.filepath);
      //@ts-ignore
      var oldPath = files.file.filepath;
      //@ts-ignore
      var newPath = `./public/uploads/${files.file.originalFilename}`;
      //@ts-ignore
      mv(oldPath, newPath, function (err) {});
      res.status(200).json({ fields, files });
    });
  });
};
