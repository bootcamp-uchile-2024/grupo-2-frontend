import React from "react";

interface DescubreSectionProps {
  imageUrl: string;
}

export const DescubreSection: React.FC<DescubreSectionProps> = ({
  imageUrl,
}) => {
  return (
    <section
      className="flex bg-cover bg-center h-300px"
      style={{ backgroundImage: `url(${imageUrl})` }}
    ></section>
  );
};
