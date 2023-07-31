
import { db } from "../db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// ************************************signup*****************************
export const signup = (req, res) => {
    const email = req.body.email;
  
    // Check if the user exists with the provided email
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkUserQuery, [email], (err, data) => {
      if (err) {
        console.error("Error checking user:", err);
        return res.status(500).json("Error checking user.");
      }
  
      // Check if any data rows are returned (user with the provided email exists)
      if (data.length > 0) {
        return res.status(409).json("User exists with this email!");
      }
      //hash the password
      const salt=bcrypt.genSaltSync(10);
      const hash=bcrypt.hashSync(req.body.password,salt);
      // If user does not exist, insert the new user
      const insertUserQuery = "INSERT INTO users (username, mobile, email, password) VALUES (?, ?, ?, ?)";
      const VALUES = [
        req.body.username,
        req.body.mobile,
        req.body.email,
        hash
      ];
  
      db.query(insertUserQuery, VALUES, (err, result) => {
        if (err) {
          console.error("Error creating user:", err);
          return res.status(500).json("Error creating user.");
        }
        return res.status(200).json("User has been created.");


      });
    });
  };
  // ********************************Login************************************
export const login = (req, res) => {
  const email = req.body.email;
  const inputpassword=req.body.password;

  // Check if the user exists in the database
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, data) => {
    if (err) {
      console.error("Error checking user:", err);
      return res.status(500).json("Error checking user.");
    }

    if (data.length === 0) {
      return res.status(404).json("User not found!");
    }
    //check password
    const isPasswordCorrect=bcrypt.compareSync(inputpassword,data[0].password);
    if(!isPasswordCorrect)  return res.status(400).json("Wrong Username or Password!");
   

    // Password is correct, create a JWT token
    const token = jwt.sign({ id: data[0].id }, "jwtkey");

    // Exclude password from the response and send other user data
    const { password, ...userWithoutPassword } = data[0];

    // Set the JWT token as an HttpOnly cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      
      // Add other secure cookie options like "secure: true" for HTTPS-only
    }).status(200).json(userWithoutPassword);
  });
};
// *********************************Logout***************************************
export const logout=(req,res)=>{
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User loged out");
}