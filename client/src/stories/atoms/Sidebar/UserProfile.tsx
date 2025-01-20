import * as React from "react";
const UserProfile: React.FC = () => {
  return (
    <div className="mt-auto flex items-center justify-center space-x-3 p-3 rounded-lg border border-[#E8E8E8] bg-[#F7F5F2] w-full">
      <img
        src="https://www.shutterstock.com/image-photo/close-portrait-smiling-30s-caucasian-260nw-2246095709.jpg"
        alt="User Avatar"
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="text-sm font-medium text-[#1B1B1B]">Sahilbhai M. Shah</p>
      </div>
    </div>
  );
};

export default UserProfile;
