import DeveloperFrom from "@/pages/Developers/DeveloperFrom";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getProfileInitials } from "@/lib/utils";
import { Developer } from "@/dto/company";
import { useAppSelector } from "@/redux/store";

const DeveloperListPage: React.FC = () => {
  const navigate = useNavigate();
  const { developers } = useAppSelector((state) => state.developer);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">employee page</h1>
        <DeveloperFrom />
      </div>
      <div className="grid grid-cols-4 gap-10">
        {developers?.map((val: Developer, i) => (
          <Card
            className="border-none relative rounded-xl overflow-hidden shadow-[0px_0px_20px_rgba(0,0,0,0.2)] w-full"
            onClick={() => navigate(`${val?._id}`)}>
            <div className="w-full absolute border h-[65px] bg-primary_background"></div>
            <CardHeader>
              <div className="relative flex justify-between">
                <div className="h-20 w-20  rounded-full mb-3 overflow-hidden border-2 border-white outline outline-primary_background">
                  <Avatar>
                    <AvatarImage src="https://dashboard.shadcnuikit.com/images/avatars/10.png" />
                    <AvatarFallback>
                      {getProfileInitials(val.firstName, val.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  {/* <img
                    className=" w-full"
                    src={
                      val.profile[0]?.fileURL ?? "https://github.com/shadcn.png"
                    }
                    alt={val.name}
                  /> */}
                </div>
                <div className="text-end text-white">
                  <CardDescription className="text-white font-bold">
                    {`${val.firstName} ${val.lastName}`}
                  </CardDescription>
                  <CardDescription className="text-white">
                    {val.email}
                  </CardDescription>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <CardDescription className="flex justify-between">
                  <span className="font-bold">Job Role:-</span>
                  {val.currentPosition || "No Role"}
                </CardDescription>
                <CardDescription className="flex justify-between">
                  <span className="font-bold">Education:-</span>
                  {val.education[0]?.degree || "No field of study available"}
                </CardDescription>
                <CardDescription className="flex justify-between">
                  <span className="font-bold">Phone:-</span>
                  {val.mobileNumber}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  );
};

export default DeveloperListPage;
