from flask import Flask, render_template,request
from flask_sqlalchemy import SQLAlchemy
import requests

app=Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///weather.db'
db=SQLAlchemy(app)

class City(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(50),nullable=False)

@app.route('/', methods=['GET','POST'])


def index():

    if request.method == 'POST':
        new_city=request.form.get('city')
        if new_city:
            new_city_obj=City(name=new_city)

            db.session.add(new_city_obj)
            db.session.commit()
    cities=City.query.all()

    url='http://api.weatherapi.com/v1/current.json?key=fd92e4f8f08a4e7e8ac50705230108&q={}&aqi=no'

    weather_data=[]
    for city in cities:
        r=requests.get(url.format(city.name)).json()
        weather={
            'city':city.name,
            'temperature':r['current']['temp_c'],
            'condition': r['current']['condition']['text']
        }
        weather_data.append(weather)

    return render_template('weather.html',mydata=weather_data)

def cleanup_database():
    with app.app_context():
        db.session.query(City).delete()
        db.session.commit()

def setup():
    cleanup_database()

if __name__ == '__main__':
    # Create the application context
    setup()
    with app.app_context():
        # Create the database tables
        db.create_all()
    app.run()
