# DevConnect 🚀  

### **Connecting Developers, Building Networks**  
DevConnect is a **scalable, full-stack social networking platform** designed for developers to **connect, collaborate, and grow their professional network**.  
This repository contains the **backend**, built using **Node.js, Express.js, and MongoDB**, following best practices for **security, performance, and maintainability**.  

---

## **Features & Functionalities 🌟**  

### **Authentication & Security 🔐**  
✔️ **JWT-based authentication** with secure token storage via HTTP-only cookies  
✔️ **Password hashing** using bcrypt for enhanced security  
✔️ **Middleware-based route protection** to ensure authorized access    

### **User Management & Profiles 👨‍💻**  
✔️ **User registration & login** with JWT token-based authentication  
✔️ **Profile management** (view, edit, and update personal details)     
✔️ **Password update** with strong validation checks      

### **Developer Network & Connections 🌐**  
✔️ **Connection requests system** (send, accept, reject requests)  
✔️ **Mutual connections retrieval & developer suggestions**  
✔️ **Filtered developer feed** based on user preferences    

### **API Performance & Security Optimization ⚡🔒**   
✔️ **CORS policy enforcement** with controlled API access   
✔️ **Optimized MongoDB queries** with indexing for better performance  
✔️ **Strict password validation** using bcrypt hashing  
✔️ **Input validation & sanitization** to prevent security vulnerabilities  

---

## **Tech Stack 🛠️**  

### **Backend (Node.js + Express.js) 🌍**  
🔹 **Express.js** - Lightweight framework for handling API requests  
🔹 **MongoDB + Mongoose** - NoSQL database for flexible, scalable data storage  
🔹 **JWT Authentication** - Secure token-based authentication with refresh mechanism  
🔹 **CORS** - Security measures to prevent API abuse  
🔹 **Bcrypt.js** - Password hashing for secure authentication    
🔹 **MongoDB Atlas** - Cloud-based database hosting 

---

## **API Endpoints 🔗**  

| Method  | Route                              | Description | Auth Required |
|---------|------------------------------------|-------------|--------------|
| `POST`  | `/signup`                          | Register a new user | ❌ |
| `POST`  | `/login`                           | Authenticate user & issue JWT | ❌ |
| `POST`  | `/logout`                          | Logout & clear authentication token | ✅ |
| `GET`   | `/profile/view`                    | Retrieve the logged-in user's profile | ✅ |
| `PATCH` | `/profile/update`                  | Update profile details | ✅ |
| `PATCH` | `/profile/change-password`         | Change user password with validation | ✅ |
| `POST`  | `/request/send/:status/:toUserId`  | Send a connection request (status: interested/ignored) | ✅ |
| `POST`  | `/request/review/:status/:requestId` | Accept or reject a connection request | ✅ |
| `GET`   | `/user/requests/received`          | Retrieve pending connection requests | ✅ |
| `GET`   | `/user/connections`                | Retrieve accepted connections | ✅ |
| `GET`   | `/feed`                            | Fetch suggested developers feed | ✅ |

---
