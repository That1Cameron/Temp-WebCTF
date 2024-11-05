const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Middleware to handle the admin route
app.get('/admin.html', (req, res) => {
    const activeSession = req.cookies.ActiveSession;
    const userType = req.cookies.AccountType
    if (!userType || !activeSession) {
        // Testing : If the admin cookie is not set, serve it to the user
        // Testing : res.cookie('isAdmin', 0);
        res.cookie('ActiveSession', 'false', { maxAge: 900000, httpOnly: true });
        res.cookie('AccountType', 'user', { maxAge: 900000, httpOnly: true });
        res.status(403).send('Access Denied');
    } else if (activeSession.toLowerCase() === 'true' && userType.toLowerCase() === 'admin') {
        // If the admin cookie exists and has the value 'Admin.4.20.20' or 'Admin.4.21.20', serve the admin page
        res.sendFile(__dirname + '/public/admin.html');
    } else {
        // If the admin cookie exists but doesn't have the correct value, deny access
        res.status(403).send('Access Denied');
    }
});

app.post("/login", (req, res) => {    
    // i dont actually care about login form 
    // info, its out of scope for this challenge 
    return res.redirect("login-failed.html");
})

// Middleware to serve static files (like HTML)
app.use(express.static('public'));
app.listen(51322);
