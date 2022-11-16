const { Incident, User, Item } = require("../models/");

//SIN TERMINAR!

exports.getIncident = async (id) => {
  const incident = await Incident.findByPk(id);
  return incident;
};

exports.createIncident = async (incident, userId) => {
    const user = await  User.findOne({where: {id:userId}})
    const newIncident = await Incident.create(incident, {userId:user.id});
    return newIncident;
  };

exports.editIncident = (id, body) => {
  return Incident.findByPk(id).then((incident) => incident.update(body));
};

exports.getAllIncidents = async (id, role) => {
  let query = null;
  role ==='isUser'
  ? (query={
    where: { userId: id },
    include: [Item],
  })
  : (query={
    include: [{ item: Item }, {user: User}],
  })

  const incidents = await Incident.findAll(query);
  return incidents;
};





  