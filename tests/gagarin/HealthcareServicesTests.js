describe('clinical:hl7-resources-healthcare-service', function () {
  var server = meteor();
  var client = browser(server);

  it('HealthcareServices should exist on the client', function () {
    return client.execute(function () {
      expect(HealthcareServices).to.exist;
    });
  });

  it('HealthcareServices should exist on the server', function () {
    return server.execute(function () {
      expect(HealthcareServices).to.exist;
    });
  });

});
