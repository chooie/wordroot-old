// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt
// for details.
(function() {
	"use strict";

  var assert = require("../shared/assert.js");
	var example = require("./example.js");
	var constants = require("./constants.js");

	//mocha.setup({ignoreLeaks: true});

	describe("Text field validator", function() {

		var field;

		beforeEach(function() {
			field = document.createElement("input");
			field.setAttribute("type", "text");
		});

		it("applies 'required' CSS class when field is empty", function() {
			example.validateTextField(field);

			assert.equal(cssClass(),constants.REQUIRED_FIELD_CLASS);
		});

		it("removes 'required' CSS class when field is not empty", function() {
			field.setAttribute("class", constants.REQUIRED_FIELD_CLASS);
			field.value = "not empty";

			example.validateTextField(field);

			assert.equal(cssClass(), null);
		});

		// TODO: should preserve existing CSS classes

		function cssClass() {
			return field.getAttribute("class");
		}

	});
}());
