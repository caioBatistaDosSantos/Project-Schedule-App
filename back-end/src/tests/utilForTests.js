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

module.exports = {
  LOGIN_MATCHER,
  TOKEN_MATCHER,
	USER_MATCHER,
}