const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// caralho bravo entao pera ai
//alou do vscode
// caralho nem fudendo
// bravo dms opa, ta ai ?
//ta no vs? SIM auowhfwahfufo nem fudendo
// 
// caralho q foda 
//mano como os cara consegue fazer mais rapido que o google docs?? nao sei asfkaksf
// vc ve oq eu seleciono?acho que nao
// se quiser selecionar ent s´´o mete o tab, entendi, fica meio bugado no tab se liga
//eita
// como q roda agr? sei la akskasfkask voce que manja ai, control shift P, show app in browser, será ?
// tem q ver pq n ta indo o site, ta 


server.listen(3000);