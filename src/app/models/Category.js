import Sequelize, { Model } from 'sequelize'

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `dev-club-burger-production-10b4.up.railway.app${this.path}`
          },
        },
      },
      {
        sequelize,
      },
    )
    return this
  }
}
export default Category
