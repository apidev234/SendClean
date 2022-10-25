- A strongly typed api wrapper for the [SendClean API](https://sendclean.com).

# Features
- Uses in-built [https module](https://nodejs.org/api/https.html) to make requests to the SendClean API.
- Full Typescript support

# Installation
```
npm install sendclean
```

# Usage
```js
const { SendClean } = require('sendclean');

const sendclean_client = new SendClean({
    token: "YOUR_SENDCLEAN_TOKEN",
    owner_id: "YOUR_SENDCLEAN_USERID"
})

sendclean_client.getUserInfo().then((userinfo) => {
    console.log(userinfo)
})
```
# License
- This Project has been licensed under the [MIT License](https://opensource.org/licenses/MIT)
