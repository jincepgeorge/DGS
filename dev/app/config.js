angular.module("config", [])

.constant("ENV", {
	"appTitle": "Digital Grid Services",
	"getCustomerDataAPI":"http://dgsdataprovider.azurewebsites.net/mcustomer?customerId=<custid>",
	"makePaymentAPI":"http://dgsdataprovider.azurewebsites.net/updatebalance",
	"isOffline":false,
	"userName":"admin",
	"password":"1234",
	"keys": {
		"jsonUrl": "assets/json/",
		"dashboardData": "dashboarddata.json",
		"employeelist": "employees.json",
	
	},
	"errorCode":{
		"SERVERNOTAVAILABLE":404,
		"UNAUTHORISED":401,
		"INVALIDINPUT":406,
		"INVALID_EMPLOYEE":402,
		"INCORRECT_CURRENT_PASSWORD":403,

	},
	"pages":{
		"login":"login",
		"dashboard":"dashboard",
		"payment":"payment",

	},
	"messages":{
		"UNKNOWN_ERROR":"An error has occured. Please try again later.",
		"NETWORK_ERROR":"No network available.",
		"INVALID_LOGIN":"Incorrect username or password.",
	},
	"RespManagerID":"EMP001"
	
});