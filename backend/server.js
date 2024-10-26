import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
        cors({
                origin: "http://20.70.208.39", // Allow only this domain
                optionsSuccessStatus: 200,
        })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

const connection = new sqlite3.Database("./db/aplikasi.db", (err) => {
	if (err) {
		console.error("Error opening database:", err);
	} else {
		console.log("Connected to SQLite database");
	}
});

app.get("/api/user/:id", (req, res) => {
	const query = `SELECT name FROM users WHERE id = ?`;
        connection.all(query, [req.params.id], (error, results) => { ... });
	connection.all(query, (error, results) => {
		if (error) throw error;
		res.json(results);
	});
});

app.post("/api/user/:id/change-email", (req, res) => {
	const newEmail = req.body.email;
	const query = `UPDATE users SET email = ? WHERE id = ?`;
        connection.run(query, [newEmail, req.params.id], function (err) {
                if (err) throw err;
                if (this.changes === 0) res.status(404).send("User not found");
                else res.status(200).send("Email updated successfully");
	});
});

app.get("/api/file", (req, res) => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	const filePath = path.join(__dirname, "files", req.query.name);
	res.sendFile(filePath);
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
