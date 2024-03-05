const Usuarios = require("../database/usuarios");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = Router();

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Acesso negado!" });

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(400).json({ message: "O Token é inválido!" });
  }
}
router.get("/authToken", checkToken ,async (req,res)=>{
  try{
res.json({message:"token valido"})
  }catch(err){
    return res.status(400).json({ message: "token invalido" });

  }
})
router.get("/auth/usuarios", async (req, res) => {
  const listaUsuarios = await Usuarios.findAll();
  res.json(listaUsuarios);
});

router.post("/usuarios", async (req, res) => {

  const { nome, cpf, email, senha, grupo, status } = req.body;
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(senha, salt);
  const validarEmail = await Usuarios.findOne({where: { email: email }})
  const validarCpf = await Usuarios.findOne({where: { cpf: cpf }})

  if(validarCpf && validarEmail){
    console.log(validarCpf)
    return res.status(400).json({menssage: "cpf e email já cadastrado"})
  }
  if(validarCpf){
    console.log(validarCpf)
    return res.status(400).json({menssage: "cpf já cadastrado"})
  }
if(validarEmail){
  return res.status(400).json({menssage: "Email já cadastrado"})
}


  try {
    const novo = await Usuarios.create({
      nome,
      email,
      cpf,
      grupo,
      status,
      senha: passwordHash,

    });

    res.status(201).json(novo);
  } catch(err) {
    res.status(400).json(err)
  }
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const user = await Usuarios.findOne({ where: { email: email } });
  if (!user) {
    return res.status(400).json({ message: "Email ou senha invalidos" });
  }
  if (!user.status) {
    return res.status(401).json({ message: "Usuario desativado" });
  }
  const checkPassword = await bcrypt.compare(senha, user.senha);
  if (!checkPassword) {
    return res.status(400).json({ message: "Email ou senha invalidos" });
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
      const idUser = user.id
      const grupUser = user.grupo
    res.status(200).json({ message: "Autenticação realizada com sucesso!", token,idUser,grupUser });
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
});

router.put("/edit/:id", async (req, res, next) => {
  const { id } = req.params;
  const { nome, cpf, senha } = req.body;
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(senha, salt);
  try {
    const usuario = await Usuarios.findOne({ where: { id } });
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }
    await usuario.update({ nome, cpf, senha: passwordHash });
    res.status(200).json({ message: "Cliente editado." });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.put("/edit/status/:id", async (req, res,next) => {
  const { id } = req.params;
  const { status } = req.body;;

  try {
    const usuario = await Usuarios.findOne({ where: { id } })
    await usuario.update({status})
    res.status(200).json({ message: "Status editado." });

  } catch {
    console.error(err);
    next(err);

  }
})

module.exports = router;
