const {io}=require('../index');

// Mensajes de sockets
io.on('connection', client => {
	console.log('Cliente conectado')
	//client.on('event', data => { /* … */ });
	client.on('disconnect', () => { console.log('Cliente desconectado') });
	
	//recepción de objeto con la key 'mensaje' y función con lo que hacemos tras la recepción
	client.on('mensaje', (payload)=>{
		console.log('Mensaje', payload);
		//si recibimos algo con la key 'mensaje', respondemos algo desde el servidor
		io.emit('mensaje', {'admin':'Nuevo mensaje de respuesta'})
	})
  });