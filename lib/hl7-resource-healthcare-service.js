
// create the object using our BaseModel
HealthcareService = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
HealthcareService.prototype._collection = HealthcareServices;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
HealthcareServices = new Mongo.Collection('HealthcareServices');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
HealthcareServices._transform = function (document) {
  return new HealthcareService(document);
};


if (Meteor.isClient){
  Meteor.subscribe("HealthcareServices");
}

if (Meteor.isServer){
  Meteor.publish("HealthcareServices", function (argument){
    if (this.userId) {
      return HealthcareServices.find();
    } else {
      return [];
    }
  });
}


HealthcareServiceSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "HealthcareService"
  }
});
HealthcareServices.attachSchema(HealthcareServiceSchema);
