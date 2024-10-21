const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

 //Movie <==> Actor//
 Movie.belongsToMany(Actor,{through:'movieActor'})
 Actor.belongsToMany(Movie,{through:'movieActor'})

 //Movie <==> Director//
 Movie.belongsToMany(Director,{through:'movieDirector'})
 Director.belongsToMany(Movie,{through:'movieDirector'})
 
 //Movie <==> Genre//
 Movie.belongsToMany(Genre,{through:'movieGenre'})
 Genre.belongsToMany(Movie,{through:'movieGenre'})