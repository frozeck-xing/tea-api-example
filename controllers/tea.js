// GET '/tea'
const getAllTeas = (request, response, next) => {
    response.json({message: "GET all teas"});
};

// POST '/tea'
const newTea = (request, response, next) => {
    response.json({message: "POST new tea"});
};

// DELETE '/tea'
const deleteAllTeas = (request, response, next) => {
    response.json({message: "DELETE all teas"});
};

// GET '/tea:name'
const getOneTea = (request, response, next) => {
    response.json({message: "GET 1 tea"});
};

// POST '/tea:name'
const newComment = (request, response, next) => {
    response.json({message: "POST a new comment on the tea"});
};

// DELETE '/tea:name'
const deleteOneTea = (request, response, next) => {
    response.json({message: "DELETE this one tea"});
};

module.exports = {newTea, getAllTeas, deleteAllTeas, getOneTea, newComment, deleteOneTea};