import mongoose from "mongoose";

export const companySchema = new mongoose.Schema(
  {
    index: {
      type: Number,
      require: true,
      unique: true,
    },
    categoriesId: { type: mongoose.Schema.Types.ObjectId, ref: "sitemaps" },
    categoriesIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "sitemaps" }],
    page: {
      type: Number,
      require: true,
    },
    companyName: {
      type: String,
      require: true,
    },
    profileLink: {
      type: String,
      default: "",
    },
    websiteLink: {
      type: String,
      default: "",
    },
    totalEarning: {
      type: String,
      default: "",
    },
    hrRate: {
      type: String,
      default: "",
    },
    employees: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    LinkedIn: {
      type: String,
      default: "",
    },
    Facebook: {
      type: String,
      default: "",
    },
    Twitter: {
      type: String,
      default: "",
    },
    Instagram: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    phone_number: {
      type: String,
      default: "",
    },
    business: {
      type: String,
      default: "",
    },
    Tel: {
      type: [],
      default: [],
    },
    mail: {
      type: [],
      default: [],
    },
    webLinkedin: {
      type: [],
      default: [],
    },
    webInstagram: {
      type: [],
      default: [],
    },
    webTwitter: {
      type: [],
      default: [],
    },
    webFacebook: {
      type: [],
      default: [],
    },
    isMailSend: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// export const companySchema = new mongoose.Schema({
//   index: {
//     type: Number,
//     required: true
//   },
//   categoriesId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'category',
//     required: true
//   },
//   page: {
//     type: Number,
//     required: true
//   },
//   companyName: {
//     type: String,
//     required: true
//   },
//   profileLink: {
//     type: String,
//     required: true
//   },
//   websiteLink: {
//     type: String,
//     required: true
//   },
//   totalEarning: {
//     type: String
//   },
//   hrRate: {
//     type: String
//   },
//   employees: {
//     type: String
//   },
//   location: {
//     type: String
//   },
//   LinkedIn: {
//     type: String
//   },
//   Facebook: {
//     type: String
//   },
//   Twitter: {
//     type: String
//   },
//   Instagram: {
//     type: String
//   },
//   address: {
//     type: String
//   },
//   website: {
//     type: String
//   },
//   phone_number: {
//     type: String
//   },
//   business: {
//     type: String
//   },
//   Tel: {
//     type: [String]
//   },
//   mail: {
//     type: [String]
//   },
//   isMailSend: {
//     type: Boolean,
//     default: false
//   },
//   categoriesIds: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'category'
//   }]
// }, {
//   timestamps: true
// });

export const CompanyModel = mongoose.model("companes", companySchema);
