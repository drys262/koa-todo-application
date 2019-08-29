const getData = (Model) => (args) => Model.findOne(args);

const getAllData = (Model) => async () => Model.find();

const create = (Model) => async (data) => Model.create(data);

export default (Model) => ({
  getData: getData(Model),
  getAllData: getAllData(Model),
  create: create(Model),
});
