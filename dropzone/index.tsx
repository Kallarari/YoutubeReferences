import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  AceptedFiles,
  DragContainer,
  FilesContainer,
  FilesPreview,
  RegectedFiles,
  Image,
  IframeBox,
} from "./styles";

export const Dropzone: React.FC = () => {
  const [files, setFiles] = useState<any>([]);
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      // implementando máximo de arquivos
      maxFiles: 2,
      //implelentando tipo de arquivos aceitos
      accept: {
        "image/png": [".png"],
        "text/html": [".html", ".htm"],
      },
      //função que dispara quando algo é dropado na dropzone
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  // fazendo a preview, use <img src={file.preview} /> para iamgens
  const Preview = files.map((file: any) => (
    <div>
      <IframeBox src={file.preview} />
    </div>
  ));

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.name}>{file.name}</li>
  ));
  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return <li key={file.name}>{file.name}</li>;
  });
  return (
    <div className="container">
      <DragContainer {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drop some files here ...</p>
      </DragContainer>
      <FilesContainer>
        <AceptedFiles>Arquivos aceitos {acceptedFileItems}</AceptedFiles>
        <RegectedFiles>Arquivos regeitados {fileRejectionItems}</RegectedFiles>
      </FilesContainer>
      <FilesPreview>{Preview}</FilesPreview>
    </div>
  );
};
