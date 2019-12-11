import userHandler from './usersResolver';

const rootResolver: any = {
  user: (args: any) => {
    const userId: number = args.id;
    const user: any = userHandler.getUser(userId);
    console.log(userHandler.getUser(userId));
    const posts: any = userHandler.getPosts(userId);
    return {
      name: user.name,
      posts
    };
  }
};

export default rootResolver;
