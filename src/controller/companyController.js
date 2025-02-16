import { CompanyModel } from "../model/company.model.js";
import { setPagination } from "../utils/common.js";
import { company } from "../utils/resMessage.js";
import { COMPANY_STATUS } from "../utils/constant.js";
import mongoose from "mongoose";
import xl  from "excel4node";
const wb = new xl.Workbook();
const ws = wb.addWorksheet("just-test");

export const getCategoryIdList = async (req, res) => {
  // #swagger.tags = ['Company']

  try {
    const categoriesList = await CompanyModel.aggregate([
      {
        $group: {
          _id: "$categoriesId",
          category: {
            $first: "$categoriesIds",
          },
          count: {
            $sum: 1,
          },
          successCount: {
            $sum: {
              $cond: [
                {
                $eq: ["$isError", true],
                },
                1,
                0,
              ],
            }, // Count where fieldN is true
          },
          failureCount: {
            $sum: {
              $cond: [
                {
                $eq: ["$isError", false],
                },
                1,
                0,
              ],
            },
          },
          noFieldCount: {
            $sum: {
              $cond: [
                {
                $not: ["$isError"],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: "sitemaps",
          localField: "category",
          foreignField: "_id",
          pipeline: [
            {
            $project: {
              __v: 0,
              href: 0,
              _id: 0,
            },
            },
          ],
          as: "category",
        },
      },
      {
        $set: {
          category: {
            $first: "$category.category",
          },
          subcategory: {
            $first: "$category.subcategory",
          },
          priority: {
            $first: "$category.priority",
          },
        },
      },
      {
        $sort:
        /**
         * Provide any number of field/order pairs.
         */
        {
          priority: 1,
        },
      },
      {
        $project:
        /**
         * specifications: The fields to
         *   include or exclude.
         */
        {
          priority: 0,
        },
      },
    ]);
    return res.status(200).json({
      message: company.fetchCompanyCategoryList,
      data: categoriesList,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getCategoriesList = async (req, res) => {
  // #swagger.tags = ['Company']

  try {
    const categoriesList = await CompanyModel.aggregate([
      {
        $unwind: {
          path: "$categoriesIds",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$categoriesIds",
          category: {
            $first: "$categoriesIds",
          },
          count: {
            $sum: 1,
          },
          successCount: {
            $sum: {
              $cond: [
                {
                $eq: ["$isError", true],
                },
                1,
                0,
              ],
            },
          },
          failureCount: {
            $sum: {
              $cond: [
                {
                $eq: ["$isError", false],
                },
                1,
                0,
              ],
            },
          },
          noFieldCount: {
            $sum: {
              $cond: [
                {
                $not: ["$isError"],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: "sitemaps",
          localField: "category",
          foreignField: "_id",
          pipeline: [
            {
            $project: {
              __v: 0,
              href: 0,
              _id: 0,
            },
            },
          ],
          as: "category",
        },
      },
      {
        $set: {
          category: {
            $first: "$category.category",
          },
          subcategory: {
            $first: "$category.subcategory",
          },
          priority: {
            $first: "$category.priority",
          },
        },
      },
      {
        $sort: {
          priority: 1,
        },
      },
      {
        $project: {
          priority: 0,
        },
      },
    ]);
    return res.status(200).json({
      message: company.fetchCompanyCategoryList,
      data: categoriesList,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getCompanyList = async (req, res) => {
  // #swagger.tags = ['Company']
  const { size, page, categoriesId, searchString } = req.query;

  const { skip, limit } = setPagination(size, page);

  try {
    const match = {
      isError: { $exists: true, $eq: false },
    };
    if (searchString) {
      match["$text"] = { $search: searchString };
    }
    if (categoriesId) {
      match.categoriesIds = {
        $in: [new mongoose.Types.ObjectId(categoriesId)],
      };
    }
    // const match = categoriesId
    //   ? {
    //       categoriesIds: { $in: [new mongoose.Types.ObjectId(categoriesId)] },
    //       isError: { $exists: true, $eq: false },
    //     }
    //   : {
    //       isError: { $exists: true, $eq: false },
    //     };
    // Execute the aggregation pipeline
    const companyList = await CompanyModel.aggregate([
      {
        $match: match,
      },
      {
        $facet: {
          metadata: [
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
            {
              $lookup: {
                from: "sitemaps",
                localField: "categoriesIds",
                foreignField: "_id",
                pipeline: [
                  {
                  $project: {
                    __v: 0,
                    href: 0,
                    priority: 0,
                    _id: 0,
                  },
                  },
                ],
                as: "categories",
              },
            },
            {
              $project: {
                _id: 0,
                profileLink: 0,
                websiteLink: 0,
              },
            },
          ],
          totalCount: [
            {
            $count: "count",
            },
          ],
        },
      },
      {
        $set: {
          totalCount: {
            $first: "$totalCount.count",
          },
        },
      },
    ]);

    return res.status(200).json({
      message: company.fetchCompanyList,
      data: companyList[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createCompanyListFile = async (req, res) => {
  // #swagger.tags = ['Company']

  try {
    const companyList = await CompanyModel.find().select('index page companyName profileLink websiteLink totalEarning hrRate employees location LinkedIn Facebook Twitter Instagram address website phone_number business isMailSend ').limit(10);

    // const companyList = await CompanyModel.aggregate([
    //   {
    //     $match: {
    //       status: COMPANY_STATUS.ACTIVE,
    //     },
    //   },
    // ]);

    const headingColumnNames = [
      "index",
      "page",
      "companyName",
      "profileLink",
      "websiteLink",
      "totalEarning",
      "hrRate",
      "employees",
      "location",
      "LinkedIn",
      "Facebook",
      "Twitter",
      "Instagram",
      "address",
      "website",
      "phone_number",
      "business",
      "isMailSend",
    ];

    let headingColumnIndex = 1;
    headingColumnNames.forEach(heading => {
      ws.cell(1, headingColumnIndex++).string(heading)
    })

    let rowIndex = 2;
    businesses[0]?.businesses.forEach((record) => {
      let columnIndex = 1;
      Object.keys(record).forEach((columnName) => {
        const cellValue = record[columnName];
        if (typeof cellValue === "object") {
          ws.cell(rowIndex, columnIndex++).string(JSON.stringify(cellValue));
        } else if (typeof cellValue === "number") {
          ws.cell(rowIndex, columnIndex++).number(cellValue);
        } else if (cellValue === null || cellValue === undefined) {
          ws.cell(rowIndex, columnIndex++).string("");
        } else {
          ws.cell(rowIndex, columnIndex++).string(cellValue.toString());
        }
      });
      rowIndex++;
    });

    wb.write("company-list.xlsx");

    //  create csv or excel file for business list
    return res.success({
      message: company.fetchCompanyList,
      date: companyList,
    });

  } catch (error) {
    return res.internalServerError({
      message: error.message,
    });
  }
};
