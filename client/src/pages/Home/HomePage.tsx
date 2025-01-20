  import Button from "@/stories/atoms/Button/Button";
import * as React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const statusColors = {
  success: "text-green-600 bg-green-100",
  failure: "text-red-600 bg-red-100",
  noField: "text-gray-600 bg-gray-100",
};

const HomePage: React.FC = () => {
  const { data } = useSelector((state: { dashboard: any }) => state.dashboard);
  let navigate = useNavigate();

  return (
    <>
      {/* Main Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
        📊 Data Overview
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              className="shadow border border-gray-200 cursor-pointer"
              onClick={() => navigate(`/companies/${_id}`)}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold tracking-tight">
                  {_id}
                </CardTitle>
                <CardTitle className="text-lg font-bold tracking-tight">
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium tracking-tight text-gray-600">
                  {subcategory}
                </div>

                <div className="mt-4 text-2xl font-extrabold text-blue-700">
                  Total: {count}
                </div>

                <div className="mt-3 flex gap-2 w-fit flex-wrap">
                  <div
                    className={`rounded-lg px-3 py-1 text-lg font-bold ${statusColors.success}`}>
                    ✅ Success:{" "}
                    <span className="text-green-900">{successCount}</span>
                  </div>
                  <div
                    className={`rounded-lg px-3 py-1 text-lg font-bold ${statusColors.failure}`}>
                    ❌ Failed:{" "}
                    <span className="text-red-900">{failureCount}</span>
                  </div>
                  <div
                    className={`rounded-lg px-3 py-1 text-lg font-bold ${statusColors.noField}`}>
                    ⚠️ No Field:{" "}
                    <span className="text-gray-900">{noFieldCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </>
  );
};

export default HomePage;
