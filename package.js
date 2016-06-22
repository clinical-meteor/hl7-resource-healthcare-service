Package.describe({
  name: 'clinical:hl7-resource-healthcare-service',
  version: '1.1.0',
  summary: 'HL7 FHIR Resource - HealthcareService',
  git: 'https://github.com/clinical-meteor/hl7-resource-healthcare-service',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use('meteor-platform');
  api.use('mongo');
  api.use('aldeed:simple-schema@1.3.3');
  api.use('aldeed:collection2@2.3.3');
  api.use('simple:json-routes@2.1.0');
  api.use('prime8consulting:meteor-oauth2-server@0.0.2');

  api.use('clinical:base-model@1.3.5');
  api.use('clinical:hl7-resource-datatypes@0.4.4');
  api.use('clinical:hl7-resource-organization@1.1.0');
  api.use('clinical:hl7-resource-location@1.1.0');

  api.addFiles('lib/hl7-resource-healthcare-service.js', ['client', 'server']);
  api.addFiles('server/rest.js', 'server');
  api.addFiles('server/initialize.js', 'server');

  api.export('HealthcareService');
  api.export('HealthcareServices');
  api.export('HealthcareServiceSchema');
});
