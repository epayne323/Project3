import numpy as np
import os
import pandas as pd

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

import json 

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

@app.route("/")
def index():
    
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)