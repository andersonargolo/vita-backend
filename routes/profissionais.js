const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const profissionais = []; // Simulação de "banco em memória"

// POST - Cadastrar
router.post("/", (req, res) => {
  const { nome, email, telefone, especialidade } = req.body;

  if (!nome || !email || !telefone || !especialidade) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });
  }

  const novoProfissional = {
    id: uuidv4(),
    nome,
    email,
    telefone,
    especialidade,
  };

  profissionais.push(novoProfissional);
  console.log("[NOVO PROFISSIONAL]", novoProfissional);

  return res.status(201).json({ mensagem: "Profissional cadastrado com sucesso." });
});

// GET - Listar
router.get("/", (req, res) => {
  return res.status(200).json(profissionais);
});

// DELETE - Excluir
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = profissionais.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Profissional não encontrado." });
  }

  profissionais.splice(index, 1);
  return res.status(200).json({ mensagem: "Profissional excluído com sucesso." });
});

module.exports = router;
