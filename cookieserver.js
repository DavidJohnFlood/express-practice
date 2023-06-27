const express = require('express');
var cookieParser = require('cookie-parser')
const app = express();
const port = 8080;
app.use(express.json())
app.use(cookieParser())
// Create an Express application that sets a cookie when routed to /login with their name. If a cookie is present with a name key, then it says "Welcome {name}! when the user routes to /hello".




app.get('/login', function(req, res) {
    // define cookie attributes
    var opts = {
      maxAge: 900000,
      httpOnly: true,
      sameSite: 'strict',
    };
    // add a cookie to the response
    res.cookie('name', 'David', opts);


    if(req.cookies.name)
    {// use cookie values
        res.send(`Welcome back ${req.cookies.name}!!!`)
    }

    else
    {// send our response with the cookies in the header
        res.send('Must be your first time here???');
    }
})

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))
