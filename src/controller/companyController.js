import { CompanyModel } from "../model/company.model.js";
import { setPagination } from "../utils/common.js";
import { company } from "../utils/resMessage.js";
import { COMPANY_STATUS } from "../utils/constant.js";
import mongoose from "mongoose";

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
                priority: 0,
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
  const { size, page, categoriesId } = req.query;

  const { skip, limit } = setPagination(size, page);

  try {
    const match = categoriesId
      ? {
          categoriesIds: { $in: [new mongoose.Types.ObjectId(categoriesId)] },
          isError: true,
        }
      : {
          isError: true,
        };
    // Execute the aggregation pipeline
    const companyList = await CompanyModel.aggregate([
      {
        $facet: {
          metadata: [
            {
              $match: match,
            },
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
    // console.log(companyList);
    // const companyList = await CompanyModel.aggregate([
    //   {
    //     $match: {
    //       status: COMPANY_STATUS.ACTIVE,
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "category",
    //       localField: "categoriesId",
    //       foreignField: "_id",
    //       as: "category",
    //     },
    //   },
    //   {
    //     $set: {
    //       category: "$category.category",
    //     },
    //   },
    //   {
    //     $facet: {
    //       metadata: [
    //         {
    //           $limit: limit,
    //         },
    //         {
    //           $skip: skip,
    //         },
    //       ],
    //     },
    //     totalRecord: {
    //       $count: "count",
    //     },
    //   },
    //   {
    //     $set: {
    //         totalRecord: {
    //           $first: "$totalRecord.count",
    //         },
    //     },
    //   },
    // ]);
    // add searching and data format response

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
    const companyList = await CompanyModel.find().limit(10);

    return res.status(200).json({
      message: company.fetchCompanyList,
      data: companyList[0],
    });

    // const companyList = await CompanyModel.aggregate([
    //   {
    //     $match: {
    //       status: COMPANY_STATUS.ACTIVE,
    //     },
    //   },
    // ]);
    //  create csv or excel file for business list
    // return res.success({
    //   message: company.createCompanyListFile,
    //   date: companyList,
    // });
  } catch (error) {
    return res.internalServerError({
      message: error.message,
    });
  }
};
