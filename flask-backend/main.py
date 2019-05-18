from flask import Flask, request, jsonify, render_template
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
import pandas as pd
from datetime import *
import os
import json


# INIT APP
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

# DB
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# INIT DB
db = SQLAlchemy(app)

# INIT MARSHMALLOW
marsh = Marshmallow(app)


# Landlord Table
class Landlord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=True)
    phone_number = db.Column(db.String(15), unique=True, nullable=True)
    password = db.Column(db.String(64), nullable=False)

    properties = db.relationship('Property', backref='Landlord', lazy=True)
    records = db.relationship('Record', backref='Landlord', lazy=True)


# Landlord Schema
class LanlordSchema(marsh.Schema):
    class Meta:
        fields = ('id', 'name', 'email', 'phone_number', 'password')


landlord_schema = LanlordSchema(strict=False)
landlords_schema = LanlordSchema(many=True, strict=False)


# Property Table
class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(50))
    state = db.Column(db.String(50))
    address = db.Column(db.String(100), nullable=False)
    zip_code = db.Column(db.Integer)
    utility_provider = db.Column(db.String(50))
    solar_provider = db.Column(db.String(50))
    monthly_loan_amount = db.Column(db.Float)

    landlord_id = db.Column(db.Integer, db.ForeignKey('landlord.id'), nullable=False)

    records = db.relationship('Record', backref='Property', lazy=True)


# Property Schema
class PropertySchema(marsh.Schema):
    class Meta:
        fields = ('id', 'landlord_id', 'city', 'state', 'address', 'zip_code', 'utility_provider',
                  'solar_provider', 'monthly_loan_amount')


property_schema = PropertySchema(strict=False)
properties_schema = PropertySchema(many=True, strict=False)


# Records Table
class Record(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    consumption_kwh = db.Column(db.Float)
    consumption_cost = db.Column(db.Float)
    production_kwh = db.Column(db.Float)
    production_cost = db.Column(db.Float)

    property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=False)
    landlord_id = db.Column(db.Integer, db.ForeignKey('landlord.id'), nullable=False)


# Records Schema
class RecordSchema(marsh.Schema):
    class Meta:
        fields = ('id', 'landlord_id', 'property_id', 'date', 'consumption_kwh', 'production_kwh', 'consumption_cost',
                  'production_cost')


record_schema = RecordSchema(strict=True)
records_schema = RecordSchema(many=True, strict=True)

# Full Dataset Schema
class FullDataSchema(marsh.Schema):
    class Meta:
        fields = ('Landlord', 'Address', 'Date', 'consumption_kwh', 'production_kwh', 'consumption_cost',
                  'production_cost')


full_data_schema = FullDataSchema(strict=True)
full_datas_schema = FullDataSchema(many=True, strict=True)


def create_data(db, data_path):
    if os.path.exists('db.sqlite'):
        os.remove('db.sqlite')
    db.create_all()

    landlord_json_path = os.path.join(data_path, 'landlord.json')
    property_json_path = os.path.join(data_path, 'property.json')
    records_data = pd.read_excel(os.path.join(data_path, 'records_data.xlsx'))

    with open(landlord_json_path) as fp:
        landlord_dict = json.load(fp)

    for landlord_entry in landlord_dict['landlords_list']:
        id = landlord_entry['id']
        name = landlord_entry['name']
        email = landlord_entry['email']
        phone_number = landlord_entry['phone_number']
        password = landlord_entry['password']

        new_landlord = Landlord(name=name, email=email,
                                phone_number=phone_number, password=password)
        db.session.add(new_landlord)
        db.session.commit()

    with open(property_json_path) as fp:
        property_dict = json.load(fp)

    for property_entry in property_dict['properties_list']:
        id = property_entry['id']
        city = property_entry['city']
        state = property_entry['state']
        address = property_entry['address']
        zip_code = property_entry['zip_code']
        utility_provider = property_entry['utility_provider']
        solar_provider = property_entry['solar_provider']
        monthly_loan_amount = property_entry['monthly_loan_amount']
        landlord_id = property_entry['landlord_id']

        new_property = Property(id = property_entry['id'],
                                city = property_entry['city'],
                                state = property_entry['state'],
                                address = property_entry['address'],
                                zip_code = property_entry['zip_code'],
                                utility_provider = property_entry['utility_provider'],
                                solar_provider = property_entry['solar_provider'],
                                monthly_loan_amount = property_entry['monthly_loan_amount'],
                                landlord_id = property_entry['landlord_id']
                                )
        db.session.add(new_property)
        db.session.commit()

    for ind, row in records_data.iterrows():
        new_record = Record(date=row['Month'],
                            consumption_kwh=row['kWh_cons'],
                            consumption_cost=row['USD_cons'],
                            production_kwh=row['kWh_prod'],
                            production_cost=row['USD_prod'],
                            property_id=row['PropertyID'],
                            landlord_id=Property.query.get(row['PropertyID']).landlord_id
                            )
        db.session.add(new_record)
        db.session.commit()


# Create a Landlord
@app.route('/Landlord', methods=['GET'])
def get_landlords():
    return landlords_schema.jsonify(Landlord.query.all())


@app.route('/Landlord/<id>', methods=['GET'])
def get_landlord(id):
    return landlords_schema.jsonify(Landlord.query.filter_by(id=id))


@app.route('/Landlord/<id>/Properties', methods=['GET'])
def get_landlord_properties(id):
    return properties_schema.jsonify(Property.query.filter_by(landlord_id=id))


@app.route('/Landlord/<landlord_id>/Properties/<property_id>', methods=['GET'])
def get_landlord_property(landlord_id, property_id):
    return properties_schema.jsonify(Property.query.filter_by(landlord_id=landlord_id,
                                                              id=property_id))


@app.route('/Landlord/<landlord_id>/Properties/<property_id>/records', methods=['GET'])
def get_property_records(landlord_id, property_id):
    return records_schema.jsonify(Record.query.filter_by(property_id=property_id))


@app.route('/api/dashboard_data', methods=['GET'])
def get_full_schema():
    q = (db.session.query(Record, Property, Landlord)
         .filter(Record.landlord_id == Landlord.id)
         .filter(Record.property_id == Property.id)
         .all())
    res_ls = [
        {
            'Landlord': x[2].name,
            'Address': x[1].address,
            'Date': x[0].date,
            'consumption_kwh': x[0].consumption_kwh,
            'production_kwh': x[0].production_kwh,
            'consumption_cost': x[0].consumption_cost,
            'production_cost': x[0].production_cost
        } for x in q
    ]

    return full_datas_schema.jsonify(res_ls)


@app.route("/")
def my_index():
    return render_template("index.html")


if __name__ == '__main__':
    create_data(db, 'data_files')
    app.run(debug=True)
