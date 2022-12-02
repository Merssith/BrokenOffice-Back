var dd_options = {
  response_code: true,
  method: true,
  base_url: true,
  tags: ["app:broken_office"],
};

var connect_datadog = require("connect-datadog")(dd_options);

module.exports = { connect_datadog };
