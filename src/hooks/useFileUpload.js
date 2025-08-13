import { useEffect, useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const useFileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [hideUploadedFiles, setUploadedHideUploadedFiles] = useState(false);

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
      let prevLinks = [];

      try {
        const targetRef = await getDoc(
          doc(db, "Campaigns", campaignId, "target_list", "setDocumentId")
        );

        if (!targetRef.exists()) {
          await setDoc(
            doc(db, "Campaigns", campaignId, "target_list", "setDocumentId"),
            {
              links: filteredRows,
              createdAt: serverTimestamp(),
            }
          );
        } else {
          const targets = targetRef.data();
          prevLinks = targets.links;

          await updateDoc(
            doc(db, "Campaigns", campaignId, "target_list", "setDocumentId"),
            {
              links: [...targets.links, ...filteredRows],
              createdAt: serverTimestamp(),
            }
          );
        }

        await updateDoc(doc(db, "Campaigns", campaignId), {
          target_count: filteredRows.length + prevLinks.length,
        });

        return [...filteredRows, ...prevLinks];
      } catch (error) {
        console.error("Error in update Target List :", error);
        return [];
      }
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
      try {
        const botSnap = await getDocs(
          collection(db, "Campaigns", campaignId, "bot_accounts")
        );

        botSnap.forEach((doc) => {
          bots.push({ id: doc.id, ...doc.data() });
        });

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

          await updateDoc(doc(db, "Campaigns", campaignId), {
            bot_count: bots.length,
          });
        }
      } catch (error) {
        console.error("Error in uploading bot list: ", error);
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
    hideUploadedFiles,
  };
};
