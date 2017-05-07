import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';


var Sectors = new GraphQLObjectType({
  name: 'sectors',
  description: 'list of all the sectors',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve (sectors) {
          return sectors.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve (sectors) {
          return sectors.name;
        }
      }
    };
  }
});

var Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      sectors: {
        type: new GraphQLList(Sectors),
        args: {
          id: {
            type: GraphQLInt
          },
          name: {
            type: GraphQLString
          }
        },
        resolve (root, args) {
          return Db.models.sectors.findAll({ where: args })
        }
      }
    };
  }
})

var Schema = new GraphQLSchema({query: Query})
exports default Schema