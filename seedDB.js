try {
  for (let i = 0; i < 100; i++) {
    await User.create({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }
} catch (error) {
  // Handle any errors that occur during the execution of the try block
}
