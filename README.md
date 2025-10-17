🌐 QR Generator

A lightweight, fast, and browser-based QR Code Generator built with HTML, CSS, and JavaScript.
Generate QR codes instantly for URLs, text, contact info, or any custom data — no server required.

🚀 Features

⚡ Instant QR code generation

🧩 Supports text, URLs, and custom data

💾 Download QR codes as PNG or SVG

📱 Fully responsive, mobile-friendly UI

🔒 100% client-side — no backend or API calls

🧠 Built with vanilla JavaScript (no frameworks)

🖥️ Live Demo

👉 View Demo

(Replace the link above with your GitHub Pages / Vercel / Netlify deployment URL)

🧰 Tech Stack
Layer	Technology
Structure	HTML5
Styling	CSS3 (responsive layout)
Logic	JavaScript (ES6)
Libraries	qrcodejs
 / qr-code-styling
⚙️ Installation & Setup

Clone the repository

git clone https://github.com/yourusername/qr-code-generator.git
cd qr-code-generator


Open index.html directly in your browser
or serve locally (recommended):

npx serve


Then visit → http://localhost:3000

🧠 Usage

Enter your text or URL in the input field.

Click Generate QR Code.

Download or share your QR code image.

Example using JavaScript:

new QRCode(document.getElementById("qrcode"), {
  text: "https://example.com",
  width: 200,
  height: 200,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H
});

📁 Folder Structure
qr-code-generator/
│
├── index.html
├── style.css
├── script.js
└── README.md

📸 Screenshot

(Optional – add an image of your UI here)

🤝 Contributing

Contributions are welcome!

Fork the repository

Create a new branch:

git checkout -b feature/your-feature-name


Commit your changes and push:

git push origin feature/your-feature-name


Open a Pull Request 🎉

🪪 License

This project is licensed under the MIT License.
See the LICENSE
 file for details.
