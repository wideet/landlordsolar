
# Landlord Table
class Landlord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=True)
    phone_number = db.Column(db.String(15), unique=True, nullable=True)
    password = db.Column(db.String(64), nullable=False)

    properties = db.relationship('Property', backref='Landlord', lazy=True)

    def __init__(self, name, password, email=None, phone_number=None):
        self.name = name
        self.password = password
        self.email = email
        self.phone_number = phone_number

    def __repr__(self):
        return "Landlord {}, Email: {}".format(self.name, self.email)


# Property Table
class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(50))
    state = db.Column(db.String(50))
    address = db.Column(db.String(100), nullable=False)
    zip_code = db.Column(db.Integer)
    utility_provider = db.Column(db.String(50))
    solar_provider = db.Column(db.String(50))
    loan_amount = db.Column(db.Float)

    landlord_id = db.Column(db.Integer, db.ForeignKey('landlord.id'), nullable=False)

    def __repr__(self):
        return "Property at address: {}, owned by {}"\
            .format(self.address, Landlord.query.filter_by(id=self.landlord_id).first().name)


# Records Table
class Record(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    consumption_kwh = db.Column(db.Float)
    consumption_cost = db.Column(db.Float)
    production_kwh = db.Column(db.Float)
    production_cost = db.Column(db.Float)

    property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=False)

