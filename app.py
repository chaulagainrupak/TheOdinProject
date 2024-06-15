from fastapi import FastAPI, HTTPException
import subprocess
import requests
from dotenv import load_dotenv
import os
from datetime import datetime

# Load environment variables from .env file located one directory up
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

# Telegram Bot API credentials from environment variables
telegram_bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
telegram_chat_id = os.getenv('TELEGRAM_CHAT_ID')

app = FastAPI()

@app.post('/github-webhook')
async def github_webhook():
    # Perform git pull in the current directory
    try:
        subprocess.run(['git', 'pull'], check=True)
        current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        send_telegram_message(f"Git pull executed at {current_time}")
        return {'message': 'Git pull successful'}
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f'Error executing git pull: {e}')

def send_telegram_message(message):
    url = f'https://api.telegram.org/bot{telegram_bot_token}/sendMessage'
    payload = {
        'chat_id': telegram_chat_id,
        'text': message
    }
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        print(f"Telegram message sent: {response.json()}")
    except requests.exceptions.RequestException as e:
        print(f"Error sending Telegram message: {e}")
