const {io}=require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Queen of the Stone Age'));
bands.addBand(new Band('Dio'));

//console.log(bands);

// Mensajes de sockets
io.on('connection', client => {
	console.log('Cliente conectado');

	client.emit('active-bands', bands.getBands());

	//client.on('event', data => { /* … */ });
	client.on('disconnect', () => { console.log('Cliente desconectado') });
	
	//escucha-recepción de objeto con la key 'mensaje' y función con lo que hacemos tras la recepción
	client.on('mensaje', (payload)=>{
		console.log('Mensaje', payload);
		//si recibimos algo con la key 'mensaje', emitimos-respondemos algo desde el servidor
		io.emit('mensaje', {'admin':'Nuevo mensaje de respuesta'})
	});

	// client.on('emitir-mensaje', (payload)=>{
	// 	//console.log('nuevo-mensaje', payload);
	// 	//si recibimos algo con la key 'mensaje', emitimos-respondemos algo desde el servidor
	// 	//io.emit('nuevo-mensaje', payload); //emite a todos los clientes
	// 	client.broadcast.emit('nuevo-mensaje', payload); //emite a todos los clientes menos al que emite
	// });

	client.on('vote-band', (payload)=>{
		bands.voteBand(payload.id);
		io.emit('active-bands', bands.getBands());
		//si recibimos algo con la key 'mensaje', emitimos-respondemos algo desde el servidor
		//io.emit('nuevo-mensaje', payload); //emite a todos los clientes
		//client.broadcast.emit('nuevo-mensaje', payload); //emite a todos los clientes menos al que emite
	});

	client.on('add-band', (payload)=>{
		const newBand = new Band(payload.name);
		bands.addBand(newBand);
		io.emit('active-bands', bands.getBands());
	});

	client.on('borrar-banda', (payload)=>{
		bands.deleteBand(payload.id);
		io.emit('active-bands', bands.getBands());
	});
  });