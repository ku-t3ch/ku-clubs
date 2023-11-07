import React, { ChangeEvent, useEffect, useState } from "react";
import { NextPage } from "next";
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "@pqina/pintura/pintura.css";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateSize,
  FilePondPluginImageCrop,
  FilePondPluginFileEncode
);

interface Props {
  allowMultiple?: boolean;
  maxFiles?: number;
  onUpload?: (fileItems: string[]) => void;
}

const UploadFile: NextPage<Props> = ({ allowMultiple, maxFiles = 1, onUpload }) => {
  const onUploadRoot = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!fileValidImage(e.target.files?.[0]!)) {
      return alert("Invalid file type");
    }
    const imageBase64 = (await imageToBase64(e.target.files?.[0]!)) as string;

    onUpload && onUpload([imageBase64]);
    
  };

  const fileValidImage = (file: File) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  const imageToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <>
      {/* <FilePond
        onupdatefiles={(fileItems) => onUploadRoot(fileItems)}
        allowMultiple={allowMultiple}
        maxFiles={maxFiles}
        labelIdle={`Drag & Drop your files or <span class="filepond--label-action">Browse</span>`}
        imageCropAspectRatio="1:1"
        maxFileSize={"2MB"}
        acceptedFileTypes={["image/*"]}
        allowImagePreview={true}
        allowFileSizeValidation={true}
        allowImageCrop={true}
        allowFileEncode={true}
      /> */}
      <input type="file" onChange={onUploadRoot} />
    </>
  );
};

export default UploadFile;
