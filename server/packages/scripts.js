var registeredEvents = [];

console.log('\nLoading scripts:'); 

fs.readdirSync(path.resolve(__dirname, 'scripts')).forEach(src =>
{
	process.stdout.write('\t\"' + src + '\"');
	registeredEvents = registeredEvents.concat(require('./scripts/' + src)); 
	console.log(" - OK");
});

registeredEvents.forEach(event => { mp.events.add(event); });