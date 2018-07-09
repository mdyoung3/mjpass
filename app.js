const https = require('https');

//Print message to console.
function printMessage(username, badgeCount, points) {
	const message = `${username} has ${badgeCount} total badges and ${points} points in javascript`;
	console.log(message);
}

//Print error message
function errorMessage(error){
	console.error(error.message);
}

function getProfile(username){
	try {
			//Connect to the Treehouse API UTL: https://teamtreehouse.com/marcyoung2.json
		const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
			if (response.statusCode === 200){
				let body = "";

				//Read the data in 
				response.on('data', data => {
					body += data.toString();
				});

				response.on(`end`, () => {
					try {
						//Parse the data
						const profile = JSON.parse(body);
						
						//Print out the datat
						printMessage(username, profile.badges.length);
					} catch (error) {
						errorMessage(error);
					}

				})
			} else {
				const message = `There was an error for getting profile of ${username} (${response.statusCode})`;
				const statusCodeError = new Error(message);
				errorMessage(statusCodeError);
			}

						
	request.on('error', error => console.error(`Problem with request ${error.message}`));

		})
	} catch (error) {
		errorMessage(error);
	}


}

// const users = [
// 	'marcyoung2',
// 	'chalkers',
// 	'davemcfarland',
// 	'mattthompson',
//  'wayneparkhurst',,
//  'mattberry4'
// ];

const users = process.argv.slice(2);

users.forEach(getProfile);