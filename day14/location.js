module.exports = (sequelize, DataTypes) => {
        const location = sequelize.define(
          "location",
          {
            id:  { type: integer, label: 'ID', validation: 'required' },
name:  { type: string, label: 'Name', validation: 'required' },
status:  { type: integer, label: 'Status', validation: 'required' },

          },
        );

        return location;
      }