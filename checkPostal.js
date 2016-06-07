QUnit.module("checkPostal", {
  beforeEach: function() {
    // Should always 'spy' on the window.alert to check if expected alert was fired
    this.alertSpy = sinon.spy(window, 'alert');

    // Set up a test DOM
    var page = document.createElement("div");
    var passInput = document.createElement("input");
    passInput.id = "txtpostalcode";
    passInput.type = "text";
	
	document.body.appendChild(page);
    page.appendChild(passInput);


  },
  afterEach: function() {
    // Remove the 'spy' so that it can be reset for the next test
    this.alertSpy.restore();
  }
});

QUnit.test('passes if correct postal code', function(assert) {
    $("#txtpostalcode").val("b3h 3c3");
   
    checkPostal();
    assert.equal(this.alertSpy.callCount, 0);
});

QUnit.test('fails postal code for format', function(assert) {
    $("#txtpostalcode").val("123 445");

    checkPostal();
    assert.notOk(this.alertSpy.calledOnce);
    assert.notOk(this.alertSpy.calledWith("Postal code wrong format"));
});
QUnit.test('fails postal code for length', function(assert) {
    $("#txtpostalcode").val("b3h 3a1a");

    checkPostal();
    assert.notOk(this.alertSpy.calledOnce);
    assert.notOk(this.alertSpy.calledWith("Postal code wrong length"));
});