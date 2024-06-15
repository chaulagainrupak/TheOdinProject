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
        
        changes_summary = get_git_changes_summary()
        current_time = get_kathmandu_time()
        
        message = f"Git pull executed at {current_time}\n"
        message += changes_summary
        
        send_telegram_message(message)
        
        return {'message': 'Git pull successful'}
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f'Error executing git pull: {e}')

def get_git_changes_summary():
    try:
        result = subprocess.run(['git', 'diff', '--stat', '--numstat', 'HEAD^', 'HEAD'], capture_output=True, text=True)
        lines_changed = result.stdout.strip().split('\n')
        
        summary = ""
        for line in lines_changed:
            added, deleted, file_path = line.split('\t')
            summary += f"{file_path.strip()} | +{added}, -{deleted}\n"
        
        return summary
    except Exception as e:
        print(f"Error getting git changes summary: {e}")
        return ""

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

