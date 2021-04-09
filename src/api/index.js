import axios from 'axios';
import { getFileExtension } from '@app/utils/file';
import { genCurrUTCTime } from '@app/utils/date-time';
import config from '@app/Config';

export const genSignedUrl = (file, docId) =>
  new Promise(async (resolve, reject) => {
    try {
      const { endpoint, bucketName } = config.signedUrl;
      const fileExt = getFileExtension(file.name);
      const fileName = genCurrUTCTime();
      const response = await axios({
        method: 'get',
        url: `${config.dev.corsHandler}${endpoint}`,
        params: {
          bucket: bucketName,
          key: `${docId}/${fileName}.${fileExt}`
        }
      });
      if (response.status !== 200) {
        reject();
      }
      resolve({
        signedUrl: response.data.signedUrl,
        fileUrl: `${config.assetUrl}/${docId}/${fileName}.${fileExt}`
      });
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });

export const avatarUpload = async (url, file) => {
  try {
    const response = await axios({
      method: 'put',
      url: `${config.dev.corsHandler}${url}`,
      data: file,
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const packaging = async () => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${config.dev.corsHandler}${config.api.packaging}`,
      data: {
        bucketName: 'packages.emp-sig.com'
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};
