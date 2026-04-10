const { randomUUID } = require('crypto');

const users = [];
const grievances = [];

const addUser = ({ name, number, password, role = 'citizen' }) => {
  const user = {
    _id: randomUUID(),
    name,
    number,
    password,
    role,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
};

const findUserByNumber = (number) => users.find((user) => user.number === number);
const findUserById = (id) => users.find((user) => user._id === id);

const addGrievance = ({ user, title, description, category, address }) => {
  const grievance = {
    _id: randomUUID(),
    user,
    title,
    description,
    category,
    status: 'Pending',
    address,
    createdAt: new Date().toISOString(),
  };
  grievances.push(grievance);
  return grievance;
};

const getGrievancesByUserId = (userId) => grievances.filter((g) => g.user === userId);
const getAllGrievances = () => grievances;
const findGrievanceById = (id) => grievances.find((g) => g._id === id);

module.exports = {
  addUser,
  findUserByNumber,
  findUserById,
  addGrievance,
  getGrievancesByUserId,
  getAllGrievances,
  findGrievanceById,
};
