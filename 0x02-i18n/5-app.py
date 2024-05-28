#!/usr/bin/env python3
"""Mocking user login"""

from flask import Flask, render_template, request, g
from flask_babel import Babel

app = Flask(__name__)
babel = Babel(app)


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user():
    """Get user by ID"""
    login_id = request.args.get('login_as')
    if login_id and int(login_id) in users:
        return users[int(login_id)]
    return None


@app.before_request
def before_request():
    """Set user information in flask.g"""
    g.user = get_user()


@app.route("/")
def index():
    """Index page"""
    return render_template("5-index.html")


if __name__ == "__main__":
    app.run(debug=True)
