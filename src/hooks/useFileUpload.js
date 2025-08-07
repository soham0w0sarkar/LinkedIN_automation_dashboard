import { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export const useFileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (files, section) => {
    const newFiles = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      type: file.type,
      section: section,
      uploadDate: new Date().toLocaleDateString(),
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleTargetListUpload = async (files, campaignId) => {
    const file = files[0];
    const ext = file.name.split(".").pop().toLowerCase();

    console.log("Uploading target list:", file.name, "Type:", ext);

    const processRows = async (rows) => {
      const filteredRows = rows.filter(
        (row) => row.name && row.email && row.link
      );

      const uniqueDocId = Date.now().toString();

      await setDoc(
        doc(db, "Campaigns", campaignId, "target_list", uniqueDocId),
        {
          links: filteredRows,
          createdAt: new Date().toISOString(),
        }
      );

      console.log("Target list uploaded under doc:", uniqueDocId);
      return filteredRows;
    };

    if (ext === "csv" || ext === "txt") {
      const text = await file.text();
      return new Promise((resolve) => {
        Papa.parse(text, {
          header: true,
          complete: async (results) => {
            console.log("Parsed CSV/TXT:", results.data);
            const processed = await processRows(results.data);
            resolve(processed);
          },
        });
      });
    } else if (ext === "xlsx" || ext === "xls") {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);
      console.log("Parsed Excel:", rows);
      const processed = await processRows(rows);
      return processed;
    } else {
      console.error("Unsupported file type:", ext);
    }
  };

  const handleBotListUpload = async (files, campaignId) => {
    const file = files[0];
    const ext = file.name.split(".").pop().toLowerCase();
    let bots = [];

    const processRows = async (rows) => {
      for (const row of rows) {
        const { email, password, name, user_agent } = row;
        if (email && password) {
          const docId = `${email}_${password}`;
          const botData = { email, password, name, user_agent };

          await setDoc(
            doc(db, "Campaigns", campaignId, "bot_accounts", docId),
            botData
          );

          bots.push({ id: docId, ...botData });
        }
      }
    };

    if (ext === "csv" || ext === "txt") {
      return new Promise((resolve) => {
        Papa.parse(file, {
          header: true,
          complete: async (results) => {
            await processRows(results.data);
            resolve(bots);
          },
        });
      });
    } else if (ext === "xlsx" || ext === "xls") {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);
      await processRows(rows);
      return bots;
    }
  };

  const removeFile = (id) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  return {
    uploadedFiles,
    handleFileUpload,
    handleBotListUpload,
    handleTargetListUpload,
    removeFile,
  };
};
