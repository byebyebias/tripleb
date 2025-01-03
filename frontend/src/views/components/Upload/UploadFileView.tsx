import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";

interface Props {
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadFileView: React.FC<Props> = ({ handleFileChange }) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<div>
			<input
				type="file"
				accept=".parquet"
				ref={fileInputRef}
				onChange={handleFileChange}
				style={{ display: "none" }}
				aria-label="File upload"
			/>
			<Button
				role={undefined}
				variant="contained"
				startIcon={<UploadIcon />}
				onClick={handleButtonClick}
				sx={{
					backgroundColor: "#A136D6",
					textTransform: "none",
					boxShadow: "none",
					fontFamily: "Montserrat",
					fontSize: "20px",
				}}
				aria-label="Choose a file to upload"
			>
				Choose file
			</Button>
		</div>
	);
};

export default UploadFileView;
