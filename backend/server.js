const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const crypto = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());

const connexion = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "machine"
});


connexion.connect((erreur) => {

if (erreur) {
    console.log("Erreur MySQL :", erreur);
    return;
}
console.log("Connexion MySQL réussie");
});


app.get("/techniciens", (req, res) => {

connexion.query(
    "SELECT * FROM technicien",
    (erreur, resultats) => {

        if (erreur) {
            return res.status(500).json(erreur);
        }
        res.json(resultats);
    }
);

});



app.get("/tickets", (req, res) => {

connexion.query(
    `SELECT
        ticket.id_ticket, ticket.sujet, ticket.probleme, machine.nom_machine
    FROM ticket
    INNER JOIN machine ON ticket.id_machine = machine.id_machine`,
    (erreur, resultats) => {

        if (erreur) {
            return res.status(500).json(erreur);
        }
        res.json(resultats);
    }
);

});



app.get("/ticket/:id", (req, res) => {

const id = req.params.id;

connexion.query(
    `SELECT ticket.id_ticket, ticket.sujet, ticket.probleme, machine.nom_machine
    FROM ticket
    INNER JOIN machine ON ticket.id_machine = machine.id_machine
    WHERE ticket.id_ticket = ?`,
    [id],
    (erreur, resultats) => {

        if (erreur) {
            return res.status(500).json(erreur);
        }

        if (resultats.length === 0) {
            return res.status(404).json({
                message: "Ticket introuvable"
            });
        }
        res.json(resultats[0]);
    }
);
});



app.post("/login", (req, res) => {

const { login, mdp } = req.body;

const sel = "MonSel";

const mdpHash = crypto
    .createHash("sha256")
    .update(mdp + sel)
    .digest("hex");

connexion.query(
    "SELECT * FROM technicien WHERE login_tech = ?",
    [login],
    (erreur, techniciens) => {

        if (erreur) {
            return res.status(500).json(erreur);
        }

        if (techniciens.length > 0 && techniciens[0].mdp_tech === mdpHash) {
           return res.json({
    succes: true,
    role: "technicien",
    id: techniciens[0].id_tech,
    nom: techniciens[0].nom_tech,
    prenom: techniciens[0].prenom_tech
});
        }

        connexion.query(
            "SELECT * FROM employe WHERE login_emp = ?",
            [login],
            (erreur, employes) => {

                if (erreur) {
                    return res.status(500).json(erreur);
                }

                if (employes.length > 0 && employes[0].mdp_emp === mdpHash) {
                    return res.json({
    succes: true,
    role: "employe",
    id: employes[0].id_emp,
    nom: employes[0].nom_emp,
    prenom: employes[0].prenom_emp
});
                }

                return res.status(401).json({
                    succes: false,
                    message: "Identifiants incorrects"
                });

            }
        );

    }
);

});


app.post("/intervention", (req, res) => {

const {
    id_ticket,
    commentaire,
    id_tech
} = req.body;

const date = new Date()
    .toISOString()
    .split("T")[0];

connexion.query(
    `INSERT INTO intervenir (id_tech, id_ticket, date_, commentaire)
    VALUES (?, ?, ?, ?)`,
    [id_tech,id_ticket,date,commentaire],
    (erreur, resultat) => {

        if (erreur) {
            return res.status(500).json(erreur);
        }
        res.json({
            succes: true
        });

    }
);

});



app.get("/machines-employe/:id", (req, res) => {

const idEmp = req.params.id;

connexion.query(
    `SELECT machine.id_machine, machine.nom_machine
    FROM machine
    INNER JOIN attitrer ON machine.id_machine = attitrer.id_machine
    WHERE attitrer.id_emp = ?`,
    [idEmp],
    (erreur, resultats) => {

        if (erreur) {
            return res.status(500).json(erreur);
        }
        res.json(resultats);
    }
);

});


app.get("/machines", (req, res) => {

connexion.query(
"SELECT * FROM machine",
(erreur, resultats) => {

    if (erreur) {
        return res.status(500).json(erreur);
    }
    res.json(resultats);
}
);
});


app.post("/ticket", (req, res) => {

const {
    sujet,
    probleme,
    date_ticket,
    id_emp,
    id_machine
} = req.body;

connexion.query(
    `INSERT INTO ticket
    (sujet, probleme, date_ticket, id_emp, id_machine)
    VALUES (?, ?, ?, ?, ?)`,
    [sujet,probleme,date_ticket,id_emp,id_machine],
    (erreur, resultat) => {

        if (erreur) {
            return res.status(500).json(erreur);
        }
        res.json({
            succes: true
        });
    }
);
});


app.get("/pieces", (req, res) => {

    connexion.query("SELECT * FROM piece",(erreur, resultats) => {

            if (erreur) {
                return res.status(500).json(erreur);
            }
            res.json(resultats);
        }
    );
});


app.post("/commande", (req, res) => {

    const {
        date_commande,
        piecesCommande
    } = req.body;

    connexion.query("INSERT INTO commande (date_commande) VALUES (?)",[date_commande],(erreur, resultat) => {

            if (erreur) {
                return res.status(500).json(erreur);
            }
            const reference = resultat.insertId;

            if (piecesCommande.length === 0) {
                return res.json({
                    succes: true
                });
            }

            let compteur = 0;

            piecesCommande.forEach(piece => {

                connexion.query(`INSERT INTO contenir (reference, id_piece, quantite)
                    VALUES (?, ?, ?)`,
                    [reference,piece.id_piece,piece.quantite],
                    (erreur) => {

                        if (erreur) {
                            return res.status(500).json(erreur);
                        }

                        compteur++;

                        if (compteur === piecesCommande.length) {

                            res.json({
                                succes: true
                            });
                        }
                    }
                );
            });
        }
    );
});

app.listen(3000, () => {
console.log("Serveur lancé sur le port 3000");
});
