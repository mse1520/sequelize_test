const config = {
  username: 'postgres',
  password: '1234',
  database: 'sequelize_test',
  host: 'localhost',
  dialect: 'postgres'
};
const Sequelize = require('sequelize').Sequelize.useCLS(require('cls-hooked').createNamespace('transaction'));
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const User = require('./models/User')(sequelize);
const Movie = require('./models/Movie')(sequelize);

User.associate();
Movie.associate();

module.exports = { User, Movie, sequelize };

// 모델(테이블) 동기화
// await sequelize.sync() ->
// 존재하지 않는 경우 테이블을 생성합니다(이미 존재하는 경우 아무 작업도 수행하지 않음).
// await sequelize.sync({ force: true }) ->
// 이것은 테이블을 생성하고 이미 존재하는 경우 먼저 삭제합니다.
// await sequelize.sync({ alter: true }) ->
// 데이터베이스에 있는 테이블의 현재 상태(열이 있는 열, 데이터 유형이 무엇인지 등)를 확인한 다음 테이블에서 필요한 변경을 수행하여 모델과 일치하도록 합니다.
// await sequelize.models.user.sync() ->
// 특정 모델만 동기화 가능

// 모델(테이블) 삭제
// await sequelize.drop();