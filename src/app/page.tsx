"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Támogatott nyelvek definiálása (Magyar és Angol hozzáadva)
const LANGUAGES = [
  { name: "Hungarian", code: "hu" },
  { name: "English", code: "en" },
  { name: "Spanish", code: "es" },
  { name: "German", code: "de" },
  { name: "French", code: "fr" },
];

export default function SessionPage() {
  const searchParams = useSearchParams();
  
  // Ellenőrizzük, hogy a belépő hallgató-e (?role=listener a link végén)
  const isListener = searchParams.get("role") === "listener";
  
  // Nyelv állapota: ha hallgató, automatikusan Angol ('en')
  const [selectedLanguage, setSelectedLanguage] = useState(isListener ? "en" : "hu");
  const [isMicOn, setIsMicOn] = useState(!isListener);
  const [isCameraOn, setIsCameraOn] = useState(false);

  useEffect(() => {
    if (isListener) {
      // Hallgatónál a mikrofont és kamerát kötelezően kikapcsoljuk
      setIsMicOn(false);
      setIsCameraOn(false);
      setSelectedLanguage("en");
    }
  }, [isListener]);

  return (
    <div className="session-container" style={{ padding: 24, textAlign: "center" }}>
      <h2>{isListener ? "Élő Istentisztelet Fordítás" : "Előadói Felület"}</h2>
      
      {/* 1. HALLGATÓI NÉZET: Letisztult felület gombok nélkül */}
      {isListener ? (
        <div className="listener-box" style={{ marginTop: 40, padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
          <p style={{ fontSize: 18, color: "#4B5563" }}>
            Csatlakozva mint: <strong>Hallgató (Listener)</strong>
          </p>
          <p style={{ fontSize: 22, fontWeight: "bold", margin: "16px 0", color: "#111827" }}>
            Nyelv: English (Angol)
          </p>
          <p style={{ fontSize: 14, color: "#6B7280" }}>
            🎧 Használj fülhallgatót az élő fordítás hallgatásához!
          </p>
        </div>
      ) : (
        /* 2. ELŐADÓI NÉZET: Mikrofon, kamera és nyelválasztó az előadónak */
        <div className="host-controls" style={{ marginTop: 40 }}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ marginRight: 12, fontWeight: "bold" }}>Beszélt nyelv:</label>
            <select 
              value={selectedLanguage} 
              onChange={(e) => setSelectedLanguage(e.target.value)}
              style={{ padding: "8px 12px", fontSize: 16 }}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <button 
              onClick={() => setIsMicOn(!isMicOn)}
              style={{ padding: "12px 24px", background: isMicOn ? "#10B981" : "#EF4444", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}
            >
              {isMicOn ? "Mikrofon: BE" : "Mikrofon: KI"}
            </button>

            <button 
              onClick={() => setIsCameraOn(!isCameraOn)}
              style={{ padding: "12px 24px", background: isCameraOn ? "#10B981" : "#6B7280", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}
            >
              {isCameraOn ? "Kamera: BE" : "Kamera: KI"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
