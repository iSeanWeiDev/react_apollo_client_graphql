import React, { useState } from 'react';
import { LoadingCard } from '@app/components/Cards';
import { useSnackbar } from 'notistack';

const AttachmentForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [isDropping, setIsDropping] = useState(false);

  const handleDrag = (type, event) => {
    if (event.dataTransfer.files.length == 0) return;
    event.preventDefault();
    event.stopPropagation();
    if (type === 'leave') setIsDropping(false);
    if (type === 'over') setIsDropping(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDropping(false);
    if (event.dataTransfer.files.length !== 1) {
      enqueueSnackbar('Invalide file count, it should be one file', {
        variant: 'warning'
      });
      return;
    }

    // setFile(event.dataTransfer.files[0]);
    const fileName = event.dataTransfer.files[0].name;
    // setOpenCreate(true);
    // setFileInfo({
    //   name: fileName,
    //   url: '',
    //   type: '',
    //   altText: ''
    // });
  };

  return (
    <LoadingCard
      loading={loading}
      height={`calc(100vh - 330px)`}
      onDragOver={(e) => handleDrag('over', e)}
      onDragLeave={(e) => handleDrag('leave', e)}
      onDrop={handleDrop}
    ></LoadingCard>
  );
};

export default AttachmentForm;
