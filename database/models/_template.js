const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  return [
    sequelize.define('user', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'This is comment!!'
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        // validate는 고유 제약조건이 아니다
        validate: {
          isEmail: true,
          // custom validate
          isOne(value) {
            if (parseInt(value) !== 1) throw new Error('Custom validate error!!');
          }
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING
      },
      testTime: {
        type: DataTypes.DATETIME,
        defaultValue: DataTypes.NOW
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      },
    }, {
      // 테이블 이름 직접 적용
      // tableName: 'Employees'
      // 모델 이름과 같도록 설정하는 옵션
      // freezeTableName: true
      // createdAt, updatedAt 생성 옵션
      // timestamps: false
      // timestamps 부분 적용
      // timestamps: true,
      // createdAt: false,
      // updatedAt: 'updateTimestamp'
    }),
    () => {
      const { user, movie } = sequelize.models;
      user.belongsToMany(movie, { through: 'UsersMovies' });
    }
  ];
};

// sequelize.models의 속성으로 정의된 테이블 정보가 들어감
// 예시) sequelize.define('user', attrs, opts) -> sequelize.models.user