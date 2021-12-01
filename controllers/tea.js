const { json } = require('express');
const multer = require('multer');
const TeaModel = require('../models/tea');

// multer module will handle the image file
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, './uploads');
    },
    filename: (request, file, cb) => {
        cb(null, file.originalname);
    }
});

const uploadImg = multer({storage: storage}).single('image');

// GET '/tea'
const getAllTeas = (request, response, next) => {
    TeaModel.find({}, (error, data) => {
        if(error){
            return response.json({Error: error});
        }

        return response.json(data);
    });
};

// POST '/tea'
const newTea = (request, response, next) => {
    const comment = request.body?.comment;

    const newComment = {
        text: comment,
        date: new Date()
    };

    TeaModel.findOne({name: request.body.name}, (error, data) => {
        if(!data){
            const newTea= new TeaModel({
                name: request.body.name,
                image: request.file.path,
                description: request.body.description,
                keywords: request.body.keywords,
                origin: request.body.origin,
                brew_time: request.body.brew_time,
                temperature: request.body.temperature,
                comments: [newComment]
            });

            newTea.save((error, data) => {
                if(error) return response.json({message: "Couldn't add the new tea.", reason: error});
                return response.json(data);
            });

        } else {
            if(error) return response.json(`There was an error saving the new tea, please try again. ${error}.`);
            return response.json({message: "Tea already exist"});
        }
    });
};

// DELETE '/tea'
const deleteAllTeas = (request, response, next) => {
    TeaModel.deleteMany({}, error => {
        if(error) return response.json({message: "Complete delete failed", reason: error});

        return response.json({message: "Complete delete successful."});
    });
};

// GET '/tea:name'
const getOneTea = (request, response, next) => {
   const name = request.params?.name.toLowerCase();

   TeaModel.findOne({name: name}, (error, data) => {
    if(error || !data) return response.json({message: "Tea doesn't exist.", reason: error});

    return response.json(data);
   });
};

// POST '/tea:name'
const newComment = (request, response, next) => {
    const name = request.params?.name.toLowerCase();
    const comment = request.body?.comment;

    const newComment = {
        text: comment,
        date: new Date()
    };

    TeaModel.findOne({name: name}, (error, data) => {
        if(error || !data || !comment){
            return response.json({message: "Tea doesn't exist.", reason: error});
        } else {
            data.comments.push(newComment);

            data.save(error => {
                if(error) return response.json({message: "Comment failed to add.", reason: error});

                return response.json(data);
            })
        }
    });
};

// DELETE '/tea:name'
const deleteOneTea = (request, response, next) => {
    const name = request.params?.name.toLowerCase();

    TeaModel.deleteOne({name: name}, (error, data) => {
        if(data.deletedCount === 0) return response.json({message: "Tea doesn't exist", reason: error});

        if(error) return response.json({message: "Something went wrong, please try again.", reason: error});

        return response.json({message: "Tea deleted."});
    });
};

module.exports = {newTea, getAllTeas, deleteAllTeas, getOneTea, newComment, deleteOneTea, uploadImg};