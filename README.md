# Email Signature Generator

A full-stack application for generating email signatures using predefined templates. Users can input personal details, select a template, and generate HTML and plain-text email signatures. The application supports both single and batch processing of signatures.

---

## **Project Overview**

This project consists of:
1. **Frontend**:
   - Provides a user interface to input personal details and select a template.
   - Displays the generated HTML and plain-text signatures.
2. **Backend**:
   - Handles requests for generating email signatures.
   - Processes user data using `.ejs` templates for dynamic rendering.
   - Supports **single** and **batch** processing of signatures.

---

## **Features**

- **Frontend**:
  - Allows users to input details like full name, email, phone, and logo URL.
  - Lets users select a template from a list.
  - Displays generated signatures in both HTML and plain-text formats.

- **Backend**:
  - Generates email signatures dynamically using `.ejs` templates.
  - Provides APIs for single and batch processing of signatures.
  - Processes batches asynchronously using a queue.

---

## **Technologies Used**

- **Frontend**: Vue.js
- **Backend**: Node.js, Express.js, EJS
- **Queue Management**: Bull (for batch processing)
- **Styling**: CSS

---

## **How to Run the Application**

### Prerequisites
- **Node.js** (v18 or above)
- **npm** (Node Package Manager)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yonakeinon/email-signature-generator.git
   cd email-signature-generator
   npm install
   cd backend && npm install
   cd ./frontend && npm install
   cd ./backend && node src/server.js
   cd ./frontend && npm http-server 

2. Open the application in your browser:
    ```
    http://localhost:8080


## **Backend Endpoints**

**1. Single Signature Generation**

---



**Endpoint:** ` POST /api/signature`

**Description:** Generates a single email signature using the selected template.

***Request Body:***
```
{
  "templateName": "template1",
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phone": "123-456-7890",
  "logo": "https://example.com/logo.png"
}
```

***Response:***
```
{
  "htmlSignature": "<div>...</div>",
  "plainTextSignature": "John Doe\nEmail: john.doe@example.com\nPhone: 123-456-7890"
}
```
**2. Batch Signature Processing**

---
**Endpoint:** ``` POST /api/signature/batch```

**Description:** Processes multiple signature requests in bulk asynchronously.

***Request Body:***
```
{
  "templateName": "template01",
  "users": [
    {
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "phone": "123-456-7890",
      "logo": "https://example.com/logo1.png"
    },
    {
      "fullName": "Jane Smith",
      "email": "jane.smith@example.com",
      "phone": "987-654-3210",
      "logo": "https://example.com/logo2.png"
    }
  ],
  "webhookUrl": "http://localhost:3000/webhook"
}
```
***Response:***
```
{
  "message": "Batch request received. Processing asynchronously."
}
```




