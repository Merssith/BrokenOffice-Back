const TeachableMachine = require("@sashido/teachablemachine-node");
require("dotenv").config();

const model = new TeachableMachine({
  modelUrl: process.env.MODEL_URL_TEACHABLE_MACHINE,
});

module.exports = { model };
