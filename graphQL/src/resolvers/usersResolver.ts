const _db: any = {
  users: [
    {
      id: 1,
      name: "John Doe"
    }
  ],
  posts: [
    {
      userId: 1,
      text: "Hello World! This is my first post."
    }
  ]
}

const userHandler = {
  getUser(id: number): any {
    for (let i = 0; i < _db.users.length; i++) {
      if (_db.users[i].id === id) {
        return _db.users[i];
      }
    }
  },
  getPosts(id: number) {
    return {
      name: 'mirriam' + id
    }
  }
}

export default userHandler;
