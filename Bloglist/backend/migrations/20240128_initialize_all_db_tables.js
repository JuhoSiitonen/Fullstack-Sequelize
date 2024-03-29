const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password_hash: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            }
        })

        await queryInterface.createTable('blogs', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            author: DataTypes.STRING,
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            likes: DataTypes.INTEGER,
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        }) 
        await queryInterface.createTable('comments', {
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        })
        await queryInterface.addColumn('blogs', 'user_id', {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
        })
        await queryInterface.addColumn('comments', 'blog_id', {
            type: DataTypes.INTEGER,
            references: {
                model: 'blogs',
                key: 'id',
            },
        })    
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('Users')
        await queryInterface.dropTable('Blogs')
        await queryInterface.dropTable('Comments')
    }
}
