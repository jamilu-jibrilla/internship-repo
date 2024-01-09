module.exports = (sequelize, DataTypes) => {
        const location = sequelize.define(
          "user",
          {
            id:  { type: integer, label: 'ID', validation: 'required' },
name:  { type: string, label: 'Name', validation: 'required' },
email:  { type: string, label: 'Email', validation: 'required' },
status:  { type: integer, label: 'Status', validation: 'required' },

          },
        );

        return user;
      }