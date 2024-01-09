module.exports = (sequelize, DataTypes) => {
        const location = sequelize.define(
          "sms",
          {
            id:  { type: integer, label: 'ID', validation: 'required' },
phone:  { type: string, label: 'Phone', validation: 'required' },
status:  { type: integer, label: 'Status', validation: 'required' },

          },
        );

        return sms;
      }