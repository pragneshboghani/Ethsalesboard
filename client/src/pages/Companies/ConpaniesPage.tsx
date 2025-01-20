import { fetchCompanies } from "@/redux/slices/companySlice";
import { AppDispatch } from "@/redux/store";
import { CompaniesDataTable } from "@/stories/template/CompaniesDataTable/CompaniesDataTable";
import { ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

const CompaniesPage: React.FC = () => {
  const { id } = useParams();

  const dispatch: AppDispatch = useDispatch();
  const { companies } = useSelector((state: { company: any }) => state.company);

  React.useEffect(() => {
    dispatch(fetchCompanies({ categoriesId: id }));
  }, [id]);

  return (
    <div>
      <p>CompaniesPage</p>
      <CompaniesDataTable data={companies} />
    </div>
  );
};

export default CompaniesPage;
