"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const createSocketServer_1 = __importDefault(require("./socket/createSocketServer"));
const path_1 = __importDefault(require("path"));
const PORT = process.env.PORT || 3535;
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
(0, createSocketServer_1.default)(server);
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
