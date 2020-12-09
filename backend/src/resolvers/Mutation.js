const Mutations = {
    // has to be an async method because of the promise inside?
    // awaits creation first?
    async createItem(parent, args, ctx, info){
        // TODO : check if they are lofggged in

        const item = await ctx.db.mutation.createItem({
            data : {
                // erquivalent to unpacking like in python
                ...args 
            }
        },
         info);

        return item;

    }
    // createDog(parent, args, ctx, info){
    //     // create a dog
    //     global.dogs = global.dogs || [];
    //     const newDog = {name: args.name};
    //     global.dogs.push(newDog);
    //     return newDog;
    //     // console.log(args);
    // },
};

module.exports = Mutations;

