
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
  },


  "identifier" : {
    optional: true,
    type: [ IdentifierSchema ]
  }, // External identifiers for this item
  "providedBy" : {
    optional: true,
    type: [ OrganizationSchema ]
  }, // Organization that provides this service
  "serviceCategory" : {
    optional: true,
    type: CodeableConceptSchema
  }, // Broad category of service being performed or delivered
  "serviceType.$.type" : {
    optional: true,
    type: CodeableConceptSchema
  }, // R!  Type of service delivered or performed
  "serviceType.$.specialty" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  }, // Specialties handled by the Service Site
  "location" : {
    optional: true,
    type: LocationSchema
  }, // R!  Location where service may be provided
  "serviceName" : {
    optional: true,
    type: String
  }, // Description of service as presented to a consumer while searching
  "comment" : {
    optional: true,
    type: String
  }, // Additional description and/or any specific issues not covered elsewhere
  "extraDetails" : {
    optional: true,
    type: String
  }, // Extra details about the service that can't be placed in the other fields
  "photo" : {
    optional: true,
    type: AttachmentSchema
  }, // Facilitates quick identification of the service
  "telecom" : {
    optional: true,
    type: ContactPointSchema
  }, // Contacts related to the healthcare service
  "coverageArea" : {
    optional: true,
    type: [ LocationSchema ]
  }, // Location(s) service is inteded for/available to
  "serviceProvisionCode" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  }, // Conditions under which service is available/offered
  "eligibility" : {
    optional: true,
    type: CodeableConceptSchema
  }, // Specific eligibility requirements required to use the service
  "eligibilityNote" : {
    optional: true,
    type: String
  }, // Describes the eligibility conditions for the service
  "programName" : {
    optional: true,
    type: [ String ]
  }, // Program Names that categorize the service
  "characteristic" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  }, // Collection of characteristics (attributes)
  "referralMethod" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  }, // Ways that the service accepts referrals
  "publicKey" : {
    optional: true,
    type: String
  }, // PKI Public keys to support secure communications
  "appointmentRequired" : {
    optional: true,
    type: Boolean
  }, // If an appointment is required for access to this service
  "availableTime.$.daysOfWeek" : {
    optional: true,
    type: [ Code ]
  }, // mon | tue | wed | thu | fri | sat | sun
  "availableTime.$.allDay" : {
    optional: true,
    type: Boolean
  }, // Always available? e.g. 24 hour service
  "availableTime.$.availableStartTime" : {
    optional: true,
    type: Date
  }, // Opening time of day (ignored if allDay = true)
  "availableTime.$.availableEndTime" : {
    optional: true,
    type: Date
  }, // Closing time of day (ignored if allDay = true)
  "notAvailable.$.description" : {
    optional: true,
    type: String
  }, // R!  Reason presented to the user explaining why time not available
  "notAvailable.$.during" : {
    optional: true,
    type: PeriodSchema
  }, // Service not availablefrom this date
  "availabilityExceptions" : {
    optional: true,
    type: String
  } // Description of availability exceptions
});
HealthcareServices.attachSchema(HealthcareServiceSchema);
