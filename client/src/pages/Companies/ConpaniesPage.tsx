import { fetchCompanies, resetState } from "@/redux/slices/companySlice";
import { AppDispatch } from "@/redux/store";
import { CompaniesDataTable } from "@/stories/template/CompaniesDataTable/CompaniesDataTable";
import { ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

const CompaniesPage: React.FC = () => {
  const { id } = useParams();
  const { data } = useSelector((state: { dashboard: any }) => state.dashboard);

  const _id = data?.filter((_d) => _d.subcategory === id)?.[0]?._id;

  return (
    <div>
      <p>CompaniesPage</p>
      {_id && <CompaniesDataTable id={_id} />}
    </div>
  );
};

export default CompaniesPage;
