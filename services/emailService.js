const { transporter } = require("../config/mailer");
const { readHTMLFile } = require("../utils/functions");
const userService = require("./userService");
const itemService = require("./itemService");
let handlebars = require("handlebars");

exports.sendRegisterEmail = (user) => {
  readHTMLFile(
    __dirname + "/../utils/emailTemplates/registerConfirmation.html",
    function (err, html) {
      if (err) {
        console.log("error reading file", err);
        return;
      }
      let template = handlebars.compile(html);
      let replacements = {
        userName: user.fullName,
      };
      let htmlToSend = template(replacements);
      let mailOptions = {
        from: '"Broken Office" <brokenoffice2022@gmail.com>',
        to: user.email,
        subject: "Successful registration",
        html: htmlToSend,
      };
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        }
      });
    }
  );
};

exports.sendNewIncidentEmail = async (incident) => {
  const incidentDetails = incident.dataValues;
  const assignedToUser = await userService.getMe(
    incidentDetails.assignedToUserId
  );
  const user = await userService.getMe(incidentDetails.userId);
  let item = "";
  if (incidentDetails.itemId != null) {
    const searchedItem = await itemService.getItem(incidentDetails.itemId);
    item = searchedItem.device;
  } else {
    item = "Unrecognized device";
  }

  readHTMLFile(
    __dirname + "/../utils/emailTemplates/incidentNew.html",
    function (err, html) {
      if (err) {
        console.log("error reading file", err);
        return;
      }
      let template = handlebars.compile(html);
      let replacements = {
        userName: user.fullName,
        incidentId: incidentDetails.id,
        date: incidentDetails.date,
        place: incidentDetails.place,
        subject: incidentDetails.subject,
        details: incidentDetails.details,
        photo: incidentDetails.photo,
        device: item,
        assigned: assignedToUser.fullName,
      };
      let htmlToSend = template(replacements);
      let mailOptions = {
        from: '"Broken Office" <brokenoffice2022@gmail.com>',
        to: user.email,
        subject: "You have reported a new incident",
        html: htmlToSend,
      };
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        }
      });
    }
  );
};

exports.sendIncidentShareEmail = async (incident, email) => {
  const incidentDetails = incident[0].dataValues;
  const assignedToUser = await userService.getMe(
    incidentDetails.assignedToUserId
  );
  const userTicketOwner = await userService.getMe(incidentDetails.userId);
  let item = "";
  if (incidentDetails.itemId != null) {
    const searchedItem = await itemService.getItem(incidentDetails.itemId);
    item = searchedItem.device;
  } else {
    item = "Unrecognized device";
  }
  readHTMLFile(
    __dirname + "/../utils/emailTemplates/incidentShare.html",
    function (err, html) {
      if (err) {
        console.log("error reading file", err);
        return;
      }
      let template = handlebars.compile(html);
      let replacements = {
        userName: userTicketOwner.fullName,
        incidentId: incidentDetails.id,
        date: incidentDetails.date,
        place: incidentDetails.place,
        subject: incidentDetails.subject,
        details: incidentDetails.details,
        photo: incidentDetails.photo,
        device: item,
        assigned: assignedToUser.fullName,
      };
      let htmlToSend = template(replacements);
      let mailOptions = {
        from: '"Broken Office" <brokenoffice2022@gmail.com>',
        to: email,
        cc: userTicketOwner.email,
        subject: "An incident report has been shared with you",
        html: htmlToSend,
      };
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        }
      });
    }
  );
};

exports.checkSendIncidentNewReplyEmail = async (incident, userId) => {
  const requestUser = userId;
  const ownerUser = await userService.getMe(incident.dataValues.userId);
  const assignedUser = await userService.getMe(
    incident.dataValues.assignedToUserId
  );

  if (requestUser === ownerUser.id) {
    this.sendIncidentNewReplyEmail(incident, assignedUser.email);
  } else if (requestUser === assignedUser.id) {
    this.sendIncidentNewReplyEmail(incident, ownerUser.email);
  } else {
    this.sendIncidentNewReplyEmail(
      incident,
      ownerUser.email,
      assignedUser.email
    );
  }
};

exports.sendIncidentNewReplyEmail = async (incident, email, cc) => {
  const incidentDetails = incident.dataValues;
  readHTMLFile(
    __dirname + "/../utils/emailTemplates/incidentNewReply.html",
    function (err, html) {
      if (err) {
        console.log("error reading file", err);
        return;
      }
      let template = handlebars.compile(html);
      let replacements = {
        incidentId: incidentDetails.id,
      };
      let htmlToSend = template(replacements);
      let mailOptions = {
        from: '"Broken Office" <brokenoffice2022@gmail.com>',
        to: email,
        cc: cc,
        subject: "You have received a response in the incident report",
        html: htmlToSend,
      };
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        }
      });
    }
  );
};

exports.sendIncidentAssignedEmail = async (incident) => {
  const incidentDetails = incident.dataValues;
  const assignedToUser = await userService.getMe(
    incidentDetails.assignedToUserId
  );
  const user = await userService.getMe(incidentDetails.userId);
  let item = "";
  if (incidentDetails.itemId != null) {
    const searchedItem = await itemService.getItem(incidentDetails.itemId);
    item = searchedItem.device;
  } else {
    item = "Unrecognized device";
  }

  readHTMLFile(
    __dirname + "/../utils/emailTemplates/incidentAssigned.html",
    function (err, html) {
      if (err) {
        console.log("error reading file", err);
        return;
      }
      let template = handlebars.compile(html);
      let replacements = {
        userName: user.fullName,
        incidentId: incidentDetails.id,
        date: incidentDetails.date,
        place: incidentDetails.place,
        subject: incidentDetails.subject,
        details: incidentDetails.details,
        photo: incidentDetails.photo,
        device: item,
        assigned: assignedToUser.fullName,
      };
      let htmlToSend = template(replacements);
      let mailOptions = {
        from: '"Broken Office" <brokenoffice2022@gmail.com>',
        to: assignedToUser.email,
        subject: "A new incident was assigned to you",
        html: htmlToSend,
      };
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        }
      });
    }
  );
};
