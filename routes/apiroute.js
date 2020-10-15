const db = require("../models");

module.exports = app => {
    let aggregate;

    app.post("/api/workouts", ({body}, res) => {

        aggregate=0;
        db.Workout.create({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(({message}) => {
            console.log(message);
        })
    })

    app.get("/api/workouts", (req,res) => {
        db.Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout)
            })
    })

    app.get("/api/workouts/range", (req,res) =>{
        db.Workout.find({})
        .then(data => {
            res.json(data)
        })
    })

    app.put("/api/workouts/:id", (req,res) => {
        let id=req.params.id;
        let data= req.body;

        aggregate += data.duration;

        db.Workout.findOneAndUpdate({_id: id}, {
            $push: {exercises: data},
            totalDuration: aggregate
        }, {new: true}
        ).then(dbUpdate => {
            res.send(dbUpdate);
        })
    })
}