var multer = require("multer");
var multerS3 = require("multer-s3");
import aws from "aws-sdk";
import uuid from "uuid/v1";

const s3 = new aws.S3({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRET_ACCESSKEYID,
  params: {
    Bucket: "jerrynim-instagram"
  }
});

var multer = multer({
  storage: multerS3({
    s3: s3,
    bucket: "jerrynim-instagram",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, uuid() + "-" + file.name);
    }
  })
});

export default multer;
