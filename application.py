from covidData import CovidData
from flask import Flask, jsonify, render_template

# set up database
data = CovidData("sqlite:///covidData.db")

# set up flask
app = Flask(__name__)

# Flask Routes 

@app.route("/")
def welcome():
    allstates = data.get_state_ids()
    return render_template("index.html", state_ids=allstates)

@app.route("/api/v1.0")
def show_apis():
    """List all available api routes."""
    return (
        f"<h4>Available Routes:</h4>"
        f'<a href="/api/v1.0/ids">/api/v1.0/states</a><br/>'       
        f'<a href="/api/v1.0/cases">/api/v1.0/cases</a><br/>' 
        f'<a href="/api/v1.0/cases/TX">/api/v1.0/cases/state_id</a><br/>' 
        f'<a href="/"><h4>Back</h4></a><br/>' 
    )    

@app.route("/api/v1.0/ids")
def get_all_ids():
    return jsonify(data.get_state_ids())

@app.route("/api/v1.0/cases")
def get_all_user_results():
    return jsonify(data.get_cases())    

@app.route("/api/v1.0/cases/<state_id>")
def get_one_user_results(state_id):
    print(state_id)
    return jsonify(data.get_cases(state_id))    

if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    app.run()
