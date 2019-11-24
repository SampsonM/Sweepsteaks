const DB_URL = process.env.DB_URL || require("../config/environment").DB_URL
import mongoose from 'mongoose'

// Connect mongoose
export default () => {
	return mongoose.connect(
		DB_URL,
		{ useNewUrlParser: true,
			useUnifiedTopology: true },
		() => {
		  process.env.NODE_ENV !== 'test' && console.log("connected at app.js to mongo")
		}
	)
}
