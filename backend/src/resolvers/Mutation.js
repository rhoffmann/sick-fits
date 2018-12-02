const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: check if user is logged in

    const item = await ctx.db.mutation.createItem({
      data: { ...args.data }
    }, info);

    console.log(item);

    return item;
  },
  async updateItem(parent, args, ctx, info) {
    // take a copy of the updates
    console.log('updateItem', args);
    const updates = { ...args.data };

    // remove id from updates
    delete updates.id;
    // run update method
    return ctx.db.mutation.updateItem({
      data: updates,
      where: {
        id: args.data.id
      }
    }, info);
  }
};

module.exports = Mutations;
