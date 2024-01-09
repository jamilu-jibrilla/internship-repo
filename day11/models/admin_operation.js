/*Powered By: Manaknightdigital Inc. https://manaknightdigital.com/ Year: 2021*/
/**
 * admin_operation Model
 * @copyright 2021 Manaknightdigital Inc.
 * @link https://manaknightdigital.com
 * @license Proprietary Software licensing
 * @author Ryan Wong
 *
 */

const moment = require("moment");
;
const { Op } = require("sequelize");
const { intersection } = require('lodash');
const coreModel = require('./../core/models');

module.exports = (sequelize, DataTypes) => {
  const Admin_operation = sequelize.define(
    "admin_operation",
    {
      user_id: DataTypes.INTEGER,
      action: DataTypes.STRING,
      detail: DataTypes.TEXT,
      last_ip: { type: DataTypes.STRING, validate: {} },
      user_agent: { type: DataTypes.STRING, validate: {} },
      status: DataTypes.INTEGER,
      created_at: DataTypes.DATEONLY,
      updated_at: DataTypes.DATE,
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "admin_operation",
    },
    {
      underscoredAll: false,
      underscored: false,
    }
  );

  coreModel.call(this, Admin_operation);

  Admin_operation._preCreateProcessing = function (data) {
    data.status = 1;
    return data;
  };
  Admin_operation._postCreateProcessing = function (data) {

    return data;
  };
  Admin_operation._customCountingConditions = function (data) {

    return data;
  };

  Admin_operation._filterAllowKeys = function (data) {
    let cleanData = {};
    let allowedFields = Admin_operation.allowFields();
    allowedFields.push(Admin_operation._primaryKey());

    for (const key in data) {
      if (allowedFields.includes(key)) {
        cleanData[key] = data[key];
      }
    }
    return cleanData;
  };

  Admin_operation.timeDefaultMapping = function () {
    let results = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j++) {
        let hour = i < 10 ? "0".i : i;
        let min = j < 10 ? "0".j : j;
        results[i * 60 + j] = `${hour}:${min}`;
      }
    }
    return results;
  };

  Admin_operation.associate = function (models) {
    Admin_operation.belongsTo(models.user, {
      foreignKey: "user_id",
      as: "user",
      constraints: false,
    })
  };


  Admin_operation.status_mapping = function (status) {
    const mapping = { "0": "Inactive", "1": "Active" }

    if (arguments.length === 0) return mapping;
    else return mapping[status];
  };


  Admin_operation.allowFields = function () {
    return ['user_id', 'action', 'detail', 'last_ip', 'user_agent', 'status',];
  };

  Admin_operation.labels = function () {
    return ['User', 'Action', 'Detail', 'Last IP', 'User Agent', 'Status',];
  };

  Admin_operation.validationRules = function () {
    return [
      ['user_id', 'User', 'required|integer'],
      ['action', 'Action', 'required|max[50]'],
      ['detail', 'Detail', 'required'],
      ['last_ip', 'Last IP', 'required'],
      ['user_agent', 'User Agent', 'required'],
      ['status', 'Status', 'required|integer'],
    ];
  };

  Admin_operation.validationEditRules = function () {
    return [
      ['user_id', 'User', ''],
      ['action', 'Action', ''],
      ['detail', 'Detail', ''],
      ['last_ip', 'Last IP', ''],
      ['user_agent', 'User Agent', ''],
      ['status', 'Status', 'required|integer'],
    ];
  };



  Admin_operation.get_user_paginated = function (db, ...rest) {
    return Admin_operation.getPaginated(...rest, [{
      model: db.user,
      as: "user"
    }])
  }


  Admin_operation.get_admin_operation_user = (id, db) => {
    return Admin_operation.findByPk(id, { include: [{ model: db.user, as: "user" }] });
  };

  // ex
  Admin_operation.intersection = function (fields) {
    if (fields) {
      return intersection(
        [
          'user_id', 'action', 'detail', 'last_ip', 'user_agent', 'status', 'created_at', 'updated_at',
        ],
        Object.keys(fields),
      );
    } else return [];
  };


  return Admin_operation;
};
