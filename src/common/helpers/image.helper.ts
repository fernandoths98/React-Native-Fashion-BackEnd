import { extname } from 'path';

export const imageExtFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('File extention image tidak sesuai !'), false);
  }
  callback(null, true);
};

export const editFilenameImage = (req: any, file: any, callback: any) => {
  const filename = file.originalname.split('.')[0];
  const extension = extname(file.originalname);
  const randomFileName = Array(3)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

  callback(null, `${filename}-${randomFileName}${extension}`);
};
