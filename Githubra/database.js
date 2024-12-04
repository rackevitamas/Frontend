import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

const initializeDB = async () => {
    await dbRun("DROP TABLE IF EXISTS users");
    
    await dbRun(`
        CREATE TABLE IF NOT EXISTS users (
            email TEXT PRIMARY KEY,
            firstname TEXT NOT NULL,
            lastname TEXT NOT NULL,
            class TEXT NOT NULL
        )
    `);

    const users = [
        { firstname: "John", lastname: "Doe", email: "john.doe@example.com", class: "10A" },
        { firstname: "Jane", lastname: "Smith", email: "jane.smith@example.com", class: "10B" },
        { firstname: "Sam", lastname: "Johnson", email: "sam.johnson@example.com", class: "11A" },
    ];

    for (const user of users) {
        await dbRun(
            "INSERT INTO users (firstname, lastname, email, class) VALUES (?, ?, ?, ?)",
            [user.firstname, user.lastname, user.email, user.class]
        );
    }
};

function dbQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

export { db, dbQuery, dbRun, initializeDB };
