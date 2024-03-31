"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramNodes = void 0;
var sequelize_1 = require("sequelize");
var core_1 = require("@/core");
var types_1 = require("../types");
var program_model_1 = require("@/programs/models/program.model");
var ProgramNodes = /** @class */ (function (_super) {
    __extends(ProgramNodes, _super);
    function ProgramNodes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ProgramNodes;
}(sequelize_1.Model));
exports.ProgramNodes = ProgramNodes;
ProgramNodes.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
    },
    programId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: program_model_1.Program,
            key: "id",
        },
    },
    category: {
        type: sequelize_1.DataTypes.ENUM("profile", "certificate"),
        defaultValue: "profile",
    },
    type: {
        type: sequelize_1.DataTypes.ENUM("image", "text"),
        allowNull: false,
    },
    x: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    y: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    overlay: {
        type: sequelize_1.DataTypes.STRING,
    },
    width: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    height: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    gravity: {
        type: sequelize_1.DataTypes.STRING,
    },
    radius: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    crop: {
        type: sequelize_1.DataTypes.STRING,
    },
    text: {
        type: sequelize_1.DataTypes.STRING,
    },
    font_family: {
        type: sequelize_1.DataTypes.STRING,
    },
    font_size: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    font_weight: {
        type: sequelize_1.DataTypes.STRING,
    },
    color: {
        type: sequelize_1.DataTypes.STRING,
    },
    placeholder: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    entity: {
        type: sequelize_1.DataTypes.ENUM.apply(sequelize_1.DataTypes, types_1.placeholderTextNodeEntity),
    },
    entity_key: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    scopes: {
        imageNodes: {
            attributes: {
                exclude: ["text", "font_family", "font_size", "font_weight", "placeholder", "value"],
            },
        },
        textNodes: {
            attributes: {
                exclude: ["width", "height", "gravity", "radius", "crop", "overlay"],
            },
        },
    },
    modelName: "program_nodes",
    tableName: "program_nodes",
    sequelize: core_1.sequelize,
    timestamps: true,
    freezeTableName: true,
});
