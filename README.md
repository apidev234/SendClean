# Description
- This is a wrapper for the [SendClean API](https://sendclean.com)
- Documentation can be found [here](https://apidev234.github.io/SendClean)
- Full Typescript Support

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
