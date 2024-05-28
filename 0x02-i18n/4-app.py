#!/usr/bin/env python3
""" babel lang """
from flask import Flask, render_template, request
from flask_babel import Babel


class Config:
    """ app config """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
babel = Babel(app)

app.config.from_object(Config)


@babel.localeselector
def get_locale() -> str:
    """ get local """
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route("/")
def index():
    """ index.html """
    return render_template("4-index.html")


if __name__ == "__main__":
    app.run(debug=True)
