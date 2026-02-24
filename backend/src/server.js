const express = require('express');
const PORT = 3000;
const app = express();
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes');

app.use(cors());

try {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api', routes);

    app.use((req, res) => {
      res.status(404).json({ error: 'Endpoint nie znaleziony!' });
    });

    app.listen(PORT, () => {
    console.log(`Serwer uruchomiono: http://localhost:${PORT}`);
    });
} catch (error) {
    console.error('Błąd podczas uruchamiania serwera:', error);
}
