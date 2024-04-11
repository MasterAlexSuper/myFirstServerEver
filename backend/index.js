import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { User } from "./models/userModel.js";
import cors from 'cors'


const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (request, response) => {
   return response.status(200).send('Hello')
})

// Create New User
app.post('/user/create', async (request, response) => {
   try {
      if (
         !request.body.username ||
         !request.body.password
      ) {
         return response.status(400).send({ message: "New user wasn`t created fill Username/Password" })
      }
      const hashedPassword = await bcrypt.hash(request.body.password, 10);
      const newUser = {
         username: request.body.username,
         password: hashedPassword,
         email: request.body.email,
         fullname: request.body.fullname
      }
      const user = await User.create(newUser)

      return response.status(200).send(user)
   }
   catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message })
   }
})

// See all the users
app.get('/user', async (request, response) => {
   try {
      const users = await User.find({});
      if (!users || users.length === 0) {
         return response.status(404).send({ message: "There are no users" });
      }

      return response.status(200).json({
         count: users.length,
         data: users
      });
   }
   catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message })
   }
})
// Get exact user info
app.get(`/user/:id`, async (request, response) => {
   const { id } = request.params;

   try {
      const user = await User.find({ _id: id });
      if (!user) {
         return response.status(404).send({ message: "There are no users" });
      }
      return response.status(200).json(
         user
      );
   }
   catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message })
   }
})

// Edit users params
app.put('/user/edit/:id', async (request, response) => {
   try {
      const { id } = request.params;
      const pas = request.body.password;
      const hashedPassword = await bcrypt.hash(request.body.password, 10);
      let update = {
         password: '',
         username: '',
         email: '',
         fullname: ''
      }

      if (pas == '') {
         update = {
            username: request.body.username,
            email: request.body.email,
            fullname: request.body.fullname
         }
      } else {
         update = {
            password: hashedPassword,
            username: request.body.username,
            email: request.body.email,
            fullname: request.body.fullname
         }
      }
      const user = await User.findByIdAndUpdate(id, update)
      return response.status(200).send({ message: "User was successfully updated" })
   } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message })
   }
})


// Delete user
app.delete('/user/delete/:id', async (request, response) => {
   try {
      const { id } = request.params;
      const deleted = await User.findByIdAndDelete(id);

      if (!deleted) {
         return response.status(500).send({ message: "something went wrong" })
      }
      return response.status(200).send({
         messege: "User was deleted",
         deleted: deleted
      })
   } catch (error) {
      console.log(error.message);
      return response.status(500).send({ message: "Something went wrong" })
   }
})


// Login 
app.post('/login', async (request, response) => {
   try {
      if (!request.body.password || !request.body.username) {
         return response.status(400).send({ message: "No password or username" })
      }
      const toCheck = {
         username: request.body.username,
         password: request.body.password
      }
      const isUser = await User.find({ username: request.body.username })
      if (!isUser) {
         return response.status(400).send({ message: "Username is wrong" })
      }

      if (await bcrypt.compare(toCheck.password, isUser[0].password)) {
         console.log(true);

         return response.status(200).send({ message: "Success", allowed: true, id: isUser[0]._id })
      } else {
         console.log(false);
         return response.status(300).send({ message: "Wrong password", state: false })
      }
   } catch (error) {
      console.log(error.message);
      return response.status(500).send({ message: "Something went wrong" })
   }
})


mongoose
   .connect(mongoDBURL)
   .then(() => {
      console.log("DB conected")
      app.listen(PORT, () => {
         console.log(`Port: ${PORT}`);
      })

   })
   .catch((error) => console.log(error))