const { Pool } = require("pg");
const config = {
    user: "postgres",
    host: "localhost",
    database: "repertorio",
    password: "postgres",
    port: 5432,
};
const pool = new Pool(config);

const insertar = async(datos) => {
    const sqlInsert = {
        text: "INSERT INTO repertorio (cancion,artista,tono) values ($1,$2,$3) RETURNING *;",
        values: datos
    };
    try {
        const res = await pool.query(sqlInsert);
        return res;
    } catch (e) {
        console.log(e.code);
        return e;
    }
};

const consultar = async() => {
    const sqlSelect = {
        text: "SELECT * FROM repertorio",
    };
    try {
        const res = await pool.query(sqlSelect);
        return res;
    } catch (e) {
        console.log(e.code);
        return e;
    }
};

const actualizar = async(datos) => {
    console.log('Actualizar ', datos);
    const sqlUpdate = {
        text: `UPDATE repertorio SET cancion = $2, artista = $3, tono = $4 WHERE id = $1 RETURNING *;`,
        values: datos
    };
    try {
        const res = await pool.query(sqlUpdate);
        return res;
    } catch (e) {
        console.log(e.code);
        return e
    }
};

const eliminar = async(id) => {
    console.log('Eliminar ', id);
    const sqlDelete = {
        text: `DELETE FROM repertorio WHERE id = '${id}'  RETURNING *;`,
    }
    try {
        const res = await pool.query(sqlDelete);
        return res;
    } catch (e) {
        console.log(e.code);
        return e
    }
};

module.exports = { insertar, consultar, actualizar, eliminar };