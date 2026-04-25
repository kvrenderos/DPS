const sql = require('../config/database');

const Usuario = function(usuario) {
  this.id = usuario.id;
  this.usuario = usuario.usuario;
  this.contrasenia = usuario.contrasenia;
};

// Obtener todos
Usuario.getAll = (result) => {
  sql.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, results);
  });
};

// Buscar por ID
Usuario.findById = (id, result) => {
  sql.query("SELECT * FROM usuarios WHERE id = ?", [id], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

// Crear usuario
Usuario.create = (newUsuario, result) => {
  sql.query("INSERT INTO usuarios SET ?", newUsuario, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    newUsuario.id = res.insertId;
    result(null, newUsuario);
  });
};

module.exports = Usuario;

// Actualizar usuario por ID
Usuario.updateById = (id, usuario, result) => {
  sql.query(
    "UPDATE usuarios SET usuario = ?, contrasenia = ? WHERE id = ?",
    [usuario.usuario, usuario.contrasenia, id],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...usuario });
    }
  );
};

// Eliminar usuario
Usuario.remove = (id, result) => {
  sql.query("DELETE FROM usuarios WHERE id = ?", [id], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Usuario;