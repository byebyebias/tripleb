// src/components/FileUpload.tsx
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../Button/Button";
const apiUrl = import.meta.env.VITE_API_URL;

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const fetchDashboardData = async (filename: string) => {
    // Simulating a backend call
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/metrics/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: filename }),
      });
      const dashboardData = await response.json();
      navigate("/dashboard", { state: { dashboardData } });
    } catch (error) {
      console.log("failure!! D:");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // triggers file input by calling fileInputRef
  const handleButtonClick = () => {
    fileInputRef.current?.click();
    handleSubmit();
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch(`${apiUrl}/api/upload/`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("File uploaded successfully");
          fetchDashboardData(selectedFile.name);
        } else {
          console.log("Error uploading file");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".parquet"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Button label="Upload Data >" onClick={handleButtonClick} />
    </div>
  );
};

export default FileUpload;
