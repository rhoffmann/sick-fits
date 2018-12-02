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
  },
  async deleteItem(parent, args, ctx, info) {
    console.log('deleting item', args);
    const where = { id: args.id };

    // 1. find item
    const item = await ctx.db.query.item({ where }, `{id, title}`);

    // 2. check for owner and permission
    // TODO

    // 3. delete
    return ctx.db.mutation.deleteItem({ where }, info);
  }
};

module.exports = Mutations;
