const LOGIN_MATCHER = {
	"id": 1,
	"name": "Caio Santos",
	"email": "caio@santos.com",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiQ2FpbyBTYW50b3MiLCJlbWFpbCI6ImNhaW9Ac2FudG9zLmNvbSJ9LCJpYXQiOjE2NjI2NTc4MDAsImV4cCI6MTY2MjY2ODYwMH0.zV3gAduWjDwu33N64SYerZ3jfcmh_rCSEr1FTvR4CJI"
}

const USER_MATCHER = {
	"dataValues": {
		"id": 1,
		"name": "Caio Santos",
		"email": "caio@santos.com",
		"password": 'e10adc3949ba59abbe56e057f20f883e',
	},
};

const TOKEN_MATCHER = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiQ2FpbyBTYW50b3MiLCJlbWFpbCI6ImNhaW9Ac2FudG9zLmNvbSJ9LCJpYXQiOjE2NjI2NTc4MDAsImV4cCI6MTY2MjY2ODYwMH0.zV3gAduWjDwu33N64SYerZ3jfcmh_rCSEr1FTvR4CJI";

const CREATE_USER_MATCHER = {
	"dataValues": {
		"id": 4,
		"name": "Brett Wiltshire",
		"email": "brett@email.com",
		"password": 'e10adc3949ba59abbe56e057f20f883e',
  }
}

const REGISTER_MATCHER = {
	"id": 4,
	"name": "Brett Wiltshire",
	"email": "brett@email.com",
}

const QUERIES_MATCHER = [
	{
		"id": 8,
		"userId": 1,
		"patientsName": "teste fulano",
		"descripition": "fazendo teste",
		"totalPrice": "3000.00",
		"date": "2022-09-08T17:51:28.000Z",
		"optionPayment": "Crédito",
		"methodPayment": "À vista"
	},
	{
		"id": 9,
		"userId": 1,
		"patientsName": "teste fulano",
		"descripition": "fazendo teste",
		"totalPrice": "3000.00",
		"date": "2022-09-08T17:51:29.000Z",
		"optionPayment": "Crédito",
		"methodPayment": "À vista"
	}
];

const	NEW_QUERIE_MATCHER = {
	"id": 13,
	"patientsName": "test patientsName",
	"descripition": "test descripition",
	"totalPrice": 3000,
	"optionPayment": "Crédito",
	"methodPayment": "À vista",
	"date": "2022-09-08T18:17:56.611Z",
	"userId": 1
}

const DECODE_MATCHER = { data: { id: 1 } };

module.exports = {
  LOGIN_MATCHER,
  TOKEN_MATCHER,
	USER_MATCHER,
	CREATE_USER_MATCHER,
	REGISTER_MATCHER,
	QUERIES_MATCHER,
	DECODE_MATCHER,
	NEW_QUERIE_MATCHER,
}