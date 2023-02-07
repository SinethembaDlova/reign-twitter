const fs = require('fs').promises
const path = require('path')

module.exports = async () => {
  // Fetched and read the users file and stored the followers in the followers object
  try {
    const followers = {}

    const data = await fs.readFile(
      path.join(__dirname, '/src/assets/', 'user.txt'),
      'utf8'
    )
    const lines = data.split('\n')
    lines.forEach((line) => {
      const [user, followedUsers] = line.split(' follows ')
      if (!followers[user]) {
        return (followers[user] = new Set())
      }
      return followedUsers
        .split(',')
        .map((username) => username.trim())
        .forEach((username) => followers[user].add(username))
    })
  } catch (error) {
    console.error(error)
  }
}
