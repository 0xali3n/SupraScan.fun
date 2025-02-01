# 🚀 SupraScan.Fun  

## 📌 Project Overview  
**SupraScan.Fun** is the premier blockchain explorer for the **Supra network**, allowing users to track **assets, transactions, and liquidity pools** seamlessly. The platform provides a **developer-friendly API**, enabling projects to integrate real-time **blockchain insights** into their applications.  

---

## 👨‍💻 Team Introduction  

### **Chinmay Patil**  
🔹 **Alias:** 4li3n.eth (Web3)  
🔹 **Experience:** Airdrop Hunting | HH Goa '24 | Blockchain Innovations | Degen | Crypto Trading  
🔹 **Background:** Web3 developer since 2020  

### **Shrishail Patil**  
🔹 **Alias:** 3loka.eth (Web3)  
🔹 **Experience:** Full Stack Blockchain Developer | Former Intern at Ultimez Technology | HH Goa '24 | dApps | ML & Deep Learning Enthusiast  

---

## 🔗 Useful Links  

- [Devfolio Submission](https://devfolio.co/projects/suprascanfun-d236) *(right-click to open in a new tab)*
- [Live Demo](https://suprascan.fun/) *(right-click to open in a new tab)*
- [API Documentation](https://docs.suprascan.fun/) *(right-click to open in a new tab)*
- [Official X](https://x.com/SupraScan) *(right-click to open in a new tab)*



---

## 🔗 Live Video  







https://github.com/user-attachments/assets/cd96517b-3ab3-499b-b7be-4dff48b88787





For HD full view: https://player.vimeo.com/video/1052387378?h=a3f4e5a2b6


---


## 📖 Project Description  

SupraScan.Fun provides a **powerful API** that allows developers to seamlessly **fetch and analyze blockchain data** on the **Supra network**.  

### **Key Features:**  
✅ **User-Friendly Blockchain Explorer** – Track assets, transactions, and pools.  
✅ **Developer API** – Generate API keys to access blockchain data.  
✅ **Real-Time Data** – Uses **Supra Oracle** for up-to-date token prices.  
✅ **Secure & Scalable** – High-performance queries with authentication.  

---

## ⭕ SupraScan.fun looks
<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img width="500" alt="cover" src="https://github.com/user-attachments/assets/3b71c6d3-a277-43ee-9a18-42023f2dc5a9" />
 <img width="500" alt="image" src="https://github.com/user-attachments/assets/13f18b83-ca29-4e01-8d6e-e811cc80a0d6" />
  <img width="500" alt="222222" src="https://github.com/user-attachments/assets/5d15a49a-02ea-461e-98f9-b41aefa964f4" />
  <img width="500" alt="333333" src="https://github.com/user-attachments/assets/8f310559-95bf-4830-8325-f12ea4d3bdef" />
  <img width="500" alt="444444" src="https://github.com/user-attachments/assets/b06e59d7-898a-48ea-a339-9e67c997d484" />
  <img width="500" alt="final" src="https://github.com/user-attachments/assets/4bfe9329-77d1-4a55-92ee-3bc2108778a0" />
  <img width="500" alt="image" src="https://github.com/user-attachments/assets/77f4007d-30fb-4b27-b963-bc52b7b8a4ae" />
  <img width="500" alt="image" src="https://github.com/user-attachments/assets/3a3fa230-2b51-405c-ac0a-071fa81bc03e" />

</div>


---

# SupraScan API Documentation

Access comprehensive blockchain data from the Supra network including transactions, assets, pools, and more.

## 🏗️ Project Flow & Architecture

### How It Works

1. **Generate API Key**
   - Users create an API key from the SupraScan dashboard

2. **Fetch Blockchain Data**
   - Access user profiles, token holdings, transactions, and liquidity pools

3. **Real-Time Updates**
   - Fetch live token prices via Supra Oracle

4. **Secure Authentication**
   - High-performance APIs with access control

## 📚 API Reference

### Base URL
```
https://api.suprascan.fun/api
```

### Authentication
All API requests require authentication using your API key in the headers:
```http
x-api-key: YOUR_API_KEY
```

### Endpoints

#### Transaction Endpoints
```http
GET /transactions?address={address}
```
Retrieve all transactions for a specific address

```http
GET /transactions/transfer?address={address}
```
Get transfer-specific transactions for an address

```http
GET /transactions/swap?address={address}
```
Get Swap-specific transactions for an address

```http
GET /transactions/liquidity?address={address}
```
Get Liquidity-specific transactions for an address

#### Token Endpoints
```http
GET /tokens/portfolio?address={address}
```
Get token portfolio for a specific address

```http
GET /tokens/pools
```
Get information about token pools

```http
GET /tokens/list
```
Get a list of available tokens

## 💻 Example Usage

### Request
```bash
curl -X GET \
'https://api.suprascan.fun/api/tokens/portfolio?address=0xf1021a4b469249669fc6a668f01a1f12231b174f41c3d7851447a077caab8b73' \
-H 'accept: application/json' \
-H 'x-api-key: sk_3582efec4f3a65e6a19c8f378528c636812c1f022366e101a1af16a66dcb0f1d'
```

### Response
```json
{
  "success": true,
  "total": 9,
  "totalValue": "127287.74",
  "timestamp": "2025-02-01T00:42:29.913Z",
  "data": [
    {
      "name": "TestBTC",
      "isPool": false,
      "fullString": "0x1::coin::CoinStore<0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::test_btc::TestBTC>",
      "icon": "https://i.ibb.co/4RFP4DP2/btc.png",
      "value": "0",
      "formattedValue": "0.00",
      "usdValue": "0.00"
    },
    {
      "name": "TestETH",
      "isPool": false,
      "fullString": "0x1::coin::CoinStore<0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::test_eth::TestETH>",
      "icon": "https://i.ibb.co/6jqsNqX/eth.png",
      "value": "10000000",
      "formattedValue": "10.00",
      "usdValue": "33118.40"
    },
    {
      "name": "TestSOL",
      "isPool": false,
      "fullString": "0x1::coin::CoinStore<0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::test_sol::TestSOL>",
      "icon": "https://i.ibb.co/TxB4sPJ5/sol.png",
      "value": "400000000",
      "formattedValue": "400.00",
      "usdValue": "92642.00"
    },
    {
      "name": "TestBonk",
      "isPool": false,
      "fullString": "0x1::coin::CoinStore<0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::test_bonk::TestBonk>",
      "icon": "https://i.ibb.co/RpN85hKq/bonk.png",
      "value": "300000000000",
      "formattedValue": "300000.00",
      "usdValue": "74.36"
    },
    {
      "name": "TestUSDC",
      "isPool": false,
      "fullString": "0x1::coin::CoinStore<0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::test_usdc::TestUSDC>",
      "icon": "https://i.ibb.co/N6gRnHNP/usdc.png",
      "value": "315525843",
      "formattedValue": "315.53",
      "usdValue": "315.62"
    },
    {
      "name": "TestUSDT",
      "isPool": false,
      "fullString": "0x1::coin::CoinStore<0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::test_usdt::TestUSDT>",
      "icon": "https://i.ibb.co/d0JnT7YV/usdt.png",
      "value": "922409373",
      "formattedValue": "922.41",
      "usdValue": "922.69"
    },
    {
      "name": "SupraCoin",
      "isPool": false,
      "fullString": "0x1::coin::CoinStore<0x1::supra_coin::SupraCoin>",
      "icon": "https://i.ibb.co/wrrP8jNR/supra.png",
      "value": "8990650700",
      "formattedValue": "89.91",
      "usdValue": "214.67"
    },
    {
      "name": "Weighted LP Pool",
      "isPool": true,
      "fullString": "0x1::coin::CoinStore<0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::weighted_pool::WeightedPoolToken<0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::test_eth::TestETH, 0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::test_usdc::TestUSDC, 0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::global_config::NullType, 0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::global_config::NullType, 0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::weighted_pool::Weight_50, 0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::weighted_pool::Weight_50, 0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::global_config::NullType, 0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::global_config::NullType>>",
      "icon": "https://i.ibb.co/xthNRkW4/sf.png",
      "value": "5754124",
      "formattedValue": "0.0575",
      "usdValue": "0.00"
    },
    {
      "name": "Stable LP Pool",
      "isPool": true,
      "fullString": "0x1::coin::CoinStore<0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::stable_pool::StablePoolToken<0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::test_usdc::TestUSDC, 0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::test_usdt::TestUSDT, 0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::global_config::NullType, 0x8ede5b689d5ac487c3ee48ceabe28ae061be74071c86ffe523b7f42acda2fcb7::global_config::NullType>>",
      "icon": "https://i.ibb.co/xthNRkW4/sf.png",
      "value": "101915256977",
      "formattedValue": "1019.1526",
      "usdValue": "0.00"
    }
  ]
}
```


## 🎯 **Goals & Problems Solved**  

### ✅ **What This Project Solves:**  
🔹 **Real-Time Asset Tracking:** Users can fetch live token values and holdings.  
🔹 **Portfolio Management:** Helps users track liquidity pools and transactions.  
🔹 **Developer-Focused API:** Enables seamless blockchain data integration.  

---

## ⚡ **Challenges & Solutions**  

🔴 **Extracting Correct Data:**  
✔️ Solution: Manual filtering and mapping of raw blockchain data.  

🔴 **Tracking Liquidity Pools:**  
✔️ Solution: Improved indexing for better accuracy.  

🔴 **Handling Duplicate Tokens:**  
✔️ Solution: Used **contract addresses** instead of token names.  

---

## 🛠 **Technical Breakdown**  

### **Tech Stack:**  
- **Frontend:**  React Vite + Tailwind CSS  
- **Backend:** Node.js + Express  
- **Database:** MongoDB  
- **Blockchain:** Supra Network  
- **API:** REST API with authentication (Clerk)



### **Setup & Installation**  

#### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/0xali3n/SupraScan.fun.git
cd SupraScan.fun
```
#### **2️⃣ Install Dependencies** 
```bash
npm i -g pnpm
pnpm install
```
#### **3️⃣ Start the Development Server** 
```bash
pnpm run dev
```
#### **4️⃣ Build** 
```bash
pnpm run build
```

---

## 🏁 Conclusion
**SupraScan.Fun** enhances the **Supra ecosystem** by offering an **advanced blockchain explorer** and developer API. With **real-time tracking**, secure authentication, and an **intuitive UI**, it empowers users and developers to **interact with the Supra blockchain** seamlessly. 🚀

---

## 🤝 Contributions & Contact
🔹 Contribute: Fork the repo & create a PR! <br>
🔹 Issues: Report bugs or suggest features. <br />
🔹 Contact: suprascan.fun@gmail.com   |   [Twitter](https://x.com/suprascan)   |   [SupraScan.Fun](https://suprascan.fun/)

---

🛠️ Built with ❤️ by Chinmay Patil & Shrishail Patil





