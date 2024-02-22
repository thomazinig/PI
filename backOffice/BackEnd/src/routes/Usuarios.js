const Usuarios = require("../database/usuarios");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = Router();

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(400).json({ msg: "O Token é inválido!" });
  }
}

router.get("/auth/usuarios", checkToken, async (req, res) => {
  const listaUsuarios = await Usuarios.findAll();
  res.json(listaUsuarios);
});

router.post("/usuarios", async (req, res) => {
  // Coletar os dados do req.body

  const { nome, cpf, email, senha, grupo, status } = req.body;
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(senha, salt);
  try {
    // Dentro de 'novo' estará o o objeto criado
    const novo = await Usuarios.create({
      nome,
      cpf,
      email,
      senha: passwordHash,
      grupo,
      status,
    });

    res.status(201).json(novo);
  } catch (err) {
    console.error(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const user = await Usuarios.findOne({ where: { email: email } });
  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }
  if (!user.status) {
    return res.status(404).json({ msg: "Usuario desativado" });
  }
  const checkPassword = await bcrypt.compare(senha, user.senha);
  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" });
  }
  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user.id,
      },
      secret,
      { expiresIn: 600 }
    );

    res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
  } catch (error) {
    res.status(500).json({ msg: "error", error });
  }
});

router.put("/edit/:id", async (req, res,next) => {
  const { id } = req.params;
  const { nome, cpf, senha } = req.body;
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(senha, salt);
  try {
    const usuario = await Usuarios.findOne({ where: { id } });
    if (!usuario) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }
    await Usuarios.update({ nome, cpf, senha: passwordHash });
    res.status(200).json({ message: "Cliente editado." });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
