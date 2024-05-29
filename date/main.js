const cities = [
{ name:"Moscow",
   time: 1712889077,
   timezone: 10800
},


{ name: "Ekaterinburg",
   time: 1712883419,
   timezone: 18000
},


{ name: "Omsk",
   time: 1712880600,
   timezone: 21600
},

{ name: "Novosibirsk",
   time: 1712878311,
   timezone: 25200
},

]


const d = new Date()

const dn = Date.now()

ddn = new Date(dn)
console.log(ddn.toLocaleDateString('ru-RU'))
const ltz = ddn.getTimezoneOffset() * 60
console.log('смещение часлового пояса', ltz, ddn.getTimezoneOffset()/60)
for (i in cities ) {
	const gd = new Date((cities[i].time + cities[i].timezone + ltz )*1000 )
	console.log(cities[i].name, gd.toLocaleTimeString(), '  ', cities[i].timezone/3600)
}

