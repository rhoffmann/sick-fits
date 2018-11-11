const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: check if user is logged in

    const item = await ctx.db.mutation.createItem({
      data: { ...args.data }
    }, info);

    console.log(item);

    return item;
  }
};

module.exports = Mutations;
