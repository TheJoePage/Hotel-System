const express = require('express');const app = express();const path = require('path');const http = require('http').Server(app);const io = require('socket.io')(http);
const {userJoin,getCurrentUser,userLeave,getAllUsers}=require('./socket-io-utils/user');
require('dotenv/config');const mongoose=require('mongoose');var bodyParser=require('body-parser');const cookieParser=require('cookie-parser');

app.use(express.json());app.use(bodyParser.json());app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/orders',express.static(path.join(__dirname,'public/js')));
app.use('/chat',express.static(path.join(__dirname,'public/js/chats')));
app.use('/images',express.static(path.join(__dirname,'public/images')));
//view engine to EJS
app.set('view engine', 'ejs');

// Routers
const ordersRoute=require('./routes/orders')
const roomRoute=require('./routes/rooms')
const usersRoute=require('./routes/users')
const authRoute=require('./routes/auth')
const adminRoute=require('./routes/admin')
const servicesRoute=require('./routes/services')
const personalRoute=require('./routes/personal')
const chatRoute=require('./routes/chat')
const ratingRoute=require('./routes/rating')
const spaRoute=require('./routes/spa')

// Use Routers
app.use('/orders',ordersRoute);
app.use('/rooms',roomRoute);
app.use('/users',usersRoute);
app.use('/auth',authRoute);
app.use('/admin',adminRoute);
app.use('/services',servicesRoute);
app.use('/personal',personalRoute);
app.use('/chat',chatRoute);
app.use('rating',ratingRoute);
app.use('/spa',spaRoute);

//Controllers
const chatController=require('./controllers/chatController');
const { getJwtDetails } = require('./middleware/verifyJWT');

// return to the main page
app.get('/',(req,res)=>{res.render('landingPage.ejs',{"jwt":getJwtDetails(req.cookies.jwt)})});
//Login
app.get('/login',(req,res)=>{res.render('login.ejs',{"jwt":getJwtDetails(req.cookies.jwt)})});

io.on('connection',function(socket){socket.on('join',function(data){userDetails=getJwtDetails(data["token"]);userJoin(socket.id,userDetails.email,userDetails.fullName);console.table(getAllUsers());});socket.on('disconnect',function(){userLeave(socket.id)});socket.on('newMessage',function(data){chatController.addMessage(io,data)});});

// Mongoose Connection
mongoose.connect(`mongodb+srv://thejoepage:23alti16@hotel.cghuuth.mongodb.net/?retryWrites=true&w=majority`)
http.listen(process.env.PORT);