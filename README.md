# XKash - Mobile Financial Service (MFS)

## Live Demo
🔗 [XKash Live](https://xkash-by-shakhawat.web.app/)

## Repository
📂 [GitHub Repository](https://github.com/shakhawat2021hossain/xkash)

## Admin Credentials
- **Email:** admin@mfs.com
- **Password:** 12345

## Overview
XKash is a secure Mobile Financial Service (MFS) web application inspired by popular platforms like bKash and Nagad. It allows users to perform essential financial transactions such as sending money, cash-in, cash-out, and balance inquiries. The platform includes three roles: **User, Agent, and Admin**, each with specific permissions and functionalities.

## Features
### User
- Register and receive a **40 Taka** bonus.
- **Send money** to other users (Fee: 5 Taka for transactions over 100 Taka).
- **Cash-in** from an agent (No fee).
- **Cash-out** to an agent (Fee: 1.5%).
- Check account balance with a **click-to-reveal** feature.
- View the last 100 transactions.

### Agent
- Register and receive an initial **100,000 Taka**.
- Requires **admin approval** for activation.
- **Facilitate cash-in transactions** for users (No fee).
- **Earn 1% commission** for user cash-out transactions.
- Request balance recharge from admin.

### Admin
- Manage users and agents (Approve, Block, View transactions).
- Monitor **total money in the system** and earnings.
- Approve agent balance recharge requests.
- Earn **0.5% of user cash-out income** and **5 Taka per transaction**.

## Technology Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ORM)
- **Authentication:** JWT (JSON Web Token) with hashed PINs
- **Deployment:** Vercel (Frontend), Render (Backend)

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/shakhawat2021hossain/xkash.git
   cd xkash
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up **.env** file with necessary configurations:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```bash
   npm run server
   ```
5. Start the frontend:
   ```bash
   npm start
   ```

## API Routes
### Authentication
- `POST /api/auth/register` - Register a new user/agent
- `POST /api/auth/login` - User/Admin/Agent login

### User Transactions
- `POST /api/transaction/send-money`
- `POST /api/transaction/cash-in`
- `POST /api/transaction/cash-out`
- `GET /api/transaction/history`

### Admin Actions
- `GET /api/admin/users`
- `PATCH /api/admin/approve-agent/:id`
- `POST /api/admin/recharge-agent`

## Security Features
- Secure **JWT authentication**.
- **Hashed PIN storage** for user authentication.
- **One-device login enforcement** to prevent session hijacking.

## Future Improvements
- Implement **Agent Cash Withdrawal** approval.
- Improve **transaction analytics** dashboard.
- Add **real-time notifications** for transactions.

## License
This project is open-source under the **MIT License**.

---
Developed by **Shakhawat Hossain** 🚀

