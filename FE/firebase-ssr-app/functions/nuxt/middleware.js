const middleware = {}

middleware['auth'] = require('../middleware/auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['featureFlags'] = require('../middleware/featureFlags.js')
middleware['featureFlags'] = middleware['featureFlags'].default || middleware['featureFlags']

export default middleware
