module.exports = function( mongoose ){

	mongoose.Promise = global.Promise;
	//mongoose.connect('mongodb://admin:th3p455w0rd15@ds125288.mlab.com:25288/restaurant'); 
     mongoose.connect('mongodb://localhost:27017/restaurant');
}