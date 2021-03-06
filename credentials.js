/////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Jaime Rosales 2016 - Forge Developer Partner Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////////////////


var credentials ={

	credentials: {
		// Replace placeholder below by the Forge CientId and Forge CientSecret you got from
		// http://developer.autodesk.com/ for the production server
		client_id: process.env.FORGE_CLIENT_ID || '6k4FLeNnhuAg8rsG2YUW6ssyXqFCtTFR',
		client_secret: process.env.FORGE_CLIENT_SECRET || 'V3c6ab33a5513434',
		grant_type: 'client_credentials',
		scope: 'viewables:read', // Setup the needed scopes for authorizing your Token

		// Since we are using a two legged authentication, we will not need the callback URL, we can leave it blank.
	    callbackUrl: process.env.CALLBACK_URL || '<replace with your callbackUrl>' 
	},
	// If you which to use the Autodesk View & Data API on the staging server, change this url
	BaseUrl: 'https://developer.api.autodesk.com',
	Version: 'v1'
} ;

credentials.Authentication =credentials.BaseUrl + '/authentication/' + credentials.Version + '/authenticate'


module.exports = credentials;