export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      reject(error);
    };
  });

export const getFileExtension = (fileName) => fileName.split('.').pop();
