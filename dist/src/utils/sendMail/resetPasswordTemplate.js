"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordTemplate = void 0;
const resetPasswordTemplate = (message, resipientName) => `
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Сброс пароля</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 20px;
      }
      .container {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        gap: 10px;
      }
      .title {
        font-size: 28px;
        font-weight: bold;
        margin: 0;
      }
      .greeting{
        display: flex;
        flex-direction: column;
      }
      .greeting-title{
        font-size: 24px;
        font-weight: bold;
        color: orange;
        margin: 0;
      }
      .code {
        font-size: 24px;
        font-weight: bold;
        border: 1px solid blue;
        border-style: dashed;
        width: 100px; 
        padding: 20px;
        text-align: center;
      }
      .warning {
        color: red;
        font-size: 14px;
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2 class="title">Сброс пароля</h2>
      <div class="greeting">
        <p class="greeting-title">Привет 👋 пользователь 😊 </з>
      </div>
      <p class="text">Ваш код для сброса пароля:</p>
      <p class="text">Код действителен в течение 10 минут.</p>
      <div class="code">${message}</div>
      <p class="warning">
        ⚠️Уважаемый пользователь, для вашей безопасности не делитесь этим кодом
        ни с кем.
      </p>
    </div>
  </body>
</html>


`;
exports.resetPasswordTemplate = resetPasswordTemplate;
