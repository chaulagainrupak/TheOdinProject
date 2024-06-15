from fastapi import FastAPI, HTTPException, Request
import subprocess
import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env file located one directory up
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

# Telegram Bot API credentials from environment variables
telegram_bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
telegram_chat_id = os.getenv('TELEGRAM_CHAT_ID')

app = FastAPI()

@app.post('/github-webhook')
async def github_webhook(request: Request):
    data = await request.json()

    # Check if the event is a push to the repository
    if 'ref' in data and 'repository' in data and 'pusher' in data:
        repo_name = data['repository']['name']
        pusher_name = data['pusher']['name']

        # Perform git pull in the current directory
        try:
            subprocess.run(['git', 'pull'], check=True)
            send_telegram_message(f"Repository '{repo_name}' updated by {pusher_name}!")
            return {'message': 'Update successful'}
        except subprocess.CalledProcessError as e:
            raise HTTPException(status_code=500, detail=f'Error executing git pull: {e}')
    else:
        return {'message': 'No action taken'}

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
