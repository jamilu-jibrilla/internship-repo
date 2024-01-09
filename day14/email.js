module.exports = (sequelize, DataTypes) => {
        const location = sequelize.define(
          "email",
          {
            id:  { type: integer, label: 'ID', validation: 'required' },
email:  { type: string, label: 'Email', validation: 'required' },
status:  { type: integer, label: 'Status', validation: 'required' },

          },
        );

        return email;
      }