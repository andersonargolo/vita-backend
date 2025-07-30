const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { nome, email, telefone, especialidade } = req.body;

  if (!nome || !email || !telefone || !especialidade) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });
  }

  // Aqui pode ser substituído por banco de dados futuramente
  console.log("[NOVO PROFISSIONAL]", { nome, email, telefone, especialidade });

  return res.status(201).json({ mensagem: "Profissional cadastrado com sucesso." });
});

module.exports = router;
