import { MegamenuItem, NavItemType } from "shared/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";
import __megamenu from "./jsons/__megamenu.json";

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
    type: "none",
    // children: demoChildMenus,
  },
  // {
  //   id: ncNanoId(),
  //   href: "",
  //   name: "List a House",
  //   type: "dropdown",
  //   children: [
  //     {
  //       id: ncNanoId(),
  //       href: "/about",
  //       name: "About Us",
  //     },
  //     {
  //       id: ncNanoId(),
  //       href: "/why-us",
  //       name: "Why Us",
  //     },
  //     {
  //       id: ncNanoId(),
  //       href: "/advantages",
  //       name: "Advantages",
  //     },
  //     {
  //       id: ncNanoId(),
  //       href: "/faq",
  //       name: "FAQ",
  //     },
  //   ],
  // },
  // {
  //   id: ncNanoId(),
  //   href: "",
  //   name: "Other Pages",
  //   type: "dropdown",
  //   children: [
  //     {
  //       id: ncNanoId(),
  //       href: "/",
  //       name: "Forms",
  //       type: 'dropdown',
  //       children: [
  //         {
  //           id: ncNanoId(),
  //           targetBlank: true,
  //           href: "/files/scar_inspectionreport.pdf",
  //           name: "Move In/Out Inspection Form",
  //         },
  //         {
  //           id: ncNanoId(),
  //           targetBlank: true,
  //           href: "/files/sp_moveoutcleaninglist.pdf",
  //           name: "Move Out Procedures",
  //         },
  //         {
  //           id: ncNanoId(),
  //           targetBlank: true,
  //           href: "/files/sp_parentalguaranty.pdf",
  //           name: "Parental/Sponsor Guarantee Form",
  //         },
  //         {
  //           id: ncNanoId(),
  //           targetBlank: true,
  //           href: "/files/sp_petaddendum2015.pdf",
  //           name: "Pet Addendum",
  //         },
  //         {
  //           id: ncNanoId(),
  //           targetBlank: true,
  //           href: "/files/sp_rentalapplication.pdf",
  //           name: "Rental Application Form",
  //         },
  //         {
  //           id: ncNanoId(),
  //           targetBlank: true,
  //           href: "/files/sp_subleaseagreement.pdf",
  //           name: "Sublease Agreement Form",
  //         },
  //       ]
  //     },
  //     {
  //       id: ncNanoId(),
  //       href: "/maintenance",
  //       name: "Maintenance Request",
  //     },
  //     {
  //       id: ncNanoId(),
  //       targetBlank: true,
  //       href: "https://www.paymentservicenetwork.com/login.asp?acc=rt13968",
  //       name: "Pay Rent Online",
  //     },
  //     {
  //       id: ncNanoId(),
  //       targetBlank: true,
  //       href: "https://www.paymentservicenetwork.com/paymentpage.aspx?acc=rt14052",
  //       name: "Pay Security Deposit Online",
  //     },
  //     {
  //       id: ncNanoId(),
  //       targetBlank: true,
  //       href: "/files/lease.pdf",
  //       name: "Sample Lease",
  //     },
  //     {
  //       id: ncNanoId(),
  //       href: "",
  //       name: "Utilities",
  //       type: 'dropdown',
  //       children: [
  //         {
  //           id: ncNanoId(),
  //           targetBlank: true,
  //           href: "http://www.cityofclemson.org/?CONTEXT=art&cat=0&art=326&BISKIT=2051854513",
  //           name: "Clemson Water Dept.",
  //         },
  //         {
  //           id: ncNanoId(),
  //           targetBlank: true,
  //           href: "http://www.townofpendleton.org/pendletonutilityadmin.htm",
  //           name: "Pendleton Water Dept.",
  //         },
  //         {
  //           id: ncNanoId(),
  //           targetBlank: true,
  //           href: "http://www.seneca.sc.us/Departments/LightWater.aspx",
  //           name: "Seneca Water Dept.",
  //         },
  //         {
  //           id: ncNanoId(),
  //           targetBlank: true,
  //           href: "http://www.blueridge.coop/customer_service/establishing.html",
  //           name: "Blue Ridge Electric",
  //         },
  //         {
  //           id: ncNanoId(),
  //           targetBlank: true,
  //           href: "http://www.duke-energy.com/south-carolina.asp",
  //           name: "Duke Energy",
  //         },
  //         {
  //           id: ncNanoId(),
  //           targetBlank: true,
  //           href: "http://www.fhnga.com/",
  //           name: "Fort Hill Natural Gas",
  //         },
  //         {
  //           id: ncNanoId(),
  //           targetBlank: true,
  //           href: "http://www.att.com/",
  //           name: "AT&T",
  //         },
  //         {
  //           id: ncNanoId(),
  //           targetBlank: true,
  //           href: "http://www.directv.com/DTVAPP/index.jsp",
  //           name: "DirectTV",
  //         },
  //         {
  //           id: ncNanoId(),
  //           targetBlank: true,
  //           href: "http://www.dishnetwork.com/",
  //           name: "DishNetwork",
  //         },
  //         {
  //           id: ncNanoId(),
  //           targetBlank: true,
  //           href: "http://www.northlandcabletv.com/seneca/default.asp?area=Seneca&office=seneca&rtctr=Seneca%20Upgraded&atype=30",
  //           name: "Northland Cable",
  //         },
  //         {
  //           id: ncNanoId(),
  //           targetBlank: true,
  //           href: "http://www.vyvebroadband.com/",
  //           name: "Vyve Broadband",
  //         },
  //       ]
  //     },
  //     {
  //       id: ncNanoId(),
  //       href: "/waiting-list",
  //       name: "Waiting List",
  //     },
  //   ],
  // },
];
