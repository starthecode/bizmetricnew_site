export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    const data = await res.json();
    return data.filePath; // e.g., '/assets/img/upload/filename.jpg'
  } catch (err) {
    throw new Error(`File upload failed: ${err.message}`);
  }
};

// export const UploadFile = async (formData) => {
//   try {
//     const res = await fetch('/api/file/upload', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!res.ok) {
//       const err = await res.text();
//       alert(`Upload failed: ${err}`);
//       return null;
//     }

//     const fileData = await res.json();
//     return fileData;
//   } catch (err) {
//     alert('Upload error: ' + err.message);
//     return null;
//   }
// };
