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

    },
    updateItem(parent, args, ctx, info) {
        //  take a copy of the updates
        const updates = {...args};
        // remove id from updatesr
        delete updates.id;
        // update method
        // db exposes prisma db
        // refer to prisma.graphql file again for available methods
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
            },
        }, 
        info);

    },

    async deleteItem(parent, args, ctx, info) {
        const where = {id: args.id};
        // 1. find items
        const item = await ctx.db.query.item({where},`{ id title}` );
        // 2. check if they own that item or have permission
        // TODO
        // 3. delete
        return ctx.db.mutation.deleteItem({where}, info);


    },
};

module.exports = Mutations;

