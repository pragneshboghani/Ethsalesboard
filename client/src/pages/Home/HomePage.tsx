import Button from "@/stories/atoms/Button/Button";
import * as React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BadgeInfo, Ban, ChartNoAxesCombined, CheckCheck } from "lucide-react";

const statusColors = {
  success: "text-green-600 border  border-green-200 shadow",
  failure: "text-red-600 border border-red-200 shadow",
  noField: "text-gray-600 border  border-[#ffe564] shadow",
};

const HomePage: React.FC = () => {
  const { data } = useSelector((state: { dashboard: any }) => state.dashboard);
  let navigate = useNavigate();

  return (
    <>
      {/* Main Title */}
      <h2 className="text-3xl flex items-center gap-1 font-bold text-gray-800 mb-6">
        <ChartNoAxesCombined className="stroke-[2.5]" /> Data Overview
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {data?.map(
          ({
            _id,
            category,
            subcategory,
            count,
            successCount,
            failureCount,
            noFieldCount,
          }) => (
            <Card
              key={_id}
              className="card-animation border-none shadow-[0px_0px_20px_rgba(0,0,0,0.2)] relative z-0 overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out hover:border-primary_background hover:shadow-lg"
              onClick={() => navigate(`/companies/${subcategory}`)}>
              <CardHeader className="pb-1">
                <CardTitle className="text-base font-bold text-gray-700 tracking-tight">
                  {_id}
                </CardTitle>
                <CardTitle className="text-base font-bold text-gray-600 tracking-tight">
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium tracking-tight text-gray-500">
                  {subcategory}
                </div>

                <div className="mt-3 text-xl font-bold text-primary_text">
                  Total: {count}
                </div>

                <div className="mt-3 grid gap-2  grid-cols-2 ">
                  <div
                    className={`rounded-lg px-3 py-2 text-sm flex items-center justify-center gap-1 font-bold max-h-fit ${statusColors.success}`}>
                    <CheckCheck width={20} color="green" /> Success:{" "}
                    <span className="text-green-900">{successCount}</span>
                  </div>
                  <div
                    className={`rounded-lg px-3 py-2 text-sm flex items-center justify-center gap-1 font-bold max-h-fit ${statusColors.failure}`}>
                    <Ban width={20} /> Failed:{" "}
                    <span className="text-red-900">{failureCount}</span>
                  </div>
                  <div
                    className={`rounded-lg px-3 py-2 col-span-2 text-sm flex items-center justify-center gap-1 font-bold max-h-fit ${statusColors.noField}`}>
                    <BadgeInfo width={18} color="#e6a700" /> No Field:{" "}
                    <span className="text-gray-900">{noFieldCount}</span>
                  </div>
                </div>
              </CardContent>
              {/* <div className="flex items-center justify-center absolute w-[800px] h-[200px] overflow-hidden top-[210px] left-[-50px] -z-10 bg-[#23a56657] rounded-none rotate-[6deg]"></div> */}
            </Card>
          )
        )}
      </div>
    </>
  );
};

export default HomePage;
