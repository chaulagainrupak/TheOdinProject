from fastapi import FastAPI, HTTPException
import subprocess
import requests
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta

# Load environment variables from .env file located one directory up
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

# Telegram Bot API credentials from environment variables
telegram_bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
telegram_chat_id = os.getenv('TELEGRAM_CHAT_ID')

# Function to get current time in Kathmandu (UTC+5:45)
def get_kathmandu_time():
    utc_offset = timedelta(hours=5, minutes=45)
    kathmandu_time = datetime.utcnow() + utc_offset
    return kathmandu_time.strftime('%Y-%m-%d %H:%M:%S')

app = FastAPI()

@app.post('/github-webhook')
async def github_webhook():
    try:
        subprocess.run(['git', 'pull'], check=True)
        
        # Assuming you want to track changes in Library/script.js
        file_path = "Library/script.js"
        lines_changed = count_lines_changed(file_path)
        
        current_time = get_kathmandu_time()
        message = f"Git pull executed at {current_time}\n"
        message += f"Changes in {file_path} | Lines changed: {lines_changed}"
        
        send_telegram_message(message)
        
        return {'message': 'Git pull successful'}
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f'Error executing git pull: {e}')

def count_lines_changed(file_path):
    try:
        result = subprocess.run(['git', 'diff', '--stat', 'HEAD^', 'HEAD', file_path], capture_output=True, text=True)
        lines_changed = int(result.stdout.strip().split(' ')[-2])
        return lines_changed
    except Exception as e:
        print(f"Error counting lines changed: {e}")
        return 0

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

