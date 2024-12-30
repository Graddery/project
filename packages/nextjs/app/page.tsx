"use client";

import React, { useState } from "react";

interface Diploma {
  institution: string;
  degree: string;
  major: string;
  graduationYear: bigint | number; // Учитываем, что может быть BigInt
}

// Стили для контейнера, формы и элементов
const containerStyle = {
  padding: "20px",
  maxWidth: "1000px", // Максимальная ширина
  width: "75%", // Ширина 75% экрана
  margin: "0 auto", // Центрирование по горизонтали
};

const formContainerStyle = {
  display: "flex",
  //flexDirection: "column",
  gap: "15px",
  marginBottom: "20px",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "100%",
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#4CAF50", // Цвет кнопки
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  width: "100%",
  marginTop: "10px",
};

const diplomasContainerStyle = {
  display: "flex",
  //flexDirection: "column",
  gap: "20px",
};

const diplomaCardStyle = {
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "15px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

export default function DiplomaStorage() {
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [major, setMajor] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [diplomas, setDiplomas] = useState<Diploma[]>([]);

  const addDiploma = () => {
    if (!institution || !degree || !major || !graduationYear) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    const newDiploma: Diploma = {
      institution,
      degree,
      major,
      graduationYear: new Date(graduationYear).getTime(), // Сохраняем в виде таймстемпа
    };

    setDiplomas([...diplomas, newDiploma]);
    setInstitution("");
    setDegree("");
    setMajor("");
    setGraduationYear("");
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center" }}>Хранилище дипломов</h1>

      <div style={formContainerStyle}>
        <input
          type="text"
          placeholder="Учебное заведение"
          value={institution}
          onChange={e => setInstitution(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Степень"
          value={degree}
          onChange={e => setDegree(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Специальность"
          value={major}
          onChange={e => setMajor(e.target.value)}
          style={inputStyle}
        />
        <input
          type="date"
          placeholder="Дата выпуска"
          value={graduationYear}
          onChange={e => setGraduationYear(e.target.value)}
          style={inputStyle}
        />
        <button onClick={addDiploma} style={buttonStyle}>
          Добавить диплом
        </button>
      </div>

      <h2>Ваши дипломы</h2>
      <div style={diplomasContainerStyle}>
        {diplomas.map((diploma, index) => (
          <div key={index} style={diplomaCardStyle}>
            <p>
              <strong>Учебное заведение:</strong> {diploma.institution}
            </p>
            <p>
              <strong>Степень:</strong> {diploma.degree}
            </p>
            <p>
              <strong>Специальность:</strong> {diploma.major}
            </p>
            <p>
              <strong>Дата выпуска:</strong>{" "}
              {diploma.graduationYear
                ? new Date(Number(diploma.graduationYear)).toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Дата не указана"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
