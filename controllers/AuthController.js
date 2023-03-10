import config from "../config/auth.config.js";
import db from "../models/index.js";
import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
const User = db.user;
const Role = db.role;

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

app.use(cookieParser())

const signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

const signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id, username: user.username, email: user.email, fullname: user.fullname}, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      
      res
      .setHeader('x-access-token', token)
      .cookie('access-token', token, {
        httpOnly: true,
      })
      .status(200)
      .send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles,
        accessToken: token
      });
    });
};



const controller = {
  signup,
  signin
}

export default controller