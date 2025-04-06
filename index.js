
import { useState, useEffect } from "react";

const questions = {
  "Nih para Leo": {
    "Normais": [
      "Qual a sua lembran\u00e7a favorita nossa?",
      "O que mais te atrai em mim?"
    ],
    "\u00cdntimas": [
      "O que voc\u00ea sente quando est\u00e1 longe de mim?"
    ],
    "Picantes": [
      "Qual foi a sua maior loucura na cama comigo?"
    ]
  },
  "Leo para Nih": {
    "Normais": [
      "O que te fez se apaixonar por mim?"
    ],
    "\u00cdntimas": [
      "O que mais te excita quando estamos juntos?"
    ],
    "Picantes": [
      "Qual a sua maior fantasia comigo que ainda n\u00e3o realizamos?"
    ]
  }
};

export default function Home() {
  const [turno, setTurno] = useState("Nih para Leo");
  const [categoria, setCategoria] = useState("Normais");
  const [index, setIndex] = useState(0);
  const [visited, setVisited] = useState({});

  useEffect(() => {
    const key = `${turno}-${categoria}`;
    const stored = JSON.parse(localStorage.getItem("visited") || "{}");
    setVisited(stored[key] || []);
    setIndex(0);
  }, [turno, categoria]);

  const perguntas = questions[turno]?.[categoria] || [];
  const perguntaAtual = perguntas[index] || "Nenhuma pergunta disponível.";

  const proximaPergunta = () => {
    const newIndex = (index + 1) % perguntas.length;
    setIndex(newIndex);
    const key = `${turno}-${categoria}`;
    const updated = { ...visited, [key]: [...new Set([...(visited[key] || []), newIndex])] };
    localStorage.setItem("visited", JSON.stringify(updated));
  };

  const perguntaAnterior = () => {
    setIndex((prev) => (prev - 1 + perguntas.length) % perguntas.length);
  };

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", padding: 20 }}>
      <h1 style={{ fontSize: 28, textAlign: "center", marginBottom: 20 }}>💕 Jogo de Afinidade</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 10 }}>
        {Object.keys(questions).map((pessoa) => (
          <button key={pessoa} onClick={() => setTurno(pessoa)}>
            {pessoa}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 10 }}>
        {Object.keys(questions[turno] || {}).map((cat) => (
          <button key={cat} onClick={() => setCategoria(cat)}>
            {cat}
          </button>
        ))}
      </div>
      <div style={{ backgroundColor: "#111", padding: 20, borderRadius: 10, textAlign: "center", marginBottom: 20 }}>
        <p style={{ fontSize: 18 }}>{perguntaAtual}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <button onClick={perguntaAnterior}>⬅️ Pergunta anterior</button>
        <button onClick={proximaPergunta}>Próxima pergunta ➡️</button>
      </div>
    </div>
  );
}
