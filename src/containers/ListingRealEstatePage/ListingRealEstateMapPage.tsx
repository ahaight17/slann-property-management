import { FC, useEffect } from "react";
import SectionGridHasMap from "./SectionGridHasMap";
import { Helmet } from "react-helmet";
import SectionHero2ArchivePage from "components/SectionHero2ArchivePage/SectionHero2ArchivePage";
import { useAllProperties } from "net/properties";

export interface ListingRealEstateMapPageProps {
  className?: string;
}

const ListingRealEstateMapPage: FC<ListingRealEstateMapPageProps> = ({
  className = "",
}) => {

  const properties = useAllProperties()

  useEffect(() => {
    const $body = document.querySelector("body");
    if ($body) {
      $body.className = "theme-base";
    }
    return () => {
      if ($body) {
        $body.className = "";
      }
    };
  }, []);

  return (
    <div
      className={`nc-ListingRealEstateMapPage relative ${className}`}
      data-nc-id="ListingRealEstateMapPage"
    >
      <Helmet>
        <title>Slann Properties</title>
      </Helmet>

      {/* SECTION HERO */}
      <div className="container pb-24 lg:pb-32">
        <SectionHero2ArchivePage className="lg:mt-2" properties={properties}/>
      </div>

      {/* SECTION */}
      <div className="container pb-24 lg:pb-32 2xl:pl-10 xl:pr-0 xl:max-w-none">
        <SectionGridHasMap properties={properties}/>
      </div>

      <div className="container overflow-hidden">

      </div>
    </div>
  );
};

export default ListingRealEstateMapPage;
