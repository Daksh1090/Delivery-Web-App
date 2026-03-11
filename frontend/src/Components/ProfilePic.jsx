import React from "react";

function ProfilePic() {
  return (
    <div className="w-10 h-10 rounded-3xl overflow-hidden border border-amber-50">
      <img
        src="/FasterFoods_Logo.png"
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default ProfilePic;