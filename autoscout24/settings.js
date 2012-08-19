/**
 * Configuration Array including all relevant configuration data.
 * @var array $telekomConfig configuration array
 */
module.exports = {

	// Basic Configuration - change it!
	'environment' 						: 'production', // the preferred environment (production / sandbox / mock)
	'username' 							: 'username', // your DeveloperCenter Username
	'password' 							: 'password', // your DeveloperCenter Password
	'culture_id' 						: 'de-DE', // your culture ID
	
	// required API URLs - do not change!
	'api_auth_url' 						: 'https://sts.idm.telekom.com/rest-v1/tokens/odg',
	'api_base_url' 						: 'https://gateway.developer.telekom.com',
	'api_autoscout_rest_url' 			: '/plone/autoscout24/rest'
}